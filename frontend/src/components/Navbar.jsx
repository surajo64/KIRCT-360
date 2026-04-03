import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Database } from "lucide-react";
import logo from "../assets/logo.png";
import { AppContext } from "../context/AppContext";
import { assets } from '../assets/assets';
import { toast } from "react-toastify";
import axios from "axios";
import LoadingOverlay from "./loadingOverlay";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { token, setToken, userData, setUserData, userProfile, backendUrl, logout } = useContext(AppContext);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Auth Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState(""); // email or phone

  // Profile/Password Change State
  const [image, setImage] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Local form state for editing
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nin: "",
    dob: "",
    gender: "",
    address: ""
  });

  // Sync formData with userData when modal opens or userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        nin: userData.nin || "",
        dob: userData.dob || "",
        gender: userData.gender || "",
        address: userData.address || ""
      });
    }
  }, [userData, open]);


  const clear = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    if (isRegistering) {
      // Registration logic
      try {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          password,
          phone,
          email,
        });

        if (data.success) {
          setName("");
          setEmail("");
          setPhone("");
          setPassword("");
          toast.success(data.message || "Account created! Please check your email to verify your account.");
          setShowAuthModal(false);
          setIsRegistering(false); // Switch back to login for next time
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed!");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Login logic
      try {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email: identifier.includes("@") ? identifier : undefined,
          phone: !identifier.includes("@") ? identifier : undefined,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setToken(data.token);
          setShowAuthModal(false);
          clear();
          setIdentifier(""); // Reset identifier
          setPassword("");
          toast.success("Login Success!");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Update Profile Logic
  const updateProfile = async () => {
    setIsSubmitting(true);
    const apiFormData = new FormData();
    apiFormData.append("name", formData.name);
    apiFormData.append("email", formData.email);
    apiFormData.append("phone", formData.phone);
    apiFormData.append("nin", formData.nin);
    apiFormData.append("dob", formData.dob);
    apiFormData.append("gender", formData.gender);
    apiFormData.append("address", formData.address);
    if (image) apiFormData.append("image", image);

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/update",
        apiFormData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Profile updated!");
        setEditMode(false);
        userProfile();
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

  // Change Password Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/change",
        {
          userId: userData._id,
          currentPassword,
          newPassword,
          confirmPassword,
        },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        logout();
        setChangePassword(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (open) {
      userProfile();
    }
  }, [open, userProfile]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const menuItems = [
    { name: "REDCap", path: "/redcap", type: "link" },
    { name: "HOME", path: "/", type: "link" },
    {
      name: "ABOUT",
      type: "dropdown",
      items: [
        { name: "About Us", path: "/about" },
        { name: "Our Team", path: "/team" },
        { name: "Facility Description", path: "/facility" },
        { name: "Grant Management", path: "/grant" },
        { name: "Corporate Profile", path: "/profile" },
        { name: "Meet Our DG", path: "/about-dg" },
        { name: "Board of Trustees", path: "/board" },
        { name: "KIRCT Ethics Committee", path: "/ethics-committee" },
        { name: "Image Gallery", path: "/gallery" },
      ],
    },
    {
      name: "DEPARTMENTS",
      type: "dropdown",
      items: [
        { name: "Epidemiology & Population", path: "/epidemiology" },
        { name: "Maternal & Child Health", path: "/maternal-child" },
        { name: "Health Metrics & AI", path: "/health-metrics" },
        { name: "Hospital Complex", path: "/hospital-complex" },
      ],
    },
    {
      name: "RESEARCH",
      type: "dropdown",
      items: [
        { name: "Genomics Unit", path: "/genomics" },
        { name: "Microbiology Unit", path: "/microbiology" },
        { name: "TB Unit", path: "/tb-unit" },
        { name: "Research Studies", path: "/research-studies" },
        { name: "Vaccine Research", path: "/vaccine-research" },
        { name: "Publications", path: "/publications" },
      ],
    },
    {
      name: "COLLABORATIONS",
      type: "dropdown",
      items: [
        { name: "International Collaboration", path: "/international" },
        { name: "National Collaboration", path: "/national" },
      ],
    },
    {
      name: "SERVICES",
      type: "dropdown",
      items: [
        { name: "Clinical Diagnostic Lab", path: "/clinical-lab" },
        { name: "Central Research Lab", path: "/research-lab" },
      ],
    },
    {
      name: "APPLICATIONS",
      type: "dropdown",
      items: [
        { name: "Internship Application", path: "/internship" },
        { name: "Job Vacancy", path: "/job-vacancy" },
      ],
    },
    {
      name: "TRAINING",
      type: "dropdown",
      items: [
        { name: "Available Courses", path: "/all-courses" },
        { name: "Completed Trainings", path: "/completed" },
        { name: "Upcoming Workshops", path: "/upcoming" },
      ],
    },
    { name: "NEWS", path: "/news", type: "link" },
    { name: "CONTACT", path: "/contact", type: "link" },
  ];

  return (
    <nav className="bg-white text-gray-700 shadow-xl sticky top-0 z-50">
      {isLoading && <LoadingOverlay />}

      {/* Scrolling Banner */}
      <div className="relative overflow-hidden bg-blue-950 py-2 text-sm text-blue-200">
        <div className="animate-marquee whitespace-nowrap flex items-center px-6">
          <span className="mx-12">👋 Welcome to Kano Independent Research Centre Trust!</span>
          <span className="mx-12">Need REDCap Free Access ? Click the glowing button below!</span>
          <span className="mx-12">📞 +234-80-80383147</span>
          <span className="mx-12">✉️ info@kirct.com</span>
          <span className="mx-12">🌐 www.kirct.com</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full flex items-center justify-between px-4 py-2">

        {/* LEFT SIDE: Logo + KIRCT */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 xl:gap-3 cursor-pointer group shrink-0"
        >
          <img
            src={logo}
            alt="KIRCT Logo"
            className="w-10 h-10 xl:w-12 xl:h-12 bg-white rounded-lg p-1 transition-transform group-hover:scale-110"
          />
          <span className="text-lg xl:text-xl font-bold text-blue-800 leading-tight hidden 2xl:block">KIRCT</span>
        </div>

        {/* RIGHT SIDE: Desktop Menu */}
        <div ref={dropdownRef} className="hidden lg:flex items-center lg:gap-0.5 xl:gap-2 2xl:gap-3">
          {menuItems.map((item, index) =>
            item.name === "REDCap" ? (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 1,
                  textShadow: "0px 0px 8px rgba(255,255,255,0.8)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="relative hidden lg:block"
              >
                <Link
                  to={item.path}
                  className="flex items-end gap-1 px-3 py-1 rounded-full 
            bg-gradient-to-r from-blue-700 via-red-600 to-blue-700 
            text-white font-semibold shadow-md hover:shadow-lg 
            transition-all duration-300"
                >
                  <span>{item.name}</span>
                </Link>

                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-full 
            bg-gradient-to-r from-blue-400 via-red-400 to-blue-400 
            opacity-70 blur-lg"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.1, 1],
                    filter: ["blur(8px)", "blur(12px)", "blur(8px)"],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            ) : item.type === "link" ? (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `px-1.5 xl:px-3 py-3 text-[12px] xl:text-[13px] 2xl:text-sm font-semibold border-b-2 transition-all shrink-0 ${isActive
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent hover:text-blue-700 hover:border-blue-400"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ) : (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(item.name)}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="px-1 xl:px-2 py-1 flex items-center text-[12px] xl:text-[13px] 2xl:text-sm font-semibold hover:text-blue-600 transition-all whitespace-nowrap">
                  {item.name}
                  <svg
                    className={`ml-0.5 w-3 h-3 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-1 min-w-60 bg-white 
                text-gray-700 rounded-lg shadow-xl py-2 border 
                border-blue-100 z-[999]"
                    >
                      {item.items.map((subItem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subItem.path}
                          className="block px-5 py-2 text-sm hover:bg-blue-50 
                    hover:text-blue-700 transition-all"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {subItem.name}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          )}
        </div>

        {/* User Account / Login */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-4 shrink-0">
          {token ? (
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 h-8 rounded-full' src={userData?.image || assets.profile_pic} alt="" />
              { /* Using a smaller trigger for dropdown or just hover the whole block */}
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4 shadow-lg'>
                  <p onClick={() => navigate('/my-courses')} className='hover:text-black cursor-pointer'>My Enrollments</p>
                  <p onClick={() => { setOpen(true); setEditMode(false); }} className='hover:text-black cursor-pointer'>Profile</p>
                  <p onClick={() => setChangePassword(true)} className='hover:text-black cursor-pointer'>Change Password</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => { setIsRegistering(false); setShowAuthModal(true); }}
              className='bg-blue-600 text-white px-4 xl:px-8 py-2 md:py-2.5 rounded-full font-bold text-[12px] xl:text-sm 2xl:text-base hover:bg-blue-700 transition'
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setShowMenu(true)}
          className="lg:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors text-blue-900"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-gradient-to-br from-blue-900 to-blue-800 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-blue-700">
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 bg-white rounded-lg p-1" src={logo} alt="Logo" />
                <span className="text-lg font-bold text-white">KIRCT</span>
              </div>
              <button onClick={() => setShowMenu(false)}>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {menuItems.map((item, index) => (
                <div key={index} className="border-b border-blue-700">
                  {item.type === "link" ? (
                    <NavLink
                      to={item.path}
                      onClick={() => setShowMenu(false)}
                      className="block px-6 py-3 text-blue-100 hover:bg-blue-700 transition"
                    >
                      {item.name}
                    </NavLink>
                  ) : (
                    <div>
                      <button
                        onClick={() =>
                          setActiveDropdown(activeDropdown === item.name ? null : item.name)
                        }
                        className="flex justify-between w-full px-6 py-3 text-blue-100 hover:bg-blue-700"
                      >
                        {item.name}
                        <svg
                          className={`w-4 h-4 transform transition-transform ${activeDropdown === item.name ? "rotate-180" : ""
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-blue-800"
                          >
                            {item.items.map((subItem, i) => (
                              <NavLink
                                key={i}
                                to={subItem.path}
                                className="block px-8 py-2 text-blue-100 hover:bg-blue-700 text-sm"
                                onClick={() => setShowMenu(false)}
                              >
                                {subItem.name}
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              ))}

              {/* Login/Profile for Mobile */}
              <div className="flex flex-col items-center gap-4 mt-6 border-t border-blue-700 pt-6">
                {token ? (
                  <>
                    <button onClick={() => { navigate('/my-courses'); setShowMenu(false) }} className="text-blue-100 hover:text-white">My Enrollments</button>
                    <button onClick={() => { setOpen(true); setEditMode(false); setShowMenu(false); }} className="text-blue-100 hover:text-white">Profile</button>
                    <button onClick={() => { setChangePassword(true); setShowMenu(false); }} className="text-blue-100 hover:text-white">Change Password</button>
                    <button onClick={() => { logout(); setShowMenu(false) }} className="text-blue-100 hover:text-white">Logout</button>
                  </>
                ) : (
                  <button
                    onClick={() => { setIsRegistering(false); setShowAuthModal(true); setShowMenu(false); }}
                    className="bg-white text-blue-900 px-8 py-2 rounded-full font-bold"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-2 right-2 text-red-600 font-bold text-lg"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
              {isRegistering ? 'Create Account' : 'Login'}
            </h2>

            {isRegistering ? (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mb-3 border px-3 py-2 rounded"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full mb-3 border px-3 py-2 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mb-3 border px-3 py-2 rounded"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mb-3 border px-3 py-2 rounded"
                />

                <button
                  onClick={onSubmitHandler}
                  className="bg-blue-600 text-white w-full py-2 rounded mb-2"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Email or Phone"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full mb-3 border px-3 py-2 rounded"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mb-3 border px-3 py-2 rounded"
                />

                <button
                  onClick={onSubmitHandler}
                  className="bg-blue-600 text-white w-full py-2 rounded mb-2"
                >
                  Login
                </button>
              </>
            )}

            <p className="text-sm text-center mt-2">
              {isRegistering ? (
                <>
                  Already have an account?{' '}
                  <span
                    onClick={() => setIsRegistering(false)}
                    className="text-blue-600 cursor-pointer"
                  >
                    Login
                  </span>
                </>
              ) : (
                <>
                  Don’t have an account?{' '}
                  <span
                    onClick={() => setIsRegistering(true)}
                    className="text-green-600 cursor-pointer"
                  >
                    Register
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-lg"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            {/* Profile Fields */}
            <div className="mt-4 text-gray-700 text-sm space-y-2">
              {
                editMode ?
                  <label htmlFor="image">
                    <div className="w-32 h-32 mx-auto relative cursor-pointer">
                      <img
                        src={image ? URL.createObjectURL(image) : userData?.image} alt="Profile Preview"
                        className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover" />
                    </div>
                    <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
                  </label>
                  : <img src={userData?.image || assets.profile_pic} alt="Profile" className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500 object-cover" />
              }

              {editMode ? (
                <input type="text" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className="border p-2 w-full rounded" placeholder="Full Name" />
              ) : (
                <h2 className="text-2xl font-bold text-center">{userData?.name}</h2>
              )}

              {editMode ? (
                <input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="border p-2 w-full rounded" placeholder="Email" />
              ) : (
                <p><strong>Email:</strong> {userData.email}</p>
              )}

              {editMode ? (
                <input type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} className="border p-2 w-full rounded" placeholder="Phone" />
              ) : (
                <p><strong>Phone:</strong> {userData.phone}</p>
              )}

              {editMode ? (
                <input type="text" value={formData.nin} onChange={(e) => setFormData(prev => ({ ...prev, nin: e.target.value }))} className="border p-2 w-full rounded" placeholder="NIN" />
              ) : (
                <p><strong>NIN:</strong> {userData.nin}</p>
              )}

              {editMode ? (
                <input type="date" value={formData.dob ? new Date(formData.dob).toISOString().split("T")[0] : ""} onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))} className="border p-2 w-full rounded" />
              ) : (
                <p><strong>DOB:</strong> {userData.dob ? new Date(userData.dob).toDateString() : "N/A"}</p>
              )}

              {editMode ? (
                <select value={formData.gender} onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))} className="border p-2 w-full rounded">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p><strong>Gender:</strong> {userData.gender}</p>
              )}

              {editMode ? (
                <textarea value={formData.address} onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} className="border p-2 w-full rounded" rows="3" placeholder="Address" />
              ) : (
                <p><strong>Address:</strong> {userData.address}</p>
              )}
            </div>

            <div className="mt-4 flex justify-center">
              {editMode ? (
                <button onClick={updateProfile} disabled={isSubmitting} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:bg-gray-400">
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              ) : (
                <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Edit Profile</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {changePassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => { setChangePassword(false); clear(); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Change</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
