import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditAdminProfile() {
    const { id } = useParams(); // Get ID from URL parameters
    const [data, setData] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch user data by admin ID
        axios.get(`http://localhost:5000/api/user/getUserById/${id}`)
            .then((res) => {
                console.log(res.data);
                setData(res.data); // Set fetched data to state
                setName(res.data.name); // Populate form fields
                setEmail(res.data.email);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]); // Fetch data when the component mounts or when ID changes

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/user/edituser/${id}`, { name, email, password })
            .then(res => {
                alert('Profile updated successfully!'); // Optional: Add confirmation message
                navigate('/dashboard'); // Redirect to the dashboard or another appropriate route
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="flex justify-center items-center bg-gray-200 min-h-screen" style={{ marginLeft: '230px', marginTop: '-630px' }}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            Name
                        </label>
                        <input 
                            type="text"
                            placeholder="Enter name"
                            autoComplete="off"
                            name="name"
                            value={name} // Bind value to state
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email
                        </label>
                        <input 
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            name="email"
                            value={email} // Bind value to state
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>

                    {/* <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Password (Leave blank to keep current password)
                        </label>
                        <input 
                            type="password"
                            placeholder="Enter new password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div> */}

                    <button 
                        type="submit" 
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditAdminProfile;
