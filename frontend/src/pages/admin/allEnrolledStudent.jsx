import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/loading';
import axios from 'axios';
import { toast } from 'react-toastify';

const AllStudentEnrolled = () => {
  const [students, setStudents] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [courses, setCourses] = useState([]);
  const { currencySymbol, backendUrl, atoken } = useContext(AppContext);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [modalCourseContent, setModalCourseContent] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchEnrolledStudents = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/educator/enrolled-students-filtered',
        {
          headers: { atoken },
          params: {
            searchTerm: searchTerm || undefined,
            courseId: courseFilter !== 'all' ? courseFilter : undefined
          }
        }
      );

      if (data.success) {
        setStudents(data.enrolledStudents);
        setFilteredStudents(data.enrolledStudents);

        const uniqueCourses = [...new Map(
          data.enrolledStudents.map(item => [item.courseId, { id: item.courseId, title: item.courseTitle }])
        ).values()];
        setCourses(uniqueCourses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Fetch enrolled students error:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch enrolled students');
    }
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  useEffect(() => {
    if (!students) return;

    let filtered = [...students];

    if (courseFilter !== 'all') {
      filtered = filtered.filter(enrollment => enrollment.courseId === courseFilter);
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(enrollment =>
        enrollment.student.name?.toLowerCase().includes(searchLower) ||
        enrollment.courseTitle?.toLowerCase().includes(searchLower) ||
        enrollment.student.email?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredStudents(filtered);
  }, [searchTerm, courseFilter, students]);

  // -- Progress Management Helpers --

  const openProgressModal = async (student) => {
    setSelectedEnrollment(student);
    setModalCourseContent(null);
    setShowModal(true);

    try {
      const { data } = await axios.get(`${backendUrl}/api/educator/course/${student.courseId}`, { headers: { atoken } });
      if (data.success) {
        setModalCourseContent(data.course.courseContent);
      } else {
        toast.error("Failed to load course details");
      }
    } catch (error) {
      toast.error("Error fetching course details");
    }
  };

  const handleProgressUpdate = async ({ lectureId, markAsCompleted, chapterId, isCourseCompleted }) => {
    if (!selectedEnrollment) return;
    setIsUpdating(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/educator/update-student-progress`, {
        userId: selectedEnrollment.student._id,
        courseId: selectedEnrollment.courseId,
        lectureId,
        chapterId,
        markAsCompleted,
        isCourseCompleted
      }, { headers: { atoken } });

      if (data.success) {
        const updatedLectures = data.progress.lectureCompleted;
        const isFinished = data.progress.completed;
        const certificateUrl = data.certificateUrl || data.progress.certificateUrl;

        const updatedStudent = {
          ...selectedEnrollment,
          completedLectures: updatedLectures,
          progress: isFinished ? "Completed" : "On Going",
          quizPassed: data.progress.quizPassed,
          quizTaken: data.progress.quizTaken,
          quizScore: data.progress.quizScore,
          certificateUrl: certificateUrl,
          progressPercentage: data.progressPercentage
        };

        setSelectedEnrollment(updatedStudent);

        setStudents(students.map(s =>
          s.student._id === selectedEnrollment.student._id && s.courseId === selectedEnrollment.courseId
            ? {
              ...s,
              completedLectures: updatedLectures,
              progress: isFinished ? "Completed" : "On Going",
              quizPassed: data.progress.quizPassed,
              quizTaken: data.progress.quizTaken,
              quizScore: data.progress.quizScore,
              certificateUrl: certificateUrl,
              progressPercentage: data.progressPercentage
            }
            : s
        ));

        toast.success(isCourseCompleted === true ? "Course Marked Completed (Certificate Generated)" : isCourseCompleted === false ? "Course Unmarked" : chapterId ? "Chapter Updated" : "Progress Updated");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleGenerateCertificate = async (student) => {
    try {
      toast.loading("Generating Certificate...");
      const { data } = await axios.post(`${backendUrl}/api/educator/student-certificate`, {
        userId: student.student._id,
        courseId: student.courseId
      }, { headers: { atoken } });

      toast.dismiss();
      if (data.success) {
        window.open(data.certificateUrl, "_blank");
        fetchEnrolledStudents();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  const handleRetakeQuiz = async (student) => {
    if (!window.confirm(`Are you sure you want to reset progress for ${student.student.name}?`)) return;
    try {
      const { data } = await axios.post(`${backendUrl}/api/educator/reset-student-progress`, {
        userId: student.student._id,
        courseId: student.courseId
      }, { headers: { atoken } });

      if (data.success) {
        toast.success("Progress reset successfully");
        fetchEnrolledStudents();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 'Completed') return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
  };

  const calculateStats = () => {
    const list = filteredStudents || [];
    return {
      total: list.length,
      completed: list.filter(s => s.progress === 'Completed').length,
      ongoing: list.filter(s => s.progress === 'On Going').length,
      revenue: list.reduce((sum, s) => sum + (s.amount || 0), 0)
    };
  };

  const stats = calculateStats();

  return students ? (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div className="w-full h-full bg-white shadow-xl rounded-3xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Student Enrollments</h1>

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by student or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-64"
            />

            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Courses</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Enrollments</p>
            <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Ongoing</p>
            <p className="text-2xl font-bold text-amber-700">{stats.ongoing}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-purple-700">
              {currencySymbol}{stats.revenue.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="w-full overflow-x-auto rounded-md bg-white border border-gray-300 shadow-sm">
          <table className="table-auto w-full text-sm text-gray-500">
            <thead className="text-gray-900 border-b border-gray-300 text-left bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Course</th>
                <th className="px-4 py-3 font-semibold">Enrolled Date</th>
                <th className="px-4 py-3 font-semibold">Progress</th>
                <th className="px-4 py-3 font-semibold text-center">Control</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                    No enrollments found matching your criteria
                  </td>
                </tr>
              ) : (
                Array.isArray(filteredStudents) && filteredStudents.map((student, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>

                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={student.student.image || student.student.imageUrl || '/default-avatar.png'}
                          alt="Student"
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{student.student.name}</p>
                          <p className="text-xs text-gray-500">{student.student.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {new Date(student.purchaseDate).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full transition-all"
                            style={{ width: `${student.progressPercentage || (student.progress === 'Completed' ? 100 : 0)}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] text-gray-600">
                          {student.completedCount !== undefined && student.totalLectures !== undefined 
                            ? `${student.completedCount}/${student.totalLectures} (${student.progressPercentage}%)`
                            : `${student.progressPercentage}%`
                          }
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => openProgressModal(student)}
                        className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs font-bold shadow-sm transition active:scale-95"
                      >
                        Manage
                      </button>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {student.certificateUrl ? (
                          <a
                            href={student.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-[10px] font-semibold border border-blue-200"
                          >
                            PDF
                          </a>
                        ) : student.quizPassed ? (
                          <button
                            onClick={() => handleGenerateCertificate(student)}
                            className="px-3 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100 text-[10px] font-semibold border border-green-200"
                          >
                            Cert
                          </button>
                        ) : student.quizTaken && !student.quizPassed ? (
                          <button
                            onClick={() => handleRetakeQuiz(student)}
                            className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 text-[10px] font-semibold border border-red-200"
                          >
                            Reset
                          </button>
                        ) : (
                          <span className="text-gray-400 text-[10px] italic">In Progress</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredStudents.length} of {students.length} enrollments
        </div>
      </div>

      {/* Progress Modal (Replicated from StudentEnrolled) */}
      {showModal && selectedEnrollment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Admin Control: Progress</h2>
              <button onClick={() => { setShowModal(false); window.location.reload(); }} className="text-gray-500 hover:text-red-500">✕</button>
            </div>

            <div className="mb-4 flex justify-between items-end bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div>
                <p className="text-sm text-gray-600">Student: <span className="font-semibold text-gray-800">{selectedEnrollment.student.name}</span></p>
                <p className="text-sm text-gray-600">Course: <span className="font-semibold text-gray-800">{selectedEnrollment.courseTitle}</span></p>
              </div>
              <button
                disabled={isUpdating}
                onClick={() => handleProgressUpdate({ isCourseCompleted: selectedEnrollment.progress !== "Completed" })}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition shadow-sm ${selectedEnrollment.progress === "Completed"
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-green-600 text-white hover:bg-green-700 active:scale-95"
                  }`}
              >
                {selectedEnrollment.progress === "Completed" ? "Unmark Course Completed" : "Mark Full Course Completed"}
              </button>
            </div>

            <div className="space-y-4">
              {modalCourseContent ? (
                modalCourseContent.map((chapter, cIndex) => (
                  <div key={chapter.chapterId} className="border rounded-md p-3 bg-gray-50 group/chap transition hover:border-blue-200">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-700">{cIndex + 1}. {chapter.chapterTitle}</h3>
                      <button
                        disabled={isUpdating}
                        onClick={() => {
                          const allChapLecIds = chapter.chapterContent.map(l => l.lectureId);
                          const allDone = allChapLecIds.every(id => selectedEnrollment.completedLectures?.includes(id));
                          handleProgressUpdate({ chapterId: chapter.chapterId, markAsCompleted: !allDone });
                        }}
                        className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded hover:bg-indigo-600 hover:text-white transition"
                      >
                        {chapter.chapterContent.every(l => selectedEnrollment.completedLectures?.includes(l.lectureId))
                          ? "Unmark Chapter"
                          : "Mark Chapter"}
                      </button>
                    </div>
                    <div className="space-y-2 ml-2">
                      {chapter.chapterContent.map((lecture, lIndex) => {
                        const isCompleted = selectedEnrollment.completedLectures?.includes(lecture.lectureId);
                        return (
                          <div key={lecture.lectureId} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isCompleted}
                              disabled={isUpdating}
                              onChange={(e) => handleProgressUpdate({ lectureId: lecture.lectureId, markAsCompleted: e.target.checked })}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <span className={`text-sm ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                              {lIndex + 1}. {lecture.lectureTitle}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10"><Loading /></div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={() => { setShowModal(false); window.location.reload(); }} className="px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center"><Loading /></div>
  );
};

export default AllStudentEnrolled;
