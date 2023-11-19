import { createFormData, getAIAxios, getSpringAxios } from "./axios.js";

const axios = getAIAxios();

export async function getSkeletons(formData) {
  const response = await axios.post("/videoRegister", formData);
  return response.data;
}

export async function getMetrics(formData) {
  const response = await axios.post("/getMetricsConsumer", formData);
  return response.data;
}

export async function createMeetingSummary(req) {
  const axios = getSpringAxios(req.token);

  const body = {
    audioFile: req.audio,
    rno: req.uuid,
    is_patient: req.is_patient,
  };

  const response = await axios.post("/audio", createFormData(body));

  const data = {
    status: true,
    message: response.data,
  };

  return data;
}
