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

export async function getMetrics(data) {
  const axios = getAIAxios();
  const params = {};
  const response = await axios.get("/getMetricsConsumer", { params });

  return response.data;
}

export async function modifyMetrics(data) {
  const axios = getSpringAxios();
  const params = {};
  const response = await axios.put("/metrics", { params });

  return response.data;
}
