import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import "animate.css";
import Typewriter from "typewriter-effect";

const ChatRender = ({ chats, searchLoader, fileName, userTyping, apiTyping, currentResponse }) => {

  return (
    <div className=" flex flex-col justify-end">
      {fileName === null && (
        <div className="flex items-center justify-center h-full w-full">
          Please Wait the File Is Loading
        </div>
      )}
      {chats.length === 0 && fileName !== null && (
        <div className="flex items-center justify-center h-full w-full">
          Please type something to start the conversation
        </div>
      )}
      {!searchLoader && fileName !== null && (
        <>
          {chats.map((chat, i) =>
            chat.type === "user" ? (
              <div className="chat chat-end mb-4 " key={i}>
                {true ? (
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <Image alt="user" src={'/images/user.png'} width={20} height={20} />
                    </div>
                  </div>
                ) : (
                  <div className="chat-image">
                    <div className="w-[36px] flex items-center justify-center h-[36px] rounded-full bg-[#FFF0DF] text-center text-brand">
                      <p>U</p>
                    </div>
                  </div>
                )}

                <div className="chat-bubble max-w-sm text-sm text-[#ffff] font-bold bg-[#fd8b09ee]">
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

                <div className="chat-bubble max-w-sm text-sm text-brand font-bold bg-[#FFF0DF]">
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

              <div className="chat-bubble max-w-sm text-sm text-brand font-bold bg-[#FFF0DF]">
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
              </div>
            </div>
          )}
        </>
      )}
      {userTyping && (
        <div className="chat chat-end mb-4 ">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image alt="user" src={user.image} width={20} height={20} />
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
  );
};

ChatRender.propTypes = {
  chats: PropTypes.instanceOf(Array),
  fileName: PropTypes.string,
};

ChatRender.defaultProps = {
  chats: [],
  fileName: "",
};

export default ChatRender;
