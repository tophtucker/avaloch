<script>
	import { onMount, onDestroy } from 'svelte';
	import { INN_COORDINATES, getPlaceUrl } from '$lib/places.js';

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

				const popupLines = [
					`<div class="imap-popup-name">${place.name}</div>`,
					place.address?.city
						? `<div class="imap-popup-city">${place.address.city}</div>`
						: '',
					place.description
						? `<div class="imap-popup-desc">${place.description}</div>`
						: '',
					place.tags?.length
						? `<div class="imap-popup-tags">${place.tags.map((t) => `<span class="imap-tag">${t}</span>`).join('')}</div>`
						: '',
					`<div class="imap-popup-links">`,
					`<a href="${getPlaceUrl(place)}" target="_blank">Map</a>`,
					place.website ? `<a href="${place.website}" target="_blank">Website</a>` : '',
					`</div>`
				].join('');

				marker.bindTooltip(
					`<div class="imap-tooltip-name">${place.name}</div>`,
					{ direction: 'top', offset: [0, -8], className: 'imap-tooltip' }
				);

				marker.bindPopup(popupLines, {
					maxWidth: 220,
					className: 'imap-popup'
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
			innMarker.bindTooltip('<div class="imap-tooltip-name">Avaloch Inn</div>', {
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
		transition: transform 0.1s ease;
	}

	:global(.leaflet-marker-icon:hover .imap-pin) {
		transform: scale(1.4);
	}

	:global(.imap-tooltip) {
		background: white;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		padding: 3px 7px;
		font-size: 0.75rem;
		white-space: nowrap;
	}

	:global(.imap-tooltip::before) {
		display: none;
	}

	:global(.imap-tooltip-name) {
		font-weight: 600;
		color: #111;
	}

	:global(.imap-popup .leaflet-popup-content-wrapper) {
		border-radius: 6px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
		padding: 0;
		overflow: hidden;
	}

	:global(.imap-popup .leaflet-popup-content) {
		margin: 0;
		padding: 0.75rem 1rem;
		font-size: 0.8rem;
		line-height: 1.4;
	}

	:global(.imap-popup-name) {
		font-weight: 700;
		font-size: 0.875rem;
		margin-bottom: 1px;
	}

	:global(.imap-popup-city) {
		color: #666;
		margin-bottom: 4px;
	}

	:global(.imap-popup-desc) {
		color: #444;
		margin-bottom: 5px;
		font-style: italic;
	}

	:global(.imap-popup-tags) {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		margin-bottom: 6px;
	}

	:global(.imap-tag) {
		font-size: 0.7rem;
		background: #f0f0f0;
		border: 1px solid #ddd;
		border-radius: 3px;
		padding: 1px 5px;
		color: #555;
	}

	:global(.imap-popup-links) {
		display: flex;
		gap: 8px;
		margin-top: 2px;
	}

	:global(.imap-popup-links a) {
		font-size: 0.75rem;
		color: var(--blue, #2563eb);
		text-decoration: none;
	}

	:global(.imap-popup-links a:hover) {
		text-decoration: underline;
	}

	:global(.map-inn-star) {
		font-size: 16px;
		line-height: 1;
		color: var(--gold);
	}
</style>
