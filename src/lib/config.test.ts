import { describe, expect, it } from 'vitest';
import { IBE_BASE_URL, toIbeDate } from './config';

describe('toIbeDate', () => {
	it('reorders an ISO date into MM-DD-YYYY', () => {
		expect(toIbeDate('2026-07-04')).toBe('07-04-2026');
	});

	it('keeps two-digit months and days as they are', () => {
		expect(toIbeDate('2026-11-23')).toBe('11-23-2026');
		expect(toIbeDate('2026-10-10')).toBe('10-10-2026');
	});

	it('zero-pads a single-digit month', () => {
		expect(toIbeDate('2026-1-15')).toBe('01-15-2026');
		expect(toIbeDate('2026-9-30')).toBe('09-30-2026');
	});

	it('zero-pads a single-digit day', () => {
		expect(toIbeDate('2026-12-5')).toBe('12-05-2026');
	});

	it('zero-pads a single-digit month and day together', () => {
		expect(toIbeDate('2026-1-1')).toBe('01-01-2026');
		expect(toIbeDate('2026-8-9')).toBe('08-09-2026');
	});

	it('passes through an already-padded month and day', () => {
		expect(toIbeDate('2026-01-01')).toBe('01-01-2026');
	});

	// The site runs on Eastern Time while visitors may not, so the conversion has
	// to be pure string surgery — no Date parsing that could shift the day.
	it('holds the date steady across a year boundary', () => {
		expect(toIbeDate('2025-12-31')).toBe('12-31-2025');
		expect(toIbeDate('2026-01-01')).toBe('01-01-2026');
	});

	it('handles a leap day', () => {
		expect(toIbeDate('2028-02-29')).toBe('02-29-2028');
	});

	it('tolerates surrounding whitespace', () => {
		expect(toIbeDate(' 2026-07-04 ')).toBe('07-04-2026');
	});

	it('throws on anything that is not an ISO date', () => {
		expect(() => toIbeDate('')).toThrow();
		expect(() => toIbeDate('07-04-2026')).toThrow();
		expect(() => toIbeDate('2026/07/04')).toThrow();
		expect(() => toIbeDate('not a date')).toThrow();
		// @ts-expect-error — guarding the untyped .svelte callers
		expect(() => toIbeDate(undefined)).toThrow();
	});
});

describe('IBE_BASE_URL', () => {
	it('is a bare origin with no trailing slash, so paths can be appended', () => {
		expect(IBE_BASE_URL).toMatch(/^https:\/\/[^/]+$/);
	});
});
