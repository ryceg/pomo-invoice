<script lang="ts">
	export let func = (): void => {};
	export let classN: string = '';
	export let disabled: boolean = false;
</script>

<button {disabled} on:click={() => func()}>
	<span
		class={classN
			? classN
			: 'bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 px-4 py-2 text-sm font-medium text-white bg-black rounded-md'}
	>
		<slot /></span
	>
</button>
