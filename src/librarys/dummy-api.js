import { ROLE_TYPE } from "./type.js";
import { sleep } from "./util.js";

export async function userLogin(id, password) {
  const accounts = [
    {
      // User: 환자
      type: "user",
      id: "HL0001",
      password: "123456",
      name: "오소현",
      admin: false,
      assignedDoctor: "김정원",
      assignedTherapist: "오민혁",
      recentVisitDate: "2023.09.01",
      nextReservationDate: "2023.09.11",
      gender: "여성",
      birth: "2001-02-24",
      diseaseCode: "A001",
    },
    // Admin1: 전문의
    {
      type: "admin1",
      id: "doctor",
      password: "123456",
      name: "김정원",
      major: "재활의학과",
      workplace: "한림대학교 춘천성심병원",
      admin: true,
    },
    // Admin2: 재활치료사
    {
      type: "admin2",
      id: "therapist",
      password: "123456",
      name: "오민혁",
      major: "팔 재활",
      workplace: "한림대학교 춘천성심병원 재활의료센터",
      admin: true,
    },
  ];

  const account = accounts.find((item) => item.id === id);

  if (!account || account.password !== password) {
    return null;
  }

  if (account.type === "user") {
    const doctor = accounts.find(
      (item) => item.name === account.assignedDoctor && item.type === "admin1",
    );
    const therapist = accounts.find(
      (item) =>
        item.name === account.assignedTherapist && item.type === "admin2",
    );

    return {
      user: {
        email: account.id,
        name: account.name,
        id: account.id,
        access_token: "user_token1",
        refresh_token: "user_token2",
        admin: account.admin,
        assignedDoctor: account.assignedDoctor,
        assignedTherapist: account.assignedTherapist,
        recentVisitDate: account.recentVisitDate,
        nextReservationDate: account.nextReservationDate,
      },
      doctor,
      therapist,
    };
  } else if (account.type === "admin1") {
    const patient = accounts.find(
      (item) => item.assignedDoctor === account.name && item.type === "user",
    );

    return {
      email: account.id,
      name: account.name,
      major: account.major,
      workplace: account.workplace,
      access_token: "admin1_token1",
      refresh_token: "admin1_token2",
      admin: account.admin,
      patient: {
        id: patient.id,
        name: patient.name,
        gender: patient.gender,
        birth: patient.birth,
        diseaseCode: patient.diseaseCode,
        recentVisitDate: patient.recentVisitDate,
        nextReservationDate: patient.nextReservationDate,
        assignedTherapist: patient.assignedTherapist,
      },
    };
  } else if (account.type === "admin2") {
    const patient = accounts.find(
      (item) => item.assignedTherapist === account.name && item.type === "user",
    );

    return {
      email: account.id,
      name: account.name,
      major: account.major,
      workplace: account.workplace,
      access_token: "admin2_token1",
      refresh_token: "admin2_token2",
      admin: account.admin,
      patient: {
        id: patient.id,
        name: patient.name,
        gender: patient.gender,
        birth: patient.birth,
        diseaseCode: patient.diseaseCode,
        recentVisitDate: patient.recentVisitDate,
        nextReservationDate: patient.nextReservationDate,
        assignedDoctor: patient.assignedDoctor,
      },
    };
  }

  return null;
}

export async function dummyLogin(id, password) {
  await sleep(200);

  if (id === "user1") {
    return {
      id: "user1",
      role: ROLE_TYPE.DOCTOR,
      name: "전문의",
      location: "한림대학교 춘천성심병원",
      department: "재활의학과",
    };
  } else if (id === "user2") {
    return {
      id: "user2",
      role: ROLE_TYPE.THERAPIST,
      name: "치료사",
      location: "한림대학교 춘천성심병원",
      department: "팔 재활",
    };
  } else if (id === "user3") {
    return {
      id: "user3",
      role: ROLE_TYPE.USER,
      name: "아파요",
      location: null,
      department: null,
    };
  } else {
    throw new Error("계정 정보가 없습니다");
  }
}

// 임시로 환자에게 할당된 과제 데이터를 추가
const userExercises = {
  HL0001: [
    { id: "1", name: "팔 운동 1", accuracy: "80%", judgement: "합격" },
    { id: "2", name: "팔 운동 2", accuracy: "80%", judgement: "합격" },
    { id: "3", name: "팔 운동 3", accuracy: "40%", judgement: "불합격" },
    { id: "4", name: "팔 운동 4", accuracy: "0%", judgement: "미수강" },
    { id: "5", name: "팔 운동 5", accuracy: "0%", judgement: "미수강" },
    { id: "6", name: "팔 운동 6", accuracy: "0%", judgement: "미수강" },
    { id: "7", name: "팔 운동 7", accuracy: "0%", judgement: "미수강" },
    { id: "8", name: "팔 운동 8", accuracy: "0%", judgement: "미수강" },
  ],
};

// 환자의 ID를 입력받아 해당 환자에게 할당된 과제 데이터를 반환하는 함수
export function getUserExercises(userId) {
  return userExercises[userId] || [];
}

// 기존 login-api.js 파일에 비대면 진료 기록 추가
const userUntactRecords = {
  HL0001: [
    {
      date: "2023.08.31",
      doctorName: "김정원 전문의",
      record:
        "환자는 3일 전부터 갑자기 시작된 기침과 가래를 주소로 내원하였음. 체온 측정 결과 38.2도로 발열 증상도 있음. 오늘 진료를 통해 급성 기관지염으로 진단하고, 관련 약물 처방하였음. 1주 후 재진을 권장함.",
    },
    {
      date: "2023.09.22",
      doctorName: "오민혁 재활치료사",
      record:
        "환자는 3일 전부터 갑자기 시작된 기침과 가래를 주소로 내원하였음. 체온 측정 결과 38.2도로 발열 증상도 있음. 오늘 진료를 통해 급성 기관지염으로 진단하고, 관련 약물 처방하였음. 1주 후 재진을 권장함.",
    },
  ],
};

// 비대면 진료 기록을 반환하는 함수
export function getUntactRecords(userId) {
  return userUntactRecords[userId];
}

// 기존 login-api.js 파일에 대면 진료 기록 추가
const userFaceRecords = {
  HL0001: [
    {
      date: "2023.09.01",
      doctorName: "김정원 전문의",
      record:
        "환자는 알레르기 성 비염 환자로 환절기를 맞아 알레르기 비염 증상이 시작되어 내원하게 되었음. 인후가 부어있어 코가 막혀 숨쉬기 불편해 함. 인후 부은 것을 낫게 하도록 처방함.",
    },
    {
      date: "2023.09.22",
      doctorName: "김정원 전문의",
      record:
        "지난번에 내원하였을 때보다 인후가 많이 가라앉았으나, 여전히 콧물이 나는 증상이 계속되어 불편해하시고 있음.",
    },
  ],
};

// 대면 진료 기록을 반환하는 함수
export function getFaceRecords(userId) {
  return userFaceRecords[userId];
}

function dummyAlert(name) {
  console.info(`알림: "${name}" 테스트 데이터 사용 중`);
}

export function getReservationListAdmin(id, page = undefined) {
  dummyAlert("Admin 비대면 예약 목록 조회");

  return {
    page: 1,
    size: 5,
    total: 1,
    start: 1,
    end: 1,
    prev: false,
    next: false,
    dtoList: [
      {
        userName: "사용자",
        userId: "jyp",
        rno: "b362a342-3605-4efa-aaf3-2115a274a230",
        date: "2023-11-10",
        index: 32,
      },
      {
        userName: "김경재",
        userId: "jyp",
        rno: "b362a342-3605-4efa-aaf3-2115a274a130",
        date: "2023-11-03",
        index: 41,
      },
      {
        userName: "박주영",
        userId: "jyp",
        rno: "b362a342-3605-4efa-aaf3-2115a274a330",
        date: "2023-11-03",
        index: 10,
      },
    ],
  };
}

export function getReservationListUser(id, page = undefined) {
  dummyAlert("User 비대면 예약 목록 조회");

  return {
    page: 1,
    size: 5,
    total: 1,
    start: 1,
    end: 1,
    prev: false,
    next: false,
    dtoList: [
      {
        adminName: "홍길동",
        rno: "b362a342-3605-4efa-aaf3-2115a274a130",
        rvno: 1,
        date: "2023-11-14",
        index: 24,
      },
      {
        adminName: "홍길동",
        rno: "b362a342-3605-4efa-aaf3-2115a274a230",
        rvno: 3,
        date: "2023-11-14",
        index: 17,
      },
      {
        adminName: "어드민",
        rno: "b362a342-3605-4efa-aaf3-2115a274a330",
        rvno: 3,
        date: "2023-11-19",
        index: 38,
      },
    ],
  };
}

export function getDoctorData() {
  return {
    doctor: {
      type: "admin1",
      id: "doctor",
      password: "123456",
      name: "김정원",
      major: "재활의학과",
      workplace: "한림대학교 춘천성심병원",
      admin: true,
    },
    // Admin2: 재활치료사
    therapist: {
      type: "admin2",
      id: "therapist",
      password: "123456",
      name: "오민혁",
      major: "팔 재활",
      workplace: "한림대학교 춘천성심병원 재활의료센터",
      admin: true,
    },
  };
}
