import axios from "axios";

export default axios.create({
  baseURL: "http://raspberrypihome.iptime.org:8080",
  timeout: 10000,
});

export function getAuthAxios(token) {
  return axios.create({
    baseURL: "http://raspberrypihome.iptime.org:8080",
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
