<script>
	import { setContext } from 'svelte';
	import Map from '$lib/components/Map.svelte';
	import NewsletterSubscribe from '$lib/components/NewsletterSubscribe.svelte';
	import AvalochLodge from '$lib/icons/AvalochLodge.svelte';
	import PentathingOrnate from '$lib/icons/PentathingOrnate.svelte';
	import Asterisk from '$lib/icons/Asterisk.svelte';
	import Lightbox from '$lib/lightbox/Lightbox.svelte';
	import { BOOKING_URL } from '$lib/nav.js';
	import Gallery from './lodge/Gallery.svelte';
	import NoMinimum from './lodge/NoMinimum.svelte';
	import Rule from './lodge/Rule.svelte';

	let lightbox = $state({ src: null });
	setContext('lightbox', lightbox);

	let { data } = $props();
	let { mainGallery } = data;
</script>

<svelte:head>
	<title>Avaloch Lodge • Lenox, Mass.</title>
	<meta
		name="description"
		content="A historic hotel in Lenox, MA, with views of the Berkshires hills and 10-minute walks to Tanglewood or Kripalu. Formerly the Apple Tree Inn."
	/>
	<link rel="canonical" href="https://avalochinn.com/" />
</svelte:head>

<Rule />

<div class="banner">
	The Apple Tree Inn is now Avaloch. Our redecorated Lodge guest rooms and pool are now open. Our
	Main House guest rooms and Ostrich Room tavern are under renovation and closed for summer 2026. <a
		href="/about/renovations"
		data-sveltekit-reload>Learn more →</a
	>
</div>

<!--
The Apple Tree Inn is now Avaloch.
Our redecorated Lodge guest rooms and pool will be open starting May 15.
Our Main House guest rooms and Ostrich Room tavern are under renovation and closed for summer 2026.
-->

<Rule />

<header>
	<div class="hero-img-wrap">
		<img src="/heropics/pool1.jpg" alt="The pool at Avaloch" />
		<svg class="noise-svg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
			<filter id="noise-filter">
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.65"
					numOctaves="3"
					stitchTiles="stitch"
				/>
			</filter>
			<rect width="100%" height="100%" filter="url(#noise-filter)" />
		</svg>
		<div class="grain-overlay" aria-hidden="true"></div>
	</div>
	<div class="wordmark">
		<AvalochLodge class="avaloch-lodge" />
	</div>
</header>

<Rule />

<section class="first">
	<p>is the only lodging within walking distance to Tanglewood<sup>(9 min.)</sup>.</p>
	<p>
		Perched on a big hill overlooking the Stockbridge Bowl, it has a view, a pool, and a coffee
		machine.
	</p>

	<div style="display: flex; justify-content: flex-start; align-items: center; gap: 2rem;">
		<a class="cta" href={BOOKING_URL}>Book now</a>
		<NoMinimum class="nomin" />
	</div>
</section>

<Rule />

<Gallery images={mainGallery} />

<Rule />

<section class="flex" style="align-items: stretch">
	<div>
		<div>10 Richmond Mountain Road<br />Lenox, Massachusetts 01240</div>
		<a href="mailto:frontdesk@avalochinn.com" target="_blank">frontdesk@avalochinn.com</a>
		<div>(413) 637-1910</div>
		<a href="https://www.instagram.com/avaloch.inn/" target="_blank">@avaloch.inn</a>
		<div style="margin-top: 1em;">
			<a href="/activities/amenities" data-sveltekit-reload>Amenities</a> •
			<a href="/about/policies" data-sveltekit-reload>Policies</a>
		</div>
	</div>
	<PentathingOrnate class="pentathing" />
</section>

<Rule />

<section>
	<Map />
	<div style="margin-top: 1em">
		<div class="notice">Activity guides</div>
		<p>
			<a href="/activities/tanglewood" data-sveltekit-reload>Tanglewood</a> •
			<a href="/activities/berkshires" data-sveltekit-reload>The Berkshires</a>
		</p>
	</div>
</section>

<Rule />

<section class="coming-soon">
	<div>
		<div class="notice">Coming soon</div>
		<p>
			The <span class="inalign">Avaloch Inn</span> and <span class="inalign">Café</span> and
			<span class="inalign">Ostrich Room</span> are currently closed for renovations. Subscribe to our
			newsletter for updates.
		</p>
		<div style="font-size: smaller;">
			<NewsletterSubscribe />
		</div>
	</div>
	<img
		src="/reno/hill.jpg"
		alt="Construction underway on the main house"
		style="border: 3px double currentColor"
	/>
</section>

<section class="footer">
	<Asterisk style="vertical-align: middle; margin-right: 0.5em;" />Directly across the road from
	Tanglewood
</section>

<Lightbox />

<style>
	:global(body) {
		font-size: 2em;
		background: var(--green);
		color: rgba(255, 255, 255, 0.85);
		font-family: 'Align Web';
		--center-width: 980px;
	}

	section {
		max-width: var(--center-width);
		margin: 4rem auto;
	}

	section.first {
		font-size: 2em;
	}

	section.flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1em;
	}

	section.coming-soon {
		display: grid;
		grid-template-columns: 3fr 2fr;
		gap: 1rem;
	}

	section.footer {
		font-size: small;
		text-align: right;
		text-transform: uppercase;
		font-family: 'Align Web';
		font-variation-settings: 'wght' 800;
		padding-top: 200px;
		text-wrap: pretty;
	}

	header {
		position: relative;
	}

	p {
		max-width: 100%;
	}

	a {
		color: inherit;
	}

	sup {
		font-size: 20px;
		position: absolute;
		padding-left: 5px;
		padding-top: 10px;
	}

	a:hover {
		color: white;
	}

	.inalign {
		font-family: 'Align Web';
		font-variation-settings: 'wght' 800;
		text-transform: uppercase;
		color: white;
	}

	.notice {
		border: 3px double currentColor;
		padding: 0.25rem 0.5rem;
		font-size: smaller;
		text-transform: uppercase;
		display: inline-block;
		letter-spacing: 2px;
	}

	.coming-soon .notice {
		color: var(--green);
		background: white;
	}

	.cta {
		height: auto;
		padding: 0.2em 0.4em;
		border-width: 8px;
		border-color: rgba(30, 30, 30, 0.5);
		background: inherit;
		color: inherit;
	}

	section .cta:hover {
		background: rgba(70, 154, 123, 0.5);
		color: black;
	}

	.banner {
		font-size: 1.5rem;
		max-width: var(--center-width);
		margin: 0 auto;
		padding: 0.5em 0;
		text-wrap: pretty;
	}

	:global(.avaloch-lodge) {
		height: 240px;
	}

	.wordmark {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		color: white;
		padding: 4rem calc((100vw - var(--center-width)) / 2);
		display: flex;
		flex-direction: column;
		justify-content: end;
		align-items: start;
	}

	.hero-img-wrap {
		position: relative;
	}

	.hero-img-wrap {
		aspect-ratio: 2 / 1;
		overflow: hidden;
	}

	.hero-img-wrap img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: bottom;
	}

	.noise-svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.grain-overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: linear-gradient(to bottom, white 20%, var(--green) 100%);
		filter: contrast(120%) brightness(100%);
		mix-blend-mode: multiply;
	}

	:global(.pentathing) {
		width: 180px;
	}

	:global(.nomin) {
		width: 140px;
	}

	@media (max-width: 1100px) {
		:global(body) {
			--center-width: 90%;
			font-size: 1.5em;
		}
		:global(.avaloch-lodge) {
			height: 180px;
		}
		sup {
			font-size: small;
			position: absolute;
			padding-top: 0;
		}
		:global(.pentathing) {
			width: 140px;
		}
	}

	@media (max-width: 600px) {
		:global(body) {
			font-size: 1.2em;
		}
		:global(.avaloch-lodge) {
			height: 100px;
		}
		:global(.pentathing) {
			width: 80px;
		}
		:global(.nomin) {
			width: 80px;
		}
		.hero-img-wrap {
			aspect-ratio: 3 / 4;
			overflow: hidden;
		}
		.wordmark {
			padding-top: 2rem;
			padding-bottom: 2rem;
		}
		section {
			margin: 2rem auto;
		}
		section.first {
			font-size: inherit;
		}
		section.coming-soon {
			display: flex;
			flex-direction: column;
		}
		.flex {
			flex-direction: column;
		}
		.banner {
			font-size: 1rem;
		}
	}
</style>
