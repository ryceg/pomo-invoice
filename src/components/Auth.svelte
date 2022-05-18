<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores';
	import { supabase } from '../../src/supabase';
	export let title = 'Sign Up';
	let loading = false;
	let password = '';
	let email = '';
	// let password = ''
	async function handleLogin() {
		try {
			console.log(email);
			const { user, error } =
				title === 'Sign In'
					? await supabase.auth.signIn({ email, password })
					: await supabase.auth.signUp({ email, password });

			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			console.error(error);
			alert(error.error_description || error.message || error.error);
		} finally {
			loading = false;
			if (user) {
				// redirect to home
				goto('/');
			}
		}
	}
</script>

<h1 class="text-2xl font-bold text-center text-stone-800 md:text-3xl lg:text-4xl">{title}</h1>
<p class="text-center mt-2 text-gray-600">Sign in via magic link with your email here.</p>
<form on:submit|preventDefault={handleLogin}>
	<div class="flex flex-col text-sm mb-2">
		<label class="font-bold mb-2 text-stone-800" for="email">Email</label>
		<input
			type="email"
			name="email"
			id="email"
			class="appearance-none shadow-sm border border-stone-300 p-2 my-2 focus:outline-none focus:border-stone-400 rounded-lg"
			placeholder="Your email"
			bind:value={email}
		/>

		<label class="font-bold mb-2 text-stone-800" for="password">Password</label>
		<input
			name="password"
			id="password"
			type="password"
			class="appearance-none shadow-sm border border-stone-300 p-2 focus:outline-none focus:border-stone-400 rounded-lg"
			placeholder="Password"
			bind:value={password}
		/>
	</div>
	<button
		type="submit"
		class="w-full shadow-sm rounded bg-green-700 hover:bg-green-800 text-white py-2 px-4"
		>Submit</button
	>
	<button type="menu" on:click={() => (title = 'Sign In')}>Already a user?</button>
</form>
