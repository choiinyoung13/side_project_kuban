import { atom } from "recoil";

export const idState = atom({
  key: "idState", // 고유한 ID
  default: 4, // 기본값
});

export const contentIdState = atom({
  key: "contentidState", // 고유한 ID
  default: 1, // 기본값
});
