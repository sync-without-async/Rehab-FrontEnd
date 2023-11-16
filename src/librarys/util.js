export const debounce = (callback, delay) => {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout((_) => callback.apply(this, arguments), delay);
  };
};

export const throttle = (callback, delay) => {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout((_) => {
        callback.apply(this, arguments);
        timer = undefined;
      }, delay);
    }
  };
};

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getByPath = (o, p) => p.split(".").reduce((a, v) => a[v], o);
