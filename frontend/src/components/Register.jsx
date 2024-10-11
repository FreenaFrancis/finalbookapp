import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/user/register', { name, email, password })
            .then(res => {
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="flex justify-center items-center bg-gray-200 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h1 className="text-2xl font-bold mb-4">Register</h1>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <input 
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-4 text-gray-600 text-center">Already have an account?</p>
                <Link 
                    to={'/login'} 
                    className="block w-full text-center mt-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
