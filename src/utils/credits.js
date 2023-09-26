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
    name: "Market Research & Analysis",
    journey: 2,
    amount: 2,
  },
  {
    tab: "journey2_tab5",
    journey: 2,
    name: "Customer Identification & Segmentation",
    amount: 2,
  },
  {
    tab: "journey2_tab6",
    journey: 2,
    name: "Value Proposition Design",
    amount: 2,
  },
  {
    tab: "journey2_tab7",
    journey: 2,
    name: "Business Model Canvas",
    amount: 2,
  },
  {
    tab: "journey2_tab8",
    journey: 2,
    name: "Competitive Analysis",
    amount: 2,
  },
  {
    tab: "journey2_tab9",
    journey: 2,
    name: "Defining Project Objectives",
    amount: 2,
  },
  {
    tab: "journey2_tab10",
    journey: 2,
    name: "KPIs",
    amount: 2,
  },
  {
    tab: "journey2_tab11",
    journey: 2,
    name: "Milestones and Timelines",
    amount: 2,
  },
  {
    tab: "journey2_tab12",
    journey: 2,
    name: "Risk Assessment & Mitigation",
    amount: 2,
  },
  {
    tab: "journey2_tab13",
    journey: 2,
    name: "Regulatory & Compliance Checklist",
    amount: 2,
  },
  {
    tab: "journey2_tab14",
    journey: 2,
    name: "Fundraising Strategy",
    amount: 2,
  },
  {
    tab: "journey2_tab15",
    journey: 2,
    name: "Contingency Planning",
    amount: 2,
  },
];

export const getCreditViaTab = (journey, tab) => {
  return creditPricing.find((item) => item?.tab === `journey${journey}_tab${tab}`)?.amount || 0;
};
