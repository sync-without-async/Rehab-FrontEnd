import axios from "axios";

export default axios.create({
  baseURL: "http://raspberrypihome.iptime.org:8080",
  timeout: 10000,
});
