// URL construction for the StayNtouch Internet Booking Engine (IBE).
//
// Deliberately free of SvelteKit imports so it can be loaded by a bare `node`
// process — the time zone regression test in ibe.timezone.test.ts runs this
// module under two opposite TZ offsets and compares the output.

/** The IBE search endpoint, appended to the property's base URL. */
const SEARCH_PATH = '/search-results';

const ISO_DATE = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;

/**
 * Convert an ISO calendar date (`YYYY-MM-DD`, what `<input type="date">`
 * produces) into the `MM-DD-YYYY` the IBE expects, zero-padding month and day.
 *
 * This is string manipulation only. It must never construct a `Date`, because
 * `new Date('2026-10-24')` parses as UTC midnight, and reading the month and
 * day back off it goes through the *runtime's* time zone. West of UTC that
 * lands on the previous day: in Pacific/Midway (UTC-11), `2026-10-24` comes
 * back as 10-23-2026, and the guest is quietly sent to the wrong night. There
 * is no calendar arithmetic to do here — only a reordering of three fields the
 * caller already has — so pulling a wall clock into it can only introduce bugs.
 * ibe.timezone.test.ts enforces this.
 */
export function formatIbeDate(isoDate: string): string {
	const parts = ISO_DATE.exec(String(isoDate ?? '').trim());
	if (!parts) {
		throw new Error(
			`formatIbeDate expected an ISO date like 2026-10-24, got ${JSON.stringify(isoDate)}`
		);
	}
	const [, year, month, day] = parts;
	return `${month.padStart(2, '0')}-${day.padStart(2, '0')}-${year}`;
}

function integerParam(name: string, value: unknown): string {
	if (!Number.isInteger(value)) {
		throw new Error(`${name} must be an integer, got ${JSON.stringify(value)}`);
	}
	return String(value);
}

/**
 * Build a full IBE search URL.
 *
 * Values are escaped with `encodeURIComponent` rather than `URLSearchParams`,
 * which serialises with form rules and would turn a space in a promo code into
 * `+`. The spec asks for URL encoding, so a space has to come out as `%20`.
 * Keys are written literally — StayNtouch's casing (`promotionCode`) is part of
 * the contract and must not be normalised.
 *
 * `promotionCode` is omitted entirely when blank; an empty `promotionCode=`
 * reads to the engine as a code that does not exist, which returns no rates.
 */
export function buildIbeSearchUrl({
	baseUrl,
	checkin,
	checkout,
	adults,
	kids,
	promotionCode = ''
}: {
	baseUrl: string;
	checkin: string;
	checkout: string;
	adults: number;
	kids: number;
	promotionCode?: string;
}): string {
	const params = [
		['checkin', formatIbeDate(checkin)],
		['checkout', formatIbeDate(checkout)],
		['adults', integerParam('adults', adults)],
		['kids', integerParam('kids', kids)]
	];

	const code = String(promotionCode ?? '').trim();
	if (code) params.push(['promotionCode', code]);

	const query = params.map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
	return `${baseUrl.replace(/\/+$/, '')}${SEARCH_PATH}?${query}`;
}
