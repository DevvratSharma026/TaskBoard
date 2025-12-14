import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  //handler function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Name fields cannot be empty");
      return;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      toast.error("Password fields cannot be empty");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }


    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords are not matching");
      return;
    }
    if (password.length < 8) {
      toast.error("Password length should be greater then 8")
    }
    if (signupLink()) {
      toast.success('Account created, please login');
    };
  }

  const signupLink = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/signup", formData);

      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error("Signup Error");
    }
  }



  return (
    // Outer container for centering and background
    <div className="min-h-screen flex items-center justify-center bg-[#4c456a] text-white p-4">
      {/* Card Container */}
      <form onSubmit={handleSubmit} className="bg-gray-900 p-10 rounded-2xl shadow-2xl shadow-black w-full max-w-lg border border-purple-700 transform hover:scale-[1.01] transition duration-500 ease-in-out">

        {/* Header */}
        <h2 className="text-3xl font-extrabold mb-8 text-center text-purple-400 tracking-wider">
          🚀 Create Your Account
        </h2>

        {/* Name Fields (Grouped) */}
        <div className="flex gap-4 mb-5">
          {/* First Name */}
          <div className="w-1/2">
            <label htmlFor="firstName" className="block text-sm font-medium mb-1 text-gray-400">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Jane"
              className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 border border-transparent hover:border-purple-600"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          {/* Last Name */}
          <div className="w-1/2">
            <label htmlFor="lastName" className="block text-sm font-medium mb-1 text-gray-400">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Doe"
              className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 border border-transparent hover:border-purple-600"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-400">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 border border-transparent hover:border-purple-600"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-400">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 border border-transparent hover:border-purple-600"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-8">
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-gray-400">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 border border-transparent hover:border-purple-600"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {/* Sign Up Button */}
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg text-lg transition duration-300 shadow-lg shadow-purple-600/50 transform hover:-translate-y-0.5">
          Sign Up
        </button>

        {/* Already a Member Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Already a member?
            <Link
              to="/login"
              className="ml-1 font-medium text-purple-400 hover:text-purple-300 transition duration-300"
            >
              Sign In
            </Link>
          </p>
        </div>

      </form>
    </div>
  );
};

export default SignupPage;