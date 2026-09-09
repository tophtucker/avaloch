import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { formatIbeDate } from './ibe';

// TZ is read once when a process starts, so flipping process.env.TZ mid-run
// proves very little. These cases run the formatter in real child processes
// under two zones a full day apart — Pacific/Kiritimati is UTC+14, Pacific/
// Midway is UTC-11 — which is where a stray `new Date()` would show itself.
const MODULE_URL = new URL('./ibe.ts', import.meta.url).href;

const DATES = [
	'2026-10-24', // the canonical search
	'2026-01-01', // first of the year
	'2026-12-31', // last of the year
	'2027-1-5', // single digits, needs padding
	'2028-02-29', // leap day
	'2026-03-08', // US spring-forward Sunday
	'2026-11-01' // US fall-back Sunday
];

function formatUnder(timeZone) {
	const script = `
		const { formatIbeDate } = await import(${JSON.stringify(MODULE_URL)});
		const dates = ${JSON.stringify(DATES)};
		console.log(JSON.stringify(dates.map((d) => formatIbeDate(d))));
	`;
	const stdout = execFileSync(process.execPath, ['--input-type=module', '-e', script], {
		env: { ...process.env, TZ: timeZone },
		encoding: 'utf8'
	});
	return JSON.parse(stdout.trim());
}

describe('formatIbeDate is time zone independent', () => {
	const expected = DATES.map((d) => formatIbeDate(d));

	it('produces identical output in Pacific/Kiritimati (UTC+14) and Pacific/Midway (UTC-11)', () => {
		const kiritimati = formatUnder('Pacific/Kiritimati');
		const midway = formatUnder('Pacific/Midway');

		expect(kiritimati).toEqual(midway);
		// Pin the values too, so the test fails loudly rather than agreeing on
		// two identically-wrong answers.
		expect(kiritimati).toEqual(expected);
		expect(kiritimati).toEqual([
			'10-24-2026',
			'01-01-2026',
			'12-31-2026',
			'01-05-2027',
			'02-29-2028',
			'03-08-2026',
			'11-01-2026'
		]);
	});

	it('keeps the date path free of Date entirely', () => {
		const source = readFileSync(new URL('./ibe.ts', import.meta.url), 'utf8');
		const code = source.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
		expect(code).not.toMatch(/\bnew Date\b|\bDate\s*\.\s*(now|parse|UTC)\b/);
	});
});
