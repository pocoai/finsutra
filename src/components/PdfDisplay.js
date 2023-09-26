"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
const api = process.env.NEXT_PUBLIC_URL;
import { AiFillCloseCircle } from "react-icons/ai";
// import { useSelector } from "react-redux";
import Markdown from "react-markdown";
import { getTitleFromUrl } from "@/helpers/auth";
import { FcDownload } from "react-icons/fc";
import html2pdf from "html2pdf.js";

const PdfDisplay = ({ setShowPdf, showPdf, id }) => {
  const toggleSidebar = () => {
    setShowPdf(!showPdf);
  };

  // const { currentProject } = useSelector((state) => state.project);
  // nir
  const [currentProject, setCurrentProject] = useState([]);
  // nir
  const [downloading, setisDownloading] = useState(false);

  const reportTemplateRef = useRef(null);

  // let html2pdf; // nir

  // nir
  const { getToken } = useAuth();
  const FetchProject = async (id) => {
    let token = await getToken();

    let res = await axios.get(`${api}/api/getCurrentProject/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  };
  // nir

  // nir
  useEffect(() => {
    FetchProject(id).then((res) => {
      console.log(res.data.data);
      setCurrentProject(res.data.data);
    });
  }, []);

  console.log("hello world", currentProject);
  // nir

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     // Import and use html2pdf only on the client-side
  //     import("html2pdf.js").then((html2pdfModule) => {
  //       html2pdf = html2pdfModule.default; // Assuming html2pdf.js exports default
  //       // Use html2pdf here
  //     });
  //   }
  // }, []);

  const handleGeneratePdf = async () => {
    const contentElement = reportTemplateRef.current;
    const pdfOptions = {
      margin: [10, 10, 20, 10],
      filename: currentProject[0]?.name + ".pdf",
      image: { type: "jpeg", quality: 1 },
      enableLinks: true,
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["legacy"] },
    };
    setisDownloading(true);

    try {
      if (typeof window !== "undefined") {
        const pdf = await html2pdf()
          .set(pdfOptions)
          .from(contentElement)
          .toPdf()
          .get("pdf")
          .then(async function (pdf) {
            const totalPages = pdf.internal.getNumberOfPages();

            for (let i = 1; i <= totalPages; i++) {
              pdf.setPage(i);

              const img = new Image();

              // Ensure the image is loaded before trying to add it
              img.onload = function () {
                pdf.addImage(img, "png", 150, 270, 50, 20);
              };

              img.src = "/images/logo.png";
            }
          })
          .save();
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    setisDownloading(false);
  };

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowPdf(false);
      }
    };

    if (showPdf) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPdf]);

  return (
    <div className="flex flex-col items-center justify-center  py-2 z-50">
      {/* {showPdf && (
        <button
          className="flex text-4xl text-black items-center cursor-pointer fixed right-10 top-6 z-50"
          onClick={() => setShowPdf(!showPdf)}
        >
          x
        </button>
      )} */}

      <div ref={sidebarRef}>
        <div
          className={`top-[60px] right-0 w-[35vw] bg-white p-5 text-white fixed z-5 h-full  ease-in-out duration-2000 ${
            showPdf ? "translate-x-0 " : "translate-x-full"
          }`}
        >
          <div className="h-[80%] overflow-y-scroll w-full  text-black p-4 space-y-4  ">
            {downloading && (
              <div className="flex flex-col items-center h-full justify-center gap-5">
                <p>
                  <FcDownload className="animate-ping w-[100px] h-[100px] text-gray-500" />
                </p>
                <p> Downloading... Please wait </p>
              </div>
            )}
            {!downloading && (
              <div ref={reportTemplateRef}>
                <div className="page-break html2pdf__page-break">
                  <h1 className="text-2xl my-3 font-bold">
                    Project Name : {currentProject[0]?.name}
                  </h1>

                  <h2 className="text-xl my-3 font-bold text-gray-600">
                    Journey #1 : Zero to Coming Soon{" "}
                  </h2>
                  <h4 className="text-xl my-3 font-medium">
                    Idea Articulation
                  </h4>
                  {currentProject[0]?.journey1?.tab1.selected && (
                    <div className="flex flex-col items-start justify-start space-y-4 text-xs ">
                      <table className="table-auto ">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 border border-gray-500 bg-[#FF7F50]">
                              Title
                            </th>
                            <th className="px-4 py-2 border border-gray-500 bg-[#FF7F50]">
                              Description
                            </th>
                          </tr>
                        </thead>
                        {currentProject[0]?.journey1?.tab1?.data?.map(
                          (item, index) => {
                            return (
                              // <div
                              //   key={index}
                              //   className="flex justify-start items-start space-x-2 "
                              // >
                              //   <p className="font-semibold">{item.key}</p>:<p>{item.value}</p>
                              // </div>

                              <tbody key={index}>
                                <tr>
                                  <td className=" px-4 py-2 border border-gray-500 ">
                                    {item.key}
                                  </td>
                                  <td className=" px-4 py-2 border border-gray-500">
                                    {item.value}
                                  </td>
                                </tr>
                              </tbody>
                            );
                          }
                        )}
                      </table>
                    </div>
                  )}
                </div>

                <div className="page-break my-5 html2pdf__page-break" id="page">
                  <h4 className="text-xl my-3">Problem Solution Fit</h4>
                  {currentProject[0]?.journey1?.tab2?.selected && (
                    <div className="flex flex-col items-start justify-start space-y-4 text-xs">
                      {currentProject[0].journey1?.tab2?.selected && (
                        <p>
                          <span className="font-semibold">
                            Problem Solution Fit:{" "}
                            {
                              currentProject[0].journey1?.tab2.data[
                                "Executive Summary"
                              ]
                            }
                          </span>
                          :
                        </p>
                      )}
                      <table className="table-auto">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 border border-gray-500 bg-[#FF7F50]">
                              Problem
                            </th>
                            <th className="px-4 py-2 border border-gray-500 bg-[#FF7F50]">
                              Solution
                            </th>
                          </tr>
                        </thead>
                        {currentProject[0]?.journey1?.tab2?.data["ps_list"].map(
                          (item, index) => (
                            <tbody key={index}>
                              <tr>
                                <td className="px-4 py-2 border border-gray-500">
                                  {item?.Problem}
                                </td>
                                <td className="px-4 py-2 border border-gray-500">
                                  {item?.Solution}
                                </td>
                              </tr>
                            </tbody>
                          )
                        )}
                      </table>
                    </div>
                  )}
                </div>

                {/* <div class="page-break"></div> */}
                <div className="html2pdf__page-break">
                  {currentProject[0]?.journey1?.tab3?.selected && (
                    <div className="flex flex-col items-start justify-start space-y-4 text-xs  html2pdf__page-break">
                      <h4 className="text-xl my-3">Brand Kit</h4>

                      <table className="table-fixed ">
                        {currentProject[0].journey1?.tab3?.data &&
                          Object.entries(
                            currentProject[0].journey1?.tab3?.data
                          ).map((item, index) => (
                            // <div key={index} className="flex justify-start items-start space-x-2 ">
                            //   {/* <p className="font-semibold">{item[0]}</p>:<p>{item[1]}</p> */}
                            // </div>
                            <tbody key={index}>
                              <tr>
                                <td className=" px-4 py-2 border border-gray-500 w-[200px]">
                                  {item[0]}
                                </td>
                                <td className=" px-4 py-2 border border-gray-500">
                                  {item[1]}
                                </td>
                              </tr>
                            </tbody>
                          ))}
                      </table>
                    </div>
                  )}
                </div>

                <div className="html2pdf__page-break">
                  hav {currentProject[0]?.journey1?.tab4?.selected && (
                    <div className="flex flex-col items-start justify-start text-xs space-y-4 my-4  ">
                      {/* <h4 className="text-xl my-3">Positioning and Messaging</h4> */}
                      {currentProject[0]?.journey1?.tab4?.data && (
                        <h1 className="text-2xl font-semibold text-gray-800">
                          Positioning Statement field
                        </h1>
                      )}
                      {currentProject[0]?.journey1?.tab4?.data &&
                        currentProject[0]?.journey1?.tab4?.data[
                          "Positioning"
                        ] && (
                          <div className="flex flex-col items-start justify-start space-y-2 ">
                            <p>
                              <span className="font-semibold">
                                Positioning:{" "}
                              </span>
                              {
                                currentProject[0]?.journey1?.tab4?.data[
                                  "Positioning"
                                ]
                              }
                            </p>
                          </div>
                        )}
                      {currentProject[0]?.journey1?.tab4?.data["USPs"] && (
                        <div className="flex flex-col items-start justify-start space-y-2 ">
                          <h1 className="text-2xl font-semibold text-gray-800">
                            USPs
                          </h1>
                          {currentProject[0]?.journey1?.tab4?.data["USPs"]?.map(
                            (item, index) => (
                              <p key={index}>
                                <span className="text-red-500">
                                  {index + 1}&#41;
                                </span>{" "}
                                &nbsp;
                                {item}
                              </p>
                            )
                          )}
                        </div>
                      )}
                      {currentProject[0]?.journey1?.tab4?.data && (
                        <h1 className="text-2xl font-semibold text-gray-800">
                          Favcy Venture builder framework
                        </h1>
                      )}
                      <table className="table-auto ">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 border border-gray-500 bg-pdf">
                              Sr. No
                            </th>
                            <th className="px-4 py-2 border border-gray-500 bg-pdf">
                              Feature
                            </th>
                            <th className="px-4 py-2 border border-gray-500 bg-pdf">
                              Value Proposition
                            </th>
                            <th className="px-4 py-2 border border-gray-500 bg-pdf">
                              Benefit
                            </th>
                          </tr>
                        </thead>
                        {currentProject[0]?.journey1?.tab4?.data &&
                          currentProject[0]?.journey1?.tab4?.data[
                            "Favcy_Venture_builder_framework"
                          ].map((item, index) => (
                            <tbody key={index}>
                              <tr>
                                <td className=" px-4 py-2 border border-gray-500">
                                  {index + 1}
                                </td>
                                <td className=" px-4 py-2 border border-gray-500">
                                  {item.Feature}
                                </td>
                                <td className=" px-4 py-2 border border-gray-500">
                                  {item.Value_Proposition}
                                </td>
                                <td className=" px-4 py-2 border border-gray-500">
                                  {item.Benefit}
                                </td>
                              </tr>
                            </tbody>
                          ))}
                      </table>
                    </div>
                  )}
                </div>

                <div className="html2pdf__page-break"></div>

                {currentProject[0]?.journey1?.tab5?.selected && (
                  <div className="flex flex-col items-start justify-start space-y-4 text-xs my-4  ">
                    <p>
                      <Markdown className="prose text-black text-md ">
                        {currentProject[0]?.journey1?.tab5?.data}
                      </Markdown>
                    </p>
                  </div>
                )}

                <div className="html2pdf__page-break"></div>

                {currentProject[0]?.journey1?.tab6?.selected && (
                  <div className="flex flex-col items-start justify-start space-y-4 text-xs my-4  ">
                    <h1 className="font-bold text-2xl">
                      Minimum Viable Product{" "}
                    </h1>
                    <p>
                      <Markdown className="prose text-black text-md ">
                        {currentProject[0]?.journey1?.tab6?.data}
                      </Markdown>
                    </p>
                  </div>
                )}

                <div className="html2pdf__page-break"></div>
                {currentProject[0]?.journey1?.tab7?.selected && (
                  <div className="flex flex-col items-start justify-start space-y-4 text-xs my-4 ">
                    <h1 className="font-bold text-2xl">
                      Features to Monetize{" "}
                    </h1>
                    <p>
                      <Markdown className="prose text-black text-md ">
                        {currentProject[0]?.journey1?.tab7?.data}
                      </Markdown>
                    </p>
                  </div>
                )}
                <div className="html2pdf__page-break"></div>
                {currentProject[0]?.journey1?.tab8?.selected && (
                  <div className="flex flex-col items-start justify-start space-y-4  html2pdf__page-break">
                    <div className="flex flex-col items-start justify-start space-y-2 ">
                      <p className="text-gray-700">
                        Research and Knowledge Bank provides the best resources
                        that we could curate for you.
                        {/* <br /> */}&nbsp; They include data banks,
                        competitior showcasing or just more information that we
                        believe should be useful for you as a founder.
                      </p>
                    </div>
                    {currentProject[0]?.journey1?.tab8?.data.competitors && (
                      <div className="flex flex-col items-start justify-start space-y-2 text-xs">
                        {/* <h2 className="text-xl font-semibold text-gray-800">Competitors : </h2> */}
                        <table className="table-auto ">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 border border-gray-500 bg-pdf">
                                Sr. No
                              </th>
                              <th className="px-4 py-2 border border-gray-500 bg-pdf">
                                Website
                              </th>
                              {/* {process.env.NEXT_PUBLIC_ENV === "test" && (
                            <th className="px-4 py-2 border border-gray-500 bg-pdf">Type</th>
                          )} */}

                              <th className="px-4 py-2 border border-gray-500 bg-pdf">
                                Description
                              </th>
                            </tr>
                          </thead>
                          {currentProject[0]?.journey1?.tab8?.data &&
                            currentProject[0]?.journey1?.tab8?.data.competitors.map(
                              (item, index) => (
                                <tbody key={index}>
                                  <tr>
                                    <td className=" px-4 py-2 border border-gray-500">
                                      {index + 1}
                                    </td>
                                    <td className=" px-4 py-2 border border-gray-500">
                                      <a
                                        href={
                                          item?.url?.includes("http")
                                            ? item?.url
                                            : `https://${item?.url}`
                                        }
                                        target="_blank"
                                        className="text-orange-500 font-medium outline-none border-none"
                                        style={{
                                          width: "200px",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {/* {item?.url}
                                         */}

                                        {item?.domain ||
                                          getTitleFromUrl(item?.url)}

                                        {/* {item?.url?.includes("http") ? item?.url : `https://${item?.url}`} */}
                                      </a>
                                    </td>
                                    {/* {process.env.NEXT_PUBLIC_ENV === "test" && (
                                  <td className=" px-4 py-2 border border-gray-500">
                                    {item?.type}
                                  </td>
                                )} */}
                                    <td className=" px-4 py-2 border border-gray-500">
                                      {item?.description}
                                    </td>
                                  </tr>
                                </tbody>
                              )
                            )}
                        </table>
                      </div>
                    )}
                  </div>
                )}
                <div className="html2pdf__page-break"></div>
                {currentProject[0]?.journey1?.tab9?.selected && (
                  <div className="text-xs">
                    <h1 className="font-bold text-2xl my-2">
                      Business Model Canvas{" "}
                    </h1>
                    <table id="bizcanvas" cellspacing="0">
                      <tr className="">
                        <td colSpan="2" rowSpan="2" className="divCont">
                          <h4>Key Partners</h4>
                          {currentProject[0]?.journey1?.tab9?.data[
                            "Key Partners"
                          ].map((item, index) => (
                            <p
                              className={`
                      ${
                        index % 2 === 0
                          ? "bg-[#f69e53] shadow-md text-white"
                          : " bg-[#f9ece0] shadow-md text-black"
                      }
                      text-xs cards
                      
                      `}
                              key={index}
                            >
                              {item}
                            </p>
                          ))}
                        </td>
                        <td colspan="2" className="divCont">
                          <h4>Key Activities</h4>
                          {currentProject[0]?.journey1?.tab9?.data[
                            "Key Activities"
                          ].map((item, index) => (
                            <p
                              className={`
                      ${
                        index % 2 === 0
                          ? "bg-[#f69e53] shadow-md text-white"
                          : " bg-[#f9ece0] shadow-md text-black"
                      }
                      text-xs cards
                      
                      `}
                              key={index}
                            >
                              {item}
                            </p>
                          ))}
                        </td>
                        <td colspan="2" rowspan="2" className="divCont">
                          <h4>Value Proposition</h4>
                          {currentProject[0]?.journey1?.tab9?.data[
                            "Value Propositions"
                          ].map((item, index) => (
                            <p
                              className={`
                      ${
                        index % 2 === 0
                          ? "bg-[#f69e53] shadow-md text-white"
                          : " bg-[#f9ece0] shadow-md text-black"
                      }
                      text-xs cards
                      
                      `}
                              key={index}
                            >
                              {item}
                            </p>
                          ))}
                        </td>
                        <td colspan="2" className="divCont">
                          <h4>Customer Relationship</h4>
                          {currentProject[0]?.journey1?.tab9?.data[
                            "Customer Relationships"
                          ].map((item, index) => (
                            <p
                              className={`
                       ${
                         index % 2 === 0
                           ? "bg-[#f69e53] shadow-md text-white"
                           : " bg-[#f9ece0] shadow-md text-black"
                       }
                       text-xs cards
                       
                       `}
                              key={index}
                            >
                              {item}
                            </p>
                          ))}
                        </td>
                        <td colspan="2" rowspan="2" className="divCont">
                          <h4>Customer Segments</h4>
                          {currentProject[0]?.journey1?.tab9?.data[
                            "Customer Segments"
                          ].map((item, index) => (
                            <p
                              className={`
                       ${
                         index % 2 === 0
                           ? "bg-[#f69e53] shadow-md text-white"
                           : " bg-[#f9ece0] shadow-md text-black"
                       }
                       text-xs cards
                       
                       `}
                              key={index}
                            >
                              {item}
                            </p>
                          ))}
                        </td>
                      </tr>

                      <tr>
                        <td colspan="2" className="divCont">
                          <h4>Key Resources</h4>
                          {currentProject[0]?.journey1?.tab9?.data[
                            "Key Resources"
                          ].map((item, index) => (
                            <p
                              className={`
                       ${
                         index % 2 === 0
                           ? "bg-[#f69e53] shadow-md text-white"
                           : " bg-[#f9ece0] shadow-md text-black"
                       }
                       text-xs cards
                       
                       `}
                              key={index}
                            >
                              {item}
                            </p>
                          ))}
                        </td>
                        <td colspan="2" className="divCont">
                          <h4>Channels</h4>
                          {currentProject[0]?.journey1?.tab9?.data[
                            "Channels"
                          ].map((item, index) => (
                            <p
                              className={`
                       ${
                         index % 2 === 0
                           ? "bg-[#f69e53] shadow-md text-white"
                           : " bg-[#f9ece0] shadow-md text-black"
                       }
                       text-xs cards
                       
                       `}
                              key={index}
                            >
                              {item}
                            </p>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="5" className="divCont">
                          <h4>Cost Structure</h4>
                          {currentProject[0]?.journey1?.tab9?.data[
                            "Cost Structure"
                          ].map((item, index) => (
                            <p
                              className={`
                      ${
                        index % 2 === 0
                          ? "bg-[#f69e53] shadow-md text-white"
                          : " bg-[#f9ece0] shadow-md text-black"
                      }
                      text-xs cards
                      
                      `}
                              key={index}
                            >
                              {item}
                            </p>
                          ))}
                        </td>
                        <td colspan="5" className="divCont">
                          <h4>Revenue Streams</h4>
                          {currentProject[0]?.journey1?.tab9?.data[
                            "Revenue Streams"
                          ].map((item, index) => (
                            <p
                              className={`
                        ${
                          index % 2 === 0
                            ? "bg-[#f69e53] shadow-md text-white"
                            : " bg-[#f9ece0] shadow-md text-black"
                        }
                        text-xs cards
                        
                        `}
                              key={index}
                            >
                              {item}
                            </p>
                          ))}
                        </td>
                      </tr>
                    </table>
                    <div className="flex flex-col items-start mt-5 p-2">
                      <h1>Summary :</h1>
                      <p className=" my-1 text-left leading-5 ">
                        {currentProject[0]?.journey1?.tab9?.data["BMC_summary"]}
                      </p>
                    </div>
                  </div>
                )}
                {/* journey 2 */}
                <div className="html2pdf__page-break"></div>
                {currentProject[0]?.journey2?.tab1?.selected && (
                  <div className="">
                    {currentProject[0]?.journey2?.tab3.data && (
                      <div>
                        <h2 className="text-xl my-3 font-bold text-gray-600">
                          Journey #2: Favcy Venture Manual
                        </h2>
                        {currentProject[0]?.journey2?.tab1?.selected && (
                          <div className="flex flex-col items-start justify-start space-y-4 text-xs     my-4 ">
                            <h1 className="font-bold text-2xl">
                              Assembling the Founding Team: Skills, Roles, and
                              Culture Fit
                            </h1>
                            <p>
                              <Markdown className="prose text-black text-md ">
                                {currentProject[0]?.journey2?.tab1?.data}
                              </Markdown>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                <div className="html2pdf__page-break"></div>
                {currentProject[0]?.journey2?.tab2?.selected && (
                  <div className="flex flex-col items-start justify-start space-y-4 text-xs     my-4 ">
                    <h1 className="font-bold text-2xl">
                      Introduction to Idea Validation
                    </h1>
                    <p>
                      <Markdown className="prose text-black text-md ">
                        {currentProject[0]?.journey2?.tab2?.data}
                      </Markdown>
                    </p>
                  </div>
                )}
                <div className="html2pdf__page-break"></div>
                {currentProject[0]?.journey2?.tab3?.selected && (
                  <div className="flex flex-col items-start justify-start space-y-4 text-xs     my-4 ">
                    <h1 className="font-bold text-2xl">
                      Building a Vision and Mission Statement
                    </h1>
                    <p>
                      <Markdown className="prose text-black text-md ">
                        {currentProject[0]?.journey2?.tab3?.data}
                      </Markdown>
                    </p>
                  </div>
                )}
                <div className="html2pdf__page-break"></div>
              </div>
            )}
          </div>
          <div className=" flex justify-center items-center w-full m-auto my-4">
            <button
              className="p-2 bg-[#FF7F50] text-black text-center rounded-md w-[80%]"
              onClick={handleGeneratePdf}
            >
              Download Playbook
            </button>
          </div>
        </div>
      </div>

      {/* <div className="pdf-display-wrapper">
      <div
        className={`fixed inset-y-0 right-0 bg-gray-100 w-[400px] duration-2000 transform z-50 ${
          showPdf ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transitionProperty: "transform",
          transitionTimingFunction: "ease-out",
        }}
        ref={sidebarRef}
      >
      
        <div className="w-full h-screen">
          <iframe src={`${pdf}#zoom=${50}`} title="PDF Viewer" width="100%" height="100%" /> 
        </div>
      </div>
    </div> */}
    </div>
  );
};

export default PdfDisplay;
