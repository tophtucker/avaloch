<script>
	import {
		INN_COORDINATES,
		getPlaceUrl,
		distanceMiles,
		bearingDeg,
		bearingLabel
	} from './index.js';
	import Compass from './Compass.svelte';

	let { portableText, children } = $props();

	let { value } = $derived(portableText);
	let { name, address, coordinates, website } = $derived(value.place);

	let open = $state(false);
	let wrapper = $state(null);

	function handleWindowClick(event) {
		if (open && wrapper && !wrapper.contains(event.target)) {
			open = false;
		}
	}

	let bearing = $derived(coordinates ? bearingDeg(INN_COORDINATES, coordinates) : null);
	let distance = $derived(coordinates ? distanceMiles(INN_COORDINATES, coordinates) : null);
	let directionLabel = $derived(bearing != null ? bearingLabel(bearing) : null);
	let distanceLabel = $derived(
		distance != null ? `${Math.round(distance)} mi. ${directionLabel}` : null
	);
</script>

<svelte:window onclick={handleWindowClick} />

<span class="wrapper" bind:this={wrapper}>
	<button class="place" onclick={() => (open = !open)}>
		{@render children()}
		<Compass {bearing} {distance} style="opacity: 0.5" />
	</button>
	{#if open}
		<div class="popover">
			<div class="name">{name}</div>
			<div class="address">{address.city}</div>
			<div style="display: flex; gap: 6px;">
				<a href={getPlaceUrl(value.place)} target="_blank">Map</a>
				{#if website}
					<a href={website} target="_blank">Website</a>
				{/if}
			</div>
			{#if bearing != null}
				<div class="direction">
					<Compass {bearing} {distance} />
					<span>{distanceLabel}</span>
				</div>
			{/if}
		</div>
	{/if}
</span>

<style>
	.wrapper {
		position: relative;
		display: inline-block;
	}

	.place {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		outline: 1px solid #ccc;
		outline-offset: -0.5px;
		border-radius: 2px;
		padding: 0 4px;
	}
	.place:hover {
		border: none;
		background: none;
		color: inherit;
		outline-color: var(--blue);
		color: var(--blue);
	}

	.popover {
		font-size: smaller;
		position: absolute;
		top: calc(100% + 2px);
		left: 0;
		margin-top: 4px;
		z-index: 999;
		padding: 0.75rem 1rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		background: white;
		min-width: 200px;
	}
	.direction {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-top: 0.5rem;
	}
	.name {
		font-weight: bold;
	}
</style>
