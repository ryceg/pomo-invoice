<script lang="ts">
	import dayjs from 'dayjs';
	import { createUUID } from '../lib/utils';

	export let format = 'YYYY-MM-DD';
	export let date = new Date();
	let isTime = false;
	let timeArray = ['H', 'h', 'm', 'M', 's'];
	for (let i = 0; i < timeArray.length; i++) {
		if (format.includes(timeArray[i])) {
			isTime = true;
		}
	}
	const id = createUUID();
	let internal;

	const input = (x) => (internal = dayjs(x).format(format));
	const output = (x) => (date = dayjs(x, format).toDate());

	$: input(date);
	$: output(internal);
</script>

<div
	class="date w-min px-3 py-1.5 bg-white bg-clip-padding transition ease-in-out m-0 focus:text-stone-700 focus:border-red-600 focus:outline-none"
	on:click={function () {
		const input = document.getElementById(id);
		if (input.getAttribute('type') === 'date') {
			try {
				input.showPicker();
			} catch {
				input.focus();
			}
		}
	}}
>
	<label for="date" class="hidden">Select a date</label>
	{#if isTime}
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
	/*
	input[type='date'] {
		position: relative;
		overflow: hidden;
		border: none;
		user-select: text;
	}
	input[type='date']::-webkit-calendar-picker-indicator {
		display: block;
		top: 0;
		left: 0;
		background: #0000;
		position: absolute;
		transform: scale(12);
	}
	input[type='date']::selection {
		background: #0000;
	} */
</style>
