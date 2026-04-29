<script>
	import { PortableText } from '@portabletext/svelte';
	import PlaceReference from '$lib/components/PlaceReference.svelte';
	import HR from '$lib/components/HR.svelte';
	import PlaceMap from '$lib/components/PlaceMap.svelte';
	import InteractivePlaceMap from '$lib/components/InteractivePlaceMap.svelte';
	import { getPlacesFromItinerary, getPlaceUrl, groupPlaces } from '$lib/places.js';

	let { data } = $props();
	let { itineraries, places } = data;

	const bodyLength = (body) =>
		body?.flatMap((block) => block.children?.map((span) => span.text) ?? []).join('').length ?? 0;

	const groups = $derived(groupPlaces(places));
</script>

<svelte:head>
	<title>The Berkshires • Avaloch (formerly Apple Tree Inn) • Lenox, Mass.</title>
	<meta
		name="description"
		content="Do as we do! Tips for local activities, hikes, restaurants, shows, farms, and one bowling alley."
	/>
</svelte:head>

<div class="inner">
	<h1>The Berkshires</h1>
	<p>
		Do as we do! Living here, Claire has some ideas from personal experience about how to spend a
		spare chunk of your time.
	</p>

	<div class="itineraries">
		{#each itineraries.filter((d) => d.title) as itinerary}
			<div class="itinerary">
				<div>
					<h3>{itinerary.title}</h3>
					<PortableText
						value={itinerary.body}
						components={{ marks: { placeReference: PlaceReference } }}
					/>
				</div>
				<PlaceMap places={getPlacesFromItinerary(itinerary)} />
			</div>
		{/each}
	</div>

	<h3>Other pairings</h3>

	<div class="others">
		{#each itineraries
			.filter((d) => !d.title)
			.sort((a, b) => bodyLength(b.body) - bodyLength(a.body)) as itinerary}
			<div class="other">
				<PlaceMap places={getPlacesFromItinerary(itinerary)} />
				<div>
					<PortableText
						value={itinerary.body}
						components={{ marks: { placeReference: PlaceReference } }}
					/>
				</div>
			</div>
		{/each}
	</div>

	<HR />

	<h2>All places</h2>

	<InteractivePlaceMap {places} />

	<div class="index">
		{#each groups as [tag, places]}
			<h4 class="tag-heading">{tag}</h4>
			{#each places as place}
				<div class="item">
					<a href={getPlaceUrl(place)} target="_blank" rel="noopener noreferrer">
						{place.name}
					</a>
					{#if place.description}
						<span class="place-desc">{place.description}</span>
					{/if}
				</div>
			{/each}
		{/each}
	</div>

	<footer>
		Maps made with <a href="https://leafletjs.com/">Leaflet</a>. &copy;
		<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
		contributors &copy;
		<a href="https://carto.com/attributions">CARTO</a>.
	</footer>
</div>

<style>
	.itineraries {
		display: flex;
		flex-direction: column;
		gap: 2em;
	}
	.itinerary {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1em;
	}
	.itinerary h3 {
		margin: 0;
	}

	.others {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1em;
	}
	.other {
		display: grid;
		grid-template-rows: 140px 1fr;
		gap: 0.5em;
	}
	:global(.other p) {
		margin: 0;
	}

	footer {
		font-size: smaller;
		font-style: italic;
		margin-top: 4em;
	}
</style>
