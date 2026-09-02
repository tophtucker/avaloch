<script>
	import Nightpicker from '$lib/components/Nightpicker.svelte';
	import BookingSearch from '$lib/components/BookingSearch.svelte';
</script>

<svelte:head>
	<title>Nightpicker • Avaloch (formerly Apple Tree Inn) • Lenox, Mass.</title>
	<!-- <meta name="description" content="TK" /> -->
</svelte:head>

<div class="inner">
	<h1>Nightpicker (Variant A)</h1>
	<p>
		This is an experiment. See <a href="https://github.com/tophtucker/avaloch/issues/133"
			>GitHub issue</a
		>.
	</p>
	<hr />
	<Nightpicker />

	<hr />

	<h1>StayNtouch search (Variant B)</h1>
	<p>
		The same job, handed off to the StayNtouch booking engine instead of SiteMinder. Nothing here is
		wired into the live “Book a room” CTA yet, and the IBE subdomain is still a placeholder — see
		IBE_BASE_URL in <code>src/lib/config.ts</code>.
	</p>
	<BookingSearch />
</div>
