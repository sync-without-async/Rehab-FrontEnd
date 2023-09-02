import axios from "axios";

export default axios.create({
  baseURL: "http://raspberrypihome.iptime.org:8080",
  timeout: 10000,
});

export function getSpringAxios(token) {
  const options = {
    baseURL: "http://raspberrypihome.iptime.org:8080",
    timeout: 10000,
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
    baseURL: "http://localhost:5500/",
    timeout: 1000 * 60 * 60 * 24,
  });
}
