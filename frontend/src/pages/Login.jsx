import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from "react-toastify";
import { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AppContext, } from '../context/AppContext';
import LoadingOverlay from '../components/loadingOverlay';




const Login = () => {
  const { atoken, setAtoken, backendUrl } = useContext(AppContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const { data } = await axios.post(backendUrl + '/api/educator/login', {
        email,
        password,
      });

      if (data.success && data.atoken && data.admin) {
        // Save token and user data
        localStorage.setItem('atoken', data.atoken);
        localStorage.setItem('admin', JSON.stringify(data.admin));
        setAtoken(data.atoken);

        toast.success("User login successful!");

        // 👇 Navigate based on role
        if (data.admin.role === "admin") {
          navigate('/admin-dashboard');
        } else if (data.admin.role === "educator") {
          navigate('/educator-dashboard');
        } else {
          toast.error("Unauthorized role!");
        }

      } else {
        toast.error(data.message || "Invalid login response.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setIsLoading(false)
    }
  };


  useEffect(() => {
    if (atoken) {
      navigate('/admin-dashboard');
    }
  }, [atoken, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {isLoading && <LoadingOverlay />}
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-Blue-800 mb-6">
        KIRCT LEARNING MANAGEMENT SYSTEM
      </h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Login</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-800 font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-800 font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
