export const API = process.env.BACKEND_API;
export const PORTKEY = process.env.PORTKEY;

export const getContent = (result) => {
  const parsedContent = JSON.parse(result.data.data.choices[0].message.content);
  return parsedContent.content || parsedContent;
};

export const getApi = (journey, tab) => {
  if (journey === 1) {
    switch (tab) {
      case 1:
        return `${API}/0751cc5b-dac7-4c6e-8a95-abcf5f320c6f/generate`;
      case 2:
        return `${API}/3ebac38d-1acf-4ae8-b191-e73883a708a6/generate`;
      case 3:
        return `${API}/f01a264a-d1a5-46c1-b5f5-1632b2bafc48/generate`;
      case 4:
        return `${API}/fe7af321-3ec3-48a6-8e8d-04db3c5f602d/generate`;
      case 5:
        return `${API}/a276473a-3349-4c8f-b406-f3414dd8b066/generate`;
      case 6:
        return `${API}/5d1028eb-c771-4a96-a312-92cdbe1ccff3/generate`;
      case 9:
        return `${API}/70ab27c2-fdf2-4af4-a389-c2690f989b3f/generate`;
    }
  }
  if (journey === 2) {
    switch (tab) {
      case 1:
        return `${API}/03c51065-2924-4561-b9d3-defea9a7ab1b/generate`;
      case 2:
        return `${API}/5ea609ce-4321-43e3-b0f4-80b74ed2dd07/generate`;

      case 3:
        return `${API}/f98542a9-03a7-4659-b84b-ab77bf09da6d/generate`;
    }
  }
};
