import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux/slice/messageSlice';

const ChatInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage("");
    }
  };
  
  return (
    <div className="fixed bottom-0 left-1/4 right-0 flex p-4 bg-gray-200 border-t border-cyan-500 shadow-lg z-50">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 border rounded-md"
      />
      <button
        onClick={handleSendMessage}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md transition transform hover:scale-105">
        Send
      </button>
    </div>
  );
};

export default ChatInput;
