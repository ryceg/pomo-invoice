<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	export let value;
	const dispatch = createEventDispatcher();
	let editing = false,
		original;
	onMount(() => {
		original = value;
	});
	function edit() {
		editing = true;
	}
	function submit() {
		if (value != original) {
			dispatch('submit', value);
		}
		editing = false;
	}
	function keydown(event) {
		if (event.key == 'Escape') {
			event.preventDefault();
			value = original;
			editing = false;
		}
	}
	function focus(element) {
		element.focus();
	}
</script>

<!-- <span
	
	on:click={hoverOn}
	on:select={hoverOn}
	on:focus={hoverOn}
	on:blur={hoverOff}
>
	{#if hovering}
		<input on:change={() => func()} contenteditable="true" bind:value />
	{:else}
		{value}
	{/if}
</span> -->

{#if editing}
	<form on:submit|preventDefault={submit} on:keydown={keydown}>
		<input
			class="text-gray-600 text-sm cursor-pointer hover:text-gray-700"
			bind:value
			on:blur={submit}
			required
			use:focus
		/>
	</form>
{:else}
	<div class="text-gray-600 text-sm cursor-pointer hover:text-gray-700" on:click={edit}>
		{value}
	</div>
{/if}

<!-- <style>
	div {
		cursor: pointer;
	}
	input {
		border: none;
		background: none;
		font-size: inherit;
		color: inherit;
		font-weight: inherit;
		text-align: inherit;
		box-shadow: none;
	}
</style> -->
