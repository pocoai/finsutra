import Project from "@/models/Project";
import { API, PORTKEY, getApi, getContent } from "@/utils/api";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";

import { connectDb } from "@/app/lib/connectDb";
import { getCreditViaTab } from "@/utils/credits";
import User from "@/models/User";

const journey2 = [
  {
    title: "1.1 Assembling the Founding Team: Skills, Roles, & Culture Fit",
    description: "Define team skills, roles, & culture fit.",
    loading: true,
    chapter: 1,
    tab: 1,
  },
  {
    title: "1.2 Introduction to Idea Validation",
    description: "Initiate idea validation processes.",
    loading: true,
    chapter: 1,
    tab: 2,
  },
  {
    title: "1.3 Building a Vision & Mission Statement",
    description: "Create a compelling vision & mission.",
    loading: true,
    chapter: 1,
    tab: 3,
  },
  {
    title: "1.4 Market Research & Analysis",
    description: "Analyze market trends & insights.",
    loading: true,
    chapter: 1,
    tab: 4,
  },
  {
    title: "1.5 Customer Identification & Segmentation",
    description: "Identify & segment target customers.",
    loading: true,
    chapter: 1,
    tab: 5,
  },
  {
    title: "1.6 Value Proposition Design",
    description: "Craft a unique value proposition.",
    loading: true,
    chapter: 1,
    tab: 6,
  },
  {
    title: "1.7 Business Model Canvas",
    description: "Develop a business model strategy.",
    loading: true,
    chapter: 1,
    tab: 7,
  },
  {
    title: "1.8 Competitive Analysis",
    description: "Analyze competitors & their strengths.",
    loading: true,
    chapter: 1,
    tab: 8,
  },
  {
    title: "2.1 Defining Project Objectives",
    description: "Clearly define project objectives & goals.",
    loading: true,
    chapter: 2,
    tab: 9,
  },
  {
    title: "2.2 Setting Key Performance Indicators (KPIs)",
    description: "Identify & set key performance indicators (KPIs).",
    loading: true,
    chapter: 2,
    tab: 10,
  },
  {
    title: "2.3 Milestones & Timelines",
    description: "Outline project milestones & timelines.",
    loading: true,
    chapter: 2,
    tab: 11,
  },
  {
    title: "2.4 Risk Assessment & Mitigation",
    description: "Assess project risks & plan for mitigation.",
    loading: true,
    chapter: 2,
    tab: 12,
  },
  {
    title: "2.5 Regulatory & Compliance Checklist",
    description: "Create a regulatory & compliance checklist.",
    loading: true,
    chapter: 2,
    tab: 13,
  },
  {
    title: "2.6 Fundraising Strategy",
    description: "Develop a fundraising strategy & approach.",
    loading: true,
    chapter: 2,
    tab: 14,
  },
  {
    title: "2.7 Contingency Planning",
    description: "Plan for contingencies & unexpected events.",
    loading: true,
    chapter: 2,
    tab: 15,
  },

  {
    title: "3.1 HR: Hiring & Team Building",
    description: "Recruit & build your team effectively.",
    loading: true,
    chapter: 3,
    tab: 16,
  },
  {
    title: "3.2 Financial Resources - Budgeting & Forecasting",
    description: "Create budgets & financial forecasts.",
    loading: true,
    chapter: 3,
    tab: 17,
  },
  {
    title: "3.3 Physical Resources: Office Space, Equipment, etc.",
    description: "Secure office space & essential equipment.",
    loading: true,
    chapter: 3,
    tab: 18,
  },
  {
    title: "3.4 Digital Resources: Software & Tools",
    description: "Select & implement digital software & tools.",
    loading: true,
    chapter: 3,
    tab: 19,
  },
  {
    title: "3.5 Outsourcing vs. In-house: Making Strategic Decisions",
    description: "Make strategic decisions on outsourcing vs. in-house tasks.",
    loading: true,
    chapter: 3,
    tab: 20,
  },
  {
    title: "3.6 Time Management & Productivity Tools",
    description: "Manage time effectively using productivity tools.",
    loading: true,
    chapter: 3,
    tab: 21,
  },
  {
    title: "4.1 Product Development",
    description: "From Idea to Minimum Viable Product (MVP)",
    loading: true,
    chapter: 4,
    tab: 22,
  },
  {
    title: "4.2 Pilot Sales",
    description: "Testing the Market & Adjusting the Product.",
    loading: true,
    chapter: 4,
    tab: 23,
  },
  {
    title: "4.3 Marketing & Sales Strategy",
    description: "Plan your marketing & sales approach.",
    loading: true,
    chapter: 4,
    tab: 24,
  },
  {
    title: "4.4 Building a Customer Success Team",
    description: "Create a team for customer success.",
    loading: true,
    chapter: 4,
    tab: 25,
  },
  {
    title: "4.5 Financial Management",
    description: "Manage your financial resources effectively.",
    loading: true,
    chapter: 4,
    tab: 26,
  },
  {
    title: "4.6 Customer Service & Retention",
    description: "Focus on customer service & retention strategies.",
    loading: true,
    chapter: 4,
    tab: 27,
  },

  {
    title: "4.7 Iterative Process",
    description: "Implement iterative development processes.",
    loading: true,
    chapter: 4,
    tab: 28,
  },
];

await connectDb();

const SubCredits = async (userId, journey, tab) => {
  let user = await User.findOne({ userId });

  if (!user) {
    return false;
  }

  user.credits -= getCreditViaTab(journey, tab);

  user.creditsHistory.push({
    date: new Date(),
    credits: getCreditViaTab(journey, tab),
    tab,
    journey,
    type: "remove",
  });

  await user.save();

  // console.log("credits of user", user.credits);

  return true;
};

export async function GET(request, { params }) {
  const id = params.id;

  let { userId } = auth();

  let journey = request.nextUrl.searchParams.get("journey");

  journey = parseInt(journey);

  let project;

  if (journey === 1) {
    project = await Project.findOne({
      _id: id,
      uid: userId,
    })
      .select("journey1 name query queryResults")
      .lean();

    if (!project) {
      return new Response(null, { status: 404, statusText: "Not Found" });
    }

    if (!project.query) {
      project.query = "";
    }
  }

  if (journey === 2) {
    project = await Project.findOne({
      _id: id,
      uid: userId,
    })
      .select("journey2 name")
      .lean();

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: "not_found",
        },
        { status: 404, statusText: "Not Found" }
      );
      // return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (journey === 3) {
    project = await Project.findOne({
      _id: id,
      uid: userId,
    })
      .select("journey3 name")
      .lean();

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: "not_found",
        },
        { status: 404, statusText: "Not Found" }
      );
      // return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.json({
    success: true,
    data: project,
  });
}

export async function POST(request, { params }) {
  const { userId } = auth();

  const { id } = params;

  const journey = parseInt(request.nextUrl.searchParams.get("journey"));
  const tab = parseInt(request.nextUrl.searchParams.get("tab"));

  console.log(id, journey, tab);
  let result;

  const { data } = await request.json();

  let project = await Project.findById(id);

  // console.log(project);

  if (!project) {
    return new Response(null, { status: 404, statusText: "Not Found" });
  }

  if (journey === 1) {
    let name = project?.journey1?.tab1?.data[0]?.value;
    let pitch = project?.journey1?.tab1?.data[1]?.value;
    let icp = project?.journey1?.tab1?.data[2]?.value;

    if (tab === 1) {
      if (!data) {
        return new Response(
          {
            success: false,
            error: "No data",
          },
          { status: 404, statusText: "Not Found" }
        );
      }

      let tab1 = {
        data: data,
        selected: true,
      };

      // console.log(data, "tab1");

      project.name = data.find((item) => item.key === "Name").value || "";
      project.journey1 = {};
      project.journey1["tab1"] = tab1;
      project.currentStage[journey] = tab;

      await project.save();

      return NextResponse.json({
        success: true,
        message: "project updated",
        data: project.journey1.tab1,
      });
    }

    if (tab === 2) {
      let api = getApi(1, 2);

      // console.log(pitch, icp, "pitch");

      try {
        let result = await axios.post(
          api,
          {
            variables: {
              name,
              elevator_pitch: pitch,
              ideal_customer_profile: icp,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-portkey-api-key": PORTKEY,
            },
          }
        );

        // console.log(result.data, "api results ");

        if (result.data.success) {
          let tab2 = {
            data: getContent(result),
            selected: true,
          };

          let updated_res = await Project.findByIdAndUpdate(
            id,
            {
              "journey1.tab2": tab2,
              [`currentStage.${journey}`]: tab,
            },
            {
              new: true,
            }
          );

          let isCreditDeducted = await SubCredits(userId, journey, tab);

          if (isCreditDeducted) {
            return NextResponse.json({
              success: true,
              message: "project updated",
              data: updated_res.journey1.tab2,
            });
          }
        } else {
          return new Response(null, { status: 404, statusText: "Not Found" });
        }
      } catch (error) {
        console.log(error);
        return new Response(null, { status: 400, statusText: "Internal Server Error" });
      }
    }

    if (tab === 3) {
      let api = getApi(1, 3);

      try {
        let result = await axios.post(
          api,
          {
            variables: {
              name,
              elevator_pitch: pitch,
              ideal_customer_profile: icp,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-portkey-api-key": PORTKEY,
            },
          }
        );

        // console.log(result.data, "api results ");

        if (result.data.success) {
          let tab3 = {
            data: getContent(result),
            selected: true,
          };

          await SubCredits(userId, journey, tab);

          let updated_res = await Project.findByIdAndUpdate(
            id,
            {
              "journey1.tab3": tab3,
              [`currentStage.${journey}`]: tab,
            },
            {
              new: true,
            }
          );

          console.log(updated_res, "updated_res");
          return NextResponse.json({
            success: true,
            message: "project updated",
            data: updated_res.journey1.tab3,
          });
        } else {
          return new Response(null, { status: 404, statusText: "Not Found" });
        }
      } catch (error) {
        console.log(error);
        return new Response(null, { status: 400, statusText: "Internal Server Error" });
      }
    }

    if (tab === 4) {
      let api = getApi(1, 4);

      // console.log(pitch, icp, "pitch");

      try {
        let result = await axios.post(
          api,
          {
            variables: {
              name,
              elevator_pitch: pitch,
              ideal_customer_profile: icp,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-portkey-api-key": PORTKEY,
            },
          }
        );

        // console.log(result.data, "api results ");

        if (result.data.success) {
          let tab4 = {
            data: getContent(result),
            selected: true,
          };
          await SubCredits(userId, journey, tab);
          let updated_res = await Project.findByIdAndUpdate(
            id,
            {
              "journey1.tab4": tab4,
              [`currentStage.${journey}`]: tab,
            },
            {
              new: true,
            }
          );
          // console.log("and", updated_res.journey1.tab4);
          return NextResponse.json({
            success: true,
            message: "project updated",
            data: updated_res.journey1.tab4,
          });
        } else {
          return new Response(null, { status: 404, statusText: "Not Found" });
        }
      } catch (error) {
        console.log(error);
        return new Response(null, { status: 400, statusText: "Internal Server Error" });
      }
    }
    if (tab === 5) {
      let api = getApi(1, 5);

      try {
        let result = await axios.post(
          api,
          {
            variables: {
              name,
              elevator_pitch: pitch,
              ideal_customer_profile: icp,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-portkey-api-key": PORTKEY,
            },
          }
        );

        // console.log(result.data, "api results ");

        if (result.data.success) {
          let tab5 = {
            data: result.data.data.choices[0].message.content,
            selected: true,
          };
          await SubCredits(userId, journey, tab);

          let updated_res = await Project.findByIdAndUpdate(
            id,
            {
              "journey1.tab5": tab5,
              [`currentStage.${journey}`]: tab,
            },
            {
              new: true,
            }
          );
          // console.log(updated_res, "updated_res");
          return NextResponse.json({
            success: true,
            message: "project updated",
            data: updated_res.journey1.tab5,
          });
        } else {
          return new Response(null, { status: 404, statusText: "Not Found" });
        }
      } catch (error) {
        console.log(error);
        return new Response(null, { status: 400, statusText: "Internal Server Error" });
      }
    }
    if (tab === 6) {
      let api = getApi(1, 6);
      let brand_guidelines = project.journey1.tab3.data["Branding Guidelines Summary"] || "";
      // console.log(pitch, icp, "pitch");

      try {
        let result = await axios.post(
          api,
          {
            variables: {
              name,
              elevator_pitch: pitch,
              ideal_customer_profile: icp,
              brand_guidelines,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-portkey-api-key": PORTKEY,
            },
          }
        );

        // console.log(result.data, "api results ");

        if (result.data.success) {
          let tab6 = {
            data: result.data.data.choices[0].message.content,
            selected: true,
          };
          await SubCredits(userId, journey, tab);

          let updated_res = await Project.findByIdAndUpdate(
            id,
            {
              "journey1.tab6": tab6,
              [`currentStage.${journey}`]: tab,
            },
            {
              new: true,
            }
          );
          return NextResponse.json({
            success: true,
            message: "project updated",
            data: updated_res.journey1.tab6,
          });

          // console.log(updated_res, "updated_res");
        } else {
          return new Response(null, { status: 404, statusText: "Not Found" });
        }
      } catch (error) {
        console.log(error);
        return new Response(null, { status: 400, statusText: "Internal Server Error" });
      }
    }
    if (tab === 7) {
      let api = getApi(1, 7);

      let psfit = project.journey1.tab2.data.ps_list;

      let solutions = "";
      for (let i = 0; i < psfit.length; i++) {
        let d = psfit[i]["Solution"];

        solutions = solutions + d + "\n";
      }

      // console.log(pitch, icp, "pitch");

      try {
        let result = await axios.post(
          api,
          {
            variables: {
              name,
              elevator_pitch: pitch,
              ideal_customer_profile: icp,
              solutions,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-portkey-api-key": PORTKEY,
            },
          }
        );

        // console.log(result.data, "api results ");

        if (result.data.success) {
          let tab7 = {
            data: result.data.data.choices[0].message.content,
            selected: true,
          };

          await SubCredits(userId, journey, tab);

          let updated_res = await Project.findByIdAndUpdate(
            id,
            {
              "journey1.tab7": tab7,
              [`currentStage.${journey}`]: tab,
            },
            {
              new: true,
            }
          );
          // console.log(updated_res, "updated_res");
          return NextResponse.json({
            success: true,
            message: "project updated",
            data: updated_res.journey1.tab7,
          });
        } else {
          return new Response(null, { status: 404, statusText: "Not Found" });
        }
      } catch (error) {
        console.log(error);
        return new Response(null, { status: 400, statusText: "Internal Server Error" });
      }
    }
    if (tab === 8) {
      let api = getApi(1, 8);

      try {
        let result = await axios.get(`${api}?x=${pitch}&y=${icp}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (result.data.success) {
          let tab8 = {
            data: result.data.content,
            selected: true,
          };

          await SubCredits(userId, journey, tab);

          let updated_res = await Project.findByIdAndUpdate(
            id,
            {
              "journey1.tab8": tab8,
              [`currentStage.${journey}`]: tab,
            },
            {
              new: true,
            }
          );

          // console.log(updated_res, "updated_res");
          return NextResponse.json({
            success: true,
            message: "project updated",
            data: updated_res.journey1.tab8,
          });
        } else {
          return new Response(null, { status: 404, statusText: "Not Found" });
        }
      } catch (error) {
        console.log(error);
        return new Response(null, { status: 400, statusText: "Internal Server Error" });
      }
    }
    if (tab === 9) {
      let api = getApi(1, 9);

      try {
        let result = await axios.post(
          api,
          {
            variables: {
              name,
              elevator_pitch: pitch,
              ideal_customer_profile: icp,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-portkey-api-key": PORTKEY,
            },
          }
        );

        // console.log(result.data, "api results ");

        if (result.data.success) {
          let tab9 = {
            data: getContent(result),
            selected: true,
          };

          await SubCredits(userId, journey, tab);

          let updated_res = await Project.findByIdAndUpdate(
            id,
            {
              "journey1.tab9": tab9,
              [`currentStage.${journey}`]: tab,
            },
            {
              new: true,
            }
          );

          // console.log(updated_res, "updated_res");
          return NextResponse.json({
            success: true,
            message: "project updated",
            data: updated_res.journey1.tab9,
          });
        } else {
          return new Response(null, { status: 404, statusText: "Not Found" });
        }
      } catch (error) {
        console.log(error);
        return new Response(null, { status: 400, statusText: "Internal Server Error" });
      }
    }

    if (tab === 10) {
      let api = getApi(1, 10);

      let summary = project?.journey1?.tab9?.data?.BMC_summary;

      try {
        let result = await axios.post(
          api,
          {
            variables: {
              name,
              business_model_canvas_summary: summary,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-portkey-api-key": PORTKEY,
            },
          }
        );

        // console.log(result.data, "api results ");

        if (result.data.success) {
          let tab10 = {
            data: result.data.data.choices[0].message.content,
            selected: true,
          };

          await SubCredits(userId, journey, tab);

          let updated_res = await Project.findByIdAndUpdate(
            id,
            {
              "journey1.tab10": tab10,
              [`currentStage.${journey}`]: tab,
            },
            {
              new: true,
            }
          );

          // console.log(updated_res, "updated_res");
          return NextResponse.json({
            success: true,
            message: "project updated",
            data: updated_res.journey1.tab10,
          });
        } else {
          return new Response(null, { status: 404, statusText: "Not Found" });
        }
      } catch (error) {
        console.log(error);
        return new Response(null, { status: 400, statusText: "Internal Server Error" });
      }
    }
  }

  if (journey === 2) {
    if (tab >= 1) {
      let api = getApi(2, tab);

      let name = project.journey1.tab1.data.find((item) => item.key === "Name")?.value || "";
      let pitch =
        project.journey1.tab1.data.find((item) => item.key === "Elevator Pitch")?.value || "";
      let icp =
        project.journey1.tab1.data.find((item) => item.key === "Ideal Customer Profile (ICP)")
          ?.value || "";
      let ind = project.journey1.tab1.data.find((item) => item.key === "Industry")?.value || "";
      let ps =
        project.journey1.tab1.data.find((item) => item.key === "Problem Statement")?.value || "";
      let vp =
        project.journey1.tab1.data.find((item) => item.key === "Value Proposition")?.value || "";

      console.log(pitch, icp, name, ind, ps, vp, "pitch,icp,name,ind,ps,vp");

      let result = await axios.post(
        api,
        {
          variables: {
            name: name,
            elevator_pitch: pitch,
            ideal_customer_profile: icp,
            industry: ind,
            problem_statement: ps,
            value_proposition: vp,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-portkey-api-key": PORTKEY,
          },
        }
      );

      // console.log(result.data, "api results ");

      if (result.data.success) {
        let tabData = {
          data: result.data.data.choices[0].message.content,
          selected: true,
        };
        await SubCredits(userId, journey, tab);
        let updated_res = await Project.findByIdAndUpdate(
          id,
          {
            [`journey2.tab${tab}`]: tabData,
            [`currentStage.${journey}`]: tab,
          },
          {
            new: true,
          }
        );

        console.log(updated_res, "updated_res");
        return NextResponse.json({
          success: true,
          message: "project updated",
          data: updated_res.journey2[`tab${tab}`],
        });
      } else {
        return new Response(null, { status: 404, statusText: "Not Found" });
      }
    }
  }

  if (journey === 3) {
    let api = getApi(3);

    let name = "Chapter " + journey2.find((item) => item.tab === Number(tab)).title;

    let content = "";

    if (project?.journey2[`tab${tab}`]?.selected) {
      content = project.journey2[`tab${tab}`]?.data;
    } else {
      return NextResponse.json(
        {
          success: false,
          message: `Please complete the ${name} in journey 2`,
        },
        { status: 400, statusText: "Internal Server Error" }
      );
    }

    // console.log(name, content.slice(0, 80), "varaibles");

    try {
      let result = await axios.post(
        api,
        {
          variables: {
            name: name,
            content: content,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-portkey-api-key": PORTKEY,
          },
        }
      );

      // console.log(result.data, "j3 tab");

      if (result.data.success) {
        let tabData = {
          data: getContent(result),
          selected: true,
        };

        await SubCredits(userId, journey, tab);

        let updated_res = await Project.findByIdAndUpdate(
          id,
          {
            [`journey3.tab${tab}`]: tabData,
            [`currentStage.${journey}`]: tab,
          },
          {
            new: true,
          }
        );

        // console.log(updated_res, "updated_res");
        return NextResponse.json({
          success: true,
          message: "project updated",
          data: updated_res.journey3[`tab${tab}`],
        });
      } else {
        return new Response(null, { status: 404, statusText: "Not Found" });
      }
    } catch (error) {
      return new Response(
        {
          success: false,
          message: "Internal Server Error",
        },
        { status: 400, statusText: "Internal Server Error" }
      );
    }
  }

  return new Response(
    {
      success: false,
      message: "Internal Server Error",
    },
    { status: 400, statusText: "Internal Server Error" }
  );
}
