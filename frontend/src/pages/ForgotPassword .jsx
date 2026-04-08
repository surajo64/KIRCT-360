import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { backendUrl } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error('Please enter your email address.');
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });
      if (data.success) {
        setEmailSent(true);
        toast.success('Password reset email sent. Check your inbox.');
      } else {
        toast.error(data.message || 'Something went wrong.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 px-4 py-12">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full opacity-10 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header strip */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-6 flex items-center gap-4">
            <Link to="/">
              <img src={logo} alt="KIRCT Logo" className="w-12 h-12 bg-white rounded-xl p-1 shadow" />
            </Link>
            <div>
              <h1 className="text-white text-xl font-bold leading-tight">KIRCT Portal</h1>
              <p className="text-blue-200 text-xs">Kano Independent Research Centre Trust</p>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            {!emailSent ? (
              <>
                {/* Icon */}
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center shadow-inner">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 7a2 2 0 114 0m-4 0a2 2 0 00-4 0m4 0v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7m10 0H7m0 0a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2" />
                    </svg>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Forgot your password?</h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                  No worries! Enter your email and we'll send you a password reset link.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50 transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg hover:shadow-blue-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                  Remembered your password?{' '}
                  <Link to="/" className="text-blue-600 font-medium hover:underline">
                    Back to Login
                  </Link>
                </p>
              </>
            ) : (
              /* Success state */
              <div className="text-center py-4">
                <div className="flex justify-center mb-5">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center shadow-inner">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">Check your inbox!</h2>
                <p className="text-gray-500 text-sm mb-2">
                  We've sent a password reset link to
                </p>
                <p className="text-blue-700 font-semibold text-sm mb-6 break-all">{email}</p>
                <p className="text-gray-400 text-xs mb-6">
                  The link will expire in <strong>1 hour</strong>. Check your spam folder if you don't see it.
                </p>

                <button
                  onClick={() => { setEmailSent(false); setEmail(''); }}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  ← Use a different email
                </button>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link to="/" className="text-gray-500 text-sm hover:text-gray-700">
                    ← Return to Homepage
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-blue-200 text-xs mt-6 opacity-70">
          © {new Date().getFullYear()} KIRCT. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
