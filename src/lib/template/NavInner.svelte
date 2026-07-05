<script>
	import { page } from '$app/stores';
	import { getNav } from '$lib/nav.js';
	import Bulletins from './Bulletins.svelte';
	import OpenSign from './OpenSign.svelte';
	import NextPerformance from './NextPerformance.svelte';
	import Icon from '../icons/Icon.svelte';

	let { data } = $props();
	let { nextPerformance, bulletins, ostrichRoom } = data;

	const nav = $derived(getNav($page));

	// TODO: Mini about footer disabled during construction
	const mainNav = $derived(nav);
	// const mainNav = $derived(nav.filter((d) => d.slug !== 'about'));
	// const aboutNav = $derived(nav.find((d) => d.slug === 'about').children);
</script>

{#snippet navSection(n)}
	<div class="section">
		{#if n.active}<div class="active">
				<Icon icon="Asterisk" style="position: absolute; left: -23px; top: 5px;" />{n.title}
			</div>{:else}<a href={n.pathname} class={n.active ? 'active' : ''}>{n.title}</a>{/if}

		{#if n.children}
			<div class="children">
				{#each n.children as n}
					{#if n.active}<div class="active">
							<Icon icon="Asterisk" style="position: absolute; left: -23px; top: 5px" />{n.title}
						</div>{:else}<a
							href={n.url || n.pathname}
							class={`${n.active ? 'active' : ''} ${n.disabled ? 'disabled' : ''}`}
							>{n.title}{#if n.url}<Icon icon="External" style="margin-left: 5px" />{/if}</a
						>{/if}
				{/each}
			</div>
		{/if}
	</div>
{/snippet}

<nav>
	<div class="section">
		<a href="/" data-sveltekit-reload>Home</a>
	</div>
	{#each mainNav as n}
		{@render navSection(n)}
	{/each}
	{#if bulletins.length}
		<div class="bulletins">
			<Bulletins {bulletins} />
			<!-- <OpenSign calendar={ostrichRoom.calendar} />
    		<NextPerformance {nextPerformance} /> -->
		</div>
	{/if}
	<!-- <div class="about">
		{#if aboutNav.some((d) => d.active)}
			<Icon icon="Asterisk" style="position: absolute; left: -23px; top: 5px;" />
		{/if}
		{#each aboutNav as n, i}
			<a href={n.pathname} class={n.active ? 'active' : ''}>{n.title}</a
			>{#if i < aboutNav.length - 1}
				{` `}<span class="bullet">•</span>{` `}{/if}
		{/each}
	</div> -->
</nav>

<style>
	.about {
		position: relative;
		text-wrap: balance;
	}
	.about a {
		display: inline;
		font-size: smaller;
	}
	.about .bullet {
		font-size: x-small;
	}
	.about .active {
		text-decoration: underline;
	}
	nav {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	nav a {
		display: block;
		text-decoration: none;
		color: inherit;
	}

	nav a:hover {
		text-decoration: underline;
	}

	.section > a,
	.section > .active {
		font-family: var(--hed-font);
		font-variation-settings: 'wght' 700;
		/*text-transform: uppercase;*/
		/*font-size: 14px;*/
	}

	.active {
		position: relative;
	}

	.section .children a,
	.section .children .active {
		padding-left: 1em; /* TODO remove? */
	}

	.bulletins {
		border-left: 3px double black;
		padding-left: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 2rem 0 2rem calc(-1rem - 3px);
	}
</style>
