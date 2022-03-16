<script lang="ts">
	export let text: string;
	export let func = (): void => {
		console.log(text);
	};
</script>

<button on:click={() => func()}>
	<span
		class="bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 px-4 py-2 text-sm font-medium text-white bg-black rounded-md"
	>
		{text}</span
	>
</button>
