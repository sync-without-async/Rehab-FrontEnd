import { createFormData, getSpringAxios } from "./axios";

// get ~~
// create ~~
// modify ~~
// delete ~~

export async function createImage(file) {
  const axios = getSpringAxios();

  const body = {
    file,
  };

  const response = await axios.post("/upload", createFormData(body));

  const data = {
    // uuid: response.data.uuid,
    // fileName: response.data.fileName,
    link: response.data.profileUrl,
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
