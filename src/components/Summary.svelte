<script lang="ts">
import { findViaKey } from '$lib/find';
import { current } from '$lib/stores';

	let selectedJob = findViaKey($current.job, 'job');
</script>
