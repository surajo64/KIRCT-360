import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/loading";
import { assets } from "../assets/assets";
import humanizeDuration from "humanize-duration";
import Rating from "../components/Rating";
import axios from "axios";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";


// ✅ Convert Google Drive link for Documents
const convertDriveDocUrl = (url = "") => {
  let m = url.match(/\/file\/d\/([^/]+)/);
  if (m && m[1]) {
    // Google Drive Preview link (works for PDF, DOCX, PPT, etc.)
    return `https://drive.google.com/file/d/${m[1]}/preview`;
  }
  return url;
};

// ✅ Convert Google Drive link for Videos
const convertDriveVideoUrl = (url = "") => {
  let m = url.match(/\/file\/d\/([^/]+)/);
  if (m && m[1]) {
    // Direct download/stream link
    return `https://drive.google.com/uc?export=download&id=${m[1]}`;
  }
  return url;
};



const Player = () => {
  const { backendUrl, userData, fetchUserEnrolledCourse, token, enrolledCourses, courseChapterTime } =
    useContext(AppContext);

  const { courseId } = useParams();
  const [openSection, setOpenSection] = useState({});
  const [courseData, setCourseData] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasQuiz, setHasQuiz] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const playerRef = useRef(null);
  const [docTimer, setDocTimer] = useState(null);

  // Helper: Check if URL is video
  const isVideo = (url = "") => {
    if (!url) return false;
    const videoExts = [".mp4", ".mov", ".avi", ".mkv", ".webm", ".ogg"];
    return (
      ReactPlayer.canPlay(url) ||
      url.includes("youtube.com") ||
      url.includes("youtu.be") ||
      videoExts.some((ext) => url?.toLowerCase().endsWith(ext))
    );
  };

  // Fetch quiz existence
  const checkQuizExistence = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/quiz/" + courseId,
        { headers: { token } }
      );
      if (data.success && data.quiz) {
        setHasQuiz(true);
      } else {
        setHasQuiz(false);
      }
    } catch (error) {
      setHasQuiz(false);
    }
  };

  // Fetch progress
  const getCourseProgress = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/get-course-progress",
        { courseId },
        { headers: { token } }
      );
      if (data.success) {
        setProgressData(data.progressData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Mark lecture complete
  const markLectureCompleted = async (lectureId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/update-course-progress",
        { courseId, lectureId },
        { headers: { token } }
      );
      if (data.success) {
        getCourseProgress();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const generateCertificate = async () => {
    try {
      setIsGenerating(true);
      const { data } = await axios.post(
        backendUrl + "/api/user/get-certificate/" + courseId,
        {},
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Certificate generated successfully!");
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Auto mark complete for documents
  useEffect(() => {
    if (playerData && !isVideo(playerData.lectureUrl)) {
      const timer = setTimeout(() => {
        if (progressData && !progressData.lectureCompleted.includes(playerData.lectureId)) {
          markLectureCompleted(playerData.lectureId);
          toast.success("Document viewed - Marked as Completed ✅");
        }
      }, playerData.lectureDuration * 60 * 1000);

      setDocTimer(timer);
      return () => clearTimeout(timer);
    }
  }, [playerData]);

  // Track video progress
  const handleProgress = (state) => {
    if (
      state.playedSeconds >= playerData.lectureDuration * 60 &&
      progressData &&
      !progressData.lectureCompleted.includes(playerData.lectureId)
    ) {
      markLectureCompleted(playerData.lectureId);
      toast.success("Video watched fully - Marked as Completed ✅");
    }
  };

  // Fetch course data
  const fetchCourseData = async () => {
    enrolledCourses.forEach((course) => {
      if (course._id === courseId) {
        setCourseData(course);
        course.courseRatings.forEach((item) => {
          if (item.userId === userData._id) {
            setInitialRating(item.rating);
          }
        });
      }
    });
  };

  const toggleSection = (index) => {
    setOpenSection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleRating = async (rating) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/add-rating",
        { courseId, rating },
        { headers: { token } }
      );
      if (data.success) {
        fetchUserEnrolledCourse();
        fetchCourseData();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCourseProgress();
    checkQuizExistence();
  }, [courseId]);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      fetchCourseData();
    }
  }, [enrolledCourses]);

  return courseData ? (
    <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
      <div className="text-gray-800">
        <div className="mb-6">
          {courseData.attendanceType === 'Physical' && (
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded shadow-sm">
              <h3 className="font-bold flex items-center gap-2">📍 Class Location</h3>
              <p className="mt-2 text-gray-700 whitespace-pre-wrap">
                {courseData.courseAddress || "Contact admin for location details."}
              </p>
              {courseData.classSchedule && (
                <p className="mt-2 text-sm text-gray-600">
                  <strong>⏰ Schedule:</strong> {courseData.classSchedule}
                </p>
              )}
            </div>
          )}

          {courseData.attendanceType === 'Virtual' && (
            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded shadow-sm">
              <h3 className="font-bold flex items-center gap-2">🎥 Virtual Class Access</h3>
              {courseData.classSchedule && (
                <p className="mt-1 text-sm text-gray-600">
                  <strong>📅 Schedule:</strong> {courseData.classSchedule}
                </p>
              )}
              <div className="mt-3">
                {(() => {
                  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                  const isToday = courseData.classSchedule
                    ? courseData.classSchedule.toLowerCase().includes(today.toLowerCase())
                    : true;

                  return (
                    <div>
                      <a
                        href={courseData.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-block px-4 py-2 rounded text-white font-medium transition-colors ${isToday ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        onClick={(e) => {
                          if (!isToday) {
                            e.preventDefault();
                            toast.info(`Class is on ${courseData.classSchedule}. Link active only on class days.`);
                          }
                        }}
                      >
                        {isToday ? "Join Meeting Now" : "Link Inactive"}
                      </a>
                      {!isToday && <p className="text-xs text-red-500 mt-1">Link available on class days only.</p>}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>

        <h2 className="text-3xl font-bold text-gray-800">Course Structure</h2>
        <div className="pt-5">
          <p className="text-xl font-semibold pb-4">{courseData.courseTitle}</p>
          {courseData.courseContent?.map((chapter, index) => (
            <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
              <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none" onClick={() => toggleSection(index)}>
                <div className="flex items-center gap-2">
                  <img className={`transition-transform ${openSection[index] ? "rotate-180" : ""}`} src={assets.down_arrow_icon} alt="arrow icon" />
                  <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                </div>
                <p className="text-sm md:text-default">{chapter.chapterContent?.length} lectures - {courseChapterTime(chapter)}</p>
              </div>

              <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? "max-h-96" : "max-h-0"}`}>
                <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                  {chapter.chapterContent.map((lecture, i) => (
                    <li key={i} className="flex items-start gap-2 py-1">
                      <img src={progressData && progressData.lectureCompleted.includes(lecture.lectureId) ? assets.blue_tick_icon : assets.play_icon} alt="play icon" className="w-4 h-4 mt-1" />
                      <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                        <p>{lecture.lectureTitle}</p>
                        <div className="flex gap-2">
                          {lecture.lectureUrl && (
                            <p onClick={() => setPlayerData({ ...lecture, chapter: index + 1, lecture: i + 1 })} className="text-blue-500 cursor-pointer">Watch/Read!</p>
                          )}
                          <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ["h", "m"] })}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div>
            {progressData?.completed ? (
              <div className="flex justify-between items-center mt-2">
                <p className="text-blue-600 font-medium">
                  Course Completed — <span className={`font-medium ${progressData.quizPassed ? "text-green-600" : "text-red-600"}`}>{progressData.quizTaken && (progressData.quizPassed ? "Passed 🎉" : "Failed ❌")}</span>
                </p>

                {hasQuiz ? (
                  !progressData.quizTaken ? (
                    <Link to={`/quiz/${courseId}`} className="text-blue-600 font-medium">Ready for Quiz?</Link>
                  ) : progressData.quizPassed ? (
                    progressData.certificateUrl ? (
                      <a href={progressData.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 font-medium">🎉 View Certificate</a>
                    ) : (
                      <button onClick={generateCertificate} disabled={isGenerating} className={`font-medium px-4 py-1 rounded transition-all ${isGenerating ? 'bg-gray-100 text-gray-400 cursor-wait' : 'text-blue-600 hover:bg-blue-50 bg-white border border-blue-200'}`}>
                        {isGenerating ? (<span className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>Generating...</span>) : ("📜 Generate Certificate")}
                      </button>
                    )
                  ) : (
                    <button
                      onClick={async () => {
                        try {
                          await axios.post(`${backendUrl}/api/user/reset-progress`, { courseId }, { headers: { token } });
                          toast.info("Progress cleared. Please retake the course.");
                          window.location.reload();
                        } catch (err) { toast.error("Error resetting progress"); }
                      }}
                      className="text-red-600 font-medium"
                    >Retake Course ❌</button>
                  )
                ) : (
                  progressData.certificateUrl ? (
                    <a href={progressData.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 font-medium">🎉 View Certificate</a>
                  ) : (
                    <button onClick={generateCertificate} disabled={isGenerating} className={`font-medium px-4 py-1 rounded transition-all ${isGenerating ? 'bg-gray-100 text-gray-400 cursor-wait' : 'text-blue-600 hover:bg-blue-50 bg-white border border-blue-200'}`}>
                      {isGenerating ? (<span className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>Generating...</span>) : ("📜 Generate Certificate")}
                    </button>
                  )
                )}
              </div>
            ) : (
              <span className="text-blue-600 font-medium">On Going...</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 py-3 mt-10">
          <h1 className="text-xl font-bold">Rate this Course:</h1>
          <Rating initialRating={initialRating} onRate={handleRating} />
        </div>
      </div>

      <div className="md:mt-10">
        {playerData ? (
          <div>
            {isVideo(playerData.lectureUrl) ? (
              <ReactPlayer ref={playerRef} url={convertDriveVideoUrl(playerData.lectureUrl)} controls width="100%" height="480px" onProgress={handleProgress} config={{ youtube: { playerVars: { showinfo: 1 } } }} />
            ) : (
              <iframe src={playerData.lectureUrl.includes("drive.google.com") ? convertDriveDocUrl(playerData.lectureUrl) : `https://docs.google.com/gview?url=${playerData.lectureUrl}&embedded=true`} className="w-full h-[480px] border rounded" allow="autoplay" title="Document Viewer" />
            )}
            <div className="flex justify-between items-center mt-2">
              <p>{playerData.chapter}.{playerData.lecture}. {playerData.lectureTitle}</p>
              <button onClick={() => markLectureCompleted(playerData.lectureId)} className="text-blue-600">{progressData?.lectureCompleted?.includes(playerData.lectureId) ? "Completed! ✅" : "Mark as Completed"}</button>
            </div>
          </div>
        ) : (
          <img src={courseData.courseThumbnail} alt="Course Thumbnail" />
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Player;
