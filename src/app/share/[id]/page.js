"use client";
import Card, { SharedCard } from "@/components/project/Card";
import SharedHeader from "@/components/project/shareHeader";
import { replaceDotByUnderscore } from "@/utils/helper";
import { chapters, journey1, journey2 } from "@/utils/journeys";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

const page = ({ params, searchParams }) => {
  const { id } = params;
  const router = useRouter();

  const [project, setProject] = useState({
    user: "",
    name: "",
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [journeyData, setJourneyData] = useState([]);

  let journey = parseInt(searchParams?.journey) || 1;

  let api = process.env.NEXT_PUBLIC_URL;

  //   useEffect(() => {}, []);

  //   console.log(journeyData, "journeyData");

  function isFloat(num) {
    return Number(num) === num && num % 1 !== 0;
  }

  const fetchJourney = async () => {
    try {
      let res = await axios.get(`${api}/api/project/${id}/share?journey=${journey}`);

      //   console.log(res.data, "res");

      if (res.data.success) {
        const { data } = res.data;

        setProject({
          name: data.name,
          user: data.userId.firstName,
        });

        return data;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      router.push("/");
    }
  };

  function isObjEmpty(obj) {
    if (!obj) {
      return true;
    }

    return Object.keys(obj).length === 0;
  }

  const handleTabs = async (journey) => {
    let data = await fetchJourney();
    if (journey === 1) {
      if (isObjEmpty(data?.journey1)) {
        setError("No tabs found");
        return [];
      }

      let arr = [];
      let currentTab;
      for (let i = 0; i < journey1.length; i++) {
        if (isFloat(journey1[i].tab)) {
          currentTab = data?.journey1[`tab${replaceDotByUnderscore(journey1[i].tab)}`];
        } else {
          currentTab = data?.journey1[`tab${journey1[i].tab}`];
        }

        if (currentTab?.selected) {
          arr.push({
            title: journey1[i].title,
            description: journey1[i].description,
            loading: false,
            data: currentTab?.data || [],
            selected: true,
            locked: false,
            tab: journey1[i].tab,
          });
        }
      }
      setError(null);
      return arr;
    }
    if (journey === 2) {
      if (isObjEmpty(data?.journey2)) {
        setError("No tabs found");
        return [];
      }
      let arr = [];
      let currentTab;
      for (let i = 0; i < journey2.length; i++) {
        if (isFloat(journey2[i].tab)) {
          currentTab = data?.journey2[`tab${replaceDotByUnderscore(journey2[i].tab)}`];
        } else {
          currentTab = data?.journey2[`tab${journey2[i].tab}`];
        }

        if (currentTab?.selected) {
          arr.push({
            title: journey2[i].title,
            description: journey2[i].description,
            loading: false,
            data: currentTab?.data || [],
            selected: true,
            locked: false,
            chapter: journey2[i].chapter,
            tab: journey2[i].tab,
          });
        }
      }
      setError(null);
      return arr;
    }

    if (journey === 3) {
      if (isObjEmpty(data?.journey3)) {
        setError("No tabs found");
        return [];
      }
      let arr = [];
      let currentTab;
      for (let i = 0; i < journey2.length; i++) {
        if (isFloat(journey2[i].tab)) {
          currentTab = data?.journey3[`tab${replaceDotByUnderscore(journey2[i].tab)}`];
        } else {
          currentTab = data?.journey3[`tab${journey2[i].tab}`];
        }

        if (currentTab?.selected) {
          arr.push({
            title: journey2[i].title,
            description: journey2[i].description,
            loading: false,
            data: currentTab?.data || [],
            selected: true,
            locked: false,
            chapter: journey2[i].chapter,
            tab: journey2[i].tab,
          });
        }
      }
      setError(null);
      return arr;
    }
  };

  useEffect(() => {
    if (error) {
      return;
    }

    let data = getArrayviaJourney(journey);
    setJourneyData(data);
  }, [journey]);

  useEffect(() => {
    setLoading(true);
    handleTabs(journey)
      .then((data) => {
        setJourneyData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Something went wrong! Try again");
        setLoading(false);
      });
  }, [journey, id]);

  //   console.log(journeyData, "journeyData");

  console.log(project, "project");

  return (
    <>
      {!loading && (
        <div className="p-10">
          <SharedHeader id={id} name={project?.name} user={project?.user} journey={journey} />

          <div className="mt-10 mb-5">
            {
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-4 py-10  ">
                {journeyData.length > 0 &&
                  journeyData.map((item, index) => (
                    <SharedCard
                      title={item.title}
                      description={item.description}
                      key={index}
                      selected={item.selected}
                      data={item.data}
                      journey={journey}
                      tab={item.tab}
                    />
                  ))}
              </div>
            }

            {error && <p className="text-red-500 text-center text-lg">{error}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default page;
