<script>
	import VR from '$lib/components/VR.svelte';
	import RenoNotice from '$lib/components/RenoNotice.svelte';
</script>

<svelte:head>
	<title>Rooms • Avaloch (formerly Apple Tree Inn) • Lenox, Mass.</title>
</svelte:head>

<RenoNotice
	>We have guest rooms in two buildings: the Lodge (b. 1966), open seasonally; and the Main House
	(b. 1885), under renovation. For now, you have no choice!</RenoNotice
>

<div class="inner blur">
	<p>
		We have two buildings: the historic Main House, including our front desk, lounge, and tavern,
		where every guest room is unique; and the more basic and standardized Lodge, only open in the
		summer.
	</p>
	<p>
		Both buildings can access all hotel <a href="/activities/amenities">amenities</a>, such as free
		Wi-Fi, parking, and pool. Continental breakfast is included in the room rates. There are no
		elevators in either building; all rooms require stairs to access.
	</p>
	<div class="comparison-table">
		<div class="header hide-mobile"></div>
		<h2>Main House</h2>
		<VR style="grid-column: 3; grid-row: 1 / 10;" class="hide-mobile" />
		<h2>Lodge</h2>

		<div class="header hide-mobile"></div>
		<div><a class="cta" href="/rooms/main-house">See rooms</a></div>
		<div><a class="cta" href="/lodge">See more</a></div>

		<div class="header hide-mobile"></div>
		<img src="/img/main-house.jpg" alt="Main House" />
		<img src="/heropics/summer-annex.jpg" alt="Lodge" />

		<div class="header">Status</div>
		<div>Closed for renovations</div>
		<div>Open seasonally</div>

		<div class="header">Built</div>
		<div>1885</div>
		<div>1966</div>

		<div class="header">Rooms</div>
		<div>13 (all unique)</div>
		<div>21 (standardized)</div>

		<div class="header">Room types</div>
		<div>King, queen, 2 double, or suite</div>
		<div>Queen or 2 double</div>

		<div class="header">Amenities</div>
		<div>Front desk, tavern, lobby, coffee & tea station</div>
		<div>Coffee & tea station</div>

		<!-- <div class="header">Open</div>
		<div>All year</div>
		<div>Summer and Fall</div> -->
	</div>
</div>

<style>
	.comparison-table img {
		border: 3px double black;
		aspect-ratio: 5/3;
	}
</style>
