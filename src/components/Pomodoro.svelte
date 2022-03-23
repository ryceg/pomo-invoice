<script lang="ts">
	import { formatTime,LONG_BREAK_S,POMODORO_S,SHORT_BREAK_S,State } from '$lib/consts';
import { Pomo } from '$lib/Pomo';
	import { current,jobs } from '$lib/stores';
	import Button from './Button.svelte';

	let currentState = State.idle;
	let pomodoroTime = POMODORO_S;
	let completedPomodoros = 0;
	let interval;
	let currentJob = $jobs[$current.job];
	let currentPomodoro;

	function startPomodoro() {
		currentPomodoro = new Pomo({
			job: currentJob.id
		})
		currentPomodoro.start();
		setState(State.inProgress);
		interval = setInterval(() => {
			if (pomodoroTime === 0) {
				completePomodoro();
			}
			pomodoroTime -= 1;
		}, 1000);
	}

	function setState(newState) {
		clearInterval(interval);
		currentState = newState;
	}

	function completePomodoro() {
		currentPomodoro.end();
		completedPomodoros++;
		if (completedPomodoros === 4) {
			rest(LONG_BREAK_S);
			completedPomodoros = 0;
		} else {
			rest(SHORT_BREAK_S);
		}
	}

	function rest(time) {
		setState(State.resting);
		pomodoroTime = time;
		interval = setInterval(() => {
			if (pomodoroTime === 0) {
				idle();
			}
			pomodoroTime -= 1;
		}, 1000);
	}

	function cancelPomodoro() {
		idle();
	}
	function pausePomodoro() {
		// TODO: Add some logic to prompt the user to write down the cause of the interruption.
		idle();
	}

	function idle() {
		setState(State.idle);
		pomodoroTime = POMODORO_S;
	}
</script>

<section class="">
	<time class="relative flex items-center justify-center w-full px-3 py-4 text-3xl font-bold">
		{formatTime(pomodoroTime)} ({currentState})
	</time>
	<div class="relative flex items-center justify-center space-x-8">
		{#if currentState !== State.inProgress}
			<Button func={startPomodoro} disabled={currentState !== State.idle}>Start</Button>
		{/if}
		{#if currentState !== State.idle}
			<Button func={cancelPomodoro} disabled={currentState !== State.inProgress}>Cancel</Button>
		{/if}
		{#if currentState === State.inProgress}
			<Button func={pausePomodoro} disabled={currentState !== State.inProgress}>Pause</Button>
		{/if}
	</div>

	<!--button on:click={completePomodoro}>complete</button-->
</section>
