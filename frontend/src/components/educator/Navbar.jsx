import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets, dummyCourses } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, backendUrl, adminData, atoken, adminProfile, setAdminData, } = useContext(AppContext)
  const [image, setImage] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [changePassword, setChangePassword] = useState(false)
  const [menu, setMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Local form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    about: "",
    nin: "",
    dob: "",
    gender: "",
    address: "",
    role: ""
  });

  // Sync formData with adminData when modal opens
  useEffect(() => {
    if (adminData) {
      setFormData({
        name: adminData.name || "",
        email: adminData.email || "",
        phone: adminData.phone || "",
        about: adminData.about || "",
        nin: adminData.nin || "",
        dob: adminData.dob || "",
        gender: adminData.gender || "",
        address: adminData.address || "",
        role: adminData.role || ""
      });
    }
  }, [adminData, open]);

  // Handle Update Profile form submit
  const updateProfile = async () => {
    setIsSubmitting(true);
    const apiFormData = new FormData();
    apiFormData.append("adminId", adminData._id);
    apiFormData.append("name", formData.name);
    apiFormData.append("email", formData.email);
    apiFormData.append("phone", formData.phone);
    apiFormData.append("about", formData.about);
    apiFormData.append("nin", formData.nin);
    apiFormData.append("dob", formData.dob);
    apiFormData.append("gender", formData.gender);
    apiFormData.append("address", formData.address);
    // Role is usually not editable by self, but if needed:
    // apiFormData.append("role", formData.role); 

    if (image) apiFormData.append("image", image);

    try {
      const { data } = await axios.put(
        backendUrl + "/api/educator/update-profile",
        apiFormData,
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message || "Profile updated!");
        setEditMode(false);
        adminProfile(); // reload fresh data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile");
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/educator/change-password",
        {
          adminId: adminData._id,
          currentPassword,
          newPassword,
          confirmPassword,
        },
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        logout();

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  };


  useEffect(() => {
    if (open) {
      adminProfile();
    }
  }, [open, adminProfile]);

  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b py-3 shadow-sm sticky top-0 bg-white/90 backdrop-blur-md z-50 transition-all duration-300">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text cursor-pointer hover:opacity-80 transition-opacity"
        >
          KIRCT LMS
        </h1>

        {/* User Menu */}
        <div className="hidden md:flex items-center gap-3 text-gray-700 font-medium relative">
          {/* Trigger */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors"
            onClick={() => setMenu((prev) => !prev)}
          >
            <img src={adminData?.image || assets.profile_img} alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover" />

            <p className="truncate max-w-[150px]">
              Hi! {adminData?.name ? adminData.name.split(" ")[0] : "Educator"}
            </p>
          </div>

          {/* Dropdown */}
          {menu && (
            <div className="absolute top-12 right-0 bg-white border border-gray-100 rounded-xl shadow-xl w-48 animate-fadeIn overflow-hidden z-50">
              <ul className="flex flex-col py-2 text-sm text-gray-600">
                <li
                  onClick={() => {
                    setOpen(true);
                    setEditMode(false);
                    setMenu(false);
                  }}
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                >
                  Profile
                </li>
                <li
                  onClick={() => {
                    setChangePassword(true),
                      setMenu(false)
                  }}
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors">
                  Change Password
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>


      {/* Profile Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative animate-fadeIn max-h-[85vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xl font-bold"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {editMode ? "Edit Profile" : "My Profile"}
            </h2>

            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              {editMode ? (
                <div className="relative cursor-pointer group">
                  <label htmlFor="image">
                    <img
                      src={image ? URL.createObjectURL(image) : adminData?.image || assets.profile_img}
                      alt="Profile Preview"
                      className="w-32 h-32 rounded-full border-4 border-blue-100 object-cover group-hover:opacity-75 transition"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">Change</span>
                    </div>
                  </label>
                  <input
                    type="file"
                    id="image"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              ) : (
                <img
                  src={adminData?.image || assets.profile_img}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-blue-100 object-cover shadow-sm"
                />
              )}
            </div>

            {/* Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">

              {/* Full Name */}
              <div className="col-span-1 md:col-span-2">
                {editMode ? (
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Full Name"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900">{adminData?.name}</h3>
                    <p className="text-blue-600 font-medium capitalize">{adminData?.role}</p>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">Email</label>
                {editMode ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="font-medium text-gray-800 break-all">{adminData?.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">Phone</label>
                {editMode ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{adminData?.phone || "Not Set"}</p>
                )}
              </div>

              {/* NIN */}
              <div>
                <label className="block text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">NIN</label>
                {editMode ? (
                  <input
                    type="text"
                    value={formData.nin}
                    onChange={(e) => setFormData(prev => ({ ...prev, nin: e.target.value }))}
                    className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{adminData?.nin || "Not Set"}</p>
                )}
              </div>

              {/* DOB */}
              <div>
                <label className="block text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">Date of Birth</label>
                {editMode ? (
                  <input
                    type="date"
                    value={formData.dob ? new Date(formData.dob).toISOString().split("T")[0] : ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
                    className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{adminData?.dob ? new Date(adminData.dob).toDateString() : "Not Set"}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">Gender</label>
                {editMode ? (
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className="font-medium text-gray-800">{adminData?.gender || "Not Set"}</p>
                )}
              </div>

              {/* Address (Full Width) */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">Address</label>
                {editMode ? (
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500 resize-none h-20"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{adminData?.address || "Not Set"}</p>
                )}
              </div>

              {/* About (Full Width - only if Educator) */}
              {adminData?.role === 'educator' && (
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">About</label>
                  {editMode ? (
                    <textarea
                      value={formData.about}
                      onChange={(e) => setFormData(prev => ({ ...prev, about: e.target.value }))}
                      className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500 resize-none h-24"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="font-medium text-gray-800">{adminData?.about || "Not Set"}</p>
                  )}
                </div>
              )}

            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              {editMode ? (
                <>
                  <button
                    onClick={() => setEditMode(false)}
                    disabled={isSubmitting}
                    className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateProfile}
                    disabled={isSubmitting}
                    className="px-8 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg disabled:opacity-70 flex items-center gap-2"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-8 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}


      {/* Popup (change Password) */}
      {
        changePassword && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100] p-4">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Change Password
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setChangePassword(false)
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Change
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Navbar
