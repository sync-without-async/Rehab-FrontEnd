import { getSpringAxios } from "./axios";

export async function registerChart(data, token) {
  const axios = getSpringAxios(token);

  const response = await axios.post("/chart/auth/register", data);
  return response.data;
}

export async function getTherapistList(token) {
  const axios = getSpringAxios(token);

  const response = await axios.get("/auth/getTherapistList");
  return response.data;
}

export async function getChart(token, id) {
  const axios = getSpringAxios(token);

  const response = await axios.get("/chart/auth/staff/" + id);

  const data = {
    cno: response.data.cno,
    diseaseCode: response.data.cd,
    phone: response.data.phone,
    gender: response.data.sex,
    birthday: response.data.birth,
    account_id: response.data.patient_id,
    name: response.data.patient_name,
    doctor_name: response.data.doctor_name,
    therapist_name: response.data.therapist_name,
    medicalRecords: (response.data.medicalRecords || []).map((item) => ({
      id: item.record_no,
      date: item.schedule,
      treatmentRecord: item.treatmentRecord,
      exerciseRequest: item.exerciseRequest,
    })),
  };

  return data;
}

export async function getChartList(token, id) {
  const axios = getSpringAxios(token);

  const response = await axios.get("/chart/auth/list/" + id);

  const data = {
    page: response.data.page,
    total: response.data.end,
    list: (response.data.dtoList || []).map((item) => ({
      id: item.cno,
      diseaseCode: item.cd,
      name: item.patient_name,
      phone: item.phone,
      gender: item.sex,
      birthday: item.birth,
      metrics: item.metrics_rate,
      patient_id: item.patient_id,
      doctor_name: item.doctor_name,
      therapist_name: item.therapist_name,
      medicalRecords: (item.medicalRecords || []).map((item) => ({
        id: item.record_no,
        date: item.schedule,
        treatmentRecord: item.treatmentRecord,
        exerciseRequest: item.exerciseRequest,
      })),
    })),
  };

  return data;
}

export async function getChartRecord(token, id) {
  const axios = getSpringAxios(token);

  const response = await axios.get("/record/" + id);

  const data = {
    // TODO: 명세 정확하게 알아올것
    ...response.data,
  };

  return data;
}

export async function createChart(req) {
  const axios = getSpringAxios(req.token);

  const body = {
    cd: req.code,
    patientName: req.name,
    phone: req.phone,
    sex: req.gender,
    birth: req.birthday,
    doctor_id: req.doctor,
    therapist_id: req.therapist,
    schedule: req.nextSchedule,
    treatmentRecord: req.treatmentRecord,
    exerciseRequest: req.exerciseRequest,
  };

  const response = await axios.post("/record/register/" + req.id, body);

  // response에 id 받아와야 함

  const data = {
    status: true,
    message: response.data,
  };

  return data;
}

//진료 기록 추가
export async function createRecord(req) {
  const axios = getSpringAxios(req.token);

  const body = {
    schedule: req.nextSchedule,
    treatmentRecord: req.treatmentRecord,
    exerciseRequest: req.exerciseRequest,
  };

  const response = await axios.post("/record/register/" + req.id, body);

  const data = {
    status: true,
    message: response.data,
  };

  return data;
}

export async function getChartOne(chartId, token) {
  const axios = getSpringAxios(token);

  try {
    const response = await axios.get(`/chart/${chartId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw error;
  }
}

/// ChartSummary

//cno로 환자 상세 차트 조회
export async function getChartSummary(token, staffId) {
  const axios = getSpringAxios(token);

  try {
    const response = await axios.get(`/chart/auth/staff/${staffId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chart summary:", error);
    throw error;
  }
}

//환자의 mid로 차트 상세 정보를 조회
export async function getChartByPatient(token, patientMid) {
  const axios = getSpringAxios(token);

  try {
    const response = await axios.get(`/chart/auth/patient/${patientMid}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chart data by patient:", error);
    throw error;
  }
}

// 환자의 mid로 비대면 진료 기록을 조회
export async function getAIRecordDetails(token, patientMid) {
  const axios = getSpringAxios(token);

  try {
    const response = await axios.get(`/chart/auth/aiRecord/${patientMid}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching AI record details:", error);
    throw error;
  }
}
