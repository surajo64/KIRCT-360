import React, { useState, useEffect, useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Users,
  FileText,
  ClipboardList,
  Briefcase,
  Activity,
} from "lucide-react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import LoadingOverlay from "../components/loadingOverlay.jsx";

const Dashboard = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalNews: 0,
    totalInterns: 0,
    chartData: [],
    recentActivities: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(data);
      console.log(stats)
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getColor = (type) => {
    switch (type) {
      case "user":
        return "blue";
      case "job":
        return "yellow";
      case "success":
        return "green";
      case "error":
        return "red";
      case "invite":
        return "purple";
      default:
        return "gray";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      {isLoading && <LoadingOverlay />}
      <h1 className="text-3xl font-bold text-blue-800 mb-6  border-b-4 border-red-600 inline-block pb-1">
        KIRCT ADMIN DASHBOARD!
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <SummaryCard
          title="Total Users"
          value={stats.totalUsers}
          color="blue"
          icon={<Users className="text-blue-700 w-6 h-6" />}
        />
        <SummaryCard
          title="Job Applications"
          value={stats.totalJobs}
          color="red"
          icon={<Briefcase className="text-red-700 w-6 h-6" />}
        />
        <SummaryCard
          title="News Published"
          value={stats.totalNews}
          color="blue"
          icon={<ClipboardList className="text-blue-700 w-6 h-6" />}
        />
        <SummaryCard
          title="Internship Applicants"
          value={stats.totalInterns}
          color="red"
          icon={<FileText className="text-red-700 w-6 h-6" />}
        />
      </div>

      {/* Chart + Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-md col-span-2">
          <h2 className="text-lg font-semibold text-blue-800 mb-4">
            Monthly Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#555" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#2563eb"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="jobs"
                stroke="#dc2626"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-semibold text-blue-800 mb-4">
            Recent Activities
          </h2>
          <ul className="space-y-4">
            {stats.recentActivities && stats.recentActivities.length > 0 ? (
              stats.recentActivities.map((a, i) => (
                <ActivityItem
                  key={i}
                  iconColor={getColor(a.type)}
                  text={a.text}
                  time={new Date(a.time).toLocaleString()}
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm">No recent activities</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

// 🧩 Summary Card
const SummaryCard = ({ title, value, color, icon }) => (
  <div
    className={`bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-t-4 border-${color}-700`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-semibold">{title}</p>
        <h3 className="text-2xl font-bold text-blue-900 mt-1">{value}</h3>
      </div>
      <div className={`bg-${color}-100 p-3 rounded-full`}>{icon}</div>
    </div>
  </div>
);

// 🧩 Activity Item
const ActivityItem = ({ iconColor, text, time }) => (
  <li className="flex items-start space-x-3">
    <Activity className={`text-${iconColor}-600 w-5 h-5 mt-1`} />
    <div>
      <p className="text-sm text-gray-800 font-medium">{text}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </li>
);

export default Dashboard;
