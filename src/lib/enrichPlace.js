/**
 * Place-enrichment logic, framework-agnostic (only depends on `@sanity/client`
 * — passed in — and the global `fetch`). Shared by the Vercel cron endpoint
 * (src/routes/api/cron/enrich-places/+server.js) and the manual runner
 * (scripts/enrich-places.js).
 *
 * It resolves the Google Maps shortlink on each `place` document, then calls the
 * Google Places API (New) to populate coordinates, street address (incl. ZIP)
 * and website. It never touches `description` or `tags` — those are curated by
 * hand in the studio. The `place` schema lives in the avaloch-studio repo.
 */

const USER_AGENT = 'avaloch-place-enricher/1.0 (+https://avalochinn.com; place metadata sync)';

/**
 * @typedef {Object} ParsedGmaps
 * @property {string} [name]
 * @property {number} [latitude]
 * @property {number} [longitude]
 * @property {boolean} [precise] True when coordinates came from the exact place
 *   marker (`!3d/!4d`) rather than the looser map viewport center (`@`).
 */

/**
 * @typedef {Object} GooglePlaceData
 * @property {number} [latitude]
 * @property {number} [longitude]
 * @property {string} [street]
 * @property {string} [city]
 * @property {string} [state]
 * @property {string} [zip]
 * @property {string} [website]
 */

/**
 * Follow redirects on a Google Maps shortlink (maps.app.goo.gl / goo.gl/maps)
 * to obtain the fully-expanded maps URL.
 * @param {string} url
 * @returns {Promise<string>}
 */
export async function resolveGmapsUrl(url) {
	const res = await fetch(url, {
		headers: { 'User-Agent': USER_AGENT },
		redirect: 'follow'
	});
	// Drain the body so the connection can be reused/closed.
	await res.text().catch(() => undefined);
	return res.url || url;
}

/**
 * Extract the place name and coordinates from an expanded Google Maps URL.
 *
 * Example:
 *   https://www.google.com/maps/place/Taft+Farms/@42.2325593,-73.3492962,731m/
 *   data=...!1s0x..:0x..!8m2!3d42.2325554!4d-73.3467213!16s...
 *
 * - The name lives in the `/maps/place/<name>/` path segment.
 * - `!3d<lat>!4d<lng>` are the precise place coordinates (preferred).
 * - `@<lat>,<lng>` is the map viewport center (fallback only).
 *
 * @param {string} expandedUrl
 * @returns {ParsedGmaps}
 */
export function parseExpandedUrl(expandedUrl) {
	/** @type {ParsedGmaps} */
	const result = {};

	const nameMatch = expandedUrl.match(/\/maps\/place\/([^/@]+)/);
	if (nameMatch) {
		try {
			result.name = decodeURIComponent(nameMatch[1].replace(/\+/g, ' '));
		} catch {
			result.name = nameMatch[1].replace(/\+/g, ' ');
		}
	}

	const precise = expandedUrl.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
	if (precise) {
		result.latitude = parseFloat(precise[1]);
		result.longitude = parseFloat(precise[2]);
		result.precise = true;
	} else {
		const viewport = expandedUrl.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
		if (viewport) {
			result.latitude = parseFloat(viewport[1]);
			result.longitude = parseFloat(viewport[2]);
			result.precise = false;
		}
	}

	return result;
}

const PLACE_FIELD_MASK = [
	'places.id',
	'places.displayName',
	'places.formattedAddress',
	'places.addressComponents',
	'places.location',
	'places.websiteUri'
].join(',');

/** Normalize a place name for loose comparison (case/punctuation-insensitive). */
function normalizeName(value) {
	return (value || '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, ' ')
		.trim();
}

/**
 * POST to a Places API (New) search endpoint and return the `places` array.
 * @param {string} endpoint e.g. 'places:searchNearby'
 * @param {Record<string, unknown>} body
 * @param {string} apiKey
 */
async function placesSearch(endpoint, body, apiKey) {
	const res = await fetch(`https://places.googleapis.com/v1/${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Goog-Api-Key': apiKey,
			'X-Goog-FieldMask': PLACE_FIELD_MASK
		},
		body: JSON.stringify(body)
	});
	if (!res.ok) {
		const text = await res.text().catch(() => '');
		throw new Error(`Places API error ${res.status}: ${text}`);
	}
	const json = await res.json();
	return json.places ?? [];
}

/**
 * Look up a place via the Google Places API (New) and map it onto our schema.
 *
 * The Maps link gives us the place's *exact* coordinates, which is a far more
 * reliable key than its name. So when we have a pin we use Nearby Search with a
 * hard circular `locationRestriction` around it: results can only come from
 * inside that circle, making a wrong same-named place in another town/state
 * structurally impossible. Among the businesses at that spot we prefer the one
 * whose name matches the link, falling back to the closest (Nearby Search is
 * sorted by distance). Only when there's no pin do we fall back to a plain
 * name-based Text Search.
 *
 * @param {ParsedGmaps} parsed
 * @param {string} apiKey
 * @returns {Promise<GooglePlaceData>}
 */
export async function fetchGooglePlace(parsed, apiKey) {
	if (!parsed.name) {
		throw new Error('Could not determine the place name from the Google Maps link');
	}

	const hasPin = parsed.latitude != null && parsed.longitude != null;
	let place;

	if (hasPin) {
		const center = { latitude: parsed.latitude, longitude: parsed.longitude };
		// Start tight (the storefront), widen once if nothing is returned. A
		// precise pin sits right on the place; a viewport center can be off a bit.
		const radii = parsed.precise ? [75, 250] : [250, 1000];

		let candidates = [];
		for (const radius of radii) {
			candidates = await placesSearch(
				'places:searchNearby',
				{
					locationRestriction: { circle: { center, radius } },
					maxResultCount: 20,
					rankPreference: 'DISTANCE'
				},
				apiKey
			);
			if (candidates.length) break;
		}

		if (candidates.length) {
			const target = normalizeName(parsed.name);
			// Candidates are already distance-sorted; prefer a name match, else nearest.
			place =
				candidates.find((c) => {
					const name = normalizeName(c.displayName?.text);
					return name && (name === target || name.includes(target) || target.includes(name));
				}) ?? candidates[0];
		}
	}

	// Fallback: no pin, or Nearby Search found nothing at the coordinates.
	if (!place) {
		const candidates = await placesSearch(
			'places:searchText',
			{ textQuery: parsed.name, pageSize: 1 },
			apiKey
		);
		place = candidates[0];
	}

	if (!place) {
		throw new Error(`No Google Place found for "${parsed.name}"`);
	}

	const components = place.addressComponents ?? [];
	/** @param {string} type */
	const findComponent = (type) => components.find((c) => c.types?.includes(type));

	const streetNumber = findComponent('street_number')?.longText;
	const route = findComponent('route')?.longText;
	const city =
		findComponent('locality')?.longText ??
		findComponent('postal_town')?.longText ??
		findComponent('sublocality')?.longText;
	const state = findComponent('administrative_area_level_1')?.shortText;
	const zip = findComponent('postal_code')?.longText;

	/** @type {GooglePlaceData} */
	const data = {
		latitude: place.location?.latitude ?? parsed.latitude,
		longitude: place.location?.longitude ?? parsed.longitude,
		street: route ? [streetNumber, route].filter(Boolean).join(' ') : undefined,
		city,
		state,
		zip,
		website: place.websiteUri
	};

	return data;
}

/**
 * Drop keys whose value is `undefined` (so we never overwrite with "nothing").
 * @param {Record<string, unknown>} obj
 */
function definedOnly(obj) {
	return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined));
}

/** Render a value for audit logs, distinguishing "no value" from a real one. */
function formatValue(value) {
	if (value === undefined || value === null || value === '') return '(empty)';
	return String(value);
}

/** @param {number} ms */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * @typedef {Object} EnrichOptions
 * @property {import('@sanity/client').SanityClient} client
 * @property {string} googleApiKey
 * @property {(message: string) => void} [log]
 * @property {boolean} [dryRun]
 * @property {number} [delayMs]
 * @property {boolean} [onlyMissing] When true, only fetch places that are still
 *   missing coordinates. Handy after adding a new place (just name + gmaps) — it
 *   skips already-located docs entirely, so no shortlink is resolved and no
 *   Google call is made for them. (Keyed on coordinates only: many places have
 *   no official website and some have no street address, so those aren't treated
 *   as "missing" — otherwise they'd be re-enriched on every run.)
 */

/**
 * Enrich every `place` document that has a Google Maps link. Returns a summary.
 * Only `coordinates`, `address` and `website` are ever written.
 *
 * @param {EnrichOptions} options
 */
export async function enrichPlaces(options) {
	const { client, googleApiKey, dryRun = false, delayMs = 250, onlyMissing = false } = options;
	const log = options.log ?? (() => undefined);

	// When onlyMissing, let the dataset do the filtering so we never touch
	// Google for places that already have coordinates.
	const missingClause = onlyMissing
		? ` && (!defined(coordinates.latitude) || !defined(coordinates.longitude))`
		: '';

	const places = await client.fetch(
		`*[_type == "place" && defined(gmaps)${missingClause}] | order(name asc){
			_id, name, gmaps, website, address, coordinates
		}`
	);

	const result = {
		total: places.length,
		updated: 0,
		skipped: 0,
		failed: 0,
		/** @type {Array<{id: string, name?: string, status: string, message?: string}>} */
		details: []
	};

	log(
		`Found ${places.length} place(s)` +
			(onlyMissing ? ' missing coordinates.' : ' with a Google Maps link.')
	);

	for (const place of places) {
		const label = place.name ?? place._id;
		try {
			const expanded = await resolveGmapsUrl(place.gmaps);
			const parsed = parseExpandedUrl(expanded);
			const data = await fetchGooglePlace(parsed, googleApiKey);

			// Merge: only set fields Google actually returned, preserving the rest.
			const nextAddress = {
				...(place.address ?? {}),
				...definedOnly({
					street: data.street,
					city: data.city,
					state: data.state,
					zip: data.zip
				})
			};
			const nextCoordinates = {
				...(place.coordinates ?? {}),
				...definedOnly({ latitude: data.latitude, longitude: data.longitude })
			};

			// Collect changed leaf fields so we can log a before/after audit trail.
			/** @type {Array<{path: string, before: unknown, after: unknown}>} */
			const changes = [];
			for (const key of ['street', 'city', 'state', 'zip']) {
				if ((place.address?.[key] ?? undefined) !== (nextAddress[key] ?? undefined)) {
					changes.push({
						path: `address.${key}`,
						before: place.address?.[key],
						after: nextAddress[key]
					});
				}
			}
			for (const key of ['latitude', 'longitude']) {
				if ((place.coordinates?.[key] ?? undefined) !== (nextCoordinates[key] ?? undefined)) {
					changes.push({
						path: `coordinates.${key}`,
						before: place.coordinates?.[key],
						after: nextCoordinates[key]
					});
				}
			}
			if (data.website && data.website !== place.website) {
				changes.push({ path: 'website', before: place.website, after: data.website });
			}

			/** @type {Record<string, unknown>} */
			const patch = {};
			if (changes.some((c) => c.path.startsWith('address.'))) patch.address = nextAddress;
			if (changes.some((c) => c.path.startsWith('coordinates.')))
				patch.coordinates = nextCoordinates;
			if (changes.some((c) => c.path === 'website')) patch.website = data.website;

			if (changes.length === 0) {
				result.skipped += 1;
				result.details.push({ id: place._id, name: place.name, status: 'skipped' });
				log(`  = ${label}: already up to date`);
			} else {
				if (!dryRun) {
					await client.patch(place._id).set(patch).commit();
				}
				result.updated += 1;
				const lines = changes.map(
					(c) => `${c.path}: ${formatValue(c.before)} → ${formatValue(c.after)}`
				);
				result.details.push({
					id: place._id,
					name: place.name,
					status: 'updated',
					message: lines.join('; ')
				});
				log(`  ${dryRun ? '~' : '+'} ${label}`);
				for (const line of lines) log(`      ${line}`);
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			result.failed += 1;
			result.details.push({ id: place._id, name: place.name, status: 'failed', message });
			log(`  ! ${label}: ${message}`);
		}

		if (delayMs > 0) await sleep(delayMs);
	}

	return result;
}
