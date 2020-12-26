import { writable } from "svelte/store";

const newCounterStore = () => {
  // Создаем writable хранилище
  // Вторым аргументом передаем функцию, которая запустится при первой подписке
  // https://svelte.dev/docs#writable
  let { subscribe, set } = writable("", (set) => {
    // Раз в 500 миллисекунд мы собираем данные с сервера
    // setInterval возвращает код, с помощью которого его можно остановить
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
    let cancel = setInterval(async () => {
      let res = await fetch("/api");
      set(await res.text());
    }, 500);
    // Из функции-инициализатора возвращаем функцию, которая будет выполнена, когда последняя подписка отпишется
    return () => {
      // Пеоедаем код интервала в clearInterval, чтобы остановить интервал
      // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval
      clearInterval(cancel);
    };
  });

  // Функция load - собирает данные с сервера
  const load = async () => {
    let res = await fetch("/api");
    set(await res.text());
  };

  // Функция add - добавляет amount к числу на сервере
  const add = async (amount) => {
    await fetch("/api/add", {
      // Задаем метод POST
      method: "POST",
      headers: {
        // Заголовок Content-Type говорит, в каком формате тело запроса.
        // В нашем случае мы передает json.
        // Список всех типов данных https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_MIME-%D1%82%D0%B8%D0%BF%D0%BE%D0%B2
        "Content-Type": "application/json",
      },
      // В body мы кладем наш объект, сериализированный в JSON
      // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
      body: JSON.stringify({
        amount,
      }),
    });
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
  };

  // Возврашает объект со всеми нужными методами
  return {
    subscribe,
    load,
    add,
    sub,
  };
};
// Создаем единственное хранилище, которое можно импортировать.

export let counterStore = newCounterStore();
