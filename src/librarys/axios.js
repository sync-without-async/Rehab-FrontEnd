import axios from "axios";

export default axios.create({
  baseURL: "http://10.50.228.23:8080/",
  timeout: 10000,
});

export function getSpringAxios(token) {
  const options = {
    baseURL: "http://10.50.228.23:8080/",
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
    baseURL: "http://10.50.228.23:8000/",
    timeout: 1000 * 60 * 60 * 24,
  });
}
