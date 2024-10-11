import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function AdminMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming admin is logged in initially
  const navigate = useNavigate();
  const admin = localStorage.getItem('admin');
  const token = localStorage.getItem('token');
  console.log("admin:", admin);
  console.log("token:", token);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page after logout
  };


  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white flex flex-col items-center py-6 fixed h-full shadow-lg">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <nav className="flex flex-col w-full px-4 space-y-4">
          <NavLink
            to="/dashboard/admin"
            className={({ isActive }) => 
              `block w-full text-center py-2 px-4 rounded-lg ${
                isActive ? 'bg-gray-800' : 'bg-gray-900 hover:bg-gray-700'
              } transition duration-300`
            }
          >
           Home
          </NavLink>

          <NavLink
            to={`/dashboard/addbook/${admin}`} // Assuming `admin` is your userId
            className={({ isActive }) => 
              `block w-full text-center py-2 px-4 rounded-lg ${
                isActive ? 'bg-gray-800' : 'bg-gray-900 hover:bg-gray-700'
              } transition duration-300`
            }
          >
            Create Product
          </NavLink>

          <NavLink
            to="/dashboard/getallproducts"
            className={({ isActive }) => 
              `block w-full text-center py-2 px-4 rounded-lg ${
                isActive ? 'bg-gray-800' : 'bg-gray-900 hover:bg-gray-700'
              } transition duration-300`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/dashboard/getallorders"
            className={({ isActive }) => 
              `block w-full text-center py-2 px-4 rounded-lg ${
                isActive ? 'bg-gray-800' : 'bg-gray-900 hover:bg-gray-700'
              } transition duration-300`
            }
          >
            All Orders
          </NavLink>
          <NavLink
            to="/dashboard/getallusers"
            className={({ isActive }) => 
              `block w-full text-center py-2 px-4 rounded-lg ${
                isActive ? 'bg-gray-800' : 'bg-gray-900 hover:bg-gray-700'
              } transition duration-300`
            }
          >
            All Users
          </NavLink>

          <NavLink
            to="/dashboard/adminprofile"
            className={({ isActive }) => 
              `block w-full text-center py-2 px-4 rounded-lg ${
                isActive ? 'bg-gray-800' : 'bg-gray-900 hover:bg-gray-700'
              } transition duration-300`
            }
          >
            Profile
          </NavLink>

          <button
            onClick={handleLogout}
            className="block w-full text-center py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1  p-6 ">
        <h1 className="text-3xl text-center">Welcome to the Admin Dashboard</h1>
        <Outlet /> {/* Main content will appear here */}
      </div>
    </div>
  );
}

export default AdminMenu;
