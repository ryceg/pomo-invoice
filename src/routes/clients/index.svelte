<script lang="ts">
	import Editable from '$lib/components/Editable.svelte';
	import type { Person } from '$lib/Person';
	import { clients, loadClients, updateClient } from '$lib/stores';
	loadClients();
	function update(client: Person) {
		alert('!!!');
		updateClient(client);
	}
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
				<!-- <td
					contenteditable="true"
					bind:innerHTML={client.firstName}>{client.firstName}</td
				> -->
				<td>
					<Editable value={client.firstName} on:submit={update(client)} />
				</td>
				<td>
					<Editable value={client.lastName} on:submit={update(client)} />
				</td>
				<td>
					<Editable value={client.email} on:submit={update(client)} />
				</td>
				<td>
					<Editable value={client.phone} on:submit={update(client)} />
				</td>
				<td>
					<Editable value={client.notes} on:submit={update(client)} />
				</td>
				<!-- <td contenteditable="true" on:change={() => update(client)} bind:innerHTML={client.lastName}
					>{client.lastName}</td
				>
				<td contenteditable="true" on:change={() => update(client)} bind:innerHTML={client.email}
					>{client.email}</td
				>
				<td contenteditable="true" on:change={() => update(client)} bind:innerHTML={client.phone}
					>{client.phone}</td
				>
				<td contenteditable="true" on:change={() => update(client)} bind:innerHTML={client.notes}
					>{client.notes}</td
				> -->
			</tr>
		{/each}
	</tbody>
</table>
