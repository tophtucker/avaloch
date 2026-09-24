import { describe, expect, it } from 'vitest';
import { IBE_BASE_URL } from './config';
import { buildIbeSearchUrl, formatIbeDate } from './ibe';

// Every case below goes through the same call the component makes, so these
// assert the real URL a guest would be sent to, not a reconstruction of it.
const search = (params) => buildIbeSearchUrl({ baseUrl: IBE_BASE_URL, ...params });

describe('IBE_BASE_URL', () => {
	it('defaults to the avaloch property when PUBLIC_IBE_BASE_URL is unset', () => {
		expect(IBE_BASE_URL).toBe('https://avalochinn.ibe.stayntouch.com');
	});
});

describe('buildIbeSearchUrl', () => {
	it('builds the canonical two-adult search exactly', () => {
		expect(search({ checkin: '2026-10-24', checkout: '2026-10-26', adults: 2, kids: 0 })).toBe(
			'https://avalochinn.ibe.stayntouch.com/search-results?checkin=10-24-2026&checkout=10-26-2026&adults=2&kids=0'
		);
	});

	it('percent-encodes a space in the promo code as %20, not +', () => {
		const url = search({
			checkin: '2026-10-24',
			checkout: '2026-10-26',
			adults: 2,
			kids: 0,
			promotionCode: 'TANGLEWOOD WEEKEND'
		});
		expect(url).toBe(
			'https://avalochinn.ibe.stayntouch.com/search-results?checkin=10-24-2026&checkout=10-26-2026&adults=2&kids=0&promotionCode=TANGLEWOOD%20WEEKEND'
		);
		expect(url).not.toContain('+');
	});

	it('encodes other reserved characters in the promo code', () => {
		expect(
			search({
				checkin: '2026-10-24',
				checkout: '2026-10-26',
				adults: 2,
				kids: 0,
				promotionCode: 'A&B/C'
			})
		).toContain('&promotionCode=A%26B%2FC');
	});

	it('carries kids through when there are children on the booking', () => {
		expect(search({ checkin: '2026-10-24', checkout: '2026-10-26', adults: 2, kids: 3 })).toBe(
			'https://avalochinn.ibe.stayntouch.com/search-results?checkin=10-24-2026&checkout=10-26-2026&adults=2&kids=3'
		);
	});

	it('zero-pads a single-digit month and day', () => {
		expect(search({ checkin: '2027-1-5', checkout: '2027-1-9', adults: 1, kids: 0 })).toBe(
			'https://avalochinn.ibe.stayntouch.com/search-results?checkin=01-05-2027&checkout=01-09-2027&adults=1&kids=0'
		);
	});

	it('omits promotionCode entirely when it is blank or whitespace', () => {
		const base = { checkin: '2026-10-24', checkout: '2026-10-26', adults: 2, kids: 0 };
		expect(search(base)).not.toContain('promotionCode');
		expect(search({ ...base, promotionCode: '' })).not.toContain('promotionCode');
		expect(search({ ...base, promotionCode: '   ' })).not.toContain('promotionCode');
	});

	it('keeps StayNtouch’s key casing and param order', () => {
		const url = search({
			checkin: '2026-10-24',
			checkout: '2026-10-26',
			adults: 2,
			kids: 1,
			promotionCode: 'X'
		});
		expect(
			url
				.split('?')[1]
				.split('&')
				.map((p) => p.split('=')[0])
		).toEqual(['checkin', 'checkout', 'adults', 'kids', 'promotionCode']);
	});

	it('does not double up the slash before /search-results', () => {
		expect(
			buildIbeSearchUrl({
				baseUrl: 'https://avalochinn.ibe.stayntouch.com/',
				checkin: '2026-10-24',
				checkout: '2026-10-26',
				adults: 2,
				kids: 0
			})
		).toBe(
			'https://avalochinn.ibe.stayntouch.com/search-results?checkin=10-24-2026&checkout=10-26-2026&adults=2&kids=0'
		);
	});

	it('refuses occupancy that is not a whole number', () => {
		const base = { checkin: '2026-10-24', checkout: '2026-10-26', kids: 0 };
		expect(() => search({ ...base, adults: 2.5 })).toThrow(/adults must be an integer/);
		expect(() => search({ ...base, adults: NaN })).toThrow(/adults must be an integer/);
		expect(() => search({ ...base, adults: 2, kids: NaN })).toThrow(/kids must be an integer/);
	});
});

describe('formatIbeDate', () => {
	it('reorders ISO into MM-DD-YYYY', () => {
		expect(formatIbeDate('2026-10-24')).toBe('10-24-2026');
	});

	it('zero-pads a single-digit month and day', () => {
		expect(formatIbeDate('2027-1-5')).toBe('01-05-2027');
		expect(formatIbeDate('2027-1-15')).toBe('01-15-2027');
		expect(formatIbeDate('2027-11-5')).toBe('11-05-2027');
	});

	it('holds steady across a year boundary', () => {
		expect(formatIbeDate('2026-12-31')).toBe('12-31-2026');
		expect(formatIbeDate('2027-01-01')).toBe('01-01-2027');
	});

	it('handles a leap day', () => {
		expect(formatIbeDate('2028-02-29')).toBe('02-29-2028');
	});

	it('tolerates surrounding whitespace', () => {
		expect(formatIbeDate(' 2026-10-24 ')).toBe('10-24-2026');
	});

	it('throws on anything that is not an ISO date', () => {
		expect(() => formatIbeDate('')).toThrow();
		expect(() => formatIbeDate('10-24-2026')).toThrow();
		expect(() => formatIbeDate('2026/10/24')).toThrow();
		expect(() => formatIbeDate('not a date')).toThrow();
		// @ts-expect-error — guarding the untyped .svelte callers
		expect(() => formatIbeDate(undefined)).toThrow();
	});
});
