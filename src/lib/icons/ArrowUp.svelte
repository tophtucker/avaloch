<script>
	let { size = 12, fill = 'currentColor', ...rest } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 16 16"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	{...rest}
>
	<path d="M 8 16 V 0 M 0 8 8 1 16 8" stroke={fill} stroke-width="2" />
</svg>
