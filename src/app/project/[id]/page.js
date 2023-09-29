"use client";

import Header from "@/components/project/header";
// import React, { useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import Card from "@/components/project/Card";
import InputModal from "@/components/project/InputIdeaModal";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { journeyState } from "@/state/atoms/tabState";
import ResultModal from "@/components/project/ResultModal";
import { toast } from "react-toastify";

const journey1 = [
  {
    title: "Idea articulation",
    description: "Define & clarify your innovative concept.",
    loading: true,
    locked: true,
  },
  {
    title: "Problem Solution Fit",
    description: "Assess product-market alignment for success.",
    loading: true,
    locked: true,
  },
  {
    title: "Brand Kit",
    description: "Establish visual & brand identity elements.",
    loading: true,
    locked: true,
  },
  {
    title: "Positioning & Messaging",
    description: "Craft compelling brand positioning.",
    loading: true,
    locked: true,
  },
  {
    title: "Coming Soon Page",
    description: "Tease & prepare for your product launch.",
    loading: true,
    locked: true,
  },
  {
    title: "Build your MVP",
    description: "Create a minimal viable product efficiently.",
    loading: true,
    locked: true,
  },
  {
    title: "Features to Monetize",
    description: "Identify profit-generating product features.",
    loading: true,
    locked: true,
  },
  {
    title: "Research & Knowledge Bank",
    description: "Store valuable insights & information.",
    loading: true,
    locked: true,
  },
  {
    title: "Business Model Canvas",
    description: "Outline your business strategy & model.",
    loading: true,
    locked: true,
  },
  {
    title: "Financial Statement",
    description: "Forecast your financial projections.",
    loading: true,
    locked: true,
  },
];

const journey2 = [
  {
    title: "1.1 Assembling the Founding Team: Skills, Roles, & Culture Fit",
    description: "Define team skills, roles, & culture fit.",
    loading: true,
    chapter: 1,
  },
  {
    title: "1.2 Introduction to Idea Validation",
    description: "Initiate idea validation processes.",
    loading: true,
    chapter: 1,
  },
  {
    title: "1.3 Building a Vision & Mission Statement",
    description: "Create a compelling vision & mission.",
    loading: true,
    chapter: 1,
  },
  {
    title: "1.4 Market Research & Analysis",
    description: "Analyze market trends & insights.",
    loading: true,
    chapter: 1,
  },
  {
    title: "1.5 Customer Identification & Segmentation",
    description: "Identify & segment target customers.",
    loading: true,
    chapter: 1,
  },
  {
    title: "1.6 Value Proposition Design",
    description: "Craft a unique value proposition.",
    loading: true,
    chapter: 1,
  },
  {
    title: "1.7 Business Model Canvas",
    description: "Develop a business model strategy.",
    loading: true,
    chapter: 1,
  },
  {
    title: "1.8 Competitive Analysis",
    description: "Analyze competitors & their strengths.",
    loading: true,
    chapter: 1,
  },
  {
    title: "2.1 Defining Project Objectives",
    description: "Clearly define project objectives & goals.",
    loading: true,
    chapter: 2,
  },
  {
    title: "2.2 Setting Key Performance Indicators (KPIs)",
    description: "Identify & set key performance indicators (KPIs).",
    loading: true,
    chapter: 2,
  },
  {
    title: "2.3 Milestones & Timelines",
    description: "Outline project milestones & timelines.",
    loading: true,
    chapter: 2,
  },
  {
    title: "2.4 Risk Assessment & Mitigation",
    description: "Assess project risks & plan for mitigation.",
    loading: true,
    chapter: 2,
  },
  {
    title: "2.5 Regulatory & Compliance Checklist",
    description: "Create a regulatory & compliance checklist.",
    loading: true,
    chapter: 2,
  },
  {
    title: "2.6 Fundraising Strategy",
    description: "Develop a fundraising strategy & approach.",
    loading: true,
    chapter: 2,
  },
  {
    title: "2.7 Contingency Planning",
    description: "Plan for contingencies & unexpected events.",
    loading: true,
    chapter: 2,
  },

  {
    title: "3.1 HR: Hiring & Team Building",
    description: "Recruit & build your team effectively.",
    loading: true,
    chapter: 3,
  },
  {
    title: "3.2 Financial Resources - Budgeting & Forecasting",
    description: "Create budgets & financial forecasts.",
    loading: true,
    chapter: 3,
  },
  {
    title: "3.3 Physical Resources: Office Space, Equipment, etc.",
    description: "Secure office space & essential equipment.",
    loading: true,
    chapter: 3,
  },
  {
    title: "3.4 Digital Resources: Software & Tools",
    description: "Select & implement digital software & tools.",
    loading: true,
    chapter: 3,
  },
  {
    title: "3.5 Outsourcing vs. In-house: Making Strategic Decisions",
    description: "Make strategic decisions on outsourcing vs. in-house tasks.",
    loading: true,
    chapter: 3,
  },
  {
    title: "3.6 Time Management & Productivity Tools",
    description: "Manage time effectively using productivity tools.",
    loading: true,
    chapter: 3,
  },
  {
    title: "4.1 Product Development",
    description: "From Idea to Minimum Viable Product (MVP)",
    loading: true,
    chapter: 4,
  },
  {
    title: "4.2 Pilot Sales",
    description: "Testing the Market & Adjusting the Product.",
    loading: true,
    chapter: 4,
  },
  {
    title: "4.3 Marketing & Sales Strategy",
    description: "Plan your marketing & sales approach.",
    loading: true,
    chapter: 4,
  },
  {
    title: "4.4 Building a Customer Success Team",
    description: "Create a team for customer success.",
    loading: true,
    chapter: 4,
  },
  {
    title: "4.5 Financial Management",
    description: "Manage your financial resources effectively.",
    loading: true,
    chapter: 4,
  },
  {
    title: "4.6 Customer Service & Retention",
    description: "Focus on customer service & retention strategies.",
    loading: true,
    chapter: 4,
  },
  {
    title: "4.7 Iterative Process",
    description: "Implement iterative development processes.",
    loading: true,
    chapter: 4,
  },
];

const chapters = [
  {
    id: 1,
    name: "Architectural Plan",
  },
  {
    id: 2,
    name: "Project Plan",
  },
  {
    id: 3,
    name: "Resource Allocation Plan",
  },
  {
    id: 4,
    name: "Product Development Plan",
  },
];

const groupJourneyDataByChapter = (journeyData) => {
  const groupedData = {};

  journeyData.forEach((item) => {
    const chapter = item.chapter;
    if (!groupedData[chapter]) {
      groupedData[chapter] = [];
    }
    groupedData[chapter].push(item);
  });

  return groupedData;
};

const getArrayviaJourney = (journey) => {
  switch (journey) {
    case 1:
      return journey1;
    case 2:
      return journey2;
    case 3:
      return journey3;
    default:
      return journey1;
  }
};

function isObjEmpty(obj) {
  if (!obj) {
    return true;
  }

  return Object.keys(obj).length === 0;
}

const page = ({ params, searchParams }) => {
  const { id } = params;

  let journey = parseInt(searchParams?.journey) || 1;

  let reselect = Boolean(searchParams?.reselect);

  const [journeyData, setJourneyData] = useRecoilState(journeyState);

  // const [data, setData] = useState(getArrayviaJourney(journey));
  const [projectName, setProjectName] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);
  const [choices, setChoices] = useState({
    query: "",
    queryResults: [],
  });
  const api = process.env.NEXT_PUBLIC_URL;

  const router = useRouter();

  const { getToken } = useAuth();
  const FetchTabResults = async (id, journey, reselect) => {
    let token = await getToken();

    let res = await axios.get(`${api}/api/project/${id}?journey=${journey}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(res.data, "res sss");

    let data = res.data.data;

    if (data.query && data.queryResults.length === 0 && journey === 1) {
      setChoices({
        query: data.query,
        queryResults: [],
      });

      setShowResultModal(true);
    }

    if (data?.queryResults?.length > 0 && journey === 1 && !data?.journey1?.tab1?.selected) {
      setChoices({
        query: data.query,
        queryResults: data.queryResults,
      });

      setShowResultModal(true);
    }

    if (reselect && journey === 1 && data?.queryResults?.length > 0) {
      setChoices({
        query: data.query,
        queryResults: data.queryResults,
      });

      setShowResultModal(true);
    }

    if (data?.name) {
      setProjectName(data.name);
    }

    return data;
  };

  const getTabResults = async (journey) => {
    let data;
    switch (journey) {
      case 1:
        data = await FetchTabResults(id, journey, reselect);

        // console.log(data, "here");
        if (isObjEmpty(data.journey1)) {
          // check if tab is selected
          const updatedJourney1 = journey1.map((item, index) => {
            // Set locked to false only for the first item
            if (index === 0) {
              return { ...item, data: null, locked: false, loading: false };
            }
            // Keep other properties unchanged
            return { ...item, data: null, locked: true, loading: false };
          });

          return updatedJourney1;
        } else {
          // console.log("tab selected");
          let arr = [];
          let prevSelected = false; // Initialize a variable to keep track of the previous item's 'selected' value.
          let currentTab;
          for (let i = 0; i < journey1.length; i++) {
            currentTab = data.journey1[`tab${i + 1}`];

            const selected = currentTab?.selected || false; // Default to false if 'selected' is undefined.

            const locked = !(selected || prevSelected); // 'locked' is true if 'selected' is false & the previous item was also false.

            arr.push({
              title: journey1[i].title,
              description: journey1[i].description,
              loading: false,
              data: selected ? currentTab.data : [],
              selected: selected,
              locked: locked,
            });

            prevSelected = selected; // Update the 'prevSelected' variable for the next iteration.
          }

          return arr;
        }

      case 2:
        data = await FetchTabResults(id, journey);
        console.log(data, "here");

        if (!data.journey2 || isObjEmpty(data.journey2)) {
          // check if tab is selected
          console.log("tab not selected");
          const updatedJourney2 = journey2.map((item, index) => {
            // Set locked to false only for the first item
            if (index === 0) {
              return { ...item, locked: false, loading: false };
            }
            // Keep other properties unchanged
            return { ...item, locked: true, loading: false };
          });

          return updatedJourney2;
        } else {
          // console.log("tab selected");
          let arr = [];
          let prevSelected = false; // Initialize a variable to keep track of the previous item's 'selected' value.

          for (let i = 0; i < journey2.length; i++) {
            const currentTab = data.journey2[`tab${i + 1}`];
            const selected = currentTab?.selected || false; // Default to false if 'selected' is undefined.

            const locked = !(selected || prevSelected); // 'locked' is true if 'selected' is false & the previous item was also false.

            arr.push({
              title: journey2[i].title,
              description: journey2[i].description,
              loading: false,
              data: selected ? currentTab.data : [],
              selected: selected,
              locked: locked,
              chapter: journey2[i].chapter,
            });

            prevSelected = selected; // Update the 'prevSelected' variable for the next iteration.
          }

          return arr;
        }
      default:
        return [];
    }
  };

  useEffect(() => {
    let data = getArrayviaJourney(journey);
    setJourneyData(data);
  }, [journey]);

  useEffect(() => {
    if (!id) {
      router.push("/");
    }

    getTabResults(journey)
      .then((res) => {
        // console.log(res, "getTabResults");
        // setData(res);
        setJourneyData(res);
      })
      .catch((err) => {
        setJourneyData((prev) => {
          return prev.map((item) => {
            return {
              ...item,
              locked: true,
              loading: false,
            };
          });
        });

        if (!err?.response?.data?.success || err.response.status === 404) {
          toast.error("Internal Server Error");
          return router.push("/");
        }
      });
  }, [journey, id, reselect]);

  return (
    <div className="">
      <Header id={id} name={projectName} journey={journey} />

      {showResultModal && (
        <ResultModal
          id={id}
          choices={choices.queryResults}
          query={choices.query}
          isOpen={showResultModal}
          setIsOpen={setShowResultModal}
          reselect={reselect}
        />
      )}

      <div className="mt-10 mb-5">
        {journey === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-4 py-10  ">
            {journeyData.length > 0 &&
              journeyData.map((item, index) => (
                <Card
                  title={item.title}
                  description={item.description}
                  key={index}
                  selected={item.selected}
                  loading={item.loading}
                  data={item.data}
                  journey={journey}
                  locked={item.locked}
                  tab={index + 1}
                  id={id}
                />
              ))}
          </div>
        )}
      </div>

      {journey === 2 && (
        <div>
          {chapters.map((item, index) => (
            <div key={index}>
              <h1 className="px-4 text-black text-xl font-medium">
                Chapter {item.id}: {item.name}
              </h1>
              <hr className="mt-2" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-4 py-5  ">
                {journeyData
                  .filter((chapter) => chapter.chapter === item.id)
                  .map((chapterItem, chapterIndex) => (
                    <Card
                      title={chapterItem.title}
                      description={chapterItem.description}
                      key={chapterIndex}
                      selected={chapterItem.selected}
                      loading={chapterItem.loading}
                      data={chapterItem.data}
                      journey={journey}
                      locked={chapterItem.locked}
                      tab={chapterIndex + 1}
                      id={id}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
