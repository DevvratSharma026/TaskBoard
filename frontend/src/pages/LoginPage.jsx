import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const navigate = useNavigate();

    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
       
        loginLink();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginFormData({
            ...loginFormData,
            [name]: value,
        });
    }

    const loginLink = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/v1/auth/login', loginFormData);
            localStorage.setItem('token', res.data.token)
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            toast.error("Error while login")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#4c456a] text-white p-4">
            <form onSubmit={handleSubmit} className="bg-gray-900 p-10 rounded-2xl shadow-2xl shadow-black w-full max-w-sm transform hover:scale-[1.01] transition duration-500 ease-in-out border border-purple-700">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-purple-400 tracking-wider">
                    👋 Welcome Back
                </h2>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-400">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 border border-transparent hover:border-purple-600"
                        name='email'
                        value={loginFormData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-8">
                    <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-400">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 border border-transparent hover:border-purple-600"
                        name='password'
                        value={loginFormData.password}
                        onChange={handleChange}
                    />
                </div>

                <button type='submit' className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg text-lg transition duration-300 shadow-lg shadow-purple-600/50 transform hover:-translate-y-0.5">
                    Sign In
                </button>

                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        New member?
                        <Link to="/signup" className="font-medium text-purple-400 hover:text-purple-300 transition duration-300 ml-1">
                            Sign Up Now
                        </Link>
                    </p>
                </div>

            </form>
        </div>
    );
};

export default LoginPage;
