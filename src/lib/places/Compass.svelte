<script>
	let { size = 12, bearing, distance, fill = 'currentColor', style, ...rest } = $props();
	const tail = 5 + distance * 1.2;
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 16 16"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	style={`transform: rotate(${bearing}deg); ${style}`}
	{...rest}
>
	<path d={`M 8 1 v ${tail} M 0 8 8 1 16 8`} stroke={fill} stroke-width="2" />
</svg>
