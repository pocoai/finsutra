"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { v4 as uuidv4 } from "uuid";

import Loader from "./Loader";
// import Header from "@/components/Header";
import InputFields from "./InputFields";
import ChatRender from "./ChatRender";
import { getDoc, getFileChat, getResponse, uploadPDFClient } from "@/helpers/apiRequests";
import { getProjectData, setLinks } from "@/firebase/apiRequests";
import { createPDF } from "@/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadAndChat = ({ id, setFileName, indexnameQuery }) => {
  const router = useRouter();
  // console.log(indexnameQuery)
  // const indexnameQuery = undefined; //fix these

  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);
  const [indexname, setIndexname] = useState(null);
  const [messages, setMessages] = useState([]);
  const textValue = useRef(null);

  setFileName(file?.name?.replace(/.pdf$/, "") || file?.replace(/.pdf$/, ""));

  const fetchDataAndCreateFile = async (id) => {
    try {
      let currentProject = await getProjectData(id);

      // console.log(currentProject, "currentProject");

      setBusy(true);
      const formData = new FormData();

      const randomString = uuidv4();

      // const formFile = new File([fileContent], `${currentProject?.name}.pdf`, {
      //   type: "application/pdf",
      // });

      // console.log(formFile, "formFile");

      let formFile = await createPDF(currentProject);

      setFile(formFile);

      formData.append("index_name", randomString);
      formData.append("document_source", `${currentProject?.name}`);
      formData.append("input_sequence", formFile);
      formData.append("account_id", process.env.NEXT_PUBLIC_ACCOUNTID);

      const response = await uploadPDFClient(formData);

      console.log(response, "response");

      if (response) {
        setBusy(false);
        if (response?.response === "Access Denied.") {
          toast.error("Internal Server Error");
          // await uploadPDFHandler(e);
        } else if (response?.response === "Successfully created index") {
          setLinks({
            indexName: randomString,
            fileName: `${currentProject?.name}.pdf`,
          });
          // setFile();
          toast.success("PDF Successfully Uploaded");
          setIndexname(randomString);
        }
      } else {
        setBusy(false);
        toast.error("Internal Server Error");
      }
    } catch (error) {
      setBusy(false);
      console.log(error);
      toast.error("Internal Server Error");
    }
  };

  const fetchFile = async () => {
    if (!indexnameQuery) return;
    setIndexname(indexnameQuery);
    setBusy(true);
    const res = await getDoc(indexnameQuery);

    if (res) {
      if (
        res?.response[0]?.toLowerCase() === "access denied." ||
        (typeof res?.response !== "object" && res?.response?.toLowerCase() === "access denied.")
      ) {
        toast.error("Internal Server Error.Try Again");
      } else {
        setFile(res?.response[0]);
        console.log("hello", file);
        setFileName(file?.replace(/.pdf$/, ""));
      }
    }
    setBusy(false);
  };

  useEffect(() => {
    if (id) {
      fetchDataAndCreateFile(id);
    }
  }, [id]);

  // if (id) {
  //   fetchDataAndCreateFile(id);
  // }

  useEffect(() => {
    fetchFile();
  }, [indexnameQuery]);

  const handleCopy = () => {
    const link = `${window.location.host}/minigator/chat/${indexname}`;
    // console.log(link)
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Copied link to chatroom");
      })
      .catch(() => {
        toast.error("Failed to copy link:");
      });
  };

  const fetchResponse = async () => {
    if (!indexname) return;
    if (!textValue.current.value) return;
    if (searchLoader) return;
    setSearchLoader(true);

    let question = textValue.current.value;
    const res = await getResponse(indexname, textValue.current.value);

    if (res) {
      if (
        res.error ||
        res?.response[0]?.toLowerCase() === "access denied." ||
        (typeof res?.response !== "object" && res?.response?.toLowerCase() === "access denied.")
      ) {
        toast.error("Internal Server Error.Try Again");
      } else if (res?.response) {
        if (
          res?.response?.answer === " I don't know.\nSOURCES:" ||
          res?.response?.answer === " I don't know.\n" ||
          res?.response?.answer === " I do not know.\n"
        ) {
          getFileChat(res?.response?.question, indexname).then((response) => {
            if (response?.content) {
              setMessages((prev) => [
                ...prev,
                {
                  type: "user",
                  message: question,
                },
              ]);
              setMessages((prev) => [
                ...prev,
                {
                  type: "api",
                  message: response?.content,
                },
              ]);
              setSearchLoader(false);
              textValue.current.value = "";
            } else {
              toast.error("Internal Server Error.Try Again");
            }
          });
        } else {
          setMessages((prev) => [
            ...prev,
            {
              type: "user",
              message: question,
            },
          ]);
          setMessages((prev) => [
            ...prev,
            {
              type: "api",
              message: res?.response?.answer,
            },
          ]);
        }
        setSearchLoader(false);
        textValue.current.value = "";
      }
    }
  };

  const uploadPDFHandler = async (e) => {
    setBusy(true);
    const formData = new FormData();

    const randomString = uuidv4();

    const formFile = e.target.files[0];

    console.log(formFile, "formFile uploadPDFHandler");

    formData.append("index_name", randomString);
    formData.append("document_source", formFile.name);
    formData.append("input_sequence", formFile);
    formData.append("account_id", process.env.NEXT_PUBLIC_ACCOUNTID);

    const response = await uploadPDFClient(formData);

    if (response) {
      setBusy(false);
      if (response?.response === "Access Denied.") {
        // toast.error("Internal Server Error");
        await uploadPDFHandler(e);
      } else if (response?.response === "Successfully created index") {
        setLinks({
          indexName: randomString,
          fileName: formFile.name,
        });
        setFile(formFile);
        toast.success("PDF Successfully Uploaded");
        setIndexname(randomString);
        console.log("heloo ",randomString)
      }
    } else {
      setBusy(false);
      toast.error("Internal Server Error");
    }
  };

  const handleFileInput = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      await uploadPDFHandler(e);
    }
  };

  const handleTextInput = async (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full h-[80vh] flex flex-col overflow-x-hidden pb-5">
      {indexname !== null && (
        <div className="text-end mt-2 mb-2">
          <button
            type="button"
            className="h-10 px-3 text-white rounded-lg bg-[#FD8A09] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400 transition-all duration-150"
            onClick={handleCopy}
          >
            Share Link
          </button>
        </div>
      )}
      <div className="flex flex-col items-center justify-center grow w-full h-[calc(100%-68px)]">
        <div className="w-full h-full border rounded-md shadow-md flex divide-x">
          <div className="w-1/2">
            {busy && (
              <div className="flex w-full h-full items-center">
                <Loader size={48} />
              </div>
            )}
            {!busy && (
              <div className="px-4 py-4 h-full">
                {file === null ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <label
                      htmlFor="file"
                      className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:text-[#FD8A09] hover:shadow-xl"
                    >
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                      <span className="mt-2 text-base leading-normal">Select a file</span>
                      <input
                        onChange={(e) => handleFileInput(e)}
                        type="file"
                        id="file"
                        className="hidden"
                        accept="text/plain,application/pdf"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        router.push("/minigator");
                      }}
                      style={{ zIndex: 500 }}
                      className="absolute top-2 right-0 h-6 w-6"
                    >
                      <img alt="" src="/icons/cross.png" className="h-6 w-6" />
                    </button>
                    {typeof file === "string" ? (
                      <div className="w-full h-full flex items-center justify-center capitalize font-semibold text-lg">
                        {file}
                      </div>
                    ) : (
                      <DocViewer
                        pluginRenderers={DocViewerRenderers}
                        documents={[
                          {
                            uri: window.URL.createObjectURL(file),
                            fileName: file.name,
                          },
                        ]}
                        config={{
                          pdfVerticalScrollByDefault: true,
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="w-1/2 h-full">
            <div className="flex flex-col h-full">
              <div className="h-full overflow-y-scroll noscrollbar">
                {busy ? (
                  <div className="flex w-full h-full items-center">
                    <Loader size={48} />
                  </div>
                ) : (
                  <div className="w-full h-full px-4 pt-4">
                    <ChatRender chats={messages} fileName={file?.name} />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center w-full">
                <InputFields
                  fetchResponse={fetchResponse}
                  searchLoader={searchLoader}
                  textRef={textValue}
                  fileName={indexname}
                  handleInput={handleTextInput}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UploadAndChat;
