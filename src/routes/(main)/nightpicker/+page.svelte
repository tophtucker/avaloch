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
		wired into the live “Book a room” CTA yet. The property name defaults to <code>avaloch</code>
		and is not yet confirmed with StayNtouch — override it with
		<code>PUBLIC_IBE_BASE_URL</code>, see <code>src/lib/config.ts</code>.
	</p>
	<BookingSearch />
</div>
