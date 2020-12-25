<script>
	import { onMount } from "svelte";
	import { counterStore } from "./counter.js";

	let amount = 0;

	onMount(() => {
		counterStore.load();
	});
</script>

<button on:click={() => counterStore.sub(1)}>-1</button>
Received:
{$counterStore}
<button on:click={() => counterStore.add(1)}>+1</button>
<br />
<button on:click={() => counterStore.sub(amount)}>-</button>
<input type="number" bind:value={amount} />
<button on:click={() => counterStore.add(amount)}>+</button>
