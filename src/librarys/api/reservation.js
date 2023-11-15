import { getSpringAxios } from "./axios.js";

export async function getAdminReservationList(token, id, page) {
  const axios = getSpringAxios(token);

  const params = {
    page: page || undefined,
  };

  const response = await axios.get("/reservation-admin/" + id, { params });

  const data = {
    page: response.data.page,
    total: response.data.end,
    list: (response.data.dtoList || []).map((item) => ({
      rno: item.rno,
      name: item.userName,
      date: item.date,
      index: item.index,
    })),
  };

  return data;
}

export async function getUserReservationList(token, id, page) {
  const axios = getSpringAxios(token);

  const params = {
    page: page || undefined,
  };

  const response = await axios.get("/reservation-user/" + id, { params });

  const data = {
    page: response.data.page,
    total: response.data.end,
    list: (response.data.dtoList || []).map((item) => ({
      rno: item.rno,
      name: item.adminName,
      date: item.date,
      index: item.index,
    })),
  };

  return data;
}

export async function createReservation(req) {
  const axios = getSpringAxios();

  const body = {
    admin_id: req.adminId,
    user_id: req.userId,
    content: req.description,
    date: req.date,
    index: req.index,
  };

  const response = await axios.post("/reservation/", body);

  const data = {
    status: true,
    message: response.data,
  };

  return data;
}

export async function deleteReservation(id) {
  const axios = getSpringAxios();

  const response = await axios.put("/reservation/" + id);

  const data = {
    status: true,
    message: response.data,
  };

  return data;
}

export async function getReserveTime(id, date) {
  const axios = getSpringAxios();

  const response = await axios.get(`/reserved-times/${id}/${date}`);

  const data = response.data.map((item) => item.index);

  return data;
}
