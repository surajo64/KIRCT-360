import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Layout Imports
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EducatorNavbar from './components/educator/Navbar'
import EducatorSidebar from './components/educator/SideBar'

// Public Pages Imports
import Home from './pages/Home'
import Scroller from './components/Scroller'
import About from './pages/About'
import Contact from './pages/Contact'
import Team from './pages/tearm'
import RedCap from './pages/redcap'
import Facility from './pages/facility'
import Grant from './pages/grant'
import Profile from './pages/profile'
import AboutDg from './pages/aboutDg'
import Board from './pages/board'
import Ethics from './pages/ethics'
import Gallery from './pages/gallery'
import Epidemiology from './pages/epidemiology'
import Maternal from './pages/maternity'
import Health from './pages/health'
import Hospital from './pages/hospital'
import Genomics from './pages/genomics'
import Microbiology from './pages/microbiology'
import TbUnit from './pages/tbUnit'
import Studies from './pages/studies'
import Vaccine from './pages/vaccine'
import Publications from './pages/publications'
import International from './pages/international'
import National from './pages/national'
import Clinical from './pages/clinical'
import ResearchLab from './pages/researchLab'
import Intenship from './pages/intenship'
import Job from './pages/job'
import JobApplication from './pages/JobApplication'
import Completed from './pages/TraningCompleted'
import Upcoming from './pages/TraningUpcoming'
import News from './pages/News'
import MyCourses from './pages/myCourses'
import PublicAllCourses from './pages/allCourses'
import MyProfile from './pages/MyProfile'
import Login from './pages/Login'
import PaymentCallback from './pages/payment-callback'
import CourseDetails from './pages/courseDetails'
import Player from './pages/player'
import ForgotPassword from './pages/ForgotPassword '
import ResetPassword from './pages/resetPassword'
import VerifyEmail from './pages/VerifyEmail'
// Admin/Educator Pages Imports
import EducatorDashboard from './pages/admin/educator-dashboard'
import AdminDashboard from './pages/admin/admin-dashboard'
import AddCourse from './pages/admin/AddCourse'
import AdminMyCourses from './pages/admin/MyCourses'
import AddQuiz from './pages/admin/addQuiz'
import StudentEnrolled from './pages/admin/StudentEnrolled'
import AllCourses from './pages/admin/allCourses'
import AllEnrolledStudents from './pages/admin/allEnrolledStudent'
import AddEducator from './pages/admin/addEducator'
import Users from './pages/admin/users'
import UpdateCourse from './pages/admin/updateCourse'
import ManageInterns from './pages/IntenshipApplication' // Reusing existing component
import ManageJobs from './pages/JobApplication' // Reusing existing component
import ManageNews from './pages/admin/ManageNews'
import ManageJobVacancies from './pages/manageJobVacancies'


const App = () => {
  const location = useLocation()
  const isEducatorRoute = location.pathname.startsWith('/educator') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/update-course')

  return (
    <div className='bg-white text-gray-800 text-sm'>
      <ToastContainer />
      <Scroller />

      {isEducatorRoute ? (
        <div className="bg-gray-50 min-h-screen flex flex-col">
          <EducatorNavbar />
          <div className="flex flex-1">
            <EducatorSidebar />
            <div className="flex-1 overflow-y-auto">
              <Routes>
                <Route path='/educator-dashboard' element={<EducatorDashboard />} />
                <Route path='/admin-dashboard' element={<AdminDashboard />} />
                <Route path='/educator/add-course' element={<AddCourse />} />
                <Route path='/educator/my-courses' element={<AdminMyCourses />} />
                <Route path='/educator/add-quize' element={<AddQuiz />} />
                <Route path='/educator/student-enrolled' element={<StudentEnrolled />} />
                <Route path='/educator/all-courses' element={<AllCourses />} />
                <Route path='/educator/all-student-enrolled' element={<AllEnrolledStudents />} />
                <Route path='/educator/register' element={<AddEducator />} />
                <Route path='/educator/educators' element={<Users />} />
                <Route path='/update-course/:id' element={<UpdateCourse />} />
                <Route path='/educator/internship-applications' element={<ManageInterns />} />
                <Route path='/educator/job-applications' element={<ManageJobs />} />
                <Route path='/educator/manage-news' element={<ManageNews />} />
                <Route path='/educator/manage-job-vacancies' element={<ManageJobVacancies />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/team' element={<Team />} />
            <Route path='/redcap' element={<RedCap />} />
            <Route path='/facility' element={<Facility />} />
            <Route path='/grant' element={<Grant />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/about-dg' element={<AboutDg />} />
            <Route path='/board' element={<Board />} />
            <Route path='/ethics-committee' element={<Ethics />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/epidemiology' element={<Epidemiology />} />
            <Route path='/maternal-child' element={<Maternal />} />
            <Route path='/health-metrics' element={<Health />} />
            <Route path='/hospital-complex' element={<Hospital />} />
            <Route path='/genomics' element={<Genomics />} />
            <Route path='/microbiology' element={<Microbiology />} />
            <Route path='/tb-unit' element={<TbUnit />} />
            <Route path='/research-studies' element={<Studies />} />
            <Route path='/vaccine-research' element={<Vaccine />} />
            <Route path='/publications' element={<Publications />} />
            <Route path='/international' element={<International />} />
            <Route path='/national' element={<National />} />
            <Route path='/clinical-lab' element={<Clinical />} />
            <Route path='/research-lab' element={<ResearchLab />} />
            <Route path='/internship' element={<Intenship />} />
            <Route path='/job-vacancy' element={<Job />} />
            <Route path='/job-application' element={<JobApplication />} />
            <Route path='/completed' element={<Completed />} />
            <Route path='/upcoming' element={<Upcoming />} />
            <Route path='/news' element={<News />} />
            <Route path='/all-courses' element={<PublicAllCourses />} />
            {/* User Routes */}
            <Route path='/my-courses' element={<MyCourses />} />
            <Route path='/my-profile' element={<MyProfile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/payment-callback' element={<PaymentCallback />} />
            <Route path='/course/:id' element={<CourseDetails />} />
            <Route path='/player/:courseId' element={<Player />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/verify-email/:token' element={<VerifyEmail />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
