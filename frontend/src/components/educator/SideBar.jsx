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
    <div className="h-screen w-64 bg-[#0f172a] text-slate-300 shadow-2xl flex flex-col border-r border-slate-800">
      <div className="p-6 flex flex-col gap-1 border-b border-slate-800 bg-[#1e293b]/50">
        <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">{role} Panel</span>
        <h1 className="text-xl font-bold text-white">Administrator</h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <NavItem key={item.label} icon={item.icon} label={item.label} to={item.to} />
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800 bg-[#1e293b]/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-sm font-semibold text-slate-400">System Online</span>
        </div>
        <p className="mt-1 text-[10px] text-slate-500 uppercase font-medium tracking-tighter">Powered by KIRCT LMS v3.0</p>
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
        `flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${isActive
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 translate-x-1'
          : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`}>
            {icon}
          </div>
          <span className="font-semibold tracking-wide">{label}</span>
        </>
      )}
    </NavLink>
  );
};

export default SideBar;