import axios from "./axios.js";

export async function userLogin(mid, password) {
  const data = {
    mid,
    password,
  };

  const response = await axios.post("/login", data);

  return response;
}

export async function userRegister(mid, password, name, age, sex, phone) {
  const data = {
    mid,
    password,
    name,
    age,
    sex,
    phone,
  };

  const response = await axios.post("/user/join", data);

  return response;
}
