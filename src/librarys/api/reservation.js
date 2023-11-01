import { getSpringAxios } from "./axios.js";

export async function getAdminReservationList(id, page = undefined) {
  const axios = getSpringAxios();

  const params = {
    page,
  };

  const response = await axios.get("/reservation-admin/" + id, { params });
  return response.data;
}
