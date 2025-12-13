import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseById,
  enrollCourse,
  getEnrolledCourses,
} from "../redux/courseSlice";

import { FaLock, FaChevronDown, FaChevronUp, FaPlay } from "react-icons/fa";

import { AnimatePresence, motion } from "framer-motion";
import Loader from "../common/Loader";
import NotFound from "../common/NotFound";

// VIDEO PLAYER (TOP FIXED)

const VideoPlayer = ({ url, locked, title, onFreePreview }) => {
  if (locked) {
    return (
      <div className="h-64 w-full bg-black/40 rounded-lg flex flex-col justify-center items-center">
        <FaLock className="text-white text-4xl mb-3" />
        <p className="text-white">This lesson is locked</p>

        <button
          onClick={onFreePreview}
          className="mt-4 bg-purple-600 text-white px-5 py-2 rounded-lg"
        >
          Enroll to Unlock
        </button>
      </div>
    );
  }

  if (!url) {
    return (
      <div className="h-64 w-full bg-gray-200 flex items-center justify-center rounded-lg">
        <p>No video available</p>
      </div>
    );
  }

  // YouTube support
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

  if (isYouTube) {
    const id = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1];

    return (
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        className="w-full h-64 rounded-lg"
        allowFullScreen
        title={title}
      ></iframe>
    );
  }

  return (
    <video controls className="w-full h-64 rounded-lg">
      <source src={url} />
    </video>
  );
};

// MAIN PAGE

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedCourse, enrolledCourses, loading } = useSelector(
    (state) => state.courses
  );
  const { token } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("overview");
  const [expanded, setExpanded] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  const [modalVideo, setModalVideo] = useState(null);

  const chapters = selectedCourse?.chapters || [];

  const isEnrolled = enrolledCourses?.some(
    (c) => c._id === selectedCourse?._id
  );

  useEffect(() => {
    dispatch(fetchCourseById(id));
    if (token) dispatch(getEnrolledCourses());
  }, [id, token]);

  // ENROLL HANDLER

  const handleEnroll = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    await dispatch(enrollCourse(selectedCourse._id));
    dispatch(getEnrolledCourses());
  };

  // CHAPTER TOGGL
  const toggle = (index) => {
    if (expanded === index) {
      setExpanded(null);
    } else {
      // open ONLY this
      setExpanded(index);
    }
  };

  // PLAY VIDEO (FREE OR PAID)

  const handleSelectLesson = (lesson) => {
    if (lesson.isFreePreview && !isEnrolled) {
      setModalVideo(lesson.videoUrl);
      return;
    }

    if (!isEnrolled) return;

    setCurrentVideo({
      url: lesson.videoUrl,
      title: lesson.title,
    });
  };

  //
  // Default first lesson or fallback video
  //
  useEffect(() => {
    const freePreview = chapters
      .flatMap((c) => c.lessons || [])
      .find((l) => l.isFreePreview);

    if (freePreview) {
      setCurrentVideo({
        url: freePreview.videoUrl,
        title: freePreview.title,
      });
    }
  }, [selectedCourse]);
  if (loading || selectedCourse === null) {
    return <Loader />;
  }
  if (!selectedCourse) return <NotFound message="Course not found" />;

return (
  <div className="min-h-screen flex">
    <div className="flex-grow max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ------------------ LEFT: VIDEO + TABS ------------------ */}
      <div className="lg:col-span-2">
        {/* VIDEO PLAYER */}
        <VideoPlayer
          url={currentVideo?.url}
          title={currentVideo?.title}
          locked={!isEnrolled}
          onFreePreview={handleEnroll}
        />

        {/* TABS */}
        <div className="mt-6 border-b">
          <div className="flex gap-6 overflow-x-auto">
            {[
              "curriculum-mobile",
              "overview",
              "notes",
              "syllabus",
              "papers",
              "instructor",
            ].map((tab) => (
              <button
                key={tab}
                className={`pb-2 whitespace-nowrap ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 font-semibold"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "curriculum-mobile"
                  ? "Curriculum"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* TAB CONTENT */}
        <div className="mt-4">
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <p className="text-gray-700 leading-relaxed">
              {selectedCourse.description}
            </p>
          )}

          {/* NOTES (VIEW PDF) */}
          {activeTab === "notes" && (
            <div className="space-y-4">
              {selectedCourse.courseDocuments?.notesPdf ? (
                <a
                  href={`https://docs.google.com/gview?url=${encodeURIComponent(
                    selectedCourse.courseDocuments.notesPdf
                  )}&embedded=true`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg"
                >
                  📄 View Course Notes
                </a>
              ) : (
                <p className="text-gray-500">No course notes available.</p>
              )}
            </div>
          )}

          {/* SYLLABUS */}
          {activeTab === "syllabus" && (
            <div className="space-y-4">
              {selectedCourse.courseDocuments?.syllabusPdf && (
                <a
                  href={`https://docs.google.com/gview?url=${encodeURIComponent(
                    selectedCourse.courseDocuments.syllabusPdf
                  )}&embedded=true`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  📘 View Syllabus PDF
                </a>
              )}

              <ul className="space-y-3">
                {selectedCourse.syllabus?.map((item, i) => (
                  <li key={i} className="p-3 bg-gray-100 rounded-lg">
                    <strong>{item.title}</strong>
                    <p className="text-sm text-gray-600">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* PREVIOUS PAPERS */}
          {activeTab === "papers" && (
            <div>
              {selectedCourse.courseDocuments?.previousPapersPdf ? (
                <a
                  href={`https://docs.google.com/gview?url=${encodeURIComponent(
                    selectedCourse.courseDocuments.previousPapersPdf
                  )}&embedded=true`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg"
                >
                  📑 View Previous Papers
                </a>
              ) : (
                <p className="text-gray-500">
                  No previous papers uploaded.
                </p>
              )}
            </div>
          )}

          {/* INSTRUCTOR */}
          {activeTab === "instructor" && (
            <div>
              <h3 className="font-semibold text-lg">
                {selectedCourse.trainer?.email || "Instructor"}
              </h3>
              <p className="text-gray-600 mt-2">
                Instructor details will appear here.
              </p>
            </div>
          )}

          {/* MOBILE CURRICULUM */}
          {activeTab === "curriculum-mobile" && (
            <div className="lg:hidden">
              <CurriculumAccordion
                chapters={chapters}
                isEnrolled={isEnrolled}
                onSelectLesson={handleSelectLesson}
                expanded={expanded}
                toggle={toggle}
              />
            </div>
          )}
        </div>
      </div>

      {/* ------------------ RIGHT: SIDEBAR ------------------ */}
      <div className="hidden lg:block">
        <div className="p-5 border rounded-xl shadow-md bg-white mb-5">
          <p className="text-3xl font-bold">
            {selectedCourse.price === 0
              ? "FREE"
              : `₹${selectedCourse.price}`}
          </p>

          {!isEnrolled ? (
            <button
              onClick={handleEnroll}
              className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg"
            >
              Enroll Now
            </button>
          ) : (
            <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg">
              Continue Learning
            </button>
          )}
        </div>

        <CurriculumAccordion
          chapters={chapters}
          isEnrolled={isEnrolled}
          onSelectLesson={handleSelectLesson}
          expanded={expanded}
          toggle={toggle}
        />
      </div>

      {/* FREE PREVIEW MODAL */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setModalVideo(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black w-full max-w-3xl rounded-xl overflow-hidden"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
            >
              <VideoPlayer url={modalVideo} locked={false} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
);

};

const CurriculumAccordion = ({
  chapters,
  expanded,
  toggle,
  isEnrolled,
  onSelectLesson,
}) => {
  return (
    <div className="space-y-4">
      {chapters.map((chapter, index) => (
        <div
          key={index}
          className="border rounded-lg bg-white shadow-sm overflow-hidden transition-all"
        >
          {/* Chapter Header */}
          <button
            className="w-full p-4 bg-gray-100 flex justify-between items-center hover:bg-gray-200 transition-all"
            onClick={() => toggle(index)}
          >
            <span className="font-semibold text-gray-900 text-left">
              {chapter.title}
            </span>

            {expanded === index ? (
              <FaChevronUp className="text-gray-600" />
            ) : (
              <FaChevronDown className="text-gray-600" />
            )}
          </button>

          {/* Lessons — Animated */}
          <AnimatePresence>
            {expanded === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-3">
                  {(chapter.lessons || []).map((lesson, i) => {
                    const locked = !lesson.isFreePreview && !isEnrolled;

                    return (
                      <button
                        key={i}
                        onClick={() => onSelectLesson(lesson)}
                        className="flex items-center gap-3 p-3 rounded-lg w-full text-left hover:bg-gray-50 border border-gray-100 transition-all"
                      >
                        {locked ? (
                          <FaLock className="text-gray-500" />
                        ) : (
                          <FaPlay className="text-green-600" />
                        )}

                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">
                            Lesson {i + 1}: {lesson.title}
                          </span>

                          {lesson.isFreePreview && !isEnrolled && (
                            <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded w-fit mt-1">
                              Free Preview
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default CourseDetails;
