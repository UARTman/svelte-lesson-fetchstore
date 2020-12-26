<script>
  import { counterStore } from "./counter.js";
  let num = 0;
</script>

<button on:click={() => counterStore.sub(1)}>-1</button>
Received:
{$counterStore}
<button on:click={() => counterStore.add(1)}>+1</button>
<br />
<button on:click={() => counterStore.sub(num)}>-</button>
<input type="number" bind:value={num} />
<button on:click={() => counterStore.add(num)}>+</button>
