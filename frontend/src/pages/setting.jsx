import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import LoadingOverlay from "../components/loadingOverlay.jsx";
import { LockKeyhole, ShieldCheck } from "lucide-react";

const Setting = () => {
  const navigate = useNavigate();
  const { token, backendUrl, setToken, setUser } = useContext(AppContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
     // setIsLoading(false);
      return;
    }
 
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-password`,
        { oldPassword, newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message || "Password changed successfully");
        logout();
      } else {
        toast.error(data.message || "Password change failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (token) {
      setToken("");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 border-t-4 border-blue-700">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full mb-3">
            <LockKeyhole className="text-blue-700 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-blue-800 text-center">
            Change Password
          </h2>
          <p className="text-gray-500 text-sm text-center mt-1">
            Update your account credentials securely
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleChangePassword} className="space-y-4">
          {/* Old Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter old password"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter new password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Confirm new password"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-3 bg-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-800 transition-all duration-300 flex items-center justify-center"
          >
            <ShieldCheck className="w-5 h-5 mr-2" />
            Change Password
          </button>
        </form>
      </div>

      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default Setting;
