<script lang="ts">
	export let text: string;
	export let func = (): void => {
		console.log(text);
	};
</script>

<button on:click={() => func()}>
	<span
		class="border-gray-700 text-center bg-gray-600 px-4 py-3 rounded-md text-slate-300 font-bold hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
	>
		{text}</span
	>
</button>
