<script>
	import XR from '$lib/components/XR.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>FAQ • Avaloch (formerly Apple Tree Inn) • Lenox, Mass.</title>
	<meta
		name="description"
		content="What’s the deal with Avaloch? How it works, how to get there, what to bring, what to know before your trip."
	/>
</svelte:head>

<div class="inner">
	<h1>FAQ</h1>
	<h2>What’s the deal?</h2>
	<div class="prose-columns">
		<p>
			AVALOCH is a <a href="/about/history">historic estate</a> built high atop a Lenox hill in 1885
			by Cecile Bristed, a great-granddaughter of John Jacob Astor. She called it
			<em>The Orchard</em>; in 1952 Roy Rappaport turned it into a hotel called <em>Avaloch</em>.
			Alice Brock of “Alice’s Restaurant” ran her third and final restaurant here,
			<em>Alice’s at Avaloch</em>. In 1983 it became the
			<em>Apple Tree Inn</em>, and in 2026 it returned to <em>Avaloch</em>.
		</p>
		<p>
			We have thirteen unique <a href="/rooms">guest rooms</a> in the historic Main House (closed
			for renovations), plus twenty-one more basic rooms in the seasonal Lodge (open seasonally).
			<!-- The Main House has the front desk; the lobby; the porch; the quirky “round room”; and
			our tavern,
			<a href="/dining/ostrich-room">The Ostrich Room</a>, which is open to the public {data
				.ostrichRoom.dayRange}
			for food, drinks, and <a href="/music">live music</a>. -->
		</p>
		<p>
			We’re just outside the town of Lenox and close to Stockbridge and Great Barrington, at the far
			Western end of the Massachusetts Turnpike, almost at the New York border, in <a
				href="/activities/berkshires">the Berkshires</a
			>. The area is generally known for performing arts, historic homes, wellness, and hiking.
		</p>
		<p>
			The summer is the peak season. From late June until early September, the world-famous
			<a href="/activities/tanglewood">Tanglewood</a> music festival across the street has concerts almost
			every day. Popular artists include James Taylor and Jon Batiste; the Boston Symphony Orchestra
			is in residence all summer, and we love to pop into one of their casual open rehearsals. Swim in
			our pool, with the best view on the property, or the Stockbridge Bowl, a lake three minutes away.
		</p>
		<p>
			The spring and fall are more relaxed. Pat the cows and get ice cream at High Lawn. Ride horses
			at HomeFarm or HorseWorks. Tour Edith Wharton’s historic home or the Norman Rockwell Museum.
			Do yoga at Kripalu. We can recommend a good local hike for any occasion — bird-watching at
			Parsons Marsh, a quick loop at Olivia’s Overlook, the waterfall at Stevens Glen, or a workout
			at Monument Mountain. The Appalachian Trail passes by ten miles to the east. The autumn
			foliage is spectacular for “peeping”.
		</p>
		<p>
			For the winter, Bousquet ski mountain is fifteen minutes away (and Catamount is thirty). If
			you’re a little lazier, you can just sled on our hill. If you’re even lazier, like us, you can
			enjoy a “book” (or more often a cocktail) by the lobby fire, the outdoor fire pit, the
			tavern’s fireplace <em>inglenook</em>, or one of our four guest rooms with real wood-burning
			private fireplaces. Maybe you’ll write. You know Melville wrote Moby Dick right up the road,
			right? What’re you doing?
		</p>
	</div>
	<hr />
	<h2>How do I get there?</h2>
	<p>
		The nearest airport is Albany, but it has few direct flights, so we typically fly into Boston
		Logan. There are buses to downtown Lenox, but we definitely recommend coming with a car!
		Tanglewood and Kripalu are the only things within walking distance of the hotel; it’s a
		40-minute walk (or 3-minute drive) to downtown Lenox, and there are basically zero taxis or
		Ubers around.
	</p>
	<div class="grid-or-flex trio">
		<div>
			<h3>From Boston</h3>
			<div>
				Two hours once you’re out of the city. Take the Mass Pike for 123 miles (90% of the drive).
				Listen to “Sweet Baby James”. Stop at the 24/7 Charlton Service Plaza McDonald’s; skip
				eating at the D’Angelos rest stops.
			</div>
		</div>
		<XR />
		<div>
			<h3>From NYC</h3>
			<div>
				Two and a half hours once you’re out of the city. Take the Taconic for 91 miles (⅔ of the
				drive). Stop to eat at <a href="https://troutbeck.com/">Troutbeck</a> (+20 min) or
				<a href="https://www.stissinghouse.com/">Stissing House</a> (+10 min) (check hours). The road
				becomes winding as you get closer; watch for deer.
			</div>
		</div>
		<XR />
		<div>
			<h3>From Albany</h3>
			<div>
				Forty-five minutes. It’s slightly prettier if you take NY-22 S through New Lebanon (+ 12
				min) instead of the I-90 route.
			</div>
		</div>
	</div>
	<p>
		If you do need a car service, we recommend <a href="https://abbottslimo.com/"
			>Abbott’s Limousine</a
		>, <a href="https://happycarberkshiretrips.com/">HappyCAR</a> (long-distance only; minimum $50
		charge for trips under 10 miles), or
		<a href="https://www.berkshireshuttle.com/">Berkshire Shuttle</a> (just goes between the Berkshires
		and the Albany airport).
	</p>
	<hr />
	<h2>What should I bring?</h2>
	<ul>
		<li>
			<strong>A car.</strong> See above. The only things within walking distance are Tanglewood and
			Kripalu (about 10 minutes each); it’s a 45-minute walk into town. There’s basically no Uber,
			and the only taxis are more like limousine services you have reserve ahead of time. There’s
			very little food delivery; the hotel has continental breakfast every morning, but our
			<a href="/dining/ostrich-room">dinner restaurant</a>
			is only open {data.ostrichRoom.dayRange}
		</li>
		<li>
			<strong>Hiking gear.</strong> There’s lots of hiking opportunities in the area, of varying difficulties.
			Bring sneakers (or boots for winter), a water bottle, and long pants (if you’re worried about ticks).
		</li>
		<li>
			<strong>Tablet or laptop.</strong> There are no TVs in the room! You can just bask in the natural
			beauty of the Berkshires and watch the clouds go by, but if you want to watch screen stuff, you’ll
			have to bring your own screen.
		</li>
	</ul>
	<p>In the summer:</p>
	<ul>
		<li>
			<strong>Picnic supplies.</strong> If you’re going to Tanglewood, we think the best way to
			enjoy it is to arrive early and picnic on the lawn. People bring blankets, lawn chairs,
			coolers, baskets, bug spray, binoculars, cheese, crackers, beer, wine, candles, flashlights,
			<em>etc.</em>; read our
			<a href="/activities/tanglewood">Tanglewood guide</a> for more.
		</li>
		<li>
			<strong>A bathing suit.</strong> We have a lovely pool! Open between Memorial Day and Labor
			Day, sunrise to sunset. There’s a lake three minutes down the road and other swimming holes
			and little waterfalls <a href="/activities/berkshires">in the area</a>. We have pool towels
			but we don’t have goggles, swim caps, floaties, <em>etc.</em>
		</li>
	</ul>
	<hr />
	<h2>Is the property accessible?</h2>
	<p>
		The downside of being historic is that our buildings are zany. All access, and all guest rooms,
		require at least some stairs; we have no elevators. As examples (not comprehensive): the Lodge
		is 12 steps down from the upper parking lot or 12 steps up from the road. Our motto is “Watch
		your step!” We sometimes have a golf cart available to ferry guests down the hill to Tanglewood;
		if you’re depending on that, call ahead. <!-- it’s four
		steps up to the Main House lobby; 21 steps up to the 2nd floor, where guest rooms begin; and 15
		steeper steps to the 3rd floor. There are random little internal steps, too: one or two down to
		the round room; two down to the Ostrich Room. -->
	</p>
	<hr />
	<!-- <h2>What do you have for kids?</h2>
	<p>
		We have high chairs for the restaurant, one pack ’n play, lots of board games, sleds for winter,
		and tons of lawn space to play around, both flat and hilly, including plenty of space far from
		the road; B.Y.O. wiffle ball. We have a hotel dog, Max, a big German shepherd who is great with
		kids and will play fetch with them forever. Our <a href="/activities/berkshires">local guide</a>
		includes some kid-friendly activities. The <em>New York Times</em> just wrote about
		<a href="https://www.nytimes.com/2025/08/27/arts/music/tanglewood-classical-music-children.html"
			>how great Tanglewood is for kids</a
		>.
	</p>
	<hr /> -->
	<h2>When will renovations be done?</h2>
	<p>
		The Lodge is open. For the Main House, we still really don’t know! We don’t
		want to over-promise, so we will let you know when we have confidence in our timeline. Subscribe
		to the <a href="/about/newsletter">newsletter</a>, follow us on
		<a href="https://instagram.com/avaloch.inn">Instagram</a>, and check the
		<a href="/">home page</a>
		and <a href="/weddings-events">events page</a> for updates.
	</p>
	<hr />
	<h2>What’s that on yonder hill?</h2>
	<img
		src="/img/winden-hill.jpg"
		style="border: 3px double black; border-radius: 100%; margin-right: 1rem; margin-bottom: 2rem; float: left; width: 150px;"
		alt="The Winden Hill Condominium, atop a distant hill, nestled among trees, shadowed by a bright but cloudy sky"
	/>
	<p>
		That’s the Winden Hill Condominium on the former site of the Allen Winden estate. It stands so
		prominently on its distant hill that people sometimes mistake it for Miraval, Kripalu, <em
			>etc.</em
		>, so we are not kidding when we say this question is frequently asked! If this entices you, you
		should check out one of the many local historic homes open to the public, such as The Mount,
		Naumkeag, or Ventfort Hall.
	</p>
</div>

<style>
	.grid-or-flex h3 {
		margin: 0;
	}

	.grid-or-flex > div {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}

	@media (max-width: 800px) {
		.grid-or-flex {
			padding: 0 1rem;
		}
	}

	ul {
		max-width: 640px;
	}
</style>
