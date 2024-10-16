import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import axios from "axios";
import Cookies from "js-cookie";

const ChatWindow = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveResponse = async (response) => {
    try {
      const user = Cookies.get("user");

      if (!user) {
        alert("User not found in cookies.");
        return;
      }

      await axios.post("http://localhost:5000/api/save_response", {
        user,
        summary: response.summary,
        result_text: response.resultText,
        result_table_path: response.resultTablePath,
        result_visualization_path: response.resultVisualizationPath,
      });
      alert("Response saved successfully!");
    } catch (error) {
      console.error("Error saving response:", error);
      alert("Failed to save response. Please try again.");
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 rounded-lg shadow-lg p-4 h-screen overflow-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={clsx(
            msg.user === "you"
              ? "self-end bg-blue-500 text-white"
              : "self-start bg-gray-300 max-w-2xl",
            "rounded-lg p-2 max-w-xs",
            "break-words"
          )}>
          <div className="flex items-end space-x-3">
            {msg.user !== "you" && <b>{msg.user}:</b>}
            {msg.user === "you" ? (
              <span>{msg.text}</span>
            ) : (
              <span>
                {msg.summary && (
                  <p>
                    <strong>{msg.summary}</strong>{" "}
                  </p>
                )}
                {msg.resultText && <p>{msg.resultText}</p>}
                {msg.resultTablePath && (
                  <div>
                    <strong>Result Table:</strong>
                    <iframe
                      title="Result Table"
                      src={msg.resultTablePath}
                      width="100%"
                      height="200px"
                      className="border border-gray-300 rounded"
                    />
                  </div>
                )}
                {msg.resultVisualizationPath && (
                  <div>
                    <strong>Result Visualization:</strong>
                    <iframe
                      title="Result Visualization"
                      src={msg.resultVisualizationPath}
                      width="100%"
                      height="200px"
                      className="border border-gray-300 rounded"
                    />
                  </div>
                )}
                <button
                  onClick={() => saveResponse(msg)}
                  className="mt-2 bg-blue-500 text-white rounded px-4 py-2">
                  Save Response
                </button>
              </span>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
