<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import CreateJob from '$lib/components/CreateJob.svelte';
	import CreatePerson from '$lib/components/CreatePerson.svelte';
	import CreatePomo from '$lib/components/CreatePomo.svelte';
	import Pomodoro from '$lib/components/Pomodoro.svelte';
	import SelectJob from '$lib/components/SelectJob.svelte';
	import { createRandom } from '$lib/createRandom';
	import { findViaKey } from '$lib/find';
	import { current, jobs } from '$lib/stores';
	import { supabase } from '../supabase';
	console.log($current);
	// $current.job = $current.job || $jobs[0].id || null;
	// $current.client = $current.client || findViaKey($current.job, 'job').client || null;

	$: selectedJob = $jobs[$current.job] || null;
	$: open = {
		job: false,
		client: false,
		pomo: false
	};
	// $: relevantPomos =
	// 	$pomodoros.filter((pomo) => {
	// 		return pomo.job === $current.job;
	// 	}) || null;
	console.log(supabase);
	function createSomeRandoms() {
		createRandom({
			clients: 4,
			jobs: 2,
			pomodoros: 45
		});
	}
	$: test = JSON.stringify(open);
</script>

<!-- <HydrateDefaults /> -->
<header>
	<h1
		class="bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 p-4 text-5xl font-extrabold text-center text-transparent"
	>
		pomo-invoice
	</h1>
</header>
<body>
	<Pomodoro />
	<div class="items-center justify-center text-sm">
		{#if $current?.job}
			<div class="pt-4 text-2xl font-medium leading-5 text-center text-gray-700">
				<a sveltekit:prefetch href="/jobs/{$current.job}"
					>{findViaKey($current.job, 'job').title}
				</a>
			</div>
			<div class="font-light text-center text-gray-500">for</div>
			<div class="py-1 text-lg font-medium leading-5 text-center text-gray-700">
				<a sveltekit:prefetch href="/clients/{findViaKey($current.job, 'job').client}">
					{findViaKey(findViaKey($current.job, 'job').client, 'client').firstName}
				</a>
			</div>
		{:else}
			Create a job!
		{/if}
	</div>
	<SelectJob bind:selected={selectedJob} />
	<!-- {#if relevantPomos}
		<div class="py-2">Total: {calculatePomoTime(relevantPomos) || 0}</div>
		<div class="py-2">
			$: {calculatePomoTime(relevantPomos) *
				(findViaKey($current.job, 'job')?.ratePerHour || defaults.ratePerHour)}
		</div>
	{/if} -->
	<button
		on:click={createSomeRandoms}
		class="bg-stone-500 hover:bg-stone-700 px-4 py-2 font-bold text-white rounded-full"
		>Create All</button
	>

	{test}

	<div class="bottom-4 fixed justify-center">
		<Button
			func={() => {
				open.client = !open.client;
			}}
			>Create Client
			<CreatePerson isOpen={open.client} />
		</Button>
		<Button
			func={() => {
				open.job = !open.job;
			}}
		>
			Create Job
			<CreateJob isOpen={open.job} />
		</Button>

		<Button
			func={() => {
				open.pomo = !open.pomo;
			}}
		>
			Create Pomo
			<CreatePomo isOpen={open.pomo} />
		</Button>
	</div>
</body>
