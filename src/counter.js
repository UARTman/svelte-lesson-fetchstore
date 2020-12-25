import { writable } from "svelte/store";

const newCounterStore = () => {
  let { set, subscribe } = writable("");

  const add = async (amount) => {
    await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
      }),
    });
    await load();
  };

  const sub = async (amount) => {
    await fetch("/api/sub", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
      }),
    });
    await load();
  };

  const load = async () => {
    let res = await fetch("/api");
    set(await res.text());
  };

  return {
    subscribe,
    add,
    sub,
    load,
  };
};

export let counterStore = newCounterStore();
