import axios from 'axios';
import React, { useEffect, useState } from 'react';

function GetAllusers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetching users from API
    axios.get('http://localhost:5000/api/user/getalluser')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("Error fetching users:", error);
      });
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-blue-100 to-green-100 min-h-screen" style={{marginLeft:'230px',marginTop:'-650px'}}>
      <h1 className="text-3xl font-bold text-center mb-6">All Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              {/* <th className="py-3 px-4 border-b">User ID</th> */}
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId} className="hover:bg-gray-100">
                {/* <td className="py-2 px-4 border-b">{user.id}</td> */}
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetAllusers;
