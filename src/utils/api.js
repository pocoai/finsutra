export const API = process.env.BACKEND_API;
export const PORTKEY = process.env.PORTKEY;

export const getApi = (journey, tab) => {
  if (journey === 1) {
    switch (tab) {
      case 1:
        return `${API}/0751cc5b-dac7-4c6e-8a95-abcf5f320c6f/generate`;
      case 2:
        return `${API}/3ebac38d-1acf-4ae8-b191-e73883a708a6/generate`;
    }
  }
};
