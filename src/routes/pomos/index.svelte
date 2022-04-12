<script lang="ts">
	import { pomodoros } from '$lib/stores';
	import Timesheet from '../../components/Timesheet.svelte';
</script>

<h1
	class="sticky bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 p-4 text-5xl font-extrabold text-transparent"
>
	Pomodoros
</h1>
<Timesheet pomos={$pomodoros} show={{ job: true, client: true, pomo: true }} />
