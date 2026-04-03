import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { setToken, setUserData, backendUrl } = useContext(AppContext);
    const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
    const [message, setMessage] = useState('Verifying your email, please wait...');

    useEffect(() => {
        const verify = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/user/verify-email/${token}`);

                if (data.success) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    setToken(data.token);
                    setUserData(data.user);
                    setStatus('success');
                    setMessage('Your email has been verified successfully!');
                    toast.success('Email Verified! Welcome aboard.');
                    
                    // Redirect after 3 seconds
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Verification failed.');
                    toast.error(data.message || 'Verification failed.');
                }
            } catch (error) {
                setStatus('error');
                setMessage(error.response?.data?.message || 'An error occurred during verification.');
                toast.error(error.response?.data?.message || 'An error occurred during verification.');
            }
        };

        if (token) {
            verify();
        }
    }, [token, backendUrl, setToken, setUserData, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center"
            >
                <div className="mb-6">
                    {status === 'verifying' && (
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    )}
                    {status === 'success' && (
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                            ✓
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                            ✕
                        </div>
                    )}
                </div>

                <h2 className={`text-2xl font-bold mb-4 ${
                    status === 'success' ? 'text-green-600' : 
                    status === 'error' ? 'text-red-600' : 'text-gray-800'
                }`}>
                    {status === 'verifying' ? 'Verifying...' : 
                     status === 'success' ? 'Verified!' : 'Verification Failed'}
                </h2>
                
                <p className="text-gray-600 mb-8">
                    {message}
                </p>

                {status === 'success' && (
                    <p className="text-sm text-gray-500 animate-pulse">
                        Redirecting you to the home page...
                    </p>
                )}

                {status === 'error' && (
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition"
                    >
                        Go to Home
                    </button>
                )}
            </motion.div>
        </div>
    );
};

export default VerifyEmail;
