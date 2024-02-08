"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import InputFields from "@/components/minigator2/InputFields";
import ChatRender from "@/components/minigator2/ChatRender";
import { getDoc, getFileChat, getResponse, uploadPDFClient } from "@/helpers/apiRequests";
import MinigatorHeader from "@/components/minigator2/MinigatorHeader";

const UploadAndChat = () => {
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);
  const [indexname, setIndexname] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userTyping, setUserTyping] = useState(false);
  const [apiTyping, setApiTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const fetchResponse = async (question) => {
    if (!indexname) return;
    if (!question) return;

    const res = await getResponse(indexname, question);

    if (res) {
      if (
        res.error ||
        res?.response[0]?.toLowerCase() === "access denied." ||
        (typeof res?.response !== "object" && res?.response?.toLowerCase() === "access denied.")
      ) {
        setCurrentResponse("Uh oh Some Error Occured ");
        return;
      } else if (res?.response) {
        if (
          res?.response?.answer === " I don't know.\nSOURCES:" ||
          res?.response?.answer === " I don't know.\n" ||
          res?.response?.answer === " I do not know.\n"
        ) {
          getFileChat(res?.response?.question, indexname).then((response) => {
            if (response?.content) {
              setCurrentResponse(response?.content);
            } else {
              setMessages((prev) => [
                ...prev,
                {
                  type: "api",
                  message: "Uh oh Some Error Occured",
                },
              ]);
              setCurrentResponse("Uh oh Some Error Occured ");
            }
          });
        } else {
          setCurrentResponse(res?.response?.answer);
        }
      }
    }
  };

  const handleClick = async (value) => {
    setUserTyping(false);
    if (currentResponse !== "") {
      setMessages((prev) => [
        ...prev,
        {
          type: "api",
          message: currentResponse,
        },
      ]);
    }
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        message: value,
      },
    ]);
    setSearchQuery("");
    setCurrentResponse("");
    setApiTyping(true);
    await fetchResponse(searchQuery);
    setApiTyping(false);
  };

  useEffect(() => {
    if (searchQuery !== "") {
      setUserTyping(true);
    } else {
      setUserTyping(false);
    }
  }, [searchQuery]);

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
        setFile(formFile);
        toast.success("PDF Successfully Uploaded");
        setIndexname(randomString);
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

  console.log(userTyping, "userTyping");

  return (
    <div className=" h-full flex flex-col overflow-x-hidden">
      <MinigatorHeader />
      <div className="flex flex-col items-center justify-center grow w-full h-[calc(100%-68px)]">
        <div className="2xl:w-5/6 lg:w-4/5 w-11/12 h-[90%] border rounded-md shadow-md flex divide-x">
          <div className="w-1/2">
            {busy && (
              <div className="flex w-full h-full items-center justify-center">
                <span className="loading loading-spinner loading-lg text-error"></span>
              </div>
            )}
            {!busy && (
              <div className="px-4 py-4 h-full">
                {file === null ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <label
                      htmlFor="file"
                      className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:text-red-400 hover:shadow-xl"
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
                  <div className="flex w-full h-full items-center justify-center">
                    <span className="loading loading-spinner loading-lg text-error"></span>
                  </div>
                ) : (
                  <div className="w-full h-full px-4 pt-4">
                    <ChatRender
                      chats={messages}
                      searchLoader={searchLoader}
                      fileName={file?.name}
                      userTyping={userTyping}
                      apiTyping={apiTyping}
                      currentResponse={currentResponse}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center w-full">
                <InputFields
                  handleClick={handleClick}
                  searchLoader={searchLoader}
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
    </div>
  );
};

export default UploadAndChat;
