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
];

const journey3 = [
  {
    title: "Channel Management",
    description: "This tab is not yet processed",
    loading: true,
  },
  {
    title: "Social Media Management",
    description: "This tab is not yet processed",
    loading: true,
  },
  {
    title: "Influencer or Not ?",
    description: "This tab is not yet processed",
    loading: true,
  },
  {
    title: "SEO Strategy",
    description: "This tab is not yet processed",
    loading: true,
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
  const FetchTabResults = async (id, journey) => {
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

    if (data?.name) {
      setProjectName(data.name);
    }

    return data;
  };

  const getTabResults = async (journey) => {
    let data;
    switch (journey) {
      case 1:
        data = await FetchTabResults(id, journey);

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

      case 3:
        return journey3.map((item, index) => {
          if (index < 1) {
            item.selected = true;
          } else {
            item.selected = false;
          }

          return item;
        });

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
  }, [journey, id]);

  // useEffect(() => {
  //   document.querySelector("#idea_modal").checked = showInput;
  // }, [showInput]);

  const groupedJourneyData = groupJourneyDataByChapter(journeyData);

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
        />
      )}

      <div className="my-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-4 py-10  ">
          {journey === 1 &&
            journeyData.length > 0 &&
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

          {journey === 2 &&
            journeyData.map((item, index) => (
              <div key={index} className="">
                {index === 0 || item.chapter !== journeyData[index - 1].chapter ? (
                  <h2 className="text-brand text-xl font-bold p-2">Chapter {item.chapter}</h2>
                ) : (
                  <div className="py-6"></div>
                )}
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default page;
