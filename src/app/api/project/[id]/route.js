import Project from "@/models/Project";
import { API, PORTKEY, getApi, getContent } from "@/utils/api";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";

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
      .select("journey1 name query")
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
      return new Response(null, { status: 404, statusText: "Not Found" });
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

  let result;

  const { data } = await request.json();

  let project = await Project.findById(id);

  if (!project) {
    return new Response(null, { status: 404, statusText: "Not Found" });
  }

  if (journey === 1) {
    if (tab === 1) {
      let tab1 = {
        data: data,
        selected: true,
      };

      project.journey1 = {};
      project.journey1["tab1"] = tab1;

      await project.save();
    }

    if (tab === 2) {
      let api = getApi(1, 2);

      let pitch = project.journey1.tab1.data[1]?.value;
      let icp = project.journey1.tab1.data[2]?.value;

      console.log(pitch, icp, "pitch");

      try {
        let result = await axios.post(
          api,
          {
            variables: {
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
            },
            {
              new: true,
            }
          );

          console.log(updated_res, "updated_res");
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

      let pitch = project.journey1.tab1.data[1]?.value;
      let icp = project.journey1.tab1.data[2]?.value;

      console.log(pitch, icp, "pitch");

      try {
        let result = await axios.post(
          api,
          {
            variables: {
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

          let updated_res = await Project.findByIdAndUpdate(
            id,
            {
              "journey1.tab3": tab3,
            },
            {
              new: true,
            }
          );

          console.log(updated_res, "updated_res");
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

      let pitch = project.journey1.tab1.data[1]?.value;
      let icp = project.journey1.tab1.data[2]?.value;

      console.log(pitch, icp, "pitch");

      try {
        let result = await axios.post(
          api,
          {
            variables: {
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

        console.log(result.data, "api results ");

        if (result.data.success) {
          let tab4 = {
            data: getContent(result),
            selected: true,
          };

          let updated_res = await Project.findByIdAndUpdate(
            id,
            {
              "journey1.tab4": tab4,
            },
            {
              new: true,
            }
          );

          console.log(updated_res, "updated_res");
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

      let pitch = project.journey1.tab1.data[1]?.value;
      let icp = project.journey1.tab1.data[2]?.value;

      console.log(pitch, icp, "pitch");

      try {
        let result = await axios.post(
          api,
          {
            variables: {
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

        console.log(result.data, "api results ");

        if (result.data.success) {
          let tab = {
            data: result.data.data.choices[0].message.content,
            selected: true,
          };

          let updated_res = await Project.findByIdAndUpdate(
            id,
            {
              "journey1.tab5": tab,
            },
            {
              new: true,
            }
          );

          console.log(updated_res, "updated_res");
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

      let pitch = project.journey1.tab1.data[1]?.value;
      let icp = project.journey1.tab1.data[2]?.value;

      console.log(pitch, icp, "pitch");

      try {
        let result = await axios.post(
          api,
          {
            variables: {
              elevator_pitch: pitch,
              ideal_customer_profile: icp,
              brand_guidelines: "",
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-portkey-api-key": PORTKEY,
            },
          }
        );

        console.log(result.data, "api results ");

        if (result.data.success) {
          let tab = {
            data: result.data.data.choices[0].message.content,
            selected: true,
          };

          let updated_res = await Project.findByIdAndUpdate(
            id,
            {
              "journey1.tab6": tab,
            },
            {
              new: true,
            }
          );

          console.log(updated_res, "updated_res");
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

      let pitch = project.journey1.tab1.data[1]?.value;
      let icp = project.journey1.tab1.data[2]?.value;

      let psfit = project.journey1.tab2.data.ps_list;

      let solutions = "";
      for (let i = 0; i < psfit.length; i++) {
        let d = psfit[i]["Solution"];

        solutions = solutions + d + "\n";
      }

      console.log(pitch, icp, "pitch");

      try {
        let result = await axios.post(
          api,
          {
            variables: {
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

        console.log(result.data, "api results ");

        if (result.data.success) {
          let tab = {
            data: result.data.data.choices[0].message.content,
            selected: true,
          };

          let updated_res = await Project.findByIdAndUpdate(
            id,
            {
              "journey1.tab7": tab,
            },
            {
              new: true,
            }
          );

          console.log(updated_res, "updated_res");
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

      let pitch = project.journey1.tab1.data[1]?.value;
      let icp = project.journey1.tab1.data[2]?.value;

      try {
        let result = await axios.get(`${api}?x=${pitch}&y=${icp}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(result.data, "api results ");

        if (result.data.success) {
          let tab = {
            data: result.data.content,
            selected: true,
          };

          let updated_res = await Project.findByIdAndUpdate(
            id,
            {
              "journey1.tab8": tab,
            },
            {
              new: true,
            }
          );

          console.log(updated_res, "updated_res");
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

      let pitch = project.journey1.tab1.data[1]?.value;
      let icp = project.journey1.tab1.data[2]?.value;

      console.log(pitch, icp, "pitch");

      try {
        let result = await axios.post(
          api,
          {
            variables: {
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

        console.log(result.data, "api results ");

        if (result.data.success) {
          let tab = {
            data: getContent(result),
            selected: true,
          };

          let updated_res = await Project.findByIdAndUpdate(
            id,
            {
              "journey1.tab9": tab,
            },
            {
              new: true,
            }
          );

          console.log(updated_res, "updated_res");
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
    if (tab === 1) {
      let api = getApi(2, 1);

      let pitch = project.journey1.tab1.data[1]?.value;
      let icp = project.journey1.tab1.data[2]?.value;
      let ind = project.journey1.tab1.data[3]?.value;
      let ps = project.journey1.tab1.data[4]?.value;
      let vp = project.journey1.tab1.data[5]?.value;

      console.log(pitch, icp, "pitch");

      let result = await axios.post(
        api,
        {
          variables: {
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
        let tab2 = {
          data: result.data.data.choices[0].message.content,
          selected: true,
        };

        let updated_res = await Project.findByIdAndUpdate(
          id,
          {
            "journey2.tab1": tab2,
          },
          {
            new: true,
          }
        );

        console.log(updated_res, "updated_res");
      } else {
        return new Response(null, { status: 404, statusText: "Not Found" });
      }
    }
    if (tab === 2) {
      let api = getApi(2, 2);

      let pitch = project.journey1.tab1.data[1]?.value;
      let icp = project.journey1.tab1.data[2]?.value;
      let ind = project.journey1.tab1.data[3]?.value;
      let ps = project.journey1.tab1.data[4]?.value;
      let vp = project.journey1.tab1.data[5]?.value;

      console.log(pitch, icp, "pitch");

      let result = await axios.post(
        api,
        {
          variables: {
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
        let tab2 = {
          data: result.data.data.choices[0].message.content,
          selected: true,
        };

        let updated_res = await Project.findByIdAndUpdate(
          id,
          {
            "journey2.tab2": tab2,
          },
          {
            new: true,
          }
        );

        console.log(updated_res, "updated_res");
      } else {
        return new Response(null, { status: 404, statusText: "Not Found" });
      }
    }
    if (tab === 3) {
      let api = getApi(2, 3);

      let pitch = project.journey1.tab1.data[1]?.value;
      let icp = project.journey1.tab1.data[2]?.value;
      let ind = project.journey1.tab1.data[3]?.value;
      let ps = project.journey1.tab1.data[4]?.value;
      let vp = project.journey1.tab1.data[5]?.value;

      console.log(pitch, icp, "pitch");

      let result = await axios.post(
        api,
        {
          variables: {
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
        let tab2 = {
          data: result.data.data.choices[0].message.content,
          selected: true,
        };

        let updated_res = await Project.findByIdAndUpdate(
          id,
          {
            "journey2.tab3": tab2,
          },
          {
            new: true,
          }
        );

        console.log(updated_res, "updated_res");
      } else {
        return new Response(null, { status: 404, statusText: "Not Found" });
      }
    }
  }

  return NextResponse.json({
    success: true,
    message: "project updated",
  });
}
