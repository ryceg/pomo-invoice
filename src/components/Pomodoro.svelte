<script lang="ts">
	import { formatTime, LONG_BREAK_S, POMODORO_S, SHORT_BREAK_S, State } from '$lib/consts';
	import Button from './Button.svelte';

	let currentState = State.idle;
	let pomodoroTime = POMODORO_S;
	let completedPomodoros = 0;
	let interval;

	function startPomodoro() {
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
		// TODO: Add some logic to prompt the user to write down the cause of the interruption.
		idle();
	}
	function pausePomodoro() {
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
		<Button func={startPomodoro} disabled={currentState !== State.idle}>Start</Button>
		{#if currentState !== 'idle'}
			<Button func={cancelPomodoro} disabled={currentState !== State.inProgress}>Cancel</Button>
		{/if}
		{#if currentState === 'paused'}
			<Button func={pausePomodoro} disabled={currentState !== State.inProgress}>Pause</Button>
		{/if}
	</div>

	<!--button on:click={completePomodoro}>complete</button-->
</section>
