export const ROLE_TYPE = {
  VISITOR: "방문자",
  USER: "환자",
  DOCTOR: "전문의",
  THERAPIST: "재활치료사",
};

export const CATEGORY_TYPE = {
  ARM: "팔",
  SHOULDER: "어깨",
  KNEE: "무릎",
  THIGH: "허벅지",
};

export const GENDER_TYPE = {
  Male: "남성",
  Female: "여성",
};

export const ROLE_LIST = Object.entries(ROLE_TYPE).map((key, value) => [
  key,
  value,
]);

export const CATEGORY_LIST = Object.entries(CATEGORY_TYPE).map(
  ([key, value]) => ({
    key,
    value,
  }),
);

export const GENDER_LIST = Object.entries(GENDER_TYPE).map(([key, value]) => ({
  key,
  value,
}));

export const DATE_FORMAT = "YYYY/MM/DD HH:mm";

export const METRICS_PASS = 0.6;

// https://en.wikipedia.org/wiki/Absolute_Category_Rating
export const METRICS_GRADE = [
  {
    metrics: 0.2,
    grade: "Bad",
  },
  {
    metrics: 0.4,
    grade: "Poor",
  },
  {
    metrics: 0.6,
    grade: "Fair",
  },
  {
    metrics: 0.8,
    grade: "Good",
  },
  {
    metrics: 1.0,
    grade: "Excellent",
  },
];
