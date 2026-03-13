import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Users,
  UserPlus,
  Newspaper,
} from 'lucide-react';
import { AppContext } from '../../context/AppContext'; // adjust path if needed

// Educator Menu
const educatorMenuItems = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, to: '/educator-dashboard' },
  { label: 'Add Course', icon: <PlusCircle size={20} />, to: '/educator/add-course' },
  { label: 'Questions', icon: <PlusCircle size={20} />, to: '/educator/add-quize' },
  { label: 'My Courses', icon: <BookOpen size={20} />, to: '/educator/my-courses' },
  { label: 'Student Enroll', icon: <Users size={20} />, to: '/educator/student-enrolled' },
];

// Admin Menu
const adminMenuItems = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, to: '/admin-dashboard' },
  { label: 'Add Course', icon: <PlusCircle size={20} />, to: '/educator/add-course' },
  { label: 'All Courses', icon: <BookOpen size={20} />, to: '/educator/all-courses' },
  { label: 'Student Enrolled', icon: <Users size={20} />, to: '/educator/all-student-enrolled' },
  { label: 'Add User', icon: <PlusCircle size={20} />, to: '/educator/register' },
  { label: 'Users', icon: <Users size={20} />, to: '/educator/educators' },
  { label: 'Internships', icon: <BookOpen size={20} />, to: '/educator/internship-applications' },
  { label: 'Job Applications', icon: <Users size={20} />, to: '/educator/job-applications' },
  { label: 'Manage News', icon: <Newspaper size={20} />, to: '/educator/manage-news' },
  { label: 'Manage Job Vacancies', icon: <Users size={20} />, to: '/educator/manage-job-vacancies' },

];

const SideBar = () => {
  // get user from localStorage
  const admin = JSON.parse(localStorage.getItem('admin'));
  const role = admin?.role

  const menuItems = role === 'admin' ? adminMenuItems : educatorMenuItems;

  return (
    <div className="h-screen w-64 bg-white text-gray-800 shadow-md flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-gray-200">
        <span className="text-blue-600 capitalize">{role}</span> Panel
      </div>

      <nav className="flex-1 p-2 space-y-0 text-gray-800">
        {menuItems.map((item) => (
          <NavItem key={item.label} icon={item.icon} label={item.label} to={item.to} />
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <h1 className="font-semibold text-gray-600">KIRCT LMS</h1>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, to }) => {
  return (
    <NavLink
      to={to}
      end={to === '/educator' || to === '/admin'}
      className={({ isActive }) =>
        `flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive
          ? 'bg-gradient-to-r from-blue-50 to-white text-blue-600 border-r-4 border-blue-600 shadow-sm'
          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-2'
        }`
      }
    >
      {icon}
      <span className="text-base md:text-lg">{label}</span>
    </NavLink>
  );
};

export default SideBar;