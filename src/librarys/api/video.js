import { createFormData, getSpringAxios } from "./axios.js";

export async function createVideo(token, req) {
  const axios = getSpringAxios(token);

  const body = {
    staff_id: req.id,
    title: req.title,
    description: req.description,
    tag: req.category,
    frame: req.totalFrame,
    playTime: req.duration,
    "files[0]": req.video,
    "files[1]": req.skeleton,
  };

  const response = await axios.post("/video/create", createFormData(body));

  const data = {
    status: true,
    message: response.data,
  };

  return data;
}

export async function getVideoList(req) {
  const axios = getSpringAxios();

  const params = {
    page: req.page,
    title: req.query || undefined,
    tag: req.category,
  };

  if (typeof params.title === "string") {
    params.title = params.title.trim();
  }

  const response = await axios.get("/video/list", { params });

  const data = {
    page: response.data.page,
    total: response.data.end,
    list: (response.data.dtoList || []).map((item) => ({
      vno: item.vno,
      title: item.title,
      description: item.description,
      tag: item.tag,
      playTime: item.playTime,
      videoURL: item.videoURL,
      thumbnailURL: item.thumbnailURL,
    })),
  };

  return data;
}

export async function getVideo(id) {
  const axios = getSpringAxios();

  const response = await axios.get("/video/" + id);

  const data = {
    vno: response.data.vno,
    title: response.data.title,
    description: response.data.description,
    videoURL: response.data.videoURL,
  };

  return data;
}
