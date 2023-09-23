import React, { useState } from "react";
import {
  WorkDropdown,
  GoalDropdown,
  SkillDropdown,
  OrgDropdown,
} from "../dropdowns/Slide2Dropdown";
// import { toast } from "react-toastify";
import "animate.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

// console.log(session);

// await setDoc(doc(db, "interests"), {
//   goal: selecteGoal,
//   work: selectedWork,
//   org: selectedOrg,
//   skill: selectedSkill,
// });
const work = [
  { id: "____________" },
  { name: "Product Designer" },
  { name: "Web Designer" },
  { name: "Developer" },
  { name: "Team Lead" },
  { name: "Founder/Executive" },
  { name: "Other" },
];
const org = [
  { id: "____________" },
  { name: "Enterprise" },
  { name: "Start-up (1-50)" },
  { name: "Start-up (50+)" },
  { name: "UI/UX agency" },
  { name: "Branding firm" },
  { name: "I'm a freelancer" },
];
const goal = [
  { id: "____________" },
  { name: "Build website" },
  { name: "Create & manage systems" },
  { name: "Create prototype" },
  { name: "Build a business" },
  { name: "Other" },
];
const skill = [
  { id: "____________" },
  { name: "React" },
  { name: "NodeJs" },
  { name: "Html" },
  { name: "Python" },
];

// const value = selectedValue
const Slide2 = ({ hidden, activeSlide }) => {
  const [selectedWork, setSelectedWork] = useState(work[0]);
  const [selectedOrg, setSelectedOrg] = useState(org[0]);
  const [selectedGoal, setSelectedGoal] = useState(goal[0]);
  const [selectedSkill, setSelectedSkill] = useState(skill[0]);

  const router = useRouter();
  let { getToken } = useAuth();

  let getAccessToken = async () => {
    let token = await getToken();

    return token;
  };

  const api = process.env.NEXT_PUBLIC_URL;
  const setInterests = async () => {
    try {
      let response = await axios.post(
        `${api}/api/onboarding`,
        {
          interests: {
            work: selectedWork.name,
            designation: selectedOrg.name,
            goal: selectedGoal.name,
            skill: selectedSkill.name,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAccessToken()}`,
          },
        }
      );

      if (response.data.success) {
        console.log(response.data.data, "data");
        return response.data;
      }
    } catch (error) {
      return error;
    }
  };

  const handleInterests = async () => {
    if (
      selectedWork.id === "____________" ||
      selectedOrg.id === "____________" ||
      selectedGoal.id === "____________" ||
      selectedSkill.id === "____________"
    ) {
      alert("Please select all the fields");
      // toast.error("Please select all the fields");
      return;
    } else {
      // call api
      let res = await setInterests();

      if (res.success) {
        router.push("/");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div
      className={`${hidden ? "hidden" : "w-full flex flex-col items-center justify-center"} ${
        activeSlide === 2
          ? "transition-opacity duration-1000 ease-in-out opacity-100"
          : "transition-opacity duration-1000 ease-in-out opacity-0 transform translate-x-8"
      }`}
    >
      <div className="flex flex-col mt-32 h-[500px] justify-start items-start gap-10 p-10 w-full  animate__animated animate__fadeInLeft ">
        <p className="text-black lg:text-[25px] font-bold">Get Started </p>
        <div className=" text-black lg:text-[25px]  flex flex-col justify-center items-start ">
          <div className=" flex flex-col lg:flex lg:flex-row animate__animated animate__fadeInDown">
            <div className="flex">
              <p className="whitespace-nowrap">I am a</p> &nbsp;
              <WorkDropdown
                value={"work"}
                selectedWork={selectedWork}
                setSelectedWork={setSelectedWork}
              />
            </div>
            {selectedWork.id ? (
              <></>
            ) : (
              <div className="flex mt-2 lg:mt-0 animate__animated animate__fadeInDown">
                <p className="whitespace-nowrap">and I work for</p> &nbsp;
                {selectedWork && (
                  <OrgDropdown
                    value={"org"}
                    selectedOrg={selectedOrg}
                    setSelectedOrg={setSelectedOrg}
                  />
                )}
              </div>
            )}
          </div>
          {selectedOrg.id ? (
            <></>
          ) : (
            <div className="flex lg:flex-col mt-2 mb-2 lg:mt-2 lg:mb-2 animate__animated animate__fadeInDown">
              <div className="lg:flex">
                <p className="whitespace-nowrap">I want to use Favcy Navigator to</p> &nbsp;
                <span className="flex">
                  <GoalDropdown
                    value={"goal"}
                    selectedGoal={selectedGoal}
                    setSelectedGoal={setSelectedGoal}
                  />
                </span>
              </div>
            </div>
          )}

          {selectedGoal.id ? (
            <></>
          ) : (
            <div className="flex animate__animated animate__fadeInDown">
              <p className="whitespace-nowrap"> and I use</p> &nbsp;
              <SkillDropdown
                value={"skill"}
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
              />
            </div>
          )}
        </div>

        {selectedSkill.id !== "____________" && (
          <div className="lg:mt-8  flex justify-start lg:w-[150px] animate__animated animate__fadeInDown">
            <button
              onClick={async () => {
                await handleInterests();
              }}
              className="border-black rounded-full bg-brand text-white py-2 px-6 text-[20px]"
            >
              {"Let's go!"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide2;
