<script>
	import Asterisk from '$lib/icons/Asterisk.svelte';
	import RenoNotice from '$lib/components/RenoNotice.svelte';
	let { data } = $props();
	let { amenities, nonAmenities } = data;
</script>

<svelte:head>
	<title>Amenities • Avaloch (formerly Apple Tree Inn) • Lenox, Mass.</title>
	<!-- <meta name="description" content="TODO" /> -->
</svelte:head>

<div class="inner">
	<h1>Amenities</h1>

	<dl>
		{#each amenities as amenity}
			<dt>
				{amenity.name}
				{#if amenity.badge}<span class="badge"><Asterisk />{amenity.badge}</span>{/if}
			</dt>
			<dd>{@html amenity.description}</dd>
		{/each}
	</dl>

	<!-- <hr />

	<h2>How Claire would use the hotel</h2>
	<p>Living here, we have some opinions about how to make the most of it!</p>

	<ul>
		<li>
			Stay in the Main House and book Room 2 (Orchard). It has its own balcony and the best light.
		</li>
		<li>
			Bring your breakfast out to the Front Porch. You can also work out here with a laptop. There
			is good Wi-Fi everywhere on property.
		</li>
		<li>
			Throw Max the dog a stick, ball, anything. He will always return it. He will never get tired.
		</li>
		<li>
			In the summer, add a night to your stay so that you have a leisurely day to lounge by the
			pool. We have great chaises, umbrellas, and our pool has the best view of any pool in the
			Berkshires.
		</li>
		<li>
			In the winter, sit by the lobby wood-burning fireplace and best your travel partner in chess,
			backgammon, cribbage, or cards.
		</li>
		<li>
			Instead of sitting at a table in the Ostrich Room, sit at a table in the lobby so that you can
			easily hear your dinner conversation, but you still get the Ostrich Room live music vibes
			wafting out to you.
		</li>
		<li>Bring a drink out to the firepit to close out the night.</li>
		<li>Talk to us at the desk to get advice for your stay! We are here to help!</li>
		<li>Come on a day besides a Friday or Saturday. Weekdays are much, much cheaper year-round!</li>
	</ul> -->

	<hr />

	<h2>Non-amenities</h2>
	{@html nonAmenities}
</div>

<style>
	dt {
		font-family: var(--hed-font);
		font-variation-settings: 'wght' 700;
	}
	dd {
		margin-bottom: 1rem;
		max-width: 640px;
	}
	:global(dd p:first-child) {
		margin-top: 0;
	}
	.badge {
		color: var(--gray);
		font-size: smaller;
	}
</style>
