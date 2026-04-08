import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingOverlay from '../components/loadingOverlay';

const courseDetails = () => {

  const {
    currencySymbol, calculateRating, courseChapterTime,
    numberOfLecture, courseDuration, backendUrl, token,
    userData,
  } = useContext(AppContext);

  const { id } = useParams();
  const [openSection, setOpenSection] = useState({});
  const [courseData, setCourseData] = useState(null);
  const [isAlreadEnrolled, setIsAlreadEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [attendanceType, setAttendanceType] = useState('Physical');
  const [isEnrolling, setIsEnrolling] = useState(false);

  /* ── helpers ── */
  const toggleSection = (index) =>
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));

  /* ── default attendance when data arrives ── */
  useEffect(() => {
    if (courseData) {
      setAttendanceType(courseData.courseMode === 'Virtual' ? 'Virtual' : 'Physical');
    }
  }, [courseData]);

  /* ── fetch course ── */
  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/${id}`);
      if (data.success) setCourseData(data.courseData);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => { fetchCourseData(); }, []);

  /* ── enrolment check ── */
  useEffect(() => {
    if (userData && courseData && Array.isArray(userData.enrolledCourses)) {
      setIsAlreadEnrolled(userData.enrolledCourses.includes(courseData._id));
    } else {
      setIsAlreadEnrolled(false);
    }
  }, [userData, courseData]);

  /* ── enrol ── */
  const enrollCourse = async () => {
    if (!userData) return toast.warning('Please Login To Enroll!');
    if (isAlreadEnrolled) return toast.warning('Already Enrolled!');
    if (isEnrolling) return;
    setIsEnrolling(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/purchase`,
        { courseId: courseData._id, attendanceType },
        { headers: { token: localStorage.getItem('token') } }
      );
      if (data.success) {
        localStorage.setItem('pendingCourseId', courseData._id);
        window.location.href = data.authorization_url;
      } else {
        toast.error(data.message);
        setIsEnrolling(false);
      }
    } catch (error) {
      toast.error('Something went wrong with enrollment!');
      setIsEnrolling(false);
    }
  };

  /* ── price helper ── */
  const getPrice = (withDiscount = true) => {
    const base =
      attendanceType === 'Physical' && courseData.coursePricePhysical > 0
        ? courseData.coursePricePhysical
        : attendanceType === 'Virtual' && courseData.coursePriceVirtual > 0
          ? courseData.coursePriceVirtual
          : courseData.coursePrice;
    return withDiscount ? base * (1 - courseData.discount / 100) : base;
  };

  if (!courseData) return <LoadingOverlay />;

  /* ─────────────────────────────────────────────────────────── */
  return (
    <div className="relative min-h-screen bg-gray-50">

      {/* Background gradient strip */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-blue-50 to-transparent -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-16">

        {/* ═══ Page grid: stacks on mobile, side-by-side on lg ═══ */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ───────────── LEFT / MAIN COLUMN ───────────── */}
          <div className="w-full lg:flex-1 min-w-0">

            {/* Course title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {courseData.courseTitle}
            </h1>

            {/* Short description */}
            <p
              className="mt-3 text-gray-500 text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription?.slice(0, 200) || 'No description available.',
              }}
            />

            {/* Rating row */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-sm text-gray-600">
              <span className="font-medium text-amber-500">{calculateRating(courseData)}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
                    alt=""
                    className="w-3.5 h-3.5"
                  />
                ))}
              </div>
              <span className="text-blue-600">
                ({courseData.courseRatings.length}{' '}
                {courseData.courseRatings.length === 1 ? 'rating' : 'ratings'})
              </span>
              <span>·</span>
              <span>
                {courseData.enrollStudents?.length ?? 0}{' '}
                {courseData.enrollStudents?.length === 1 ? 'Student' : 'Students'}
              </span>
            </div>

            {/* Educator */}
            <p className="text-sm mt-2 text-gray-500">
              Course by:{' '}
              <span className="relative group text-blue-600 underline cursor-pointer">
                {courseData.educator.name}
                <div className="absolute left-0 top-full mt-1 w-64 p-3 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                  <p className="text-gray-700 text-xs leading-relaxed">{courseData.educator.about}</p>
                </div>
              </span>
            </p>

            {/* ─── MOBILE ONLY: Enrolment card appears here (above curriculum) ─── */}
            <div className="mt-6 lg:hidden">
              <CourseCard
                courseData={courseData}
                playerData={playerData}
                setPlayerData={setPlayerData}
                attendanceType={attendanceType}
                setAttendanceType={setAttendanceType}
                getPrice={getPrice}
                calculateRating={calculateRating}
                courseDuration={courseDuration}
                numberOfLecture={numberOfLecture}
                enrollCourse={enrollCourse}
                isEnrolling={isEnrolling}
                isAlreadEnrolled={isAlreadEnrolled}
                currencySymbol={currencySymbol}
                assets={assets}
              />
            </div>

            {/* ── Course Structure / Curriculum ── */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800">Course Structure</h2>
              <div className="mt-4 space-y-2">
                {courseData.courseContent?.map((chapter, index) => (
                  <div key={index} className="border border-gray-200 bg-white rounded-lg overflow-hidden shadow-sm">
                    {/* Chapter header */}
                    <div
                      className="flex items-center justify-between px-4 py-3 cursor-pointer select-none hover:bg-gray-50 transition"
                      onClick={() => toggleSection(index)}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${openSection[index] ? 'rotate-180' : ''}`}
                          src={assets.down_arrow_icon}
                          alt="arrow"
                        />
                        <p className="font-medium text-sm sm:text-base text-gray-800 truncate">
                          {chapter.chapterTitle}
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 flex-shrink-0 ml-2">
                        {chapter.chapterContent?.length} lectures · {courseChapterTime(chapter)}
                      </p>
                    </div>

                    {/* Lecture list */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-screen' : 'max-h-0'}`}
                    >
                      <ul className="border-t border-gray-100 px-4 py-2 space-y-1">
                        {chapter.chapterContent.map((lecture, i) => (
                          <li key={i} className="flex items-start gap-2 py-1.5">
                            <img src={assets.play_icon} alt="play" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <div className="flex items-start justify-between w-full min-w-0 gap-2">
                              <p className="text-xs sm:text-sm text-gray-700 leading-snug">{lecture.lectureTitle}</p>
                              <div className="flex items-center gap-2 flex-shrink-0 text-xs text-gray-500">
                                {lecture.isPreviewFree && (
                                  <button
                                    onClick={() =>
                                      setPlayerData({ videoId: lecture.lectureUrl.split('/').pop() })
                                    }
                                    className="text-blue-500 hover:underline whitespace-nowrap"
                                  >
                                    Preview
                                  </button>
                                )}
                                <span className="whitespace-nowrap">
                                  {humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Full Description ── */}
            <div className="mt-10 pb-4">
              <h3 className="text-lg font-semibold text-gray-800">Course Description</h3>
              <div
                className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed rich-text"
                dangerouslySetInnerHTML={{
                  __html: courseData.courseDescription || 'No description available.',
                }}
              />
            </div>

          </div>

          {/* ───────────── RIGHT / CARD COLUMN (desktop only) ───────────── */}
          <div className="hidden lg:block w-full max-w-sm xl:max-w-md flex-shrink-0 sticky top-24">
            <CourseCard
              courseData={courseData}
              playerData={playerData}
              setPlayerData={setPlayerData}
              attendanceType={attendanceType}
              setAttendanceType={setAttendanceType}
              getPrice={getPrice}
              calculateRating={calculateRating}
              courseDuration={courseDuration}
              numberOfLecture={numberOfLecture}
              enrollCourse={enrollCourse}
              isEnrolling={isEnrolling}
              isAlreadEnrolled={isAlreadEnrolled}
              currencySymbol={currencySymbol}
              assets={assets}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   Reusable Course Enrolment Card (used in both mobile & desktop)
════════════════════════════════════════════════════════════ */
const CourseCard = ({
  courseData, playerData, setPlayerData,
  attendanceType, setAttendanceType,
  getPrice, calculateRating, courseDuration,
  numberOfLecture, enrollCourse, isEnrolling,
  isAlreadEnrolled, currencySymbol, assets,
}) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">

    {/* Thumbnail / Player */}
    <div className="w-full aspect-video bg-gray-900">
      {playerData ? (
        <YouTube
          videoId={playerData.videoId}
          opts={{ playerVars: { autoplay: 1 } }}
          iframeClassName="w-full h-full"
        />
      ) : (
        <img
          src={courseData.courseThumbnail}
          alt={courseData.courseTitle}
          className="w-full h-full object-cover"
        />
      )}
    </div>

    <div className="p-4 sm:p-5">

      {/* Price urgency */}
      <div className="flex items-center gap-1.5 text-sm text-red-500">
        <img className="w-3.5 h-3.5" src={assets.time_left_clock_icon} alt="clock" />
        <span>
          <strong>Application Deadline:</strong>{" "}
          {courseData.applicationDeadline 
            ? new Date(courseData.applicationDeadline).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })
            : "To be announced"}
        </span>
      </div>

      {/* Price row */}
      <div className="flex flex-wrap items-baseline gap-2 mt-2">
        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
          {currencySymbol}
          {getPrice(true).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </p>
        <p className="text-base text-gray-400 line-through">
          {currencySymbol}
          {getPrice(false).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </p>
        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
          {courseData.discount}% off
        </span>
      </div>

      {/* Attendance toggle */}
      {courseData.courseMode !== 'Physical' && courseData.courseMode !== 'Virtual' ? (
        <div className="flex gap-2 mt-4">
          {['Virtual', 'Physical'].map((type) => (
            <button
              key={type}
              onClick={() => setAttendanceType(type)}
              className={`flex-1 py-2 text-sm rounded-lg border font-medium transition ${attendanceType === type
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                }`}
            >
              {type} Class
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-3">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            {courseData.courseMode} Class
          </span>
        </div>
      )}

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500 border-t border-gray-100 pt-3">
        <div className="flex items-center gap-1">
          <img src={assets.star} alt="rating" className="w-4 h-4" />
          <span>{calculateRating(courseData)}</span>
        </div>
        <span className="text-gray-200">|</span>
        <div className="flex items-center gap-1">
          <img src={assets.time_clock_icon} alt="duration" className="w-4 h-4" />
          <span>{courseDuration(courseData)}</span>
        </div>
        <span className="text-gray-200">|</span>
        <div className="flex items-center gap-1">
          <img src={assets.lesson_icon} alt="lessons" className="w-4 h-4" />
          <span>{numberOfLecture(courseData)} Lessons</span>
        </div>
      </div>

      {/* CTA button */}
      <button
        onClick={enrollCourse}
        disabled={isEnrolling || isAlreadEnrolled}
        className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        {isEnrolling ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Processing...
          </>
        ) : isAlreadEnrolled ? '✓ Already Enrolled' : 'Enroll Now'}
      </button>

      {/* What's included */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <p className="font-semibold text-gray-800 text-sm mb-2">What's in the Course?</p>
        <ul className="space-y-1.5 text-sm text-gray-500">
          {[
            'Lifetime access with free updates.',
            'Step-by-step, hands-on project guidance.',
            'Downloadable resources.',
            'Quizzes to test your knowledge.',
            'Certificate of completion.',
            'Course Retake when Failed.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5 flex-shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  </div>
);

export default courseDetails;
