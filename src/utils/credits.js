export const creditPricing = [
  {
    tab: "journey1_tab1",
    journey: 1,
    name: "Idea Articulation",
    amount: 0,
  },
  {
    tab: "journey1_tab2",
    journey: 1,
    name: "Problem Solution Fit ",
    amount: 2,
  },

  {
    tab: "journey1_tab3",
    journey: 1,
    name: "Brand Kit",
    amount: 2,
  },
  {
    tab: "journey1_tab4",
    journey: 1,
    name: "Positioning & Messaging",
    amount: 2,
  },
  {
    tab: "journey1_tab5",
    journey: 1,
    name: "Coming Soon Page",
    amount: 2,
  },
  {
    tab: "journey1_tab6",
    journey: 1,
    name: "Build your MVP",
    amount: 2,
  },
  {
    tab: "journey1_tab7",
    journey: 1,
    name: "Features to Monetize",
    amount: 2,
  },
  ,
  {
    tab: "journey1_tab8",
    journey: 1,
    name: "Research & Knowledge Bank",
    amount: 5,
  },
  {
    tab: "journey1_tab9",
    journey: 1,
    name: "Business Model Canvas",
    amount: 5,
  },
  {
    tab: "journey2_tab1",
    journey: 2,
    name: "Assembling the Founding Team",
    amount: 2,
  },
  {
    tab: "journey2_tab2",
    journey: 2,
    name: "Introduction to Idea Validation",
    amount: 2,
  },
  {
    tab: "journey2_tab3",
    journey: 2,
    amount: 2,
    name: "Vision & Mission Statement",
  },
  {
    tab: "journey2_tab4",
    journey: 2,
    amount: 2,
  },
  {
    tab: "journey2_tab5",
    journey: 2,
    amount: 2,
  },
  {
    tab: "journey2_tab6",
    journey: 2,
    amount: 85,
  },
  {
    tab: "journey2_tab7",
    journey: 2,
    amount: 2,
  },
  {
    tab: "journey2_tab8",
    journey: 2,
    amount: 2,
  },
  {
    tab: "journey3_tab1",
    journey: 3,
    amount: 2,
  },
  ,
  {
    tab: "journey3_tab2",
    journey: 3,
    amount: 2,
  },
  {
    tab: "journey3_tab3",
    journey: 3,
    amount: 2,
  },
  {
    tab: "journey3_tab4",
    journey: 3,
    amount: 2,
  },
];

export const getCreditViaTab = (journey, tab) => {
  return creditPricing.find((item) => item?.tab === `journey${journey}_tab${tab}`)?.amount || 0;
};
