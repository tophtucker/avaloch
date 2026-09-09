import { env } from '$env/dynamic/public';

// Third-party service configuration.
//
// The StayNtouch Internet Booking Engine (IBE) is hosted by StayNtouch on a
// per-property subdomain. Everything that points at the booking engine derives
// from IBE_BASE_URL — the search form and the My Trips link — so the property
// name is set in exactly one place.
//
// Set PUBLIC_IBE_BASE_URL in the environment (Vercel project settings, or a
// local .env) to override. The default assumes the property name "avaloch",
// which is not yet confirmed with StayNtouch; if it comes back as something
// else, that is an env var change rather than a deploy.
export const IBE_BASE_URL = env.PUBLIC_IBE_BASE_URL || 'https://avaloch.ibe.stayntouch.com';
