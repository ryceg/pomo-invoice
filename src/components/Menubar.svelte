<script>
	import { toUpperFirst } from '$lib/utils';

	export let menus = [
		{
			name: 'home',
			href: '/'
		},
		{
			name: 'about',
			href: '/about'
		},
		{
			name: 'clients',
			href: '/clients'
		},
		{
			name: 'jobs',
			href: '/jobs'
		},
		{
			name: 'pomos',
			href: '/pomos'
		}
	];

	let step = 0;
	let percent = 0;

	function onChange(event) {
		step = +event.currentTarget.value;
		if (step === 0) {
			percent = 0;
		} else {
			percent = step * 100;
		}
	}
</script>

<div
	class="sticky top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center p-3 bg-white"
>
	<div class="relative flex p-1 rounded-full shadow-2xl">
		{#each menus as item, i}
			<a
				href={item.href}
				class=" md:px-5 lg:px-6 hover:rounded-full hover:text-stone-900 hover:bg-slate-100 px-4 py-1"
				>{toUpperFirst(item.name)}</a
			>
		{/each}
	</div>
</div>
