import { env } from '$env/dynamic/public';

// Third-party service configuration.
//
// The StayNtouch Internet Booking Engine (IBE) is hosted by StayNtouch on a
// per-property subdomain. Everything that points at the booking engine derives
// from IBE_BASE_URL — the search form and the My Trips link — so the property
// name is set in exactly one place.
//
// The default is the live property host, confirmed with StayNtouch on
// 2026-09-24. Set PUBLIC_IBE_BASE_URL in the environment (Vercel project
// settings, or a local .env) to point at a different property or a staging
// engine, which is an env var change rather than a deploy.
export const IBE_BASE_URL = env.PUBLIC_IBE_BASE_URL || 'https://avalochinn.ibe.stayntouch.com';
