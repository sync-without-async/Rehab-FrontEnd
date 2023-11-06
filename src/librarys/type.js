export const ROLE_TYPE = {
  VISITOR: "방문자",
  USER: "환자",
  ADMIN_DOCTOR: "전문의",
  ADMIN_THERAPIST: "재활치료사",
};

export const CATEGORY_TYPE = {
  ARM: "팔",
  SHOULDER: "어깨",
  KNEE: "무릎",
  THIGH: "허벅지",
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

export const DAYJS_FORMAT = "YYYY/MM/DD HH:mm";
