/**
 * Manual runner for the place-enrichment job (same logic the weekly Vercel cron
 * uses). Run it whenever you want an immediate refresh:
 *
 *   npm run enrich-places                  # refresh every place
 *   npm run enrich-places -- --dry-run     # preview only, no writes
 *   npm run enrich-places -- --only-missing # only places that have no coordinates yet
 *
 * Reads config from a local `.env` file (see .env.example). This is a plain
 * Node script, so it does NOT use SvelteKit's $env — it reads process.env.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createClient } from '@sanity/client';
import { enrichPlaces } from '../src/lib/enrichPlace.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Minimal .env loader (no dependency). Existing process.env wins. */
function loadEnvFile(path) {
	let contents;
	try {
		contents = readFileSync(path, 'utf8');
	} catch {
		return;
	}
	for (const rawLine of contents.split('\n')) {
		const line = rawLine.trim();
		if (!line || line.startsWith('#')) continue;
		const eq = line.indexOf('=');
		if (eq === -1) continue;
		const key = line.slice(0, eq).trim();
		let value = line.slice(eq + 1).trim();
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}
		if (!(key in process.env)) process.env[key] = value;
	}
}

/** @param {string} name */
function requireEnv(name) {
	const value = process.env[name];
	if (!value) {
		console.error(`Missing required environment variable: ${name}`);
		process.exit(1);
	}
	return value;
}

async function main() {
	const repoRoot = resolve(__dirname, '..');
	loadEnvFile(resolve(repoRoot, '.env'));
	loadEnvFile(resolve(repoRoot, '.env.local'));

	const dryRun = process.argv.includes('--dry-run');
	const onlyMissing = process.argv.includes('--only-missing');

	const client = createClient({
		projectId: process.env.SANITY_PROJECT_ID || 'lxtjf1cx',
		dataset: process.env.SANITY_DATASET || 'prod',
		apiVersion: '2024-01-01',
		token: requireEnv('SANITY_WRITE_TOKEN'),
		useCdn: false
	});

	const googleApiKey = requireEnv('GOOGLE_MAPS_API_KEY');

	console.log(
		`Enriching ${onlyMissing ? 'incomplete ' : ''}places${dryRun ? ' (dry run)' : ''}...\n`
	);

	const result = await enrichPlaces({
		client,
		googleApiKey,
		dryRun,
		onlyMissing,
		log: (message) => console.log(message)
	});

	console.log(
		`\nDone. ${result.updated} updated, ${result.skipped} unchanged, ` +
			`${result.failed} failed (of ${result.total}).`
	);

	if (result.failed > 0) {
		console.log('\nFailures:');
		for (const detail of result.details.filter((d) => d.status === 'failed')) {
			console.log(`  - ${detail.name ?? detail.id}: ${detail.message}`);
		}
		process.exit(1);
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
