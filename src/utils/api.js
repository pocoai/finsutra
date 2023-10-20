export const API = process.env.NEXT_PUBLIC_BACKEND_API;
export const PORTKEY = process.env.PORTKEY;

export const getContent = (result) => {
  const parsedContent = JSON.parse(result.data.data.choices[0].message.content);
  return parsedContent.content || parsedContent;
};

export const getApi = (journey, tab = null) => {
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
      case 9.5:
        return `https://api.portkey.ai/v1/prompts/4fc110d7-3b49-45c5-875d-0c0b004c9703/generate`;
      case 10:
        return `https://api.portkey.ai/v1/prompts/c2f2a969-047b-4a0e-9d4f-9dcc690801e7/generate`;
      default:
        return new Error("Specify Tab");
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
      case 4:
        return `https://api.portkey.ai/v1/prompts/d10a8fbf-92bf-41fe-a458-5515a47a5b5d/generate`;
      case 5:
        return `https://api.portkey.ai/v1/prompts/6d5fff48-4a94-4a4a-9f91-241d4fbe2fe2/generate`;
      case 6:
        return `https://api.portkey.ai/v1/prompts/d7c6ec3f-48c1-4818-aba0-dd57d935cd05/generate`;
      case 7:
        return `https://api.portkey.ai/v1/prompts/b547b13d-4c3c-4e6f-acb7-68f4175b26ea/generate`;
      case 8:
        return `https://api.portkey.ai/v1/prompts/3b2d36f1-0a7c-4686-bb44-2be657a68140/generate`;
      case 9:
        return `https://api.portkey.ai/v1/prompts/d4ec2849-f3b6-4347-8320-5612b2f6e763/generate`;
      case 10:
        return `https://api.portkey.ai/v1/prompts/4d203ffb-847d-4cc7-a698-d1900aee98d3/generate`;
      case 11:
        return `https://api.portkey.ai/v1/prompts/bf4bf835-6613-49cb-ab14-3e7c0149b8d9/generate`;
      case 12:
        return `https://api.portkey.ai/v1/prompts/41e05144-23c0-47e2-b226-3af9209457a0/generate`;
      case 13:
        return `https://api.portkey.ai/v1/prompts/c76a2bee-beaf-4188-ab44-ddae08033b5c/generate`;
      case 14:
        return `https://api.portkey.ai/v1/prompts/50a8c4a8-c29b-4165-a60a-40b34d70e155/generate`;
      case 15:
        return `https://api.portkey.ai/v1/prompts/7ba1bfe2-47b7-49a6-803b-4fbda7e7d8d4/generate`;
      case 16:
        return `https://api.portkey.ai/v1/prompts/2949f02a-0fd5-46d0-a80a-0a06e75a101e/generate`;
      case 17:
        return `https://api.portkey.ai/v1/prompts/6265cafb-769e-4b62-8c40-4c3f0168364e/generate`;
      case 18:
        return `https://api.portkey.ai/v1/prompts/30cc3437-0a83-45ff-9613-035ed265cdf5/generate`;
      case 19:
        return `https://api.portkey.ai/v1/prompts/6a41b8f2-0707-4069-9cde-ad5e87334be8/generate`;
      case 20:
        return `https://api.portkey.ai/v1/prompts/3e098b0c-3e8c-4945-be70-b3dddd09b651/generate`;
      case 21:
        return `https://api.portkey.ai/v1/prompts/63726fc8-863b-40f4-a284-315ba5a8f65c/generate`;
      case 22:
        return `https://api.portkey.ai/v1/prompts/00a7cd93-efba-4420-8d98-30ab07afa31f/generate`;
      case 23:
        return `https://api.portkey.ai/v1/prompts/0ff6543c-d967-416a-a1bf-7421d89478f3/generate`;
      case 24:
        return `https://api.portkey.ai/v1/prompts/68aa509e-a942-45f8-9f9b-125e1d59bbfa/generate`;
      case 25:
        return `https://api.portkey.ai/v1/prompts/180ad7b6-beec-43db-9652-06c239aee21b/generate`;
      case 26:
        return `https://api.portkey.ai/v1/prompts/84477fbe-aff1-4b1c-8ec8-0c1b80149941/generate`;
      case 27:
        return `https://api.portkey.ai/v1/prompts/c0f0700a-03bf-4335-acb5-47f7627842da/generate`;
      case 28:
        return `https://api.portkey.ai/v1/prompts/f3d53251-24fa-4ca8-8e63-e0f04e51cc55/generate`;
      default:
        return new Error("Specify Tab");
    }
  }
  if (journey === 3) {
    return "https://api.portkey.ai/v1/prompts/32098e1b-6abd-49cb-8b2b-d48bfa1c6fb6/generate";
  }
};
