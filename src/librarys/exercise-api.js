import arms from "../assets/images/arms-up.webp";
import knee from "../assets/images/knee.webp";
import shoulder from "../assets/images/shoulder-up.webp";
import thigh from "../assets/images/thigh.webp";

import { getSpringAxios } from "./axios.js";

const axios = getSpringAxios();

const images = [arms, knee, shoulder, thigh];

const courseList = [
  {
    id: 1,
    title: "어깨 이완 운동 강의",
    description: "앉은 자세에서 수행할 수 있는 어깨 이완 운동을 학습합니다.",
    category: "어깨",
    posture: "앉은 자세",
    time: 15,
    image: shoulder,
    tags: ["어깨", "앉은 자세"],
  },
  {
    id: 2,
    title: "선 자세 팔 강화 운동",
    description: "선 자세에서 팔 근육을 강화하는 운동을 학습합니다.",
    category: "팔",
    posture: "선 자세",
    time: 15,
    image: arms,
    tags: ["팔", "선 자세"],
  },
  {
    id: 3,
    title: "선 자세 허벅지 강화 운동",
    description: "선 자세에서 허벅지 근육 강화를 위한 운동을 학습합니다.",
    category: "허벅지",
    posture: "선 자세",
    time: 15,
    image: thigh,
    tags: ["허벅지", "선 자세"],
  },
  {
    id: 4,
    title: "앉은 자세 어깨 스트레칭",
    description: "앉은 자세에서 어깨를 스트레칭하는 운동을 학습합니다.",
    category: "어깨",
    posture: "앉은 자세",
    time: 15,
    image: shoulder,
    tags: ["어깨", "앉은 자세"],
  },
  {
    id: 5,
    title: "선 자세 어깨 운동",
    description: "선 자세에서 어깨 근육을 강화하고 이완하는 운동을 학습합니다.",
    category: "어깨",
    posture: "선 자세",
    time: 15,
    image: shoulder,
    tags: ["어깨", "선 자세"],
  },
  {
    id: 6,
    title: "선 자세 허벅지 근력 운동",
    description:
      "선 자세와 앉은 자세에서 허벅지 근력을 키우는 운동을 학습합니다.",
    category: "허벅지",
    posture: "선 자세",
    time: 15,
    image: thigh,
    tags: ["허벅지", "선 자세", "앉은 자세"],
  },
  {
    id: 7,
    title: "앉은 자세 어깨 밸런스 운동",
    description: "앉은 자세에서 어깨 밸런스와 균형을 잡는 운동을 학습합니다.",
    category: "어깨",
    posture: "앉은 자세",
    time: 15,
    image: shoulder,
    tags: ["어깨", "앉은 자세"],
  },
  {
    id: 8,
    title: "선 자세 무릎 포스쳐 교정",
    description: "선 자세에서 무릎 포스쳐를 교정하기 위한 운동을 학습합니다.",
    category: "무릎",
    posture: "선 자세",
    time: 15,
    image: knee,
    tags: ["무릎", "선 자세"],
  },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export async function getAllCourses() {
  return JSON.parse(JSON.stringify(courseList));
}

export async function getCoursesByCategory(category) {
  return JSON.parse(
    JSON.stringify(
      courseList.filter((course) => course.tags.includes(category)),
    ),
  );
}

export async function getCoursesByPosture(posture) {
  return JSON.parse(
    JSON.stringify(
      courseList.filter((course) => course.tags.includes(posture)),
    ),
  );
}

export const getCourseFromLocal = (id) => {
  const coursesFromLocalStorage =
    JSON.parse(localStorage.getItem("courses")) || [];
  const allCourses = [...courseList, ...coursesFromLocalStorage];

  const course = allCourses.find((course) => course.id === id);

  return course || null;
};

// export const getCourse = async (pno, mid) => {
//   try {
//     const response = await fetch(
//       `[your domain here]/program/${pno}?mid=${mid}`,
//     );
//     if (!response.ok) {
//       throw new Error("Failed to fetch course data");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("API Call Error:", error);
//     return getCourseFromLocal(pno); // API 호출에 실패한 경우 로컬에서 코스를 가져옵니다.
//   }
// };

/* 

========================
실제 API 부분
========================

*/

function toExerciseSchema(data) {
  return {
    id: data.pno,
    title: data.programTitle,
    description: data.description,
    category: data.category,
    posture: data.position,
    time: data.totalPlayTime,
    actResponseDTO: data.actResponseDTO,
    image: images[data.pno % images.length],
  };
}

export async function getPrograms(page = 1) {
  const params = {
    page,
  };

  const response = await axios.get("/program/list", { params });
  response.data.dtoList = response.data.dtoList.map(toExerciseSchema);
  return response.data;
}

export async function searchProgramsWithName(keyword, page = 1) {
  const params = {
    page,
    type: "t",
    keyword,
  };

  const response = await axios.get("/program/list", { params });
  response.data.dtoList = response.data.dtoList.map(toExerciseSchema);
  return response.data;
}

export async function searchProgramsWithCategory(category, position, page = 1) {
  const mode = [category ? "c" : "", position ? "p" : ""].join("");

  if (mode === "") {
    throw new Error(
      "[searchProgramsWithCategory] category와 position은 모두 비어있을 수 없습니다.",
    );
  }

  const params = {
    type: mode,
    keyword: [category, position].filter((item) => item !== null).join(","),
    page,
  };

  const response = await axios.get("/program/list", { params });
  response.data.dtoList = response.data.dtoList.map(toExerciseSchema);
  return response.data;
}

export async function getCourse(id, mid) {
  const response = await axios.get(`/program/${id}/${mid}`);

  return toExerciseSchema(response.data);
}
