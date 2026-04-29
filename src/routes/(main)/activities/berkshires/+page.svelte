<script>
	import { PortableText } from '@portabletext/svelte';
	import PlaceReference from '$lib/components/PlaceReference.svelte';
	import HR from '$lib/components/HR.svelte';
	import PlaceMap from '$lib/components/PlaceMap.svelte';
	import InteractivePlaceMap from '$lib/components/InteractivePlaceMap.svelte';
	import { getPlacesFromItinerary, getPlaceUrl } from '$lib/places.js';

	let { data } = $props();
	let { itineraries, places } = data;

	const bodyLength = (body) =>
		body?.flatMap((block) => block.children?.map((span) => span.text) ?? []).join('').length ?? 0;

	// Group places by their tags. Places with multiple tags appear in each group.
	// Places with no tags go into an "Other" bucket.
	const placesByTag = $derived(() => {
		const groups = {};
		for (const place of places) {
			const tags = place.tags?.length ? place.tags : ['Other'];
			for (const tag of tags) {
				if (!groups[tag]) groups[tag] = [];
				groups[tag].push(place);
			}
		}
		// Sort tags alphabetically, but keep "Other" last
		return Object.entries(groups).sort(([a], [b]) => {
			if (a === 'Other') return 1;
			if (b === 'Other') return -1;
			return a.localeCompare(b);
		});
	});
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

	<div class="place-groups">
		{#each placesByTag() as [tag, tagPlaces]}
			<div class="place-group">
				<h4 class="tag-heading">{tag}</h4>
				<ul class="place-list">
					{#each tagPlaces as place}
						<li class="place-item">
							<a
								class="place-name"
								href={getPlaceUrl(place)}
								target="_blank"
								rel="noopener noreferrer"
							>
								{place.name}
							</a>
							{#if place.address?.city}
								<span class="place-city">{place.address.city}</span>
							{/if}
							{#if place.description}
								<span class="place-desc">{place.description}</span>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
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

	h2 {
		margin-top: 2em;
		margin-bottom: 0.5em;
	}

	.place-groups {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1.5em 2em;
		margin-top: 1.5em;
	}

	.tag-heading {
		margin: 0 0 0.4em 0;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #888;
	}

	.place-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.6em;
	}

	.place-item {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.place-name {
		font-size: 0.9rem;
		font-weight: 600;
		color: inherit;
		text-decoration: none;
	}
	.place-name:hover {
		color: var(--blue);
		text-decoration: underline;
	}

	.place-city {
		font-size: 0.78rem;
		color: #888;
	}

	.place-desc {
		font-size: 0.78rem;
		color: #555;
		font-style: italic;
	}

	footer {
		font-size: smaller;
		font-style: italic;
		margin-top: 4em;
	}
</style>
