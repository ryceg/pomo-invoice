<script lang="ts">
	import dayjs from 'dayjs';
	import { createUUID } from '../lib/utils';

	export let format = 'YYYY-MM-DD';
	export let date;
	if (!date) date = new Date();
	let isTime = false;
	let hoursMinutesSymbols = ['H', 'h', 'm', 's'];
	for (let i = 0; i < hoursMinutesSymbols.length; i++) {
		if (format.includes(hoursMinutesSymbols[i])) {
			isTime = true;
			break;
		}
	}
	const id = createUUID();
	let internal;

	const input = (x: Date) => (internal = dayjs(x).format(format));
	const output = (x: Date) => (date = dayjs(x, format).toDate());

	$: input(date);
	$: output(internal);
</script>

<div
	class="date w-min px-3 py-1.5 bg-white bg-clip-padding transition ease-in-out m-0 focus:text-stone-700 focus:border-red-600 focus:outline-none"
>
	<!-- on:click={function () {
  const input = document.getElementById(id);
  if (input.getAttribute('type') === 'date') {
    try {
      input.showPicker();
    } catch {
      input.focus();
    }
  }
}} -->
	{#if isTime}
		({format}) - {JSON.stringify(date)}
		<input
			{id}
			bind:value={internal}
			type="time"
			class="w-min selection:bg-red-500 selection:text-stone-50 px-1 rounded"
		/>
	{:else}
		<input
			{id}
			bind:value={internal}
			type="date"
			class="w-min selection:bg-red-500 selection:text-stone-50 px-1 rounded"
		/>
	{/if}
</div>

<style>
	input:invalid::after {
		content: '✖';
	}
</style>
