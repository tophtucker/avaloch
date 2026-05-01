<script>
	import HR from '$lib/components/HR.svelte';
</script>

<svelte:head>
	<title>About us • Avaloch (formerly Apple Tree Inn) • Lenox, Mass.</title>
	<meta
		name="description"
		content="Claire took over the Apple Tree Inn in April 2024, realizing a lifelong dream"
	/>
</svelte:head>

<div class="inner">
	<h1>About us</h1>
	<div class="grid-or-flex">
		<div style="order: 2">
			<p>Claire took over the hotel in April 2024, realizing a lifelong dream.</p>
			<p>
				For three summers in college, Claire worked at the concierge desk of the Chatham Bars Inn in
				Cape Cod and fell in love with the industry. She loved the hours sitting at her desk in its
				glamorous old lobby, helping guests experience the best of the area. She later interned at
				Rosewood and then, after business school, managed hotels from the corporate side for
				Starwood. After three years there, she decided she understood enough to strike out on her
				own, and is excited to now be in a position to run it end-to-end: build the business, craft
				the guest experience, and introduce you to town. <a href="/about/claire">Read her letter</a
				>.
			</p>
			<p>
				She lives on the property with her husband, Toph, who works remotely for a <a
					href="https://observablehq.com">different job</a
				> but does some social media for the hotel and is making this website right now.
			</p>
		</div>
		<img
			src="/heropics/claire-toph2.jpg"
			alt="Claire and Toph, smiling at the camera, Toph’s arm lovingly around Claire’s shoulder, standing at the top of the Apple Tree hill in front of the unseen old carriage house, a beautiful verdant backdrop with layered mountains and just a hint of the Stockbridge Bowl visible at the far right"
			style="order: 1"
		/>
	</div>
	<HR />
	<div class="grid-or-flex">
		<img
			src="/heropics/christian.jpg"
			alt="Christian and his German shepherd Max climing the hill, with two of our actual surviving apple trees in the background, Christian in an Apple Tree branded baseball cap, Max following attentively behind"
			style="order: 1"
		/>
		<div style="order: 2">
			<p>
				Christian is the Hotel Manager. He followed us out here from the Boston area to escape the
				office desk job life and try something different, and judging from some of the stuff we’ve
				got him doing (climbing ladders to update security cameras or cleaning up bird poop), we bet
				we have achieved “different”. His mom is in Toph’s mom’s book group and has always worked at
				bookstores, which is how she met Christian’s dad. Christian was recently reading:
			</p>
			<ul>
				<li><em>The Year of the Locust</em>, by Terry Hayes</li>
				<li><em>Martyr!</em>, by Kaveh Akbar</li>
				<li><em>Four Seasons: The Story of a Business Philosophy</em>, by Isadore Sharp</li>
			</ul>
			<p>
				You’re also likely to meet Christian’s German shepherd Max, who is not yet trained to use
				the point-of-sale systems but is otherwise a startlingly good listener. Max will be very
				grateful if you kick a ball down the hill for him to fetch, and then he will gently toss the
				ball at your feet and wait, and so on <em>ad infinitum</em>.
			</p>
		</div>
	</div>
	<HR />
	<div>
		<h2>Contact us</h2>
		<p>
			You can email <a href="mailto:frontdesk@avalochinn.com">frontdesk@avalochinn.com</a>, or call
			or text us at <a href="tel:1.413.637.1910" target="_blank">(413) 637-1910</a>. That’s a real
			phone number that goes to one of us actually here at the inn!
		</p>
		<p>For private event inquiries, <a href="/weddings-events">click here</a>.</p>
	</div>

	<!-- <HR />
	<div class="bios">
		<img src="/img/staff-memo.jpg" alt="Memo" />
		<p>
			Memo (maintenance manager) has been with the hotel through the last three owners and knows the
			building better than anyone. We also admire how fast and adeptly he put together an ad hoc
			team of painters to <a href="https://www.instagram.com/reel/DA3wc94ObOt/">paint the hotel</a> about
			six months sooner than we thought we’d be able to!
		</p>
		<img src="/img/staff-demetrio.jpg" alt="Demetrio" />
		<p>
			Demetrio (maintenance) has been here as long as Memo has, and is Memo’s father in law! Did you
			know that all our firewood is felled and cut and dried on the property? That’s thanks to
			Demetrio.
		</p>
		<img src="/img/sean.jpg" alt="Sean" />
		<p>
			Sean (bar manager) really knows a lot about cocktails and has vastly expanded our menu. His
			favorite is a Vesper martini. Also he and his wife have a 3-year-old daughter.
		</p>
	</div> -->
</div>

<style>
	h1 {
		margin-bottom: 1rem;
	}

	.bios {
		display: grid;
		grid-template-columns: 130px 1fr;
		gap: 1em;
	}
	.bios img {
		border-radius: 100%;
	}

	.bios p {
		margin: 0;
		text-indent: 0;
	}

	@media (max-width: 640px) {
		.bios {
			display: grid;
			grid-template-columns: 60px 1fr;
			gap: 1em;
		}
	}
</style>
