<script lang="ts">
	import { clients, jobs } from '$lib/stores';
</script>

<table class="table-auto">
	<thead>
		<tr>
			<th>Title</th>
			<th>Client</th>
			<th>Rate Per Hour</th>
			<th>Flat Rate</th>
			<th>Notes</th>
			<th>Finished</th>
		</tr>
	</thead>

	<tbody>
		{#each Object.values($jobs) as job}
			<tr>
				<td contenteditable="true" bind:innerHTML={job.title}>{job.title}</td>
				<td
					><select bind:value={job.client}>
						{#each Object.values($clients) as client}
							<option value={client.id}>{client.fullName}</option>
						{/each}
					</select></td
				>
				<td contenteditable="true" bind:innerHTML={job.ratePerHour}>{job.ratePerHour}</td>
				<td contenteditable="true" bind:innerHTML={job.flatRate}>{job.flatRate}</td>
				<td contenteditable="true" bind:innerHTML={job.notes} class="overflow-clip">{job.notes}</td>
				<td>
					<input class="content-center" type="checkbox" bind:checked={job.isFinished} />
				</td>
			</tr>
		{/each}
	</tbody>
</table>
