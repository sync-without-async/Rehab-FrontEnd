import dayjs from "dayjs";
import { getSpringAxios } from "./axios";

export async function registerChart(data, token) {
  const axios = getSpringAxios(token);

  const response = await axios.post("/auth/chart/register", data);
  return response.data;
}

export async function getTherapistList(token) {
  const axios = getSpringAxios(token);

  const response = await axios.get("/auth/getTherapistList");
  return response.data;
}

export async function getChart(token, id) {
  const axios = getSpringAxios(token);

  const response = await axios.get("/auth/chart/" + id);

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
    medicalRecords: (response.data.medicalRecords || [])
      .map((item) => ({
        id: item.record_no,
        nextSchedule: item.schedule,
        date: item.regDate,
        treatmentRecord: item.treatmentRecord,
        exerciseRequest: item.exerciseRequest,
      }))
      .sort((a, b) => {
        const date = dayjs(b.date).valueOf() - dayjs(a.date).valueOf();

        if (date !== 0) {
          return date;
        }

        return b.id - a.id;
      }),
  };

  return data;
}
export async function getChartWithId(token, id) {
  const axios = getSpringAxios(token);

  const response = await axios.get("/chart/patient/" + id);

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
    medicalRecords: (response.data.medicalRecords || [])
      .map((item) => ({
        id: item.record_no,
        nextSchedule: item.schedule,
        date: item.regDate,
        treatmentRecord: item.treatmentRecord,
        exerciseRequest: item.exerciseRequest,
      }))
      .sort((a, b) => {
        const date = dayjs(b.date).valueOf() - dayjs(a.date).valueOf();

        if (date !== 0) {
          return date;
        }

        return b.id - a.id;
      }),
  };

  return data;
}

export async function getPatientDate(token, id) {
  const axios = getSpringAxios(token);

  const response = await axios.get("/chart/patient/" + id);

  const records = (response.data.medicalRecords || [])
    .map((item) => ({
      id: item.record_no,
      nextSchedule: item.schedule,
      date: item.regDate,
      treatmentRecord: item.treatmentRecord,
      exerciseRequest: item.exerciseRequest,
    }))
    .sort((a, b) => {
      const date = dayjs(b.date).valueOf() - dayjs(a.date).valueOf();

      if (date !== 0) {
        return date;
      }

      return b.id - a.id;
    });

  const data = {
    recentVisitDate: records[0]?.date,
    nextScheduleDate: records[0]?.nextSchedule,
  };

  return data;
}

export async function getChartList(req) {
  const axios = getSpringAxios(req.token);

  const params = {
    sortBy: req.sort,
    keyword: req.query || undefined,
    type: "patient",
  };

  const response = await axios.get("/auth/chart/list/" + req.id, { params });

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

export async function getChartAiRecord(token, id) {
  const axios = getSpringAxios(token);

  const response = await axios.get("/auth/aiRecordList/" + id);

  const data = response.data.map((item) => ({
    id: item.staff_id,
    summary: item.summary,
    date: item.regDate,
  }));

  return data;
}

export async function createChart(req) {
  const axios = getSpringAxios(req.token);

  const body = {
    cd: req.diseaseCode,
    patientName: req.name,
    phone: req.phone,
    sex: req.gender,
    birth: req.birthday,
    doctor_id: req.doctor,
    therapist_id: req.therapist,
    schedule: req.schedule,
    treatmentRecord: req.treatmentRecord,
    exerciseRequest: req.exerciseRequest,
  };

  const response = await axios.post("/auth/chart/register", body);

  const data = {
    status: true,
    account_id: response.data,
  };

  return data;
}

export async function createRecord(req) {
  const axios = getSpringAxios(req.token);

  const body = {
    schedule: req.schedule,
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
