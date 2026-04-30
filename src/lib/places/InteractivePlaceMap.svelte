<script>
	import { onMount, onDestroy } from 'svelte';
	import { INN_COORDINATES, getPlaceUrl } from './index.js';

	let { places, includeInn = true } = $props();

	let mapEl = $state(null);
	let map = null;

	onMount(async () => {
		if (!places.length) return;

		const L = (await import('leaflet')).default;
		await import('leaflet/dist/leaflet.css');

		map = L.map(mapEl, {
			zoomControl: true,
			scrollWheelZoom: true,
			dragging: true,
			touchZoom: true,
			doubleClickZoom: true,
			boxZoom: true,
			keyboard: true,
			attributionControl: false
		});

		L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
			maxZoom: 19
		}).addTo(map);

		const markers = places
			.filter((place) => place.coordinates)
			.map((place) => {
				const { latitude, longitude } = place.coordinates;
				const icon = L.divIcon({
					className: '',
					html: `<div class="imap-pin"></div>`,
					iconSize: [10, 10],
					iconAnchor: [5, 5]
				});
				const marker = L.marker([latitude, longitude], { icon }).addTo(map);

				marker.bindTooltip(`${place.name}`, {
					direction: 'top',
					offset: [0, -8],
					className: 'imap-tooltip'
				});

				return marker;
			});

		// Inn star marker
		const innIcon = L.divIcon({
			className: '',
			html: `<div class="map-inn-star">★</div>`,
			iconSize: [16, 16],
			iconAnchor: [8, 8]
		});
		const innMarker = L.marker([INN_COORDINATES.latitude, INN_COORDINATES.longitude], {
			icon: innIcon
		}).addTo(map);

		if (includeInn) {
			innMarker.bindTooltip('Avaloch', {
				direction: 'top',
				offset: [0, -10],
				className: 'imap-tooltip'
			});
		}

		const group = L.featureGroup(includeInn ? [...markers, innMarker] : markers);
		map.fitBounds(group.getBounds(), { padding: [32, 32] });
	});

	onDestroy(() => {
		map?.remove();
	});
</script>

{#if places.length}
	<div class="imap-wrap">
		<div bind:this={mapEl} class="imap"></div>
	</div>
{/if}

<style>
	.imap-wrap {
		border: 1px solid #ddd;
		border-radius: 6px;
		overflow: hidden;
		height: 480px;
		width: 100%;
	}

	.imap {
		height: 100%;
		width: 100%;
	}

	:global(.imap-pin) {
		width: 10px;
		height: 10px;
		background: black;
		border: 1.5px solid white;
		border-radius: 50%;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
		cursor: pointer;
	}

	:global(.map-inn-star) {
		font-size: 16px;
		line-height: 1;
		color: var(--gold);
	}

	:global(.imap-tooltip) {
		font-family: var(--body-font);
		font-size: 15px;
	}
</style>
