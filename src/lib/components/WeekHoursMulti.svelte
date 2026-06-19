<script>
	import { Temporal } from '@js-temporal/polyfill';
	import { formatTimeRange, formatDay, formatDateShort } from '$lib/index.js';

	// `calendars` is an array of { title, calendar } objects, one per column.
	let { calendars } = $props();

	// Use the first calendar to define the days (rows) of the week.
	const days = (calendars[0]?.calendar ?? []).slice(0, 7).map((d) => d.date);

	const getDay = (calendar, date) => calendar.find((d) => date.equals(d.date));

	const isToday = (day) => Temporal.Now.plainDateISO().equals(day);
</script>

<table class="hours">
	<thead>
		<tr>
			<th style="border-top: none; border-left: none; background: none;"></th>
			{#each calendars as { title }}
				<th style="min-width: 7em;">{title}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each days as date}
			<tr>
				<td
					><div
						style="display: flex; justify-content: space-between; align-items: center; gap: 0.5em;"
					>
						{#if isToday(date)}<span class="manicule">☞</span>{/if}{formatDay(date)}
						<span style="color: rgba(255,255,255,0.3); font-variant-numeric: tabular-nums;"
							>{formatDateShort(date)}</span
						>
					</div>
				</td>
				{#each calendars as { calendar }}
					{@const d = getDay(calendar, date)}
					<td>
						{#if d}
							{formatTimeRange(d.normalHours)}{#if d.specialHours}<span class="notice"
									>{#if d.specialHours.length}{formatTimeRange(
											d.specialHours
										)}{:else}Closed{/if}</span
								>{/if}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.hours {
		border-collapse: collapse;
		max-width: 720px;
	}
	th {
		font-variation-settings: 'wght' 800;
		text-transform: uppercase;
	}
	th,
	td {
		border: 1px solid rgba(0, 0, 0, 0.2);
		padding: 0.5em;
		position: relative;
	}
	td {
		vertical-align: top;
	}
	@keyframes wiggle {
		0%,
		90% {
			transform: rotate(0deg);
		} /* Idle */
		93% {
			transform: rotate(10deg);
		}
		95% {
			transform: rotate(-10deg);
		}
		99% {
			transform: rotate(5deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
	.manicule {
		position: absolute;
		left: -14px;
		top: 10px;
		animation: wiggle 10s ease-in-out infinite;
	}
	.notice {
		font-size: smaller;
		position: absolute;
		padding: 3px 6px;
		background: red;
		color: white;
		top: 0.5em;
		left: 1em;
		transform: translate(0%, 0%) rotate(-7deg);
		border: 1px solid white;
		white-space: nowrap;
		transition: transform 0.2s;
		pointer-events: none;
	}
	td:hover .notice {
		transform: translate(0%, 120%) rotate(-7deg);
	}
	td:has(.notice) {
		overflow: hidden;
	}
	@media (min-width: 1240px) {
		.manicule {
			left: -30px;
		}
	}
</style>
