import { ROLE_TYPE } from "../type.js";
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
      id: item.rvno,
      uuid: item.rno,
      name: item.patientName,
      image: null,
      hospital: null,
      patient: item.patientId,
      date: item.date,
      index: item.index,
      description: item.content,
      deleted: item._deleted,
      summary: item.summary,
      role: ROLE_TYPE.USER,
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
      id: item.rvno,
      uuid: item.rno,
      name: item.staffName,
      image: item.profileUrl,
      hospital: item.hospital,
      patient: null,
      date: item.date,
      index: item.index,
      description: item.content,
      deleted: item._deleted,
      summary: item.summary,
      role: ROLE_TYPE[item.role.slice(1, -1)],
    })),
  };

  return data;
}

export async function createReservation(req) {
  const axios = getSpringAxios();

  const body = {
    staff_id: req.adminId,
    patient_id: req.userId,
    content: req.description,
    date: req.date,
    index: req.index.toString(),
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
