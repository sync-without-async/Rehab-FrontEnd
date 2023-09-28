export async function userLogin(id, password) {
  const accounts = [
      {
          // User: 환자
          type: "user",
          id: "HL0001",
          password: "123456",
          name: "오소현",
          admin: false,
          assignedDoctor: "김정원", // 배정된 전문의
          assignedTherapist: "오민혁", // 배정된 재활치료사
          recentVisitDate: "2023.09.01", // 최근 외래 진료일
          nextReservationDate: "2023.09.11" // 다음 외래 예약일
      },
      // Admin1: 전문의
      {
          type: "admin1",
          id: "doctor",
          password: "123456",
          name: "김정원",
          admin: true,
      },
      // Admin2: 재활치료사
      {
          type: "admin2",
          id: "therapist",
          password: "123456",
          name: "오민혁",
          admin: true,
      },
  ];

  const account = accounts.find((item) => item.id === id);
  if (!account || account.password !== password) {
      return null;
  }

  // 계정 유형에 따른 다른 반환 값
  switch (account.type) {
      case "user":
          return {
              email: account.id,
              name: account.name,
              access_token: "user_token1",
              refresh_token: "user_token2",
              admin: account.admin,
              assignedDoctor: account.assignedDoctor,
              assignedTherapist: account.assignedTherapist,
              recentVisitDate: account.recentVisitDate,
              nextReservationDate: account.nextReservationDate
          };
      case "admin1":
          return {
              email: account.id,
              name: account.name,
              access_token: "admin1_token1",
              refresh_token: "admin1_token2",
              admin: account.admin,
          };
      case "admin2":
          return {
              email: account.id,
              name: account.name,
              access_token: "admin2_token1",
              refresh_token: "admin2_token2",
              admin: account.admin,
          };
      default:
          return null;
  }
}

// 임시로 환자에게 할당된 과제 데이터를 추가
const userExercises = {
  "HL0001": [
      { id: "1", name: "팔 운동 1", accuracy: "80%", judgement: "합격" },
      { id: "2", name: "팔 운동 2", accuracy: "80%", judgement: "합격" },
      { id: "3", name: "팔 운동 3", accuracy: "40%", judgement: "불합격" },
      { id: "4", name: "팔 운동 4", accuracy: "0%", judgement: "미수강" },
      { id: "5", name: "팔 운동 5", accuracy: "0%", judgement: "미수강" },
      { id: "6", name: "팔 운동 6", accuracy: "0%", judgement: "미수강" },
      { id: "7", name: "팔 운동 7", accuracy: "0%", judgement: "미수강" },
      { id: "8", name: "팔 운동 8", accuracy: "0%", judgement: "미수강" }
  ]
};

// 환자의 ID를 입력받아 해당 환자에게 할당된 과제 데이터를 반환하는 함수
export function getUserExercises(userId) {
  return userExercises[userId] || [];
}
