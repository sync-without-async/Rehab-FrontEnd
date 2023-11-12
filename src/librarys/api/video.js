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

export async function getVideoList(page, query, category) {
  const axios = getSpringAxios();

  if (typeof query === "string") {
    query = query.trim();
  }

  if (!query) {
    query = undefined;
  }

  const params = {
    page,
    query,
    category,
  };

  const response = await axios.get("/video/list", { params });

  response.data.dtoList = [];
  console.log(page);
  for (let i = 0; i < 10; i++) {
    let vno = (page - 1) * 10 + i + 1;
    response.data.dtoList.push({
      vno,
      title: "동작 제목" + vno,
      description: "동작 설명" + vno,
      tag: "ARM",
      playTime: 60.0,
      videoURL: "https://placehold.co/200",
    });
  }

  response.data.end = 2;
  response.data.page = page;

  return response.data;
}
