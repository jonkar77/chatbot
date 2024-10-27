import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import axios from "axios";
import { addMessage } from "./redux/slice/messageSlice";


const App = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.messages.chats);
  const [selectedChatIndex, setSelectedChatIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [think, setThink] = useState(false);

  const sendMessage = async (text) => {
    const userMessage = { user: "you", text };
    dispatch(
      addMessage({ chatIndex: selectedChatIndex, message: userMessage })
    );

    // setThink(true);
    // const thinkingMessage = {
    //   user: "bot",
    //   resultText: "Thinking...",
    // };
    // dispatch(addMessage({ chatIndex: selectedChatIndex, message: thinkingMessage }));

    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await axios.post("https://chatbot-server-ruddy.vercel.app/api/send_message", {
        text: text,
      });

      const responseData = res.data.data;
      console.log("this response", responseData);
      if (responseData && typeof responseData === "object") {
        const responseMessage = {
          user: "bot",
          summary: responseData.summary,
          resultText: responseData.result_text,
          resultTablePath: responseData.result_table_path,
          resultVisualizationPath: responseData.result_visualization_path,
        };
        console.log("this message", responseMessage);
        dispatch(
          addMessage({ chatIndex: selectedChatIndex, message: responseMessage })
        );
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error sending message", error);
      const errorMessage = {
        user: "bot",
        text: "Error sending message. Please try again.",
      };
      dispatch(
        addMessage({ chatIndex: selectedChatIndex, message: errorMessage })
      );
    } finally {
      setLoading(false);
    }
  };

  const selectChat = (index) => {
    setSelectedChatIndex(index);
  };

  const newChat = () => {
    dispatch(
      addMessage({
        chatIndex: chats.length,
        message: { user: "bot", text: "New chat started." },
      })
    );
    setSelectedChatIndex(chats.length);
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar chats={chats} selectChat={selectChat} newChat={newChat} />
        <div className="flex flex-col w-3/4 h-[550px]">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-lg">Loading...</p>
            </div>
          ) : (
            <>
              <ChatWindow messages={chats[selectedChatIndex] || []} />
              <div className="flex-shrink-0">
                <ChatInput sendMessage={sendMessage} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
