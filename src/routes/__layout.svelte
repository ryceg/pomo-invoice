<script>
	import { loadClients, loadJobs, loadPomodoros, user } from '$lib/stores';
	import { supabase } from '../../src/supabase';
	import '../app.css';
	import Menubar from '../components/Menubar.svelte';
	user.set(supabase.auth.user());
	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session?.user);
		if (session?.user) {
			loadClients();
			loadJobs();
			loadPomodoros();
		}
	});
</script>

<svelte:head>
	<link
		rel="icon"
		href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍅</text></svg>"
	/>
</svelte:head>
<div class="md:w-7/12 lg:6/12 relative w-10/12 py-20 mx-auto">
	<Menubar />
	<slot />
</div>
