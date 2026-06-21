# Avaloch

The marketing website for Avaloch (formerly the Apple Tree Inn) in Lenox, Massachusetts. Please file [issues](https://github.com/tophtucker/avaloch/issues)!

This site runs on:
- [SvelteKit](https://svelte.dev/docs/kit/introduction) as a framework
- [Sanity](https://www.sanity.io/) as a headless CMS
- [Vercel](https://vercel.com/) as a host

Sister repositories:
- [avaloch-studio](https://github.com/tophtucker/avaloch-studio) — Sanity configuration
- [ringo](https://github.com/tophtucker/ringo) — corporate parent entity landing page

I have written some about the design and process:
- [newsletter](https://ringohosp.substack.com/p/a-place-on-the-web)
- [tweets](https://x.com/RingoHosp/status/1803303449313849817)

The hotel uses:
- SiteMinder as booking engine ([read more](https://x.com/RingoHosp/status/1793097874361983188))
- Toast for restaurant booking
- Stayntouch as property management system
- MailChimp for email newsletters

---

This repository also contains a cron job running against Sanity to populate places’ coordinates, addresses, and websites from Google Maps links:

```
npm run enrich-places
```

```
npm run enrich-places -- --dry-run
```

```
npm run enrich-places -- --only-missing
```
