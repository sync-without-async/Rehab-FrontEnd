import { createFormData, getSpringAxios } from "./axios";

// get ~~
// create ~~
// modify ~~
// delete ~~

export async function createImage(files) {
  const axios = getSpringAxios();

  const body = {
    files,
  };

  const response = await axios.post("/upload", createFormData(body));

  const data = {
    uuid: response.data.uuid,
    fileName: response.data.fileName,
    link: response.data.link,
  };

  return data;
}

export async function deleteImage(filePath) {
  const axios = getSpringAxios();

  const response = await axios.delete("/remove/" + filePath);

  const data = {
    status: true,
    message: response.data,
  };
  return data;
}
