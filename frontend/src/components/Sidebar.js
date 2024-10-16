import React from 'react';

const Sidebar = ({ chats, selectChat, newChat }) => {
  return (
    <div className="w-1/4 h-full bg-gray-200 p-4">
      <button
        onClick={newChat}
        className="w-full bg-blue-500 text-white p-2 rounded-md mb-4"
      >
        New Chat
      </button>
      <div className="flex flex-col space-y-2">
        {chats.map((chat, index) => (
          <div
            key={index}
            onClick={() => selectChat(index)}
            className="p-2 bg-white rounded-md cursor-pointer hover:bg-gray-100"
          >
            Chat {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
