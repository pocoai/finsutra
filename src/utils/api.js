let API = process.env.BACKEND_API;

export const getApi = (journey, tab) => {
  if (journey === 1) {
    switch (tab) {
      case 1:
        return `${API}/j1/tab1`;
      case 2:
        return `${API}/j1/tab2`;
    }
  }
};
