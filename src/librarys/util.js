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
