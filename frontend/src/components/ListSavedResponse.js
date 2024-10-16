import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SavedResponse = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user = searchParams.get("user");
  console.log("user", user);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/get_saved_response",
          {
            params: { user },
          }
        );

        setResponses(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };

    fetchResponses();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-semibold text-center text-black mb-6">
          Saved Responses {user ? `for ${user}` : ""}
        </h1>
        <ul className="space-y-4">
          {responses.map((response, index) => (
            <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              {/* Conditionally render each field if it exists */}
              {response.keyword && (
                <h2 className="text-xl font-bold text-indigo-700 mb-2">
                  Keyword: {response.keyword}
                </h2>
              )}

              {response.summary && (
                <p className="text-gray-600 mb-2">
                  Summary: {response.summary}
                </p>
              )}

              <div className="flex space-x-4">
                {response.result_table_path && (
                  <a
                    href={response.result_table_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline">
                    View Table
                  </a>
                )}

                {response.result_visualization_path && (
                  <a
                    href={response.result_visualization_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline">
                    View Visualization
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SavedResponse;
