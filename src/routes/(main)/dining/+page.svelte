<script>
	import Image from '$lib/lightbox/Image.svelte';
	import VR from '$lib/components/VR.svelte';
	import RenoNotice from '$lib/components/RenoNotice.svelte';
	import { RESERVATIONS_URL } from '$lib/nav.js';
	let { data } = $props();
</script>

<svelte:head>
	<title>Dining • Avaloch (formerly Apple Tree Inn) • Lenox, Mass.</title>
	<meta
		name="description"
		content="The inn offers a historic tavern open to the public and a complimentary continental breakfast for guests"
	/>
</svelte:head>

<RenoNotice
	>There is no restaurant onsite during renovations. Guests staying at the Lodge can purchase
	breakfast boxes.</RenoNotice
>

<div class="inner blur">
	<div class="comparison-table">
		<div class="header hide-mobile"></div>

		<h2>Avaloch Café</h2>
		<VR style="grid-column: 3; grid-row: 1 / 10;" class="hide-mobile" />
		<h2>The Ostrich Room</h2>

		<!-- <div class="header hide-mobile"></div>
		<div><a class="cta" href="/dining/breakfast">Learn more</a></div>
		<div><a class="cta" href="/dining/ostrich-room">Learn more</a></div> -->

		<div class="header hide-mobile"></div>
		<Image
			src="/reno/hill.jpg"
			style="width: 260px; height: 260px; object-fit: cover; border: 3px double black; margin: 0 auto;"
		/>
		<Image
			src="/img/ostrich-dining.jpg"
			style="width: 260px; height: 260px; object-fit: cover; border: 3px double black; margin: 0 auto;"
		/>

		<div class="header">Summary</div>
		<div>
			The renovation is adding a café on the south side of the Main House, with a floor-to-ceiling
			wall-to-wall view of the hills, where the round room and porch formerly stood.
		</div>
		<div>
			The Ostrich Room is untouched by renovations, except for the addition of an accessible ramp.
			Drinks, food, and music will return.
		</div>

		<div class="header">Open to</div>
		<div>Guests and public</div>
		<div>Guests and public</div>

		<div class="header">Hours</div>
		<div>TBD</div>
		<div>TBD</div>

		<div class="header">Location</div>
		<div>Main House</div>
		<div>Main House</div>

		<!-- <div class="header">Offerings</div>
		<div>Buffet featuring toast, fruit, hard-boiled eggs (no hot food)</div>
		<div>Beer, cocktails, elevated tavern classics</div>

		<div class="header">Open to</div>
		<div>Guests only</div>
		<div>Guests and public</div>

		<div class="header">Hours</div>
		<div>Daily 8 – 10 a.m.</div>
		<div>{data.ostrichRoom.dayRange} evenings</div>

		<div class="header">Location</div>
		<div>Round room (Main House)</div>
		<div>Ostrich Room (Main House)</div>

		<div class="header">Price</div>
		<div>Included with room</div>
		<div>~$8 beers, ~$15 cocktails, ~$22 entrées; no cover charge</div>

		<div class="header">Reservations</div>
		<div>None</div>
		<div>Optional; <a href={RESERVATIONS_URL}>make a reservation</a></div> -->
	</div>
</div>
