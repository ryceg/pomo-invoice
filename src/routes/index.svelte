<script>
	import Button from '../components/Button.svelte';
</script>

<body>
	<h1 class="lg:text-5xl md:text-4xl text-3xl font-extrabold text-center text-blue-500">
		pomo-invoice
	</h1>

	<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam eos alias delectus,</p>
	<div class="fixed bottom-4 justify-center">
		<Button text="Create invoice" />
		<Button text="Export invoices" />
		<Button text="Import invoices" />
		<Button text="Create client" />
	</div>
</body>
