<script lang="ts">
	import * as dayjs from 'dayjs';

	export let format = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
	export let date: Date;
	let dayJSDate = dayjs(date);
	let isTime = false;
	let hoursMinutesSymbols = ['H', 'h', 'm', 's'];
	for (let i = 0; i < hoursMinutesSymbols.length; i++) {
		if (format.includes(hoursMinutesSymbols[i])) {
			isTime = true;
			break;
		}
	}
	let internal;
	console.log('date', dayJSDate);
	const input = (x: dayjs.Dayjs) => (internal = dayjs(x).format(format));
	const output = (x: dayjs.Dayjs) => (dayJSDate = dayjs(x, format).toDate());
	console.log('input', input(dayJSDate));
	console.log('output', output(dayJSDate));

	$: input(dayJSDate);
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
	({format}) - {JSON.stringify(dayJSDate)}
	{#if isTime}
		<input
			bind:value={internal}
			type="time"
			class="w-min selection:bg-red-500 selection:text-stone-50 px-1 rounded"
		/>
	{:else}
		<input
			bind:value={internal}
			type="datetime-local"
			class="w-min selection:bg-red-500 selection:text-stone-50 px-1 rounded"
		/>
	{/if}
</div>

<style>
	input:invalid::after {
		content: '✖';
	}
</style>
