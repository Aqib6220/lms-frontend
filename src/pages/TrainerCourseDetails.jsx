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
  FaYoutube,
  FaPlayCircle,
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

  // Video modal state
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [currentVideoTitle, setCurrentVideoTitle] = useState("");

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

  // Function to open video modal
  const openVideoModal = (videoUrl, title) => {
    setCurrentVideoUrl(videoUrl);
    setCurrentVideoTitle(title);
    setVideoModalOpen(true);
  };

  // Function to close video modal
  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setCurrentVideoUrl("");
    setCurrentVideoTitle("");
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
    return selectedCourse?.duration || "N/A";
  };

  // Function to render video preview thumbnail
  const renderVideoPreview = (lesson) => {
    if (!lesson.videoUrl) return null;

    const isYouTube =
      lesson.videoUrl.includes("youtube.com") ||
      lesson.videoUrl.includes("youtu.be");

    return (
      <div className="mt-3">
        <div
          className="relative group cursor-pointer rounded-lg overflow-hidden border border-gray-300"
          onClick={() => openVideoModal(lesson.videoUrl, lesson.title)}
        >
          {/* Thumbnail/Preview */}
          <div className="bg-gray-900 h-40 flex items-center justify-center">
            {isYouTube ? (
              <div className="text-center">
                <FaYoutube className="text-red-600 text-3xl mb-2" />
                <p className="text-white text-sm">YouTube Video</p>
              </div>
            ) : (
              <div className="text-center">
                <FaVideo className="text-blue-500 text-3xl mb-2" />
                <p className="text-white text-sm">Uploaded Video</p>
              </div>
            )}

            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
                <FaPlayCircle className="text-gray-900 text-2xl" />
              </div>
            </div>

            {/* Preview Badge */}
            <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded">
              Click to Preview
            </div>
          </div>

          {/* Video Info */}
          <div className="p-3 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-800 truncate">
                {lesson.title || "Untitled Video"}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openVideoModal(lesson.videoUrl, lesson.title);
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                <FaPlayCircle className="mr-1" />
                Preview
              </button>
            </div>
            {lesson.duration && (
              <p className="text-xs text-gray-500 mt-1">
                Duration: {lesson.duration}
              </p>
            )}
          </div>
        </div>
      </div>
    );
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
    <>
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
                            <div className="space-y-6">
                              {chapter.lessons?.map((lesson, lessonIndex) => (
                                <div
                                  key={lesson._id || lessonIndex}
                                  className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3 flex-1">
                                      <div className="flex-shrink-0">
                                        <FaVideo className="text-blue-400 mt-1" />
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">
                                          {lesson.title ||
                                            `Lesson ${lessonIndex + 1}`}
                                        </h4>
                                        {lesson.description && (
                                          <p className="text-sm text-gray-600 mt-1">
                                            {lesson.description}
                                          </p>
                                        )}

                                        {/* Video Preview Thumbnail */}
                                        {lesson.videoUrl && (
                                          <div className="mt-3 max-w-xs">
                                            {renderVideoPreview(lesson)}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 ml-3">
                                      {lesson.duration && (
                                        <span className="text-xs text-gray-500 whitespace-nowrap">
                                          {lesson.duration}
                                        </span>
                                      )}
                                      <div className="flex items-center gap-2">
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
                        {new Date(
                          selectedCourse.createdAt
                        ).toLocaleDateString()}
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
                    {/* <button
                      onClick={() => navigate(`/create-exam?courseId=${id}`)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Create Exam for This Course
                    </button> */}
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

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-6xl mx-4 bg-[#111] rounded-xl overflow-hidden shadow-2xl animate-scaleIn">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#1c1c1c] to-[#2d2d2d] border-b border-gray-800">
              <div className="flex items-center gap-3">
                {/* Premium Preview Badge */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-purple-700 to-blue-600 text-white text-sm font-bold px-4 py-2 rounded-lg">
                    🎬 Free Sample Video
                  </div>
                </div>

                {/* Title and Info */}
                <div>
                  <h2 className="text-white text-xl font-bold">
                    {currentVideoTitle}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Click play to watch the preview
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={closeVideoModal}
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-all duration-200"
                aria-label="Close video"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Video Player Container */}
            <div className="bg-black relative">
              {/* Video Aspect Ratio Container (16:9) */}
              <div className="relative pt-[56.25%]">
                {currentVideoUrl.includes("youtube.com") ||
                currentVideoUrl.includes("youtu.be") ? (
                  <iframe
                    src={
                      currentVideoUrl
                        .replace("watch?v=", "embed/")
                        .replace("youtu.be/", "youtube.com/embed/") +
                      "?autoplay=1"
                    }
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Video preview"
                  />
                ) : (
                  <video
                    src={currentVideoUrl}
                    className="absolute top-0 left-0 w-full h-full bg-black"
                    controls
                    autoPlay
                    controlsList="nodownload"
                  />
                )}
              </div>

              {/* Overlay Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">LIVE PREVIEW</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-300">Press ESC to exit</div>
                </div>
              </div>
            </div>

            {/* Course Info Footer */}
            <div className="px-6 py-4 bg-[#1a1a1a] border-t border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">From Course:</h3>
                  <p className="text-gray-400 text-sm">
                    Full video available in complete course
                  </p>
                </div>
                <button
                  onClick={closeVideoModal}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>

          {/* Background Click to Close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={closeVideoModal}
            aria-label="Close modal"
          />
        </div>
      )}
    </>
  );
};

export default TrainerCourseDetails;
