export const API = process.env.NEXT_PUBLIC_BACKEND_API;
export const PORTKEY = process.env.PORTKEY;

export const getContent = (result) => {
  const parsedContent = JSON.parse(result.data.data.choices[0].message.content);
  return parsedContent.content || parsedContent;
};

export const getApi = (journey, tab) => {
  if (journey === 1) {
    switch (tab) {
      case 1:
        return `https://api.portkey.ai/v1/prompts/0751cc5b-dac7-4c6e-8a95-abcf5f320c6f/generate`;
      case 2:
        return `https://api.portkey.ai/v1/prompts/3ebac38d-1acf-4ae8-b191-e73883a708a6/generate`;
      case 3:
        return `https://api.portkey.ai/v1/prompts/f01a264a-d1a5-46c1-b5f5-1632b2bafc48/generate`;
      case 4:
        return `https://api.portkey.ai/v1/prompts/fe7af321-3ec3-48a6-8e8d-04db3c5f602d/generate`;
      case 5:
        return `https://api.portkey.ai/v1/prompts/a276473a-3349-4c8f-b406-f3414dd8b066/generate`;
      case 6:
        return `https://api.portkey.ai/v1/prompts/5d1028eb-c771-4a96-a312-92cdbe1ccff3/generate`;
      case 7:
        return `https://api.portkey.ai/v1/prompts/556843a6-fdeb-4ef6-815e-2c358c7609ca/generate`;
      case 8:
        return `https://api.promptbook.in/j1/tab8`;
      case 9:
        return `https://api.portkey.ai/v1/prompts/70ab27c2-fdf2-4af4-a389-c2690f989b3f/generate`;
    }
  }
  if (journey === 2) {
    switch (tab) {
      case 1:
        return `https://api.portkey.ai/v1/prompts/03c51065-2924-4561-b9d3-defea9a7ab1b/generate`;
      case 2:
        return `https://api.portkey.ai/v1/prompts/5ea609ce-4321-43e3-b0f4-80b74ed2dd07/generate`;

      case 3:
        return `https://api.portkey.ai/v1/prompts/f98542a9-03a7-4659-b84b-ab77bf09da6d/generate`;
    }
  }
};
