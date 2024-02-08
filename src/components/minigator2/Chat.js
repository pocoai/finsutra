import Image from "next/image";
import React, { useEffect, useRef, useState, useId } from "react";
import "animate.css";
import { getFileChat, getResponse } from "@/helpers/apiRequests";

import { useSearchParams } from "next/navigation";
import PdfDisplay from "../PdfDisplay";
import Typewriter from "typewriter-effect";
import axios from "axios";

function Chat({ loading, index, setIndex }) {
  const [messages, setMessages] = useState([]);
  const [userTyping, setUserTyping] = useState(false);
  const [apiTyping, setApiTyping] = useState(false);
  const [view, setView] = useState(false);
  const [input, setInput] = useState("");
  const [currentResponse, setCurrentResponse] = useState("");

  const chatEndRef = useRef(null);

  const searchParams = useSearchParams();

  let projectId = searchParams.get("id");

  let API_URL = process.env.NEXT_PUBLIC_URL;

  const getChats = async () => {
    try {
      let response = await axios.get(`${API_URL}/api/minigator/${projectId}/chats`);

      console.log(response.data, "response");

      if (response?.data?.success) {
        if (response?.data?.data.length > 0) {
          setMessages(response?.data?.data);
        } else {
          setMessages([
            {
              type: "api",
              message: `Hey! I am your Minigator. Ask me anything related to your project and I'll try my best to answer it`,
            },
          ]);
        }
      }
    } catch (error) {
      console.log(error, "err ");
      setMessages([
        {
          type: "api",
          message: `Hey! I am your Minigator. Ask me anything related to your project and I'll try my best to answer it`,
        },
      ]);
    }
  };

  const addToChat = async (value, type) => {
    try {
      let response = await axios.post(`${API_URL}/api/minigator/${projectId}/chats`, {
        data: {
          type,
          message: value,
        },
      });

      console.log(response.data, "response");

      if (response?.data?.success) {
      }
    } catch (error) {
      console.log(error, "err ");
    }
  };

  const fetchResponse = async (question) => {
    if (!index) return;
    if (!question) return;

    const res = await getResponse(index, question);

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
          getFileChat(res?.response?.question, indexname).then(async (response) => {
            if (response?.content) {
              setCurrentResponse(response?.content);
              await addToChat(response?.content, "api");
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
          await addToChat(res?.response?.answer, "api");
        }
      }
    }

    localStorage.setItem(
      projectId,
      JSON.stringify({
        index: index,
        data: messages,
      })
    );
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

    setInput("");
    await addToChat(value, "user");
    setCurrentResponse("");
    setApiTyping(true);
    await fetchResponse(input);
    setApiTyping(false);
  };

  useEffect(() => {
    if (input !== "") {
      setUserTyping(true);
    } else {
      setUserTyping(false);
    }
  }, [input]);

  useEffect(() => {
    getChats();
    setCurrentResponse("");
  }, [index]);

  return (
    <div className="flex flex-col flex-1 w-3/4  bg-gray-100/70 rounded-lg m-3 relative h-full">
      {projectId && (
        <div
          className="pt-4 px-4 absolute right-10 tooltip tooltip-bottom tooltip-warning"
          data-tip="Show Playbook"
        >
          <input
            type="checkbox"
            className="toggle toggle-warning"
            checked={view}
            onClick={() => setView(!view)}
          />
        </div>
      )}

      {view && projectId && (
        <>
          <PdfDisplay
            setShowPdf={setView}
            showPdf={view}
            id={projectId}
            journeyStates={{
              journey1: true,
              journey2: true,
              journey3: true,
            }}
            downloadOption={false}
          />
        </>
      )}
      <div className="w-full p-10 h-full overflow-y-scroll scrollbar-none">
        {!index && !loading && (
          <div className="flex w-full items-center justify-center text-center">
            Select a project to start chatting
          </div>
        )}
        {!loading && index && (
          <>
            {messages.map((chat, i) =>
              chat.type === "user" ? (
                <div className="chat chat-end mb-4 " key={i}>
                  {/* user.image */}
                  { true ? (
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <Image alt="user" src={'/images/user.png'} width={20} height={20} />
                      </div>
                    </div>
                  ) : (
                    <div className="chat-image">
                      <div className="w-[36px] flex items-center justify-center h-[36px] rounded-full bg-[#FFF0DF] text-center text-brand">
                        <p>U</p>
                        {/* {user.firstName.charAt(0)} */}
                      </div>
                    </div>
                  )}

                  <div className="chat-bubble max-w-sm text-md text-[#ffff] font-bold bg-[#fd8b09ee]">
                    {chat.message}
                  </div>
                </div>
              ) : (
                <div className="chat chat-start mb-4" key={i}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <Image
                        alt="user"
                        style={{ objectFit: "contain" }}
                        src="/images/minigator.png"
                        width={40}
                        height={40}
                      />
                    </div>
                  </div>

                  <div className="chat-bubble max-w-sm text-md text-brand font-bold bg-[#FFF0DF]">
                    {chat.message}
                  </div>
                </div>
              )
            )}
            {currentResponse !== "" && (
              <div className="chat chat-start mb-4">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      alt="user"
                      style={{ objectFit: "contain" }}
                      src="/images/minigator.png"
                      width={40}
                      height={40}
                    />
                  </div>
                </div>

                <div className="chat-bubble max-w-sm text-md text-brand font-bold bg-[#FFF0DF]">
                  {
                    <Typewriter
                      options={{
                        cursor: "|",
                      }}
                      onInit={(typewriter) => {
                        typewriter
                          .changeDelay(10)
                          .typeString(currentResponse)
                          .start()
                          .callFunction((state) => {
                            state.elements.cursor.remove();
                          });
                      }}
                    />
                  }
                  <div ref={chatEndRef} />
                </div>
              </div>
            )}
          </>
        )}

        {loading && (
          <div
            className="w-full rounded-2xl bg-white/5 p-4 relative 
            before:absolute before:inset-0
            before:-translate-x-full
            before:animate-[shimmer_1s_infinite]
            before:bg-gradient-to-r
            before:from-transparent before:via-gray-400/10 before:to-transparent  isolate
            overflow-hidden"
          >
            <div className="chat chat-start mb-4 ">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image
                    alt="user"
                    style={{ objectFit: "contain" }}
                    src="/images/minigator.png"
                    width={40}
                    height={40}
                  />
                </div>
              </div>

              <div className="bg-gray-300/20 w-64 chat-bubble"></div>
            </div>
            <div className="chat chat-end mb-4">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image alt="user" src={'/images/user.png'} width={20} height={20} />
                </div>
              </div>
              <div className=" bg-gray-300/20 w-64 chat-bubble"></div>
            </div>
            <div className="chat chat-start mb-4 ">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image
                    alt="user"
                    style={{ objectFit: "contain" }}
                    src="/images/minigator.png"
                    width={40}
                    height={40}
                  />
                </div>
              </div>

              <div className="bg-gray-300/20 w-64 chat-bubble"></div>
            </div>
            <div className="chat chat-end mb-4">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image alt="user" src={'/images/user.png'} width={20} height={20} />
                </div>
              </div>
              <div className=" bg-gray-300/20 w-64 chat-bubble"></div>
            </div>
            <div className="chat chat-start mb-4 ">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image
                    alt="user"
                    style={{ objectFit: "contain" }}
                    src="/images/minigator.png"
                    width={40}
                    height={40}
                  />
                </div>
              </div>

              <div className="bg-gray-300/20 w-64 chat-bubble"></div>
            </div>
          </div>
        )}
        {userTyping && (
          <div className="chat chat-end mb-4 ">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Image alt="user" src={'/images/user.png'} width={20} height={20} />
              </div>
            </div>
            <div className="chat-bubble max-w-sm text-sm text-[#ffff] font-bold bg-[#fd8b09ee]">
              <span className="loading loading-dots loading-sm"></span>
            </div>
          </div>
        )}
        {apiTyping && (
          <div className="chat chat-start mb-4 animate__animated animate__fadeInLeft">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Image
                  alt="user"
                  style={{ objectFit: "contain" }}
                  src="/images/minigator.png"
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <div className="chat-bubble max-w-sm text-sm text-brand font-bold bg-[#FFF0DF]">
              <span className="loading loading-dots loading-sm"></span>
            </div>
          </div>
        )}
      </div>
      <div className="sticky bottom-0 w-full h-max ">
        <div className=" bg-white p-3  w-full flex gap-3 items-center justify-between">
          <input
            type="text"
            placeholder="Ask a Question "
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className=" p-4 rounded-md border outline-none w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClick(e.target.value);
              }
            }}
          />
          <button
            className="bg-[#FFF0DF] cursor-pointer rounded-md px-4 py-2 text-brand flex items-center gap-1"
            onClick={() => {
              handleClick(input);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
