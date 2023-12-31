import axios from "axios";
export const SPRING_URL = import.meta.env.VITE_SPRING_URL;
export const AI_URL = import.meta.env.VITE_AI_URL;

const TIMEOUT_LONG = 1000 * 60 * 60 * 24; // 하루
const TIMEOUT_SHORT = 1000 * 15; // 15초

export function getSpringAxios(token = null) {
  const options = {
    baseURL: SPRING_URL,
    timeout: TIMEOUT_LONG,
  };

  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return axios.create(options);
}

export function getAIAxios() {
  return axios.create({
    baseURL: AI_URL,
    timeout: TIMEOUT_LONG,
  });
}

export function createFormData(options) {
  const form = new FormData();

  for (const [key, value] of Object.entries(options)) {
    form.append(key, value);
  }

  return form;
}
