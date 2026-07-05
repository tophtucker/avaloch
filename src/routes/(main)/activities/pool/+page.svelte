<script>
	import Image from '$lib/lightbox/Image.svelte';
	import WeekHours from '$lib/components/WeekHours.svelte';

	let { data } = $props();
	let {
		pool: { calendar }
	} = data;
</script>

<svelte:head>
	<title>Pool • Avaloch (formerly Apple Tree Inn) • Lenox, Mass.</title>
	<!-- <meta name="description" content="TODO" /> -->
</svelte:head>

<div class="inner">
	<h1>Pool</h1>
	<Image src="/heropics/pool1.jpg" />
	<div class="grid-or-flex" style="grid-template-columns: 3fr 2fr;">
		<div>
			<p>
				Our pool offers the best views on the property. Hotel guests swim for free; members of the
				public may purchase a pool pass, subject to availability.
			</p>
			<p>Call (413) 637-1910 to book.</p>
			<table class="pricing">
				<thead>
					<tr>
						<th></th>
						<th>Individual</th>
						<th>Family</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Weekday</td>
						<td>$30</td>
						<td>$65</td>
					</tr>
					<tr>
						<td>Weekend</td>
						<td>$45</td>
						<td>$100</td>
					</tr>
					<tr>
						<td>Season</td>
						<td>$350</td>
						<td>$775</td>
					</tr>
				</tbody>
			</table>
			<p>Note that there is no lifeguard on duty. Children under 16 must have adult supervision.</p>
			<p>Pairs great with our <a href="/dining/pop-up-bar">summer pop-up bar</a>!</p>
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

	table.pricing {
		border-collapse: collapse;
		max-width: 720px;
	}
	table.pricing th,
	table.pricing td {
		font-weight: normal;
		text-align: left;
		border: 1px solid var(--black);
		padding: 0.5em;
		position: relative;
	}
</style>
