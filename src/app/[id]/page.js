import Header from "@/components/project/header";
// import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/components/project/Card";

const journey1 = [
  {
    title: " Idea articulation",
    description: "Please select an option from the below card",
  },
  {
    title: " Problem Solution Fit",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
  {
    title: " Brand Kit",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
  {
    title: " Positioning and Messaging ",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
  {
    title: " Coming Soon Page",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
  {
    title: " Build your MVP",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
  {
    title: " Features to Monetize",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
  {
    title: "Research & Knowledge Bank",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
  {
    title: "Business Model Canvas",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
];

const journey2 = [
  {
    title: "Aligning Resources & Manpower",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
  {
    title: "Deep Dive - Reach Pillar    ",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
  {
    title: "Deep Dive - Nurture Pillar",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
  {
    title: "Deep Dive - Commitment Pillar",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
  {
    title: "Deep Dive - Customer Success Pillar",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
  {
    title: "Enabling Tech Pre-Product    ",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
];

const journey3 = [
  {
    title: "Channel Management",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
  {
    title: "Social Media Management",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
  {
    title: "Influencer or Not ?",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
  {
    title: "SEO Strategy",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus perspiciatis tempore accusamus dolores eum ullam ipsa quos quis eius dicta.",
  },
];

const getTabResults = (journey) => {
  switch (journey) {
    case 1:
      return journey1.map((item, index) => {
        if (index <= 1) {
          item.selected = true;
        } else {
          item.selected = false;
        }

        return item;
      });
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
  }
};

const page = async ({ params, searchParams }) => {
  const { id } = params;

  // console.log("searchParams", searchParams);

  let journey = parseInt(searchParams?.journey) || 1;
  const data = (await getTabResults(journey)) || [];

  return (
    <div className="">
      <Header id={id} name={"Cloud Kitchen idea 2 "} journey={journey} />

      <div className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-8 ">
          {data.length > 0 &&
            data.map((item, index) => (
              <Card
                title={item.title}
                description={item.description}
                key={index}
                selected={item.selected}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default page;
