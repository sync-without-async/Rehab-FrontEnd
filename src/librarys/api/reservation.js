import { sleep } from "../util.js";
import { getSpringAxios } from "./axios.js";

export async function getAdminReservationList(id, page = undefined) {
  const axios = getSpringAxios();

  const params = {
    page,
  };

  const response = await axios.get("/reservation-admin/" + id, { params });
  return response.data;
}

export async function createReservation(
  admin_id,
  user_id,
  content,
  date,
  index,
) {
  const axios = getSpringAxios();

  const data = {
    admin_id,
    user_id,
    content,
    date,
    index,
  };
  console.log(data);
  const response = await axios.post("/reservation/", data);
  return response.data;
}

export async function removeReservation(id) {
  const axios = getSpringAxios();

  const response = await axios.put("/reservation/" + id);
  return response.data;
}

export async function getAdminReservationTime(id, date) {
  const axios = getSpringAxios();

  const response = await axios.get(`/reserved-times/${id}/${date}`);
  return response.data;
}
