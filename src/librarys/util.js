import dayjs from "dayjs";

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

export const getJwtPayload = (token) => {
  return token ? JSON.parse(atob(token.split(".")[1])) : null;
};

export const getDisplayBirthday = (birthday) => {
  const date = dayjs(birthday);
  const displayDate = date.format("YYYY/MM/DD");
  const currentYear = dayjs().get("year");
  const patientYear = date.get("year");
  let age = currentYear - patientYear;

  if (date.set("year", currentYear).isAfter(dayjs())) {
    age--;
  }

  return `${displayDate} (${age}세)`;
};

export const getDisplayTime = (time) => {
  if (time < 0) {
    time = 0;
  }

  const min = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  return `${min}:${sec}`;
};

export const isEmail = (value) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regex.test(value);
};
