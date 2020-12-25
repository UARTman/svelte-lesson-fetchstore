<script>
	let received = "";
	let num = 0;

	async function getData() {
		let res = await fetch("/api");
		received = await res.text();
	}

	async function addOne() {
		await fetch("/api/add", {
			method: "POST",
		});
		await getData();
	}

	async function subOne() {
		await fetch("/api/sub", {
			method: "POST",
		});
		await getData();
	}

	async function add() {
		await fetch("/api/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				amount: num,
			}),
		});
		await getData();
	}
	async function sub() {
		await fetch("/api/sub", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				amount: num,
			}),
		});
		await getData();
	}

	getData();
</script>

<button on:click={subOne}>-1</button>
Received:
{received}
<button on:click={addOne}>+1</button>
<br />
<button on:click={sub}>-</button>
<input type="number" bind:value={num} />
<button on:click={add}>+</button>
