import { getAIAxios, getSpringAxios } from "./axios.js";

export async function getVideo(id) {
  const axios = getSpringAxios();
  const params = {};
  try {
    const response = await axios.get("/video/" + id, { params });
    return response.data;
  } catch (e) {}

  return {
    vno: 1,
    title: "테스트입니다",
    description: "네",
    videoURL: "https://placehold.co/400.mp4",
  };
}

export async function getUserPrograms(token, id, page) {
  const axios = getSpringAxios(token);

  const params = {
    page,
  };

  const response = await axios.get("/video/list/" + id, { params });

  const data = {
    description: response.data.first,
    page: response.data.second.page,
    total: response.data.second.end,
    list: (response.data.second.dtoList || []).map((item) => ({
      id: item.ord,
      title: item.title,
      videoId: item.vno,
      programId: item.pno,
      metrics: item.metrics,
    })),
  };

  return data;
}

export async function modifyMetrics(req) {
  const axios = getSpringAxios(req.token);

  const body = {
    patient_id: req.id,
    pno: Number(req.pno),
    vno: Number(req.vno),
    ord: Number(req.ord),
    metrics: req.metrics,
  };

  const response = await axios.put("/metrics", body);
  const data = {
    status: true,
    message: response.data,
  };

  return data;
}

export async function createProgram(req) {
  const axios = getSpringAxios(req.token);

  const body = {
    staff_id: req.adminId,
    patient_id: req.userId,
    description: req.description,
    ord_map: req.list.reduce(
      (result, item, index) => ({
        ...result,
        [index + 1]: item,
      }),
      {},
    ),
  };

  const response = await axios.post("/program", body);

  const data = {
    status: true,
    message: response.data,
  };

  return data;
}

export async function modifyProgram(req) {
  const axios = getSpringAxios(req.token);

  const body = {
    staff_id: req.adminId,
    patient_id: req.userId,
    description: req.description,
    ord_map: req.list.reduce(
      (result, item, index) => ({
        ...result,
        [index + 1]: item,
      }),
      {},
    ),
  };

  const response = await axios.put("/program/" + req.userId, body);

  const data = {
    status: true,
    message: response.data,
  };

  return data;
}
