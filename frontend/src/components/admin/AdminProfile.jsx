import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AdminProfile() {
    const [data, setData] = useState(null); // Initialize data as null
    const admin = localStorage.getItem('admin'); // Admin ID from local storage
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch user data by admin ID
        axios.get(`http://localhost:5000/api/user/getUserById/${admin}`)
            .then((res) => {
                console.log(res.data);
                setData(res.data); // Set fetched data to state
            })
            .catch((err) => {
                console.log(err);
            });
    }, [admin]); // Adding admin as a dependency to the useEffect

    const handleEdit = () => {
        if (data) {
            navigate(`/dashboard/editprofile/${data._id}`); // Use data._id for navigation
        }
    }

    return (
        <div className="container p-8 bg-gradient-to-r from-green-100 to-blue-100 min-h-screen flex justify-center items-center" style={{ marginLeft: '230px', marginTop: '-630px' }}>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full transition-transform transform hover:scale-105">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Admin Profile</h1>
                
                {data ? ( // Check if data is not null
                    <div className="flex flex-col items-center mb-4">
                        <div className="mb-4">
                            <FontAwesomeIcon icon={faUserCircle} className="text-8xl text-blue-600 mb-2" />
                        </div>
                        <div className="mb-4 text-center">
                            <h2 className="text-2xl font-semibold text-gray-800">Name</h2>
                            <p className="text-gray-600 text-lg">{data.name}</p>
                        </div>
                        <div className="mb-4 text-center">
                            <h2 className="text-2xl font-semibold text-gray-800">Email</h2>
                            <p className="text-gray-600 text-lg">{data.email}</p>
                        </div>
                        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 hover:bg-blue-700"
                            onClick={handleEdit} // Call handleEdit without passing an argument
                        >
                            Edit
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-gray-700">Loading profile data...</p>
                )}
            </div>
        </div>
    );
}

export default AdminProfile;
