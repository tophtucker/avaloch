<script>
	import LilFrame from '$lib/components/LilFrame.svelte';
	import HR from '$lib/components/HR.svelte';
	let { children, accent } = $props();
</script>

<div class="wrapper1">
	<div class="wrapper2">
		<LilFrame accent="var(--red)">
			<h3>This page is under renovation</h3>
			{@render children()}
			<HR class="margin-0" />
			<em>We don’t know when the Main House will reopen. The Lodge is open.</em>
			<a class="cta" href="/about/renovations">Learn more</a>
		</LilFrame>
	</div>
</div>

<style>
	.wrapper1 {
		position: absolute;
		left: 0;
		width: 100%;
		z-index: 2;
		display: flex;
		justify-content: center;
		padding: 4em 0;
	}
	.wrapper2 {
		max-width: 380px;
		background: white;
	}
	h3 {
		margin: 0;
	}
	a {
		align-self: center;
	}
</style>
