"use client";

import Header from "@/components/project/header";
// import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/components/project/Card";
import InputModal from "@/components/project/InputIdeaModal";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

const journey1 = [
  {
    title: " Idea articulation",
    description: "Please select an option from the below card",
    loading: true,
  },
  {
    title: " Problem Solution Fit",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
  {
    title: " Brand Kit",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
  {
    title: " Positioning and Messaging ",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
  {
    title: " Coming Soon Page",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
  {
    title: " Build your MVP",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
  {
    title: " Features to Monetize",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
  {
    title: "Research & Knowledge Bank",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
  {
    title: "Business Model Canvas",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
];

const journey2 = [
  {
    title: "Aligning Resources & Manpower",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
  {
    title: "Deep Dive - Reach Pillar    ",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
  {
    title: "Deep Dive - Nurture Pillar",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
  {
    title: "Deep Dive - Commitment Pillar",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
  {
    title: "Deep Dive - Customer Success Pillar",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
  {
    title: "Enabling Tech Pre-Product    ",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
];

const journey3 = [
  {
    title: "Channel Management",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
  {
    title: "Social Media Management",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
  {
    title: "Influencer or Not ?",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
  {
    title: "SEO Strategy",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
    loading: true,
  },
];

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

  const [data, setData] = useState(getArrayviaJourney(journey));
  const [showInput, setShowInput] = useState(false);

  const { getToken } = useAuth();
  const FetchTabResults = async (id, journey) => {
    let token = await getToken();

    let res = await axios.get(`http://localhost:3000/api/project/${id}?journey=${journey}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);

    if (res.data.data.query === "") {
      setShowInput(true);
    }

    return res.data.data;
  };

  const getTabResults = async (journey) => {
    switch (journey) {
      case 1:
        let data = await FetchTabResults(id, journey);
        console.log(data, "here");
        if (isObjEmpty(data.journey1)) {
          // check if tab is selected
          // console.log("tab not selected");
          return journey1.map((item, index) => {
            item.selected = false;
            item.loading = false;
            return item;
          });
        } else {
          // console.log("tab selected");
          let arr = [];
          for (let i = 0; i < journey1.length; i++) {
            if (data.journey1[`tab${i + 1}`]?.selected) {
              arr.push({
                title: journey1[i].title,
                description: journey1[i].description,
                loading: false,
                data: data.journey1[`tab${i + 1}`].data,
                selected: true,
              });
            } else {
              arr.push({
                title: journey1[i].title,
                description: journey1[i].description,
                loading: false,
                data: [],
                selected: false,
              });
            }
          }

          return arr;
        }

      case 2:
        return journey2.map((item, index) => {
          if (index < 1) {
            item.selected = true;
          } else {
            item.selected = false;
          }

          return item;
        });
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
    if (journey === 1) {
      getTabResults(journey).then((res) => {
        console.log(res, "getTabResults");
        setData(res);
      });
    }
  }, [journey]);

  useEffect(() => {
    document.querySelector("#idea_modal").checked = showInput;
  }, [showInput]);

  return (
    <div className="">
      <Header id={id} name={"Cloud Kitchen idea 2 "} journey={journey} />

      <InputModal id={id} />

      <div className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-8 ">
          {data.length > 0 &&
            data.map((item, index) => (
              <Card
                title={item.title}
                description={item.description}
                key={index}
                selected={item.selected}
                loading={item.loading}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default page;
