import { getSpringAxios } from "./axios.js";

export async function createVideo(options) {
  const axios = getSpringAxios();

  const data = new FormData();
  data.append("admin_id", options.id);
  data.append("title", options.title);
  data.append("description", options.description);
  data.append("tag", options.category);
  data.append("frame", options.totalFrame);
  data.append("playTime", options.duration);
  data.append("files[0]", options.video);
  data.append("files[1]", options.skeleton);

  for (const [key, value] of data.entries()) {
    console.log(key, ":", value, typeof value);
  }

  const response = await axios.post("/video/create", data);
  return response.data;
}
