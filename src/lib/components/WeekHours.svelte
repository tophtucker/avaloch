<script>
	import { Temporal } from '@js-temporal/polyfill';
	import { formatTimeRange, formatTime, formatDay, formatDateShort } from '$lib/index.js';
	let { calendar, performances } = $props();

	const getPerformancesForDay = (date) =>
		performances
			.filter((d) => date.equals(d.startTime.toPlainDate()))
			.map(
				(d) =>
					`${d.act.name} (${d.endTime ? formatTimeRange([d.startTime, d.endTime]) : formatTime(d.startTime)})`
			)
			.join('; ');

	const week = calendar
		.slice(0, 7)
		.map((d) => ({ ...d, performances: performances ? getPerformancesForDay(d.date) : null }));

	const isToday = (day) => Temporal.Now.plainDateISO().equals(day);
</script>

<table class="hours">
	<thead>
		<tr>
			<th style="border-top: none; border-left: none; background: none;"></th>
			<th style="min-width: 7em;">Hours</th>
			{#if performances}<th class="hide-mobile"><a href="/music">Live music</a></th>{/if}
		</tr>
	</thead>
	<tbody>
		{#each week as d}
			<tr>
				<td
					><div
						style="display: flex; justify-content: space-between; align-items: center; gap: 0.5em;"
					>
						{#if isToday(d.date)}<span class="manicule">☞</span>{/if}{formatDay(d.date)}
						<span style="color: var(--gray); font-variant-numeric: tabular-nums;"
							>{formatDateShort(d.date)}</span
						>
					</div>
				</td>
				<td
					>{formatTimeRange(d.normalHours)}{#if d.specialHours}<span class="notice"
							>{#if d.specialHours.length}{formatTimeRange(d.specialHours)}{:else}Closed{/if}</span
						>{/if}
					{#if d.performances}
						<div class="description show-mobile">{d.performances}</div>
					{/if}</td
				>
				{#if performances}
					<td class="description hide-mobile">{d.performances}</td>
				{/if}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.hours {
		border-collapse: collapse;
		max-width: 720px;
	}
	th,
	td {
		font-weight: normal;
		text-align: left;
		border: 1px solid var(--black);
		padding: 0.5em;
		position: relative;
		background: white;
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
	@media (max-width: 800px) {
		.description {
			font-size: smaller;
			margin-top: 1em;
			color: var(--gray);
		}
	}
	@media (min-width: 1240px) {
		.manicule {
			left: -30px;
		}
	}
</style>
