<script lang="ts">
	import { clients, loadClients } from '$lib/stores';
	loadClients();
</script>

<table class="table-auto">
	<thead>
		<tr>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Email</th>
			<th>Phone</th>
			<th>Notes</th>
		</tr>
	</thead>

	<tbody>
		{#each $clients as client}
			<tr>
				<td contenteditable="true" bind:innerHTML={client.firstName}>{client.firstName}</td>
				<td contenteditable="true" bind:innerHTML={client.lastName}>{client.lastName}</td>
				<td contenteditable="true" bind:innerHTML={client.email}>{client.email}</td>
				<td contenteditable="true" bind:innerHTML={client.phone}>{client.phone}</td>
				<td contenteditable="true" bind:innerHTML={client.notes}>{client.notes}</td>
			</tr>
		{/each}
	</tbody>
</table>
