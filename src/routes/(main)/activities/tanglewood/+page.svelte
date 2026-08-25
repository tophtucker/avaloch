<script>
	import Image from '$lib/lightbox/Image.svelte';
	import HR from '$lib/components/HR.svelte';
</script>

<svelte:head>
	<title>Tanglewood • Avaloch (formerly Apple Tree Inn) • Lenox, Mass.</title>
	<!-- <meta name="description" content="TODO" /> -->
</svelte:head>

<div class="inner">
	<h1>Tanglewood</h1>
	<Image src="/map/tanglewood-map-satellite.png" style="border: 3px double black; margin-bottom: 2rem;" />
	<p>
		From late June until early September, the world-famous Tanglewood music festival across the
		street has concerts almost every day. Since traffic gets crazy on our little one-way roads ahead
		of big shows, one of the best things about the Apple Tree is that you can walk there in just
		about ten minutes.
	</p>
	<p>
		Note that we are up a fairly big hill, so if you stroll at a more dignified pace, that may feel
		longer! We do have a golf cart to take you up and down the hill, though we can’t drop you right
		at the Tanglewood gate because of their strict rules.
	</p>
	<p>
		The Tanglewood grounds typically open at 9 a.m. (check <a href="https://tanglewoodtoday.org"
			>today’s schedule</a
		>
		for specifics), so our favorite approach is to pack a picnic (get stuff at
		<a href="https://guidosfreshmarketplace.com/">Guido’s</a>!) and stroll over there early before
		it gets crazy. The grounds are beautiful and well worth a visit even in their own right.
		(They’re generally open 9–3 p.m. on days without concerts.)
	</p>
	<p>
		To take full advantage of staying so close, we generally don’t recommend driving somewhere else
		to get dinner before a show. But if you are driving, we recommend parking in the West or Upper
		West lots. After the show, Tanglewood traffic cops often make West St. a one-way street, so
		guests exiting other lots may have to take a detour through town before they get back to the
		Apple Tree.
	</p>
	<h2>Key Tanglewood spots</h2>
	<table class="walk">
		<thead>
			<tr><th></th><th>Walking time</th></tr>
		</thead>
		<tbody>
			<tr
				><td
					><strong>Main gate</strong><br />The ticket counter and entrance to the grounds, with
					concessions just beyond.</td
				><td>9 minutes</td></tr
			>
			<tr
				><td
					><strong>The Shed</strong><br />The open-air Koussevitzky Music Shed is the site of all
					the big concerts. You can buy assigned seats in the shed, or buy lawn seats outside the
					shed.</td
				><td>12 minutes</td></tr
			>
			<tr
				><td
					><strong>Ozawa Hall</strong><br />There are often smaller opener concerts at the more
					modern Ozawa Hall, which similarly has both assigned seats inside and a hill where you can
					sit.</td
				><td>18 minutes</td></tr
			>
			<tr
				><td><strong>Linde Center</strong><br />Educational lectures and intimate concerts.</td><td
					>20 minutes</td
				></tr
			>
		</tbody>
	</table>
	<h2>Helpful links</h2>
	<ul>
		<li>
			<a href="https://www.bso.org/events?view=byDate&brands=12058">Tanglewood events</a> — See the calendar
			and buy tickets.
		</li>
		<li>
			<a href="https://tanglewoodtoday.org">Tanglewood Today</a> — Specific timing for the different
			parts of today’s offerings. Only has information about the current day.
		</li>
	</ul>
	<HR />
	<Image src="/img/tanglewood-walk.jpg" />
</div>

<style>
	.walk {
		margin-top: 2rem;
		max-width: 640px;
	}
	.walk th {
		font-weight: normal;
		font-style: italic;
	}
	.walk td:first-child {
		padding-bottom: 1rem;
	}
	.walk td:last-child,
	.walk th:last-child {
		padding-left: 1rem;
		text-align: right;
		vertical-align: top;
		white-space: nowrap;
	}

	li {
		max-width: 640px;
	}
</style>
