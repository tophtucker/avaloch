<!-- Seasonal copy. Restore pool/pop-up wording when they reopen, alongside showSeasonalSchedule in src/routes/+page.svelte. -->
<div class="tape">
	<div>
		MAIN HOUSE UNDER RENOVATION • LODGE OPEN <span class="hide-mobile">
			• MAIN HOUSE UNDER RENOVATION • LODGE OPEN • MAIN HOUSE UNDER RENOVATION • LODGE OPEN • MAIN
			HOUSE UNDER RENOVATION • LODGE OPEN</span
		>
	</div>
</div>

<style>
	.tape {
		width: 100%;
		overflow: hidden;
		background: var(--gold);
		color: white;
		padding: 0.25rem 0.5rem 0.2rem 0.5rem;
		font-variation-settings: 'wght' 800;
		text-align: center;
		font-family: var(--hed-font);
		font-size: 20px;
		white-space: nowrap;
	}

	.tape > div {
		margin-left: -34px;
	}

	@media (max-width: 800px) {
		.tape {
			font-size: 14px;
			white-space: normal;
			text-wrap: balance;
		}
		.tape > div {
			margin: 0;
		}
	}
</style>
