"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
const api = process.env.NEXT_PUBLIC_URL;
import { AiFillCloseCircle } from "react-icons/ai";
// import { useSelector } from "react-redux";
// import Markdown from "react-markdown";
import Markdown from "markdown-to-jsx";
import { getTitleFromUrl } from "@/helpers/auth";
import { FcDownload } from "react-icons/fc";
import { useRecoilValue } from "recoil";
import { journeyState } from "@/state/atoms/tabState";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfMake from "html-to-pdfmake";
import { journey2 } from "@/utils/journeys";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfDisplay = ({ setShowPdf, showPdf, id, currentJourney }) => {
  const [currentProject, setCurrentProject] = useState([]);
  const [downloading, setisDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const reportTemplateRef = useRef(null);

  const toggleSidebar = () => {
    setShowPdf(!showPdf);
  };

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

  useEffect(() => {
    setLoading(true);
    FetchProject(id).then((res) => {
      // console.log(res.data.data);
      setCurrentProject(res.data.data);
    });
    setLoading(false);
  }, []);

  const handleGeneratePdf = async () => {
    setisDownloading(true);
    const contentElement = reportTemplateRef.current;

    const pdfContent = htmlToPdfMake(contentElement.innerHTML);

    pdfContent.forEach((section, index) => {
      if (index !== 0) {
        section.pageBreak = "before";
      }
    });

    const pdfDoc = pdfMake.createPdf({
      content: pdfContent,
      footer: {
        columns: [
          {},
          {
            image: await getBase64ImageFromURL(
              "https://raw.githubusercontent.com/Niranjangkr/files/main/footerImg.jpg"
            ),
            width: 150,
            height: 50,
            alignment: "left",
          },
        ],
      },
      // header: {
      //   columns: [
      //     {
      //       image: await getBase64ImageFromURL(
      //         "https://raw.githubusercontent.com/Niranjangkr/files/main/header.jpg"
      //       ),
      //       width: 120,
      //       height: 28,
      //       marginTop:3,
      //       marginRight: 3,
      //       alignment: 'left',
      //     },
      //   ],
      // },
    });

    pdfDoc.download(`${currentProject[0]?.name}.pdf`);
    setisDownloading(false);
  };

  function getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }

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
    <div className="flex flex-col items-center justify-center  py-2 z-50 ">
      <div ref={sidebarRef}>
        <div
          className={`top-0 right-0 w-[35vw] bg-white p-5 text-white fixed z-50 h-full ease-in-out duration-2000 ${
            showPdf ? "translate-x-0 " : "translate-x-full"
          }`}
        >
          <div className="h-[90%] overflow-y-scroll w-full  text-black p-4 space-y-4  ">
            {downloading && (
              <div className="flex flex-col items-center h-full justify-center gap-5">
                <p>
                  <FcDownload className="animate-ping w-[100px] h-[100px] text-gray-500" />
                </p>
                <p> Downloading... Please wait </p>
              </div>
            )}
            {loading && <span className="loading loading-spinner text-warning"></span>}

            {!downloading && (
              <div ref={reportTemplateRef}>
                <div className="">
                  <h1 className="text-xl my-3 font-bold">
                    Project Name : {currentProject[0]?.name}
                  </h1>

                  {currentJourney === 1 && (
                    <div>
                      <h2 className="my-3 text-lg font-bold text-gray-600">
                        Journey #1 : Zero to Coming Soon{" "}
                      </h2>
                      <h4 className="text-[16px] my-3 font-medium">Idea Articulation</h4>
                      {currentProject[0]?.journey1?.tab1.selected && (
                        <div className="flex flex-col items-start justify-start space-y-4 text-[9px] ">
                          <table className="table-auto ">
                            <thead>
                              <tr>
                                <th
                                  className="px-4 py-2 border border-gray-500"
                                  style={{ backgroundColor: "#FF7F50" }}
                                >
                                  Title
                                </th>
                                <th
                                  className="px-4 py-2 border border-gray-500 bg-[#FF7F50]"
                                  style={{ backgroundColor: "#FF7F50" }}
                                >
                                  Description
                                </th>
                              </tr>
                            </thead>
                            {currentProject[0]?.journey1?.tab1?.data?.map((item, index) => {
                              return (
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
                            })}
                          </table>
                        </div>
                      )}

                      <div className="page-break my-5 " id="page">
                        <h4 className="text-[16px] my-3">Problem Solution Fit</h4>
                        {currentProject[0]?.journey1?.tab2?.selected && (
                          <div className="flex flex-col items-start justify-start space-y-4 text-[9px]">
                            {currentProject[0].journey1?.tab2?.selected && (
                              <p>
                                <span className="font-semibold">
                                  Problem Solution Fit:{" "}
                                  {currentProject[0].journey1?.tab2.data["Executive Summary"]}
                                </span>
                                :
                              </p>
                            )}
                            <table className="table-auto">
                              <thead>
                                <tr>
                                  <th
                                    className="px-4 py-2 border border-gray-500 bg-[#FF7F50]"
                                    style={{ backgroundColor: "#FF7F50" }}
                                  >
                                    Problem
                                  </th>
                                  <th
                                    className="px-4 py-2 border border-gray-500 bg-[#FF7F50]"
                                    style={{ backgroundColor: "#FF7F50" }}
                                  >
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
                      <div className="">
                        {currentProject[0]?.journey1?.tab3?.selected && (
                          <div className="flex flex-col items-start justify-start space-y-4 text-[9px]  ">
                            <h4 className="text-[16px] my-3">Brand Kit</h4>

                            <table className="table-fixed ">
                              {currentProject[0].journey1?.tab3?.data &&
                                Object.entries(currentProject[0].journey1?.tab3?.data).map(
                                  (item, index) => (
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
                                  )
                                )}
                            </table>
                          </div>
                        )}
                      </div>

                      <div className="html2pdf__page-break">
                        {currentProject[0]?.journey1?.tab4?.selected && (
                          <div className="flex flex-col items-start justify-start text-[9px] space-y-4 my-4  ">
                            {/* <h4 className="text-xl my-3">Positioning and Messaging</h4> */}
                            {currentProject[0]?.journey1?.tab4?.data && (
                              <h1 className="text-[16px] font-semibold text-gray-800">
                                Positioning Statement field
                              </h1>
                            )}
                            {currentProject[0]?.journey1?.tab4?.data &&
                              currentProject[0]?.journey1?.tab4?.data["Positioning"] && (
                                <div className="flex flex-col items-start justify-start space-y-2 ">
                                  <p>
                                    <span className="font-semibold">Positioning: </span>
                                    {currentProject[0]?.journey1?.tab4?.data["Positioning"]}
                                  </p>
                                </div>
                              )}
                            {currentProject[0]?.journey1?.tab4?.data["USPs"] && (
                              <div className="flex flex-col items-start justify-start space-y-2 ">
                                <h1 className="text-[16px] font-semibold text-gray-800">USPs</h1>
                                {currentProject[0]?.journey1?.tab4?.data["USPs"]?.map(
                                  (item, index) => (
                                    <p key={index}>
                                      <span className="text-red-500" style={{ color: "red" }}>
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
                              <h1 className="text-[16px] font-semibold text-gray-800">
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

                      {currentProject[0]?.journey1?.tab5?.selected && (
                        <div className="flex flex-col items-start justify-start space-y-4 text-[9px] my-4  ">
                          <p>
                            <Markdown className="prose text-black text-[9px] ">
                              {currentProject[0]?.journey1?.tab5?.data}
                            </Markdown>
                          </p>
                        </div>
                      )}

                      {currentProject[0]?.journey1?.tab6?.selected && (
                        <div className="flex flex-col items-start justify-start space-y-4 text-[9px] my-4  ">
                          <h1 className="font-bold text-[16px]">Minimum Viable Product </h1>
                          <p>
                            <Markdown className="prose text-black text-[9px] ">
                              {currentProject[0]?.journey1?.tab6?.data}
                            </Markdown>
                          </p>
                        </div>
                      )}

                      {currentProject[0]?.journey1?.tab7?.selected && (
                        <div className="flex flex-col items-start justify-start space-y-4 text-[9px] my-4 ">
                          <h1 className="font-bold text-[16px]">Features to Monetize </h1>
                          <p>
                            <Markdown className="prose text-black text-[9px]">
                              {currentProject[0]?.journey1?.tab7?.data}
                            </Markdown>
                          </p>
                        </div>
                      )}

                      {currentProject[0]?.journey1?.tab8?.selected && (
                        <div className="flex flex-col items-start justify-start space-y-4  html2pdf__page-break">
                          <div className="flex flex-col items-start justify-start space-y-2 ">
                            <p className="text-gray-700">
                              Research and Knowledge Bank provides the best resources that we could
                              curate for you.
                              {/* <br /> */}&nbsp; They include data banks, competitior showcasing
                              or just more information that we believe should be useful for you as a
                              founder.
                            </p>
                          </div>
                          {currentProject[0]?.journey1?.tab8?.data.competitors && (
                            <div className="flex flex-col items-start justify-start space-y-2 text-[9px]">
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
                                                color: "orange",
                                              }}
                                            >
                                              {/* {item?.url}
                                               */}

                                              {item?.domain || getTitleFromUrl(item?.url)}

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

                      {currentProject[0]?.journey1?.tab9?.selected && (
                        <div className="text-[9px]">
                          <h1 className="font-bold text-[16px] my-2">Business Model Canvas </h1>
                          <table id="bizcanvas" cellspacing="0">
                            <tr className="">
                              <td colspan="2" rowspan="2" className="divCont">
                                <h4>Key Partners</h4>
                                {currentProject[0]?.journey1?.tab9?.data["Key Partners"].map(
                                  (item, index) => (
                                    <p
                                      className={`
                      ${
                        index % 2 === 0
                          ? "bg-[#f69e53] shadow-md text-white"
                          : " bg-[#f9ece0] shadow-md text-black"
                      }
                      text-[9px] cards py-3 
                      
                      `}
                                      key={index}
                                    >
                                      {item}
                                    </p>
                                  )
                                )}
                              </td>
                              <td colspan="2" rowspan="2" className="divCont">
                                <h4>Key Activities</h4>
                                {currentProject[0]?.journey1?.tab9?.data["Key Activities"].map(
                                  (item, index) => (
                                    <p
                                      className={`
                      ${
                        index % 2 === 0
                          ? "bg-[#f69e53] shadow-md text-white"
                          : " bg-[#f9ece0] shadow-md text-black"
                      }
                      text-[9px] cards  py-3 
                      
                      `}
                                      key={index}
                                    >
                                      {item}
                                    </p>
                                  )
                                )}
                              </td>
                              <td colspan="2" rowspan="2" className="divCont">
                                <h4>Value Proposition</h4>
                                {currentProject[0]?.journey1?.tab9?.data["Value Propositions"].map(
                                  (item, index) => (
                                    <p
                                      className={`
                      ${
                        index % 2 === 0
                          ? "bg-[#f69e53] shadow-md text-white"
                          : " bg-[#f9ece0] shadow-md text-black"
                      }
                      text-[9px] cards  py-3 
                      
                      `}
                                      key={index}
                                    >
                                      {item}
                                    </p>
                                  )
                                )}
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
                       text-[9px] cards py-3 
                       
                       `}
                                    key={index}
                                  >
                                    {item}
                                  </p>
                                ))}
                              </td>
                              <td colspan="2" className="divCont">
                                <h4>Customer Segments</h4>
                                {currentProject[0]?.journey1?.tab9?.data["Customer Segments"].map(
                                  (item, index) => (
                                    <p
                                      className={`
                       ${
                         index % 2 === 0
                           ? "bg-[#f69e53] shadow-md text-white"
                           : " bg-[#f9ece0] shadow-md text-black"
                       }
                       text-[9px] cards  py-3 
                       
                       `}
                                      key={index}
                                    >
                                      {item}
                                    </p>
                                  )
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td colspan="2" className="divCont">
                                <h4>Key Resources</h4>
                                {currentProject[0]?.journey1?.tab9?.data["Key Resources"].map(
                                  (item, index) => (
                                    <p
                                      className={`
                       ${
                         index % 2 === 0
                           ? "bg-[#f69e53] shadow-md text-white"
                           : " bg-[#f9ece0] shadow-md text-black"
                       }
                       text-[9px] cards  py-3 
                       
                       `}
                                      key={index}
                                    >
                                      {item}
                                    </p>
                                  )
                                )}
                              </td>
                              <td colspan="2" className="divCont">
                                <h4>Channels</h4>
                                {currentProject[0]?.journey1?.tab9?.data["Channels"].map(
                                  (item, index) => (
                                    <p
                                      className={`
                       ${
                         index % 2 === 0
                           ? "bg-[#f69e53] shadow-md text-white"
                           : " bg-[#f9ece0] shadow-md text-black"
                       }
                       text-[9px] cards  py-3 
                       
                       `}
                                      key={index}
                                    >
                                      {item}
                                    </p>
                                  )
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="5" className="divCont">
                                <h4>Cost Structure</h4>
                                {currentProject[0]?.journey1?.tab9?.data["Cost Structure"].map(
                                  (item, index) => (
                                    <p
                                      className={`
                      ${
                        index % 2 === 0
                          ? "bg-[#f69e53] shadow-md text-white"
                          : " bg-[#f9ece0] shadow-md text-black"
                      }
                      text-[9px] cards  py-3 
                      
                      `}
                                      key={index}
                                    >
                                      {item}
                                    </p>
                                  )
                                )}
                              </td>
                              <td colspan="5" className="divCont">
                                <h4>Revenue Streams</h4>
                                {currentProject[0]?.journey1?.tab9?.data["Revenue Streams"].map(
                                  (item, index) => (
                                    <p
                                      className={`
                        ${
                          index % 2 === 0
                            ? "bg-[#f69e53] shadow-md text-white"
                            : " bg-[#f9ece0] shadow-md text-black"
                        }
                        text-[9px] cards  py-3 
                        
                        `}
                                      key={index}
                                    >
                                      {item}
                                    </p>
                                  )
                                )}
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
                    </div>
                  )}

                  {currentJourney === 2 && (
                    <div>
                      {Array.from({ length: 28 }, (_, index) => (
                        <div key={index}>
                          {currentProject[0]?.journey2[`tab${index + 1}`]?.selected && (
                            <div className="">
                              <Markdown className="prose ">
                                {currentProject[0]?.journey2[`tab${index + 1}`]?.data}
                              </Markdown>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {currentJourney === 3 && (
                    <div>
                      {Array.from({ length: 28 }, (_, index) => (
                        <div key={index}>
                          {currentProject[0]?.journey3[`tab${index + 1}`]?.selected && (
                            <div className="flex flex-col items-start justify-start space-y-4 ">
                              <h1>{journey2.find((item) => item.tab === index + 1).title}</h1>
                              <table className="table-auto ">
                                <thead>
                                  <tr>
                                    <th className="px-4 py-2 text-brand whitespace-nowrap">
                                      Objectives
                                    </th>
                                    <th className="px-4 py-2 text-brand whitespace-nowrap">
                                      Tasks
                                    </th>
                                    <th className="px-4 py-2 text-brand whitespace-nowrap">
                                      Outcomes
                                    </th>
                                  </tr>
                                </thead>
                                {currentProject[0]?.journey3[`tab${index + 1}`].data?.map(
                                  (item, index) => (
                                    <tbody key={index}>
                                      <tr>
                                        <td
                                          className=" px-4 py-2 border-b-2 font-semibold text-brand"
                                          style={{ verticalAlign: "top" }}
                                        >
                                          {index + 1}. {item?.Objective}
                                        </td>
                                        <td
                                          className="px-4 py-2 max-w-xl border-b-2 border-l-2 font-medium"
                                          style={{ verticalAlign: "top" }}
                                        >
                                          <ul className="list-none px-4">
                                            {item?.Tasks.map((task, index) => {
                                              return (
                                                <li className="my-3" key={index}>
                                                  <input
                                                    type="checkbox"
                                                    id={`task-${index}`}
                                                    name={`task-${index}`}
                                                    className="accent-brand text-white w-3 h-3"
                                                    defaultChecked
                                                  />
                                                  <label htmlFor={`task-${index}`} className="ml-2">
                                                    {task}
                                                  </label>
                                                </li>
                                              );
                                            })}
                                          </ul>
                                        </td>

                                        <td
                                          className=" px-4 py-2 border-b-2 border-l-2 font-medium"
                                          style={{ verticalAlign: "top" }}
                                        >
                                          <ul className="list-decimal  px-4">
                                            {item["Desired Outcomes"].map((task) => {
                                              return <li className="my-3">{task}</li>;
                                            })}
                                          </ul>
                                        </td>
                                      </tr>
                                    </tbody>
                                  )
                                )}
                              </table>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className=" flex justify-center items-center w-full m-auto my-4">
            <button
              className="bg-[#FFF0DF] rounded-full px-4 py-4 justify-center text-brand flex items-center gap-2 w-[80%]"
              onClick={handleGeneratePdf}
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              Download Playbook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfDisplay;
