// Third-party service configuration.
//
// The StayNtouch Internet Booking Engine (IBE) is hosted by StayNtouch on a
// per-property subdomain. Everything that points at the booking engine derives
// from IBE_BASE_URL, so switching properties (or environments) is a one-line
// change here.
//
// TODO: replace REPLACE_SUBDOMAIN with the real Avaloch IBE subdomain before
// cutting the “Book a room” CTA over from SiteMinder (see BOOKING_URL in
// $lib/nav.js).
export const IBE_BASE_URL = 'https://REPLACE_SUBDOMAIN.ibe.stayntouch.com';

// The IBE wants US-style MM-DD-YYYY dates, but <input type="date"> always hands
// us ISO YYYY-MM-DD. Reshuffle the parts as strings rather than round-tripping
// through Date, which would drag the visitor’s time zone into a calendar date
// that has nothing to do with it.
const ISO_DATE = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;

/**
 * Convert an ISO calendar date (YYYY-MM-DD) to the IBE’s MM-DD-YYYY format,
 * zero-padding month and day. Throws on anything that isn’t an ISO date.
 */
export function toIbeDate(iso: string): string {
	const parts = ISO_DATE.exec(String(iso ?? '').trim());
	if (!parts) {
		throw new Error(`toIbeDate expected an ISO date like 2026-07-04, got ${JSON.stringify(iso)}`);
	}
	const [, year, month, day] = parts;
	return `${month.padStart(2, '0')}-${day.padStart(2, '0')}-${year}`;
}
