<script>
	// This form submits feedback to a Google Form via a hidden iframe target,
	// which lets us keep our custom thank-you UI instead of redirecting to
	// Google's confirmation page.
	// If the overall rating is 5 stars, we prompt the guest to review us on Google.

	// TODO(christian): hidden-iframe POST can't detect Google-side failure
	// (cross-origin). If silent-failure reports come in, add a timeout fallback.

	const GOOGLE_FORM_ACTION =
		'https://docs.google.com/forms/d/e/1FAIpQLScGwX7SdZ7CHQllEwoBz_ChhyIK6_InL3CfNqJv1CXCY1zJag/formResponse';

	const DIMENSIONS = [
		{ key: 'staff', label: 'Staff', sub: 'How was the team?' },
		{ key: 'room', label: 'Room', sub: 'Did your room live up to expectations?' },
		{ key: 'cleanliness', label: 'Cleanliness', sub: 'Room and common spaces' },
		{ key: 'value', label: 'Value', sub: 'Did it feel worth what you paid?' },
		{ key: 'overall', label: 'Overall', sub: 'All things considered, how did we do?' }
	];

	/** @type {'form' | 'thanks'} */
	let screen = $state('form');

	/** @type {Record<string, number>} */
	let ratings = $state({ staff: 0, room: 0, cleanliness: 0, value: 0, overall: 0 });

	/** @type {Record<string, number>} */
	let hovers = $state({ staff: 0, room: 0, cleanliness: 0, value: 0, overall: 0 });

	let comments = $state('');
	let email = $state('');
	let submitting = $state(false);

	// Plain let (no $state) — only read inside handleIframeLoad, which fires
	// after handleSubmit assigns it, so reactivity isn't needed. The flag
	// gates out the iframe's initial empty about:blank load.
	let hasSubmitted = false;

	function starFill(key, n) {
		return (hovers[key] || ratings[key]) >= n;
	}

	function handleSubmit(e) {
		if (!ratings.overall) {
			e.preventDefault();
			return;
		}
		submitting = true;
		hasSubmitted = true;
	}

	function handleIframeLoad() {
		if (!hasSubmitted) return;
		routeAfterSubmit();
	}

	function routeAfterSubmit() {
		screen = 'thanks';
		submitting = false;
		window.scrollTo({ top: 0 });
	}
</script>

<svelte:head>
	<title>How was your stay? • Avaloch Inn</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<iframe
	name="hidden_iframe"
	title="form submission target"
	style="display:none"
	onload={handleIframeLoad}
></iframe>

<div class="inner">
	<!-- ===== SCREEN: FORM ===== -->
	{#if screen === 'form'}
		<h1>How was your stay?</h1>
		<p>
			Thank you for staying with us this season. I know how special this place is to so many of you,
			and I’m incredibly grateful you’ve decided to stay with us during this slightly unusual time
			as we renovate and rebrand.
		</p>
		<p>
			If this was your first season with us, I hope we gave you a reason to come back and you caught
			a glimpse of what the Main House will be.
		</p>
		<p>
			Tell me how it went. The good, the rough edges, the small things, all of it helps us get
			better.
		</p>

		<img src="/signatures/christian-digital.png" alt="Christian’s signature" height="56" />
		<div>Christian, hotel manager</div>

		<hr />

		<form
			onsubmit={handleSubmit}
			action={GOOGLE_FORM_ACTION}
			method="POST"
			target="hidden_iframe"
		>
			<input type="hidden" name="entry.1298330717" value={ratings.overall} />
			<input type="hidden" name="entry.1318925030" value={ratings.staff} />
			<input type="hidden" name="entry.1102046164" value={ratings.room} />
			<input type="hidden" name="entry.691677599" value={ratings.cleanliness} />
			<input type="hidden" name="entry.312837396" value={ratings.value} />

			<div class="ratings">
				{#each DIMENSIONS as dim}
					<div class="rating-row">
						<div class="rating-label">
							{dim.label}
							<span class="sub">{dim.sub}</span>
						</div>
						<div
							class="stars"
							role="radiogroup"
							tabindex="-1"
							aria-label="{dim.label} rating"
							onmouseleave={() => (hovers[dim.key] = 0)}
						>
							{#each [1, 2, 3, 4, 5] as n}
								<button
									type="button"
									class="star"
									class:active={starFill(dim.key, n)}
									aria-label="{n} star{n > 1 ? 's' : ''}"
									aria-pressed={ratings[dim.key] === n}
									onmouseenter={() => (hovers[dim.key] = n)}
									onclick={() => (ratings[dim.key] = n)}>★</button
								>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<label for="comments">Comments</label>
			<textarea id="comments" name="entry.307709882" bind:value={comments}></textarea>

			<label for="email">Your email (if you want a reply)</label>
			<input
				type="email"
				id="email"
				name="entry.22457837"
				placeholder="you@example.com"
				bind:value={email}
			/>

			<button type="submit" disabled={submitting}>
				{submitting ? 'Sending…' : 'Send'}
			</button>
		</form>
	{/if}

	<!-- ===== SCREEN: THANKS ===== -->
	{#if screen === 'thanks'}
		<h1>Got it. Thank you.</h1>
		<p>
			I read every one of these myself. If you left your email, you’ll hear back from me within a
			day or two.
		</p>
		{#if ratings.overall === 5}
			<p>
				If you have <em>30 more seconds</em>, a Google review is the single most helpful thing you
				can do for a small inn like ours.
			</p>
			<a href="https://g.page/r/CWrY-jLZWU-bEAI/review" class="cta" target="_blank" rel="noopener">
				Leave a Google review →
			</a>
		{/if}
		<p>— Christian</p>
	{/if}
</div>

<style>
	h1 {
		text-transform: none;
	}

	/* Rating rows */
	.ratings {
		margin: 1rem 0;
	}

	.rating-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.5rem 0;
	}

	.rating-label {
		flex: 1;
		min-width: 0;
	}

	.sub {
		display: block;
		font-style: italic;
		font-size: smaller;
	}

	.stars {
		display: flex;
		flex-shrink: 0;
	}

	.star {
		background: none !important;
		border: none !important;
		font-size: 28px;
		line-height: 1;
		cursor: pointer;
		color: #ccc;
		font-family: system-ui, sans-serif;
	}

	.star.active {
		color: inherit;
	}

	/* Form fields */
	form {
		max-width: 640px;
	}

	label {
		display: block;
		margin-top: 1rem;
	}

	textarea {
		display: block;
		width: 100%;
		min-height: 110px;
		resize: vertical;
		font: inherit;
	}

	input[type='email'] {
		display: block;
	}

	button[type='submit'] {
		margin-top: 1rem;
	}

	@media (max-width: 480px) {
		.rating-row {
			flex-direction: column;
			align-items: start;
			gap: 0.25rem;
		}
	}
</style>
