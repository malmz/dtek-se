<script lang="ts">
	export let value: number;
	export let label: string = '';

	$: cappedVal = Math.min(5, Math.max(0, value));

	const mapColors = (val: number) => `hsl(${Math.max(0, 120 * (1 - val / 1.4))}, 75%, 45%)`;

	const mapColor = (val: number) => {
		if (val < 0.4) return 'bg-green-500';
		if (val < 0.5) return 'bg-yellow-500';
		if (val < 0.6) return 'bg-orange-500';
		if (val < 0.7) return 'bg-red-500';
		return 'bg-red-500';
	};

	$: color = mapColors(cappedVal);
</script>

<div
	role="progressbar"
	aria-valuemin={0}
	aria-valuemax={5}
	aria-valuenow={value}
	aria-label={label}
	class="w-56 flex items-center gap-2"
>
	<div
		style:width="{(cappedVal / 5) * 100}%"
		class="h-1 rounded-full align-middle {color}"
		style:background-color={color}
	/>
	<span class="block text-xs font-semibold text-gray-600 shrink-0"
		>{cappedVal.toFixed(2)} <span class="font-mono">CO<sub>2</sub></span></span
	>
</div>
