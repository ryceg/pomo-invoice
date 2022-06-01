<script lang="ts">
	import Editable from '$lib/components/Editable.svelte';
	import type { Job } from '$lib/Job';
	import { clients, jobs, updateJob } from '$lib/stores';
	function update(job: Job) {
		alert('Test!');
		updateJob(job);
	}
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
			<th>Link</th>
		</tr>
	</thead>

	<tbody>
		{#each $jobs as job}
			<tr>
				<td><Editable value={job.title} on:submit={update(job)} /></td>
				<!-- <td contenteditable="true" bind:innerHTML={job.title} on:blur={() => update(job)}
					>{job.title}</td
				> -->
				<td
					><select bind:value={job.client} on:change={() => update(job)}>
						{#each $clients as client}
							<option value={client.id}>{client.firstName}</option>
						{/each}
					</select></td
				>
				<td><Editable value={job.ratePerHour} on:submit={update(job)} /></td>
				<td><Editable value={job.flatRate} on:submit={update(job)} /></td>
				<td><Editable value={job.notes} on:submit={update(job)} /></td>
				<!--
				<td contenteditable="true" bind:innerHTML={job.ratePerHour} on:blur={() => update(job)}
					>{job.ratePerHour}</td
				>
				<td contenteditable="true" bind:innerHTML={job.flatRate} on:blur={() => update(job)}
					>{job.flatRate}</td
				>
				<td
					contenteditable="true"
					bind:innerHTML={job.notes}
					on:blur={() => update(job)}
					class="overflow-clip">{job.notes}</td
				> -->
				<td>
					<input
						class="content-center"
						type="checkbox"
						bind:checked={job.isFinished}
						on:change={() => update(job)}
					/>
				</td>
				<td>
					<a href="/jobs/{job.id}">Link</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
