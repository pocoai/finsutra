// atoms.js
import { atom, selector } from "recoil";

export const userState = atom({
  key: "user",
  default: {
    userId: "",
    isLoaded: false,
    firstName: "",
    onboarded: false,
    currentPlan: "",
    creditHistory: [],
    image: "",
    interests: {},
    purchaseHistory: [],
  },
});

export const creditCountState = selector({
  key: "creditCount",
  get: ({ get }) => {
    const user = get(userState);
    return user.credits;
  },
  set: ({ set }, newValue) => {
    set(userState, (oldUserState) => ({
      ...oldUserState,
      credits: newValue,
    }));
  },
});
