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

export async function getVideoList(page, title, tag) {
  const axios = getSpringAxios();

  if (typeof title === "string") {
    title = title.trim();
  }

  if (!title) {
    title = undefined;
  }

  const params = {
    page,
    title,
    tag,
  };

  const response = await axios.get("/video/list", { params });

  response.data.dtoList = [];
  console.log(page);
  for (let i = 0; i < 8; i++) {
    let vno = (page - 1) * 10 + i + 1;
    response.data.dtoList.push({
      vno,
      title: "동작 제목" + vno,
      description: "동작 설명" + vno,
      tag: "ARM",
      playTime: 60.0,
      thumbnailURL: "https://placehold.co/200",
      videoURL: "https://placehold.co/800x800.mp4",
    });
  }
  response.data.end = 2;
  response.data.page = page;

  return response.data;
}
