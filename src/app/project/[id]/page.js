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
import ChapterCard from "@/components/project/ChapterCard";
import { getCreditViaTab } from "@/utils/credits";
import Display from "@/components/project/Display";
import { chapterState } from "@/state/atoms/chapterState";
import { journey1, journey2, chapters } from "@/utils/journeys";

const getArrayviaJourney = (journey) => {
  switch (journey) {
    case 1:
      return journey1;
    case 2:
      return journey2;
    case 3:
      return journey2;
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
const getTabsArrayFromChapter = (chapter) => {
  let tabsArray = [];

  journey2
    .filter((item) => item.chapter === chapter)
    .map((item) => {
      tabsArray.push({
        tab: item.tab,
        name: item.title,
        loading: false,
        selected: false,
        data: "",
      });
    });

  return tabsArray;
};

const page = ({ params, searchParams }) => {
  const { id } = params;

  let journey = parseInt(searchParams?.journey) || 1;

  let reselect = Boolean(searchParams?.reselect);

  const [journeyData, setJourneyData] = useRecoilState(journeyState);

  const [chapterData, setChapterData] = useRecoilState(chapterState);

  const [currentChapter, setCurrentChapter] = useState([]);

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

        if (isObjEmpty(data.journey1)) {
          const updatedJourney1 = journey1.map((item, index) => {
            // Set locked to false only for the first item
            if (index === 0) {
              return { ...item, data: null, locked: true, loading: false };
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
            currentTab = data.journey1[`tab${journey1[i].tab}`];

            const selected = currentTab?.selected || false; // Default to false if 'selected' is undefined.

            let locked = !(selected || prevSelected);
            // 'locked' is true if 'selected' is false & the previous item was also false.

            if (journey1[i].tab > 7) {
              locked = false;
            }

            arr.push({
              title: journey1[i].title,
              description: journey1[i].description,
              loading: false,
              data: selected ? currentTab.data : [],
              selected: selected,
              locked: locked,
              tab: journey1[i].tab,
            });

            prevSelected = selected; // Update the 'prevSelected' variable for the next iteration.
          }

          return arr;
        }

      case 2:
        // data = await FetchTabResults(id, journey);
        // console.log(data, "here");

        // if (!data.journey2 || isObjEmpty(data.journey2)) {
        //   // check if tab is selected
        //   // console.log("tab not selected");
        //   // const updatedJourney2 = journey2.map((item, index) => {
        //   //   // Set locked to false only for the first item
        //   //   if (index === 0) {
        //   //     return { ...item, locked: false, loading: false };
        //   //   }
        //   //   // Keep other properties unchanged
        //   //   return { ...item, locked: true, loading: false };
        //   // });

        //   const updatedChapter = chapters.map((item, index) => {
        //     // Set locked to false only for the first item
        //     if (index === 0) {
        //       return {
        //         id: 1,
        //         locked: false,
        //         loading: false,
        //         selected: false,
        //         tabsCompleted: getTabsArrayFromChapter(1),
        //         name: item.name,
        //         description: item.description,
        //       };
        //     }
        //     // Keep other properties unchanged
        //     return {
        //       id: index + 1,
        //       locked: true,
        //       loading: false,
        //       selected: false,
        //       tabsCompleted: getTabsArrayFromChapter(index + 1),
        //       name: item.name,
        //       description: item.description,
        //     };
        //   });

        //   return updatedChapter;
        // } else {
        //   // console.log("tab selected");
        //   let arr = [];

        //   for (let i = 0; i < chapters.length; i++) {
        //     let tabs = getTabsArrayFromChapter(chapters[i].id);
        //     // let prevSelected = false;
        //     for (let j = 0; j < tabs.length; j++) {
        //       let tabData = data.journey2[`tab${tabs[j].tab}`]?.data;
        //       let tabSelected = data.journey2[`tab${tabs[j].tab}`]?.selected;

        //       // if (!tabSelected) {
        //       //   prevSelected = false;
        //       // } else {
        //       //   prevSelected = true;
        //       // }

        //       tabs[j].data = tabData;
        //       tabs[j].selected = tabSelected;
        //       tabs[j] = {
        //         ...tabs[j],
        //         loading: false,
        //       };
        //     }

        //     let obj = {
        //       id: chapters[i].id,
        //       locked: false,
        //       loading: false,
        //       tabsCompleted: tabs,
        //       name: chapters[i].name,
        //       description: chapters[i].description,
        //     };

        //     arr.push(obj);
        //   }
        //   return arr;
        // }
        data = await FetchTabResults(id, journey, reselect);

        if (isObjEmpty(data.journey2)) {
          const updatedJourney = journey2.map((item, index) => {
            // Set locked to false only for the first item
            if (index === 0) {
              return { ...item, data: null, locked: false, loading: false };
            }
            // Keep other properties unchanged
            return { ...item, data: null, locked: true, loading: false };
          });

          return updatedJourney;
        } else {
          // console.log("tab selected");
          let arr = [];
          let prevSelected = false; // Initialize a variable to keep track of the previous item's 'selected' value.
          let currentTab;
          for (let i = 0; i < journey2.length; i++) {
            currentTab = data.journey2[`tab${journey2[i].tab}`];

            const selected = currentTab?.selected || false; // Default to false if 'selected' is undefined.

            let locked = !(selected || prevSelected); // 'locked' is true if 'selected' is false & the previous item was also false.

            arr.push({
              title: journey2[i].title,
              description: journey2[i].description,
              loading: false,
              data: selected ? currentTab.data : [],
              selected: selected,
              locked: locked,
              tab: journey2[i].tab,
              chapter: journey2[i].chapter,
            });

            prevSelected = selected; // Update the 'prevSelected' variable for the next iteration.
          }

          return arr;
        }
      case 3:
        data = await FetchTabResults(id, journey, reselect);

        if (isObjEmpty(data.journey3)) {
          const updatedJourney = journey2.map((item, index) => {
            // Set locked to false only for the first item
            if (index === 0) {
              return { ...item, data: null, locked: false, loading: false };
            }
            // Keep other properties unchanged
            return { ...item, data: null, locked: true, loading: false };
          });

          return updatedJourney;
        } else {
          // console.log("tab selected");
          let arr = [];
          let prevSelected = false; // Initialize a variable to keep track of the previous item's 'selected' value.
          let currentTab;
          for (let i = 0; i < journey2.length; i++) {
            currentTab = data.journey3[`tab${journey2[i].tab}`];

            const selected = currentTab?.selected || false; // Default to false if 'selected' is undefined.

            const locked = !(selected || prevSelected); // 'locked' is true if 'selected' is false & the previous item was also false.

            arr.push({
              title: journey2[i].title,
              description: journey2[i].description,
              loading: false,
              data: selected ? currentTab.data : [],
              selected: selected,
              locked: locked,
              tab: journey2[i].tab,
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
    // if (journey === 2) {
    //   setChapterData(data);
    // }
  }, [journey]);

  useEffect(() => {
    if (!id) {
      router.push("/");
    }

    getTabResults(journey)
      .then((res) => {
        // console.log(res, "getTabResults");
        // setData(res);

        // if (journey === 1 || journey === 3) {
        setJourneyData(res);
        // } else {
        //   console.log(res, "here in chap");
        //   setChapterData(res);
        // }
      })
      .catch((err) => {
        // if (journey === 1 || journey === 3) {
        setJourneyData((prev) => {
          return prev.map((item) => {
            return {
              ...item,
              locked: true,
              loading: false,
            };
          });
        });
        // } else if (journey === 2) {
        //   setChapterData((prev) => {
        //     return prev.map((item) => {
        //       return {
        //         ...item,
        //         locked: true,
        //         loading: false,
        //       };
        //     });
        //   });
        // }

        if (!err?.response?.data?.success || err.response.status === 404) {
          toast.error("Internal Server Error");
          return router.push("/");
        }
      });
  }, [journey, id, reselect]);

  // console.log(chapterData, "chapterData");
  // console.log(journeyData)

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
                  tab={item.tab}
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
                      tab={chapterItem.tab}
                      id={id}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* {journey === 2 && (
        <div class="grid grid-cols-4 h-screen">
          <div class="col-span-1 flex flex-col gap-5 justify-start items-start pb-10">
            {chapterData.map((item, index) => (
              <ChapterCard
                locked={item.locked}
                name={item.name}
                chapter={item.id}
                description={item.description}
                key={item.id}
                loading={item.loading}
                tabsCompleted={item.tabsCompleted}
                setCurrentChapter={setCurrentChapter}
              />
            ))}
          </div>
          <div class="col-span-3 h-screen">
            <Display tabsCompleted={currentChapter} />
          </div>
        </div>
      )} */}

      {journey === 3 && (
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
                      tab={chapterItem.tab}
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
