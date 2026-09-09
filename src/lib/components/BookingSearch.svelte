<!--
	Search form for the StayNtouch IBE. It collects dates and occupancy, then
	hands off to StayNtouch’s hosted booking engine with a full page navigation
	(their engine is a separate app, so SvelteKit’s client-side router has no
	business trying to own it).

	This lives alongside the existing SiteMinder booking links (BOOKING_URL in
	$lib/nav.js) rather than replacing them — see the PR description for the
	cut-over.
-->
<script>
	import { Temporal } from '@js-temporal/polyfill';
	import { TIME_ZONE } from '$lib/index.js';
	import { IBE_BASE_URL } from '$lib/config';
	import { buildIbeSearchUrl } from '$lib/ibe';

	const MAX_ADULTS = 4;

	// “Today” is the hotel’s today, not the visitor’s — someone booking from
	// Tokyo shouldn’t be blocked from tonight’s room.
	const today = Temporal.Now.plainDateISO(TIME_ZONE);
	const todayStr = today.toString();
	const tomorrowStr = today.add({ days: 1 }).toString();

	let checkin = $state('');
	let checkout = $state('');
	let adults = $state(2);
	let kids = $state(0);
	let promoCode = $state('');
	let showPromo = $state(false);
	let error = $state('');

	// Checkout must be at least the night after checkin; before a checkin is
	// picked, the earliest possible checkout is tomorrow.
	const checkoutMin = $derived(checkin ? nextDay(checkin) : tomorrowStr);

	function nextDay(iso) {
		try {
			return Temporal.PlainDate.from(iso).add({ days: 1 }).toString();
		} catch {
			return tomorrowStr;
		}
	}

	function handleCheckinInput(event) {
		checkin = event.currentTarget.value;
		// ISO dates sort lexicographically, so a plain string compare is enough.
		if (checkin && checkout && checkout <= checkin) {
			checkout = nextDay(checkin);
		}
		error = '';
	}

	function handleCheckoutInput(event) {
		checkout = event.currentTarget.value;
		error = '';
	}

	function handleAdultsInput(event) {
		adults = event.currentTarget.valueAsNumber;
		error = '';
	}

	function handleKidsInput(event) {
		kids = event.currentTarget.valueAsNumber;
		error = '';
	}

	function validate() {
		if (!checkin || !checkout) return 'Please choose both a check-in and a check-out date.';
		if (!(checkout > checkin)) return 'Check-out has to be after check-in.';
		if (!Number.isInteger(adults) || adults < 1) return 'Please include at least one adult.';
		return '';
	}

	function searchUrl() {
		// The builder insists on whole numbers; an emptied children field reads
		// back as NaN, which means nobody rather than an error.
		return buildIbeSearchUrl({
			baseUrl: IBE_BASE_URL,
			checkin,
			checkout,
			adults,
			kids: Number.isInteger(kids) && kids >= 0 ? kids : 0,
			promotionCode: promoCode
		});
	}

	function handleSubmit() {
		error = validate();
		if (error) return;
		window.location.assign(searchUrl());
	}
</script>

<div class="booking-search">
	<div class="fields">
		<div class="field">
			<label for="booking-checkin">Check in</label>
			<input
				id="booking-checkin"
				type="date"
				value={checkin}
				min={todayStr}
				oninput={handleCheckinInput}
			/>
		</div>

		<div class="field">
			<label for="booking-checkout">Check out</label>
			<input
				id="booking-checkout"
				type="date"
				value={checkout}
				min={checkoutMin}
				oninput={handleCheckoutInput}
			/>
		</div>

		<div class="field narrow">
			<label for="booking-adults">Adults</label>
			<input
				id="booking-adults"
				type="number"
				inputmode="numeric"
				min="1"
				max={MAX_ADULTS}
				step="1"
				value={adults}
				oninput={handleAdultsInput}
			/>
		</div>

		<div class="field narrow">
			<label for="booking-kids">Children</label>
			<input
				id="booking-kids"
				type="number"
				inputmode="numeric"
				min="0"
				step="1"
				value={kids}
				oninput={handleKidsInput}
			/>
		</div>

		<div class="field submit">
			<button type="button" class="check" onclick={handleSubmit}>Check availability</button>
		</div>
	</div>

	<div class="promo">
		<button
			type="button"
			class="mini"
			aria-expanded={showPromo}
			aria-controls="booking-promo"
			onclick={() => (showPromo = !showPromo)}
		>
			{showPromo ? 'Hide code' : 'Add a code'}
		</button>
		{#if showPromo}
			<span class="promo-field">
				<label for="booking-promo">Promo code</label>
				<input id="booking-promo" type="text" autocomplete="off" bind:value={promoCode} />
			</span>
		{/if}
	</div>

	{#if error}
		<p class="error" role="alert">{error}</p>
	{/if}
</div>

<style>
	/*
		Brand palette for the booking engine, per the StayNtouch brand sheet. It
		doesn’t match the greens/reds in static/styles.css — see the PR
		description; if the site palette is meant to win, delete these three
		variables and use --green / --red instead.
	*/
	.booking-search {
		--ibe-dark-green: #425450;
		--ibe-light-green: #9ed427;
		--ibe-red: #fa5906;

		background: #ffffff;
		border: 1px solid var(--ibe-dark-green);
		padding: 1rem;
		max-width: 640px;
	}

	.fields {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		gap: 0.75rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 1 1 10rem;
	}

	.field.narrow {
		flex: 0 1 6rem;
	}

	.field.submit {
		flex: 0 0 auto;
	}

	label {
		font-family: var(--hed-font);
		font-variation-settings: 'wght' 500;
		font-size: smaller;
		text-transform: uppercase;
		color: var(--ibe-dark-green);
	}

	input[type='date'],
	input[type='number'],
	input[type='text'] {
		font: inherit;
		font-variant-numeric: tabular-nums;
		padding: 4px;
		width: 100%;
		border: 1px solid var(--ibe-dark-green);
		background: #ffffff;
		color: var(--black);
		border-radius: 0;
	}

	input:focus-visible {
		outline: 2px solid var(--ibe-light-green);
		outline-offset: 1px;
	}

	/*
		The site’s global button rule paints hover black-on-white; keep the shape
		(inset/outset borders) and just swap in the booking-engine green.
	*/
	button.check {
		color: var(--ibe-dark-green);
		border-color: var(--ibe-dark-green);
		height: 2rem;
		padding: 0 0.75rem;
		white-space: nowrap;
	}

	button.check:hover {
		background: var(--ibe-dark-green);
		color: #ffffff;
	}

	.promo {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.75rem;
	}

	.promo-field {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.promo-field label {
		white-space: nowrap;
	}

	.error {
		margin: 0.75rem 0 0;
		color: var(--ibe-red);
		font-variation-settings: 'wght' 600;
	}

	@media (max-width: 800px) {
		.field,
		.field.narrow,
		.field.submit {
			flex: 1 1 100%;
		}

		button.check {
			width: 100%;
		}
	}
</style>
