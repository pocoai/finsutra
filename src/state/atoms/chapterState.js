import { atom } from "recoil";

export const chapterState = atom({
  key: "chapterState",
  default: [
    {
      id: "",
      loading: false,
      locked: false,
      tabsCompleted: [
        {
          tab: 1,
          name: "",
          selected: false,
          loading: false,
          data: "",
        },
      ],
      error: "",
    },
  ],
});
