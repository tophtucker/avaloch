<script>
	import Image from '$lib/lightbox/Image.svelte';
	import WeekHours from '$lib/components/WeekHours.svelte';
	import XR from '$lib/components/XR.svelte';
	import HR from '$lib/components/HR.svelte';

	let { data } = $props();
	let {
		summerPopupBar: { calendar, menus }
	} = data;
</script>

<svelte:head>
	<title>Pop-Up Bar • Avaloch (formerly Apple Tree Inn) • Lenox, Mass.</title>
	<meta
		name="description"
		content="Grab a cocktail with great views before walking down the hill to your Tanglewood concert"
	/>
</svelte:head>

<div class="inner">
	<h1>Pop-Up Bar</h1>
	<Image src="/heropics/popup.jpg" />

	<div class="grid-or-flex" style="grid-template-columns: 3fr 2fr;">
		<div>
			<p>
				Grab some beer, wine, a cocktail, or a non-alcoholic drink before walking down the hill to
				your Tanglewood concert. Lawn games include badminton, cornhole, and KanJam. See our <a
					href="https://www.instagram.com/p/DaWUJgPuCGo/"
				>
					opening announcement reel on Instagram</a
				>.
			</p>

			<p>We have lots of outdoor seating, but no indoor seating.</p>

			<p>No reservations, no cover charge.</p>

			<p>Pairs great with a <a href="/activities/pool">pool pass</a> (sold separately)!</p>
		</div>
		<div class="hours-wrapper"><WeekHours {calendar} /></div>
	</div>
</div>

<style>
	.hours-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 2em;
	}
</style>
