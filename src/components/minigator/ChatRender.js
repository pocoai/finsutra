import React from 'react';
import PropTypes from 'prop-types';

const ChatRender = ({ chats, fileName }) => (
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
    {chats.map((chat) => (chat.type === 'user' ? (
      <div className="chat chat-end mb-4" key={chat.message}>
        <div className="chat-bubble text-[#D8DDE4] font-bold bg-[#2B3440]">{chat.message}</div>
      </div>
    ) : (
      <div className="chat chat-start mb-4 " key={chat.message}>
        <div className="chat-bubble text-[#D8DDE4] font-bold bg-[#2B3440]">{chat.message}</div>
      </div>  
    )))}
  </div>
);

ChatRender.propTypes = {
  chats: PropTypes.instanceOf(Array),
  fileName: PropTypes.string,
};

ChatRender.defaultProps = {
  chats: [],
  fileName: '',
};

export default ChatRender;
