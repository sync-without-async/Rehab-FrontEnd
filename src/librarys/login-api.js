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
      diseaseCode: "A001"
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
    const doctor = accounts.find(item => item.name === account.assignedDoctor && item.type === "admin1");
    const therapist = accounts.find(item => item.name === account.assignedTherapist && item.type === "admin2");

    return {
      user: {
        email: account.id,
        name: account.name,
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
    const patient = accounts.find(item => item.assignedDoctor === account.name && item.type === "user");
  
    return {
      email: account.id,
      name: account.name,
      major: account.major,
      workplace: account.workplace,
      access_token: "admin1_token1",
      refresh_token: "admin1_token2",
      admin: account.admin,
      patient: {
        name: patient.name,
        gender: patient.gender, 
        birth: patient.birth,
        diseaseCode: patient.diseaseCode, 
        recentVisitDate: patient.recentVisitDate,  
        nextReservationDate: patient.nextReservationDate,  
        assignedTherapist: patient.assignedTherapist  
      }
    };
  } else if (account.type === "admin2") {
    return {
      email: account.id,
      name: account.name,
      major: account.major,
      workplace: account.workplace,
      access_token: "admin2_token1",
      refresh_token: "admin2_token2",
      admin: account.admin,
    };
  }

  return null;
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