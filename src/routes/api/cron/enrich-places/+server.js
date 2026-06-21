import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createClient } from '@sanity/client';
import { enrichPlaces } from '$lib/enrichPlace.js';

// Give the function room to walk every place (shortlink + Places API per doc).
// Read by @sveltejs/adapter-vercel on deploy.
export const config = { maxDuration: 60 };

/**
 * Weekly cron endpoint that refreshes `place` coordinates/address/website from
 * each document's Google Maps link. Scheduled via vercel.json; Vercel sends the
 * request with `Authorization: Bearer <CRON_SECRET>` when CRON_SECRET is set.
 *
 * Pass `?onlyMissing=1` to enrich only places that have no coordinates yet
 * (a fast pass after adding a new place).
 *
 * @type {import('./$types').RequestHandler}
 */
export async function GET({ request, url }) {
	if (env.CRON_SECRET && request.headers.get('authorization') !== `Bearer ${env.CRON_SECRET}`) {
		return new Response('Unauthorized', { status: 401 });
	}

	if (!env.SANITY_WRITE_TOKEN || !env.GOOGLE_MAPS_API_KEY) {
		return json({ error: 'Missing SANITY_WRITE_TOKEN or GOOGLE_MAPS_API_KEY' }, { status: 500 });
	}

	const client = createClient({
		projectId: env.SANITY_PROJECT_ID || 'lxtjf1cx',
		dataset: env.SANITY_DATASET || 'prod',
		apiVersion: '2024-01-01',
		token: env.SANITY_WRITE_TOKEN,
		useCdn: false
	});

	const onlyMissing = url.searchParams.get('onlyMissing') === '1';

	const result = await enrichPlaces({
		client,
		googleApiKey: env.GOOGLE_MAPS_API_KEY,
		onlyMissing
	});

	return json(result);
}
