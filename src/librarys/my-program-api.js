import arms from "../assets/images/arms-up.webp";
import knee from "../assets/images/knee.webp";
import shoulder from "../assets/images/shoulder-up.webp";
import thigh from "../assets/images/thigh.webp";

import axios from "./axios.js";

const images = [arms, knee, shoulder, thigh];

const dummyList = [
  {
    pno: 1,
    programTitle: "더미API",
    description: "test description....",
    category: "SHOULDERS",
    position: "STANDING",
    regDate: "2023-08-30 13:04:37",
  },
  {
    pno: 2,
    programTitle: "더미API",
    description: "change",
    category: "SHOULDERS",
    position: "STANDING",
    regDate: "2023-08-30 13:04:36",
  },
  {
    pno: 3,
    programTitle: "더미API",
    description: "test description....",
    category: "SHOULDERS",
    position: "STANDING",
    regDate: "2023-08-30 13:04:36",
  },
];

function toProgramSchema(data) {
  return {
    id: data.pno,
    title: data.programTitle,
    description: data.description,
    category: data.category,
    posture: data.position,
    image: images[data.pno % images.length],
  };
}

export async function getMyPrograms(mid) {
  const data = {
    mid,
  };

  let response;

  try {
    response = (await axios.get("/program/history/list", data)).data;
  } catch (e) {
    console.error(
      "[getMyPrograms] 요청에 실패했습니다. 더미 데이터를 대신 반환합니다.",
      e,
    );

    response = JSON.parse(JSON.stringify(dummyList));
  }

  return response.map(toProgramSchema);
}
