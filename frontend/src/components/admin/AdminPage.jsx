import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming admin is logged in initially
  const navigate = useNavigate();
  const admin = localStorage.getItem('admin');
  const token = localStorage.getItem('token');

  console.log("AdminPage Rendered"); // Debugging log
  console.log("admin:", admin);
  console.log("token:", token);

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Team A',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Team B',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: 'rgb(255, 205, 86)',
        tension: 0.1,
      },
      {
        label: 'Team C',
        data: [18, 30, 20, 49, 76, 67, 80],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: ['America', 'Asia', 'Europe', 'Africa'],
    datasets: [
      {
        label: 'Current Visits',
        data: [300, 50, 100, 75],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(255, 99, 132)', 'rgb(153, 102, 255)'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{marginLeft:'300px' ,marginTop:'-620px'}}>
      <div className="flex-1 p-6">
        {/* <h1 className="text-3xl text-center mb-6">Welcome to the Admin Dashboard</h1> */}

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded shadow">
            <h2 className="text-xl">Weekly Sales</h2>
            <p className="text-3xl">714k</p>
          </div>
          <div className="bg-blue-400 text-white p-4 rounded shadow">
            <h2 className="text-xl">New Users</h2>
            <p className="text-3xl">1.35m</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded shadow">
            <h2 className="text-xl">Item Orders</h2>
            <p className="text-3xl">1.72m</p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded shadow">
            <h2 className="text-xl">Bug Reports</h2>
            <p className="text-3xl">234</p>
          </div>
        </div>

        {/* Website Visits Chart */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-2xl mb-4">Website Visits</h2>
          <Line data={lineChartData} />
        </div>

        {/* Pie Chart for Current Visits */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl mb-4">Current Visits</h2>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
