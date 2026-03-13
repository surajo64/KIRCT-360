import { createContext, useEffect, useCallback } from "react";
import axios from 'axios'
import { useState } from "react";
import { toast } from 'react-toastify'
import { dummyCourses, dummyStudentEnrolled } from "../assets/assets";
import { useAuth, useUser } from '@clerk/clerk-react'

import humanizeDuration from 'humanize-duration';
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const currencySymbol = import.meta.env.VITE_CURRENCY;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
  const [atoken, setAtoken] = useState(localStorage.getItem('atoken') ? localStorage.getItem('atoken') : false)
  const [cost, setCourse] = useState([])
  const [userData, setUserData] = useState([])
  const [adminData, setAdminData] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const [allStudents, setAllStudents] = useState([])
  const [educatorCourses, setEducatorCourses] = useState([])
  const [enrolledCourses, setEnrolledCourses] = useState([])


  const logout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('atoken');
    setUserData(null);
    setAtoken('');
    navigate("/login");  // now always shows login
  };

  // Fetch all Students
  const fetchAllStudents = async () => {
    setAllStudents(dummyStudentEnrolled)

  }

  // Fetch all course
  const fetchAllCourse = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/course/all', { headers: { token } })

      if (data.success) {
        setAllCourses(data.courses)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  // function to calculate average rating
  const calculateRating = (course) => {
    if (course.courseRatings === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach(rating => {
      totalRating += rating.rating
    });
    return Math.floor(totalRating / course.courseRatings.length)
  }

  // function to Calculate  Course Chapter time

  const courseChapterTime = (chapter) => {
    let time = 0
    chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)

    return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'], round: true });
  }

  const numberOfLecture = (course) => {
    let totalLectures = 0;
    course?.courseContent?.forEach(chapter => {
      if (Array.isArray(chapter?.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };


  const courseDuration = (course) => {
    let time = 0;
    course?.courseContent?.forEach((chapter) => {
      chapter?.chapterContent?.forEach((lecture) => {
        time += lecture?.lectureDuration || 0;
      });
    });
    return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'], round: true });
  };


  // function to fetch user enlolled course
  const fetchUserEnrolledCourse = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/enrolled-course', { headers: { token } });
      if (data.success) {
        setEnrolledCourses(data.enrolledCourses.reverse());

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const userProfile = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/data', { headers: { token } })

      if (data.success) {
        setUserData(data.userData)

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }, [token, backendUrl])

  const adminProfile = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/educator/profile', { headers: { atoken } })

      if (data.success) {
        setAdminData(data.adminData)

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }, [atoken, backendUrl])

  // function to fetch user enlolled course
  const fetchEducatorCourses = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/educator/my-courses",
        { headers: { atoken } }
      );

      if (data.success) {
        setEducatorCourses(data.educatorCourses.reverse());
        setCourse(data.stats); // 🔹 store stats map
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };



  const value = {
    calculateRating, courseDuration, userProfile,
    numberOfLecture, enrolledCourses, adminProfile, educatorCourses, setEducatorCourses,
    currencySymbol, logout, adminData, setAdminData, cost, setCourse,
    fetchUserEnrolledCourse, token, setToken, fetchEducatorCourses,
    backendUrl, courseChapterTime, atoken, setAtoken, setEnrolledCourses,
    userData, setUserData, allCourses, fetchAllStudents, allStudents
  }


  useEffect(() => {
    fetchAllCourse();
    fetchAllStudents();
  }, [])

  useEffect(() => {
    if (token) {
      userProfile()
      fetchUserEnrolledCourse();
    } else {
      setUserData(false)
    }
  }, [token])

  useEffect(() => {
    if (atoken) {
      adminProfile()
    } else {
      setAdminData(false)
    }
  }, [atoken])




  return (

    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}
export default AppContextProvider