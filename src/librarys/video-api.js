import axios from "./axios.js";

function toProgramSchema(data) {
  return {
    id: data.pno,
    title: data.programTitle,
    description: data.description,
    category: data.category,
    posture: data.position,
    videoList: data.vno_videoUrl,
  };
}

export async function getVideo(id) {
  const response = await axios.get(`/video/${id}`);

  return toProgramSchema(response.data);
}
