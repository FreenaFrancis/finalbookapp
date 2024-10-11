import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/user/login', { email, password })
            .then(res => {
                console.log(res.data);
                if (res.data.status === "success") {
                    toast.success(`Welcome ${res.data.role}!`, {
                        // position: toast.POSITION.TOP_RIGHT,
                        position: 'top-right',
                    });
                    if (res.data.role === "admin") {
                        localStorage.setItem('admin', res.data.userId);
                        localStorage.setItem('token', res.data.token);
                        setTimeout(() => navigate("/dashboard/admin"), 1500);  // Delay for the toast to show
                    } else {
                        localStorage.setItem('UserId', res.data.userId);
                        localStorage.setItem('token', res.data.token);
                        setTimeout(() => navigate("/home"), 1500);  // Delay for the toast to show
                    }
                } else {
                    toast.error("Login failed! Please check your credentials.", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                toast.error("An error occurred during login.", {
                    // position: toast.POSITION.TOP_RIGHT,
                    position: 'top-right',
                });
            });
    };

    return (
        <div className="flex justify-center items-center bg-gray-200 min-h-screen">
            <ToastContainer /> {/* Toast container to render the notifications */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
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
                            autoComplete="off"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-gray-600 text-center">Don't have an account?</p>
                <Link 
                    to="/" 
                    className="block w-full text-center mt-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
                >
                    Sign up
                </Link>
            </div>
        </div>
    );
}

export default Login;
