// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchCourseById,
//   getEnrolledCourses,
//   deleteCourse,
// } from "../redux/courseSlice";
// import UpdateCourseModal from "./UpdateCourseModal";
// import { toast } from "react-toastify";

// const CourseDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { selectedCourse, loading, error, enrolledCourses } = useSelector(
//     (state) => state.courses
//   );
//   const token = useSelector((state) => state.auth.token);
//   const [showLessons, setShowLessons] = useState(false);
//   const [expandedSyllabusIndex, setExpandedSyllabusIndex] = useState(null);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

//   useEffect(() => {
//     if (id) dispatch(fetchCourseById(id));
//     if (token) dispatch(getEnrolledCourses()); // Fetch enrolled courses
//   }, [dispatch, id, token]);

//   if (loading)
//     return <p className="text-center text-lg">Loading course details...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;
//   if (!selectedCourse) return <p className="text-center">Course not found.</p>;

//   const handleToggleLessons = () => {
//     setShowLessons(!showLessons);
//   };

//   const toggleSyllabus = (index) => {
//     setExpandedSyllabusIndex(expandedSyllabusIndex === index ? null : index);
//   };

//   const handleDeleteCourse = () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this course?"
//     );
//     if (confirmDelete) {
//       dispatch(deleteCourse(id)).then(() => {
//         toast.success("Course deleted successfully!");
//         navigate("/courses"); // Redirect to courses list after deletion
//       });
//     }
//   };
//   return (
//     <div className="max-w-full mx-auto mt-2 text-white">
//       {/* Header Section */}
//       <div
//         className="grid grid-cols-1 text-white md:grid-cols-5 gap-5 p-6 bg-white shadow-lg border border-gray-200 bg-gradient-to-r from-blue-700 to-blue-500
// "
//       >
//         {/* Course Information */}
//         <div className="col-span-1 md:col-span-3 mt-2 md:mt-0">
//           <h1 className="text-2xl md:text-3xl font-bold ">
//             {selectedCourse.title}
//           </h1>
//           <p className="text-gray-300 mt-2 text-sm md:text-base">
//             {selectedCourse.description}
//           </p>

//           {/* Additional Details */}
//           <div className="flex items-center gap-4 text-sm mt-3">
//             <p>
//               <strong>Category:</strong> {selectedCourse.category}
//             </p>
//             <p>
//               <strong>Certification:</strong>{" "}
//               {selectedCourse.certificationAvailable ? "Yes" : "No"}
//             </p>
//             <p>
//               <strong>Duration: </strong>
//               {selectedCourse.duration} Hrs
//             </p>
//             <p>
//               {" "}
//               <strong>Level: </strong> {selectedCourse.level || ""}
//             </p>
//           </div>

//           {/* Prerequisites */}
//           {selectedCourse.prerequisites && (
//             <p className="text-sm mt-3">
//               <strong>Prerequisites:</strong> {selectedCourse.prerequisites}
//             </p>
//           )}

//           {/* Pricing and Enrollment */}
//           <div className="mt-4">
//             <div className="text-lg font-bold text-white">
//               ₹{selectedCourse.price || "449"}
//             </div>
//           </div>
//         </div>

//         {/* Course Thumbnail on the Right Side */}
//         <div className="col-span-1 md:col-span-2 relative w-full h-52 md:h-60 bg-gray-300 rounded-lg overflow-hidden shadow-lg">
//           <img
//             src={
//               selectedCourse.thumbnail || "https://via.placeholder.com/800x400"
//             }
//             alt={selectedCourse.title}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>

//       {/* Show Lessons Button */}
//       <div className="mt-6 mx-6">
//         <button
//           onClick={handleToggleLessons}
//           className="bg-blue-600 text-white font-bold px-4 py-2 hover:bg-blue-700 transition-all"
//         >
//           {showLessons ? "Hide Lessons" : "Show Lessons"}
//         </button>

//         {showLessons && (
//           <div className="mt-8 text-black">
//             {/* Course Lessons Heading */}

//             <h2 className="text-3xl font-bold">Lessons</h2>

//             {selectedCourse?.lessons?.length > 0 ? (
//               <div className="space-y-6">
//                 {selectedCourse.lessons.map((lesson, index) => (
//                   <div
//                     key={lesson._id}
//                     className="border border-blue-200 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300"
//                   >
//                     {/* Lesson Header */}
//                     <div className="p-4 bg-gradient-to-r from-blue-700 to-blue-500 ">
//                       <h4 className="text-lg font-semibold text-white">
//                         Lesson {index + 1}: {lesson.title}
//                       </h4>
//                     </div>

//                     {/* Lesson Content in Grid */}
//                     <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 items-center">
//                       {/* Lesson Info on the Right Side */}
//                       <div className="col-span-1 md:col-span-2 flex flex-col justify-center">
//                         <h4 className="text-xl font-semibold text-gray-900 mb-2">
//                           {lesson.title}
//                         </h4>
//                         {lesson.description && (
//                           <p className="text-gray-600 text-base">
//                             {lesson.description}
//                           </p>
//                         )}
//                       </div>

//                       {/* Video Player on the Left Side (Larger Size) */}
//                       <div className="col-span-1 md:col-span-3 flex justify-center items-center">
//                         <video
//                           src={lesson.videoUrl}
//                           controls
//                           className="w-full md:w-[95%] h-auto max-w-[800px] rounded-md shadow-md"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-lg text-center text-gray-500 bg-gray-100 py-4 rounded-lg">
//                 🚫 No lessons available for this course.
//               </p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Syllabus Section */}
//       <div className="mt-8 mx-6">
//         <h3 className="text-3xl font-bold mb-5 text-gray-900">Syllabus</h3>
//         <div className="space-y-4">
//           {selectedCourse.syllabus && selectedCourse.syllabus.length > 0 ? (
//             selectedCourse.syllabus.map((module, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-300 p-5 m-5 rounded-lg bg-gray-50 hover:shadow-md transition-all duration-300"
//               >
//                 <button
//                   onClick={() => toggleSyllabus(index)}
//                   className="w-full text-left font-semibold text-lg flex justify-between items-center focus:outline-none"
//                 >
//                   <span className="text-gray-900">{module.title}</span>
//                   <div className="flex items-center space-x-2">
//                     <span className="text-gray-600 text-sm">
//                       Module Details
//                     </span>
//                     <span className="text-gray-600">
//                       {expandedSyllabusIndex === index ? "▲" : "▼"}
//                     </span>
//                   </div>
//                 </button>
//                 {expandedSyllabusIndex === index && (
//                   <div className="mt-3 text-gray-700 transition-all duration-300">
//                     <p className="mt-2 bg-gray-100 p-4 rounded-lg">
//                       {module.description}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-700 text-lg">No syllabus available.</p>
//           )}
//         </div>
//       </div>

//       <div className="mt-6 mx-6 my-10">
//         <button
//           onClick={() => setIsUpdateModalOpen(true)}
//           className="bg-blue-700 text-white px-4 py-2  hover:bg-blue-800 mr-5"
//         >
//           Edit Course
//         </button>

//         <button
//           onClick={handleDeleteCourse}
//           className="bg-blue-700 text-white px-4 py-2  hover:bg-blue-800 "
//         >
//           Delete Course
//         </button>
//       </div>
//       <UpdateCourseModal
//         course={selectedCourse}
//         isOpen={isUpdateModalOpen}
//         onClose={() => setIsUpdateModalOpen(false)}
//       />
//     </div>
//   );
// };

// export default CourseDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById, deleteCourse } from "../redux/courseSlice";
import { toast } from "react-toastify";
import UpdateCourseModal from "./UpdateCourseModal";
import {
  FaEdit,
  FaTrash,
  FaClock,
  FaBook,
  FaRupeeSign,
  FaChevronDown,
  FaChevronUp,
  FaVideo,
  FaArrowLeft,
  FaLayerGroup,
  FaPlay,
  FaFilePdf,
} from "react-icons/fa";

const TrainerCourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedCourse, loading, error } = useSelector(
    (state) => state.courses
  );

  const [expandedChapters, setExpandedChapters] = useState({});
  const [expandedSyllabusIndex, setExpandedSyllabusIndex] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id));
    }
  }, [dispatch, id]);

  const toggleChapter = (chapterIndex) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterIndex]: !prev[chapterIndex],
    }));
  };

  const toggleSyllabus = (index) => {
    setExpandedSyllabusIndex(expandedSyllabusIndex === index ? null : index);
  };

  const handleDeleteCourse = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course? This action cannot be undone."
    );
    if (confirmDelete) {
      dispatch(deleteCourse(id)).then(() => {
        toast.success("Course deleted successfully!");
        navigate("/trainer-courses");
      });
    }
  };

  const getTotalLessons = () => {
    if (!selectedCourse?.chapters) return 0;
    return selectedCourse.chapters.reduce(
      (total, chapter) => total + (chapter.lessons?.length || 0),
      0
    );
  };

  const getTotalVideoHours = () => {
    // Calculate total duration from lessons
    // You might want to store this in the course data instead
    return selectedCourse?.duration || "N/A";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Course
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-4xl mb-4">📚</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Course Not Found
          </h2>
          <button
            onClick={() => navigate("/trainer-courses")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/trainer-courses")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaArrowLeft />
              <span>Back to My Courses</span>
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsUpdateModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaEdit />
                Edit Course
              </button>
              <button
                onClick={handleDeleteCourse}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaTrash />
                Delete Course
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {selectedCourse.category}
                </span>
                {selectedCourse.certificationAvailable && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Certificate Available
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedCourse.title}
              </h1>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {selectedCourse.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaClock className="text-blue-500" />
                  <span>{getTotalVideoHours()} hours</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaBook className="text-green-500" />
                  <span>{getTotalLessons()} lessons</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaLayerGroup className="text-purple-500" />
                  <span>{selectedCourse.chapters?.length || 0} chapters</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaRupeeSign className="text-yellow-500" />
                  <span>₹{selectedCourse.price || "Free"}</span>
                </div>
              </div>

              {selectedCourse.prerequisites && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Prerequisites
                  </h3>
                  <p className="text-gray-600">
                    {selectedCourse.prerequisites}
                  </p>
                </div>
              )}
            </div>

            <div className="md:w-1/3">
              <div className="h-full">
                <img
                  src={
                    selectedCourse.thumbnail ||
                    "https://via.placeholder.com/400x300"
                  }
                  alt={selectedCourse.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2">
            {/* Chapters and Lessons */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Course Content
              </h2>

              {selectedCourse.chapters?.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <FaBook className="text-4xl text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No chapters added yet</p>
                  <button
                    onClick={() => setIsUpdateModalOpen(true)}
                    className="mt-3 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Add content from edit mode
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedCourse.chapters?.map((chapter, chapterIndex) => (
                    <div
                      key={chapter._id || chapterIndex}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleChapter(chapterIndex)}
                        className="w-full p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full">
                            {chapterIndex + 1}
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-gray-900">
                              {chapter.title || `Chapter ${chapterIndex + 1}`}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {chapter.lessons?.length || 0} lessons
                              {chapter.description &&
                                ` • ${chapter.description}`}
                            </p>
                          </div>
                        </div>
                        {expandedChapters[chapterIndex] ? (
                          <FaChevronUp className="text-gray-400" />
                        ) : (
                          <FaChevronDown className="text-gray-400" />
                        )}
                      </button>

                      {expandedChapters[chapterIndex] && (
                        <div className="p-4 bg-white">
                          <div className="space-y-3">
                            {chapter.lessons?.map((lesson, lessonIndex) => (
                              <div
                                key={lesson._id || lessonIndex}
                                className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <FaVideo className="text-blue-400" />
                                    <div>
                                      <h4 className="font-medium text-gray-900">
                                        {lesson.title ||
                                          `Lesson ${lessonIndex + 1}`}
                                      </h4>
                                      {lesson.description && (
                                        <p className="text-sm text-gray-600 mt-1">
                                          {lesson.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {lesson.duration && (
                                      <span className="text-xs text-gray-500">
                                        {lesson.duration}
                                      </span>
                                    )}
                                    {lesson.notes && (
                                      <FaFilePdf className="text-red-500" />
                                    )}
                                    {lesson.isFreePreview && (
                                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                        Free Preview
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Syllabus */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Syllabus
              </h2>

              {selectedCourse.syllabus?.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <FaBook className="text-4xl text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No syllabus added yet</p>
                  <button
                    onClick={() => setIsUpdateModalOpen(true)}
                    className="mt-3 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Add syllabus from edit mode
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedCourse.syllabus?.map((module, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSyllabus(index)}
                        className="w-full p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                      >
                        <span className="font-semibold text-gray-900">
                          {module.title || `Module ${index + 1}`}
                        </span>
                        {expandedSyllabusIndex === index ? (
                          <FaChevronUp className="text-gray-400" />
                        ) : (
                          <FaChevronDown className="text-gray-400" />
                        )}
                      </button>

                      {expandedSyllabusIndex === index && (
                        <div className="p-4 bg-white">
                          <p className="text-gray-600">
                            {module.description || "No description provided"}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Course Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Course Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Course Statistics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span
                      className={`font-medium ${
                        selectedCourse.status === "approved"
                          ? "text-green-600"
                          : selectedCourse.status === "pending"
                          ? "text-yellow-600"
                          : selectedCourse.status === "rejected"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {selectedCourse.status?.charAt(0).toUpperCase() +
                        selectedCourse.status?.slice(1) || "Draft"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level</span>
                    <span className="font-medium">
                      {selectedCourse.level || "Beginner"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language</span>
                    <span className="font-medium">
                      {selectedCourse.language || "English"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Board</span>
                    <span className="font-medium">
                      {selectedCourse.board || "General"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created</span>
                    <span className="font-medium">
                      {new Date(selectedCourse.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setIsUpdateModalOpen(true)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Edit Course Content
                  </button>
                  <button
                    onClick={() => navigate(`/create-exam?courseId=${id}`)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Create Exam for This Course
                  </button>
                  <button
                    onClick={() =>
                      window.open(`/CourseDetails/${id}`, "_blank")
                    }
                    className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    View as Student
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Course Modal */}
      <UpdateCourseModal
        course={selectedCourse}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      />
    </div>
  );
};

export default TrainerCourseDetails;
