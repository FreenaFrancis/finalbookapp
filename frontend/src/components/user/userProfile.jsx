import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function UserProfile() {
    const userId = localStorage.getItem('UserId');
    console.log(userId);
    const [data, setData] = useState(null); // Initialize data as null

    useEffect(() => {
        // Fetch user data by admin ID
        axios.get(`http://localhost:5000/api/user/getUserById/${userId}`)
            .then((res) => {
                console.log(res.data);
                setData(res.data); // Set fetched data to state
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userId]);

    const handleEdit = () => {
        axios.put('')
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-100 to-blue-100">
            {/* The gradient will now cover the entire width and height of the screen */}
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full transition-transform transform hover:scale-105">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Profile</h1>
                {data ? (
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
                            onClick={handleEdit}
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

export default UserProfile;
