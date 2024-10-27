import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../constants/envConfig";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/list_users`);

        setUsers(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    navigate(`/saved_response?user=${user.user}`);
  };

  const handleViewDetailsClick = (user, event) => {
    event.stopPropagation();
    alert(`Viewing details for: ${user.user}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Admin Panel - User List
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        {users.length === 0 ? (
          <p className="text-center text-gray-600">No users found.</p>
        ) : (
          <ul className="space-y-6">
            {users.map((user, index) => (
              <li
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 transition transform hover:scale-105 cursor-pointer"
                onClick={() => handleUserClick(user)}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {user.user}
                    </h3>
                    {user.responses && user.responses.length > 0 && (
                      <div className="mt-2 text-sm text-gray-600">
                        <h4 className="font-medium">Responses:</h4>
                        {user.responses.map((response, idx) => (
                          <p key={idx} className="ml-4">{`Response ${
                            idx + 1
                          }: ${response.summary}`}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
