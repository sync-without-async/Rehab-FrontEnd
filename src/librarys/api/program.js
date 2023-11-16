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

export async function getUserPrograms(token, id) {
  const axios = getSpringAxios(token);

  const response = await axios.get("/video/list/" + id);

  const data = {
    description: response.data.first,
    page: response.data.second.page,
    total: response.data.second.end,
    list: (response.data.second.dtoList || []).map((item) => ({
      id: item.ord,
      title: item.title,
      videoId: item.id,
      metrics: item.metrics,
    })),
  };

  return data;
}

export async function modifyMetrics(data) {
  const axios = getSpringAxios();
  const params = {};
  const response = await axios.put("/metrics", { params });

  return response.data;
}

export async function createProgram(req) {
  const axios = getSpringAxios(req.token);

  const body = {
    adminId: req.adminId,
    userId: req.userId,
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
    adminId: req.adminId,
    userId: req.userId,
    description: req.description,
    ord_map: req.list.reduce(
      (result, item, index) => ({
        ...result,
        [index + 1]: item,
      }),
      {},
    ),
  };

  const response = await axios.put("/program/" + req.id, body);

  const data = {
    status: true,
    message: response.data,
  };

  return data;
}
