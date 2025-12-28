// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchCourseById,
//   enrollCourse,
//   getEnrolledCourses,
// } from "../redux/courseSlice";

// import { FaLock, FaChevronDown, FaChevronUp, FaPlay } from "react-icons/fa";

// import { AnimatePresence, motion } from "framer-motion";
// import Loader from "../common/Loader";
// import NotFound from "../common/NotFound";

// // VIDEO PLAYER (TOP FIXED)

// const VideoPlayer = ({ url, locked, title, onFreePreview }) => {
//   if (locked) {
//     return (
//       <div className="h-64 w-full bg-black/40 rounded-lg flex flex-col justify-center items-center">
//         <FaLock className="text-white text-4xl mb-3" />
//         <p className="text-white">This lesson is locked</p>

//         <button
//           onClick={onFreePreview}
//           className="mt-4 bg-purple-600 text-white px-5 py-2 rounded-lg"
//         >
//           Enroll to Unlock
//         </button>
//       </div>
//     );
//   }

//   if (!url) {
//     return (
//       <div className="h-64 w-full bg-gray-200 flex items-center justify-center rounded-lg">
//         <p>No video available</p>
//       </div>
//     );
//   }

//   // YouTube support
//   const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

//   if (isYouTube) {
//     const id = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1];

//     return (
//       <iframe
//         src={`https://www.youtube.com/embed/${id}`}
//         className="w-full h-64 rounded-lg"
//         allowFullScreen
//         title={title}
//       ></iframe>
//     );
//   }

//   return (
//     <video controls className="w-full h-64 rounded-lg">
//       <source src={url} />
//     </video>
//   );
// };

// // MAIN PAGE

// const CourseDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { selectedCourse, enrolledCourses, loading } = useSelector(
//     (state) => state.courses
//   );
//   const { token } = useSelector((state) => state.auth);

//   const [activeTab, setActiveTab] = useState("overview");
//   const [expanded, setExpanded] = useState([]);
//   const [currentVideo, setCurrentVideo] = useState(null);

//   const [modalVideo, setModalVideo] = useState(null);

//   const chapters = selectedCourse?.chapters || [];

//   const isEnrolled = enrolledCourses?.some(
//     (c) => c._id === selectedCourse?._id
//   );

//   useEffect(() => {
//     dispatch(fetchCourseById(id));
//     if (token) dispatch(getEnrolledCourses());
//   }, [id, token]);

//   // ENROLL HANDLER

//   const handleEnroll = async () => {
//     if (!token) {
//       window.dispatchEvent(new Event("open-login-modal"));
//       return;
//     }

//     await dispatch(enrollCourse(selectedCourse._id));
//     dispatch(enrollCourse(selectedCourse._id));
//   };

//   // CHAPTER TOGGL
//   const toggle = (index) => {
//     if (expanded === index) {
//       setExpanded(null);
//     } else {
//       // open ONLY this
//       setExpanded(index);
//     }
//   };

//   // PLAY VIDEO (FREE OR PAID)

//   const handleSelectLesson = (lesson) => {
//     if (lesson.isFreePreview && !isEnrolled) {
//       setModalVideo(lesson.videoUrl);
//       return;
//     }

//     if (!isEnrolled) return;

//     setCurrentVideo({
//       url: lesson.videoUrl,
//       title: lesson.title,
//     });
//   };

//   //
//   // Default first lesson or fallback video
//   //
//   useEffect(() => {
//     const freePreview = chapters
//       .flatMap((c) => c.lessons || [])
//       .find((l) => l.isFreePreview);

//     if (freePreview) {
//       setCurrentVideo({
//         url: freePreview.videoUrl,
//         title: freePreview.title,
//       });
//     }
//   }, [selectedCourse]);
//   if (loading || selectedCourse === null) {
//     return <Loader />;
//   }
//   if (!selectedCourse) return <NotFound message="Course not found" />;

//   return (
//     <div className="min-h-screen flex">
//       <div className="flex-grow max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* ------------------ LEFT: VIDEO + TABS ------------------ */}
//         <div className="lg:col-span-2">
//           {/* VIDEO PLAYER */}
//           <VideoPlayer
//             url={currentVideo?.url}
//             title={currentVideo?.title}
//             locked={!isEnrolled}
//             onFreePreview={handleEnroll}
//           />

//           {/* TABS */}
//           <div className="mt-6 border-b">
//             <div className="flex gap-6 overflow-x-auto">
//               {[
//                 "curriculum-mobile",
//                 "overview",
//                 "notes",
//                 "syllabus",
//                 "papers",
//                 "instructor",
//               ].map((tab) => (
//                 <button
//                   key={tab}
//                   className={`pb-2 whitespace-nowrap ${
//                     activeTab === tab
//                       ? "border-b-2 border-blue-600 font-semibold"
//                       : "text-gray-500"
//                   }`}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab === "curriculum-mobile"
//                     ? "Curriculum"
//                     : tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* TAB CONTENT */}
//           <div className="mt-4">
//             {/* OVERVIEW */}
//             {activeTab === "overview" && (
//               <p className="text-gray-700 leading-relaxed">
//                 {selectedCourse.description}
//               </p>
//             )}

//             {/* NOTES (VIEW PDF) */}
//             {activeTab === "notes" && (
//               <div className="space-y-4">
//                 {selectedCourse.courseDocuments?.notesPdf ? (
//                   <a
//                     href={`https://docs.google.com/gview?url=${encodeURIComponent(
//                       selectedCourse.courseDocuments.notesPdf
//                     )}&embedded=true`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg"
//                   >
//                     📄 View Course Notes
//                   </a>
//                 ) : (
//                   <p className="text-gray-500">No course notes available.</p>
//                 )}
//               </div>
//             )}

//             {/* SYLLABUS */}
//             {activeTab === "syllabus" && (
//               <div className="space-y-4">
//                 {selectedCourse.courseDocuments?.syllabusPdf && (
//                   <a
//                     href={`https://docs.google.com/gview?url=${encodeURIComponent(
//                       selectedCourse.courseDocuments.syllabusPdf
//                     )}&embedded=true`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
//                   >
//                     📘 View Syllabus PDF
//                   </a>
//                 )}

//                 <ul className="space-y-3">
//                   {selectedCourse.syllabus?.map((item, i) => (
//                     <li key={i} className="p-3 bg-gray-100 rounded-lg">
//                       <strong>{item.title}</strong>
//                       <p className="text-sm text-gray-600">
//                         {item.description}
//                       </p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* PREVIOUS PAPERS */}
//             {activeTab === "papers" && (
//               <div>
//                 {selectedCourse.courseDocuments?.previousPapersPdf ? (
//                   <a
//                     href={`https://docs.google.com/gview?url=${encodeURIComponent(
//                       selectedCourse.courseDocuments.previousPapersPdf
//                     )}&embedded=true`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg"
//                   >
//                     📑 View Previous Papers
//                   </a>
//                 ) : (
//                   <p className="text-gray-500">No previous papers uploaded.</p>
//                 )}
//               </div>
//             )}

//             {/* INSTRUCTOR */}
//             {activeTab === "instructor" && (
//               <div>
//                 <h3 className="font-semibold text-lg">
//                   {selectedCourse.trainer?.name || "Instructor"}
//                 </h3>
//                 <p className="text-gray-600 mt-2">
//                   Instructor details comming soon.....
//                 </p>
//               </div>
//             )}

//             {/* MOBILE CURRICULUM */}
//             {activeTab === "curriculum-mobile" && (
//               <div className="lg:hidden">
//                 <CurriculumAccordion
//                   chapters={chapters}
//                   isEnrolled={isEnrolled}
//                   onSelectLesson={handleSelectLesson}
//                   expanded={expanded}
//                   toggle={toggle}
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ------------------ RIGHT: SIDEBAR ------------------ */}
//         <div className="hidden lg:block">
//           <div className="p-5 border rounded-xl shadow-md bg-white mb-5">
//             <p className="text-3xl font-bold">
//               {selectedCourse.price === 0 ? "FREE" : `₹${selectedCourse.price}`}
//             </p>

//             {!isEnrolled ? (
//               <button
//                 onClick={handleEnroll}
//                 className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg"
//               >
//                 Enroll Now
//               </button>
//             ) : (
//               <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg">
//                 Continue Learning
//               </button>
//             )}
//           </div>

//           <CurriculumAccordion
//             chapters={chapters}
//             isEnrolled={isEnrolled}
//             onSelectLesson={handleSelectLesson}
//             expanded={expanded}
//             toggle={toggle}
//           />
//         </div>

//         {/* FREE PREVIEW MODAL */}
//         <AnimatePresence>
//           {modalVideo && (
//             <motion.div
//               className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//               onClick={() => setModalVideo(null)}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <motion.div
//                 className="bg-black w-full max-w-3xl rounded-xl overflow-hidden"
//                 initial={{ scale: 0.7 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0.7 }}
//               >
//                 <VideoPlayer url={modalVideo} locked={false} />
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// const CurriculumAccordion = ({
//   chapters,
//   expanded,
//   toggle,
//   isEnrolled,
//   onSelectLesson,
// }) => {
//   return (
//     <div className="space-y-4">
//       {chapters.map((chapter, index) => (
//         <div
//           key={index}
//           className="border rounded-lg bg-white shadow-sm overflow-hidden transition-all"
//         >
//           {/* Chapter Header */}
//           <button
//             className="w-full p-4 bg-gray-100 flex justify-between items-center hover:bg-gray-200 transition-all"
//             onClick={() => toggle(index)}
//           >
//             <span className="font-semibold text-gray-900 text-left">
//               {chapter.title}
//             </span>

//             {expanded === index ? (
//               <FaChevronUp className="text-gray-600" />
//             ) : (
//               <FaChevronDown className="text-gray-600" />
//             )}
//           </button>

//           {/* Lessons — Animated */}
//           <AnimatePresence>
//             {expanded === index && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.35, ease: "easeInOut" }}
//                 className="overflow-hidden"
//               >
//                 <div className="p-4 space-y-3">
//                   {(chapter.lessons || []).map((lesson, i) => {
//                     const locked = !lesson.isFreePreview && !isEnrolled;

//                     return (
//                       <button
//                         key={i}
//                         onClick={() => onSelectLesson(lesson)}
//                         className="flex items-center gap-3 p-3 rounded-lg w-full text-left hover:bg-gray-50 border border-gray-100 transition-all"
//                       >
//                         {locked ? (
//                           <FaLock className="text-gray-500" />
//                         ) : (
//                           <FaPlay className="text-green-600" />
//                         )}

//                         <div className="flex flex-col">
//                           <span className="font-medium text-gray-800">
//                             Lesson {i + 1}: {lesson.title}
//                           </span>

//                           {lesson.isFreePreview && !isEnrolled && (
//                             <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded w-fit mt-1">
//                               Free Preview
//                             </span>
//                           )}
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CourseDetails;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchCourseById,
//   enrollCourse,
//   getEnrolledCourses,
// } from "../redux/courseSlice";

// import {
//   FaLock,
//   FaChevronDown,
//   FaChevronUp,
//   FaPlay,
//   FaFilePdf,
//   FaExternalLinkAlt,
//   FaEye,
// } from "react-icons/fa";

// import { AnimatePresence, motion } from "framer-motion";
// import Loader from "../common/Loader";
// import NotFound from "../common/NotFound";

// // VIDEO PLAYER (TOP FIXED)
// const VideoPlayer = ({ url, locked, title, onFreePreview, lessonNotesUrl }) => {
//   if (locked) {
//     return (
//       <div className="h-64 w-full bg-black/40 rounded-lg flex flex-col justify-center items-center">
//         <FaLock className="text-white text-4xl mb-3" />
//         <p className="text-white">This lesson is locked</p>

//         <button
//           onClick={onFreePreview}
//           className="mt-4 bg-purple-600 text-white px-5 py-2 rounded-lg"
//         >
//           Enroll to Unlock
//         </button>
//       </div>
//     );
//   }

//   if (!url) {
//     return (
//       <div className="h-64 w-full bg-gray-200 flex items-center justify-center rounded-lg">
//         <p>No video available</p>
//       </div>
//     );
//   }

//   // YouTube support
//   const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

//   if (isYouTube) {
//     const id = url.split("v=")[1]?.split("&")[0] || url.split("youtu.be/")[1];

//     return (
//       <iframe
//         src={`https://www.youtube.com/embed/${id}`}
//         className="w-full h-64 rounded-lg"
//         allowFullScreen
//         title={title}
//       ></iframe>
//     );
//   }

//   return (
//     <video controls className="w-full h-64 rounded-lg">
//       <source src={url} />
//     </video>
//   );
// };

// // MAIN PAGE
// const CourseDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { selectedCourse, enrolledCourses, loading } = useSelector(
//     (state) => state.courses
//   );
//   const { token } = useSelector((state) => state.auth);

//   const [activeTab, setActiveTab] = useState("syllabus");
//   const [expanded, setExpanded] = useState([]);
//   const [currentLesson, setCurrentLesson] = useState(null);

//   const [modalVideo, setModalVideo] = useState(null);

//   const chapters = selectedCourse?.chapters || [];

//   const isEnrolled = enrolledCourses?.some(
//     (c) => c._id === selectedCourse?._id
//   );

//   useEffect(() => {
//     dispatch(fetchCourseById(id));
//     if (token) dispatch(getEnrolledCourses());
//   }, [id, token]);

//   // ENROLL HANDLER
//   const handleEnroll = async () => {
//     if (!token) {
//       window.dispatchEvent(new Event("open-login-modal"));
//       return;
//     }

//     await dispatch(enrollCourse(selectedCourse._id));
//     dispatch(enrollCourse(selectedCourse._id));
//   };

//   // CHAPTER TOGGLE
//   const toggle = (index) => {
//     if (expanded === index) {
//       setExpanded(null);
//     } else {
//       setExpanded(index);
//     }
//   };

//   // PLAY VIDEO (FREE OR PAID)
//   const handleSelectLesson = (lesson) => {
//     if (lesson.isFreePreview && !isEnrolled) {
//       setModalVideo({
//         url: lesson.videoUrl,
//         lesson: lesson,
//       });
//       return;
//     }

//     if (!isEnrolled) return;

//     setCurrentLesson(lesson);
//   };

//   // Set first free preview or first lesson as default
//   useEffect(() => {
//     const freePreview = chapters
//       .flatMap((c) => c.lessons || [])
//       .find((l) => l.isFreePreview);

//     if (freePreview) {
//       setCurrentLesson(freePreview);
//     } else if (chapters.length > 0 && chapters[0].lessons.length > 0) {
//       // Set first lesson if available
//       setCurrentLesson(chapters[0].lessons[0]);
//     }
//   }, [selectedCourse]);

//   if (loading || selectedCourse === null) {
//     return <Loader />;
//   }
//   if (!selectedCourse) return <NotFound message="Course not found" />;

//   // Function to open PDF in new tab using Google Docs viewer
//   const openPdfInNewTab = (pdfUrl) => {
//     if (!pdfUrl) return;

//     const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
//       pdfUrl
//     )}&embedded=true`;
//     window.open(viewerUrl, "_blank", "noopener,noreferrer");
//   };

//   return (
//     <div className="min-h-screen flex">
//       <div className="flex-grow max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* ------------------ LEFT: VIDEO + TABS ------------------ */}
//         <div className="lg:col-span-2">
//           {/* VIDEO PLAYER */}
//           <VideoPlayer
//             url={currentLesson?.videoUrl}
//             title={currentLesson?.title}
//             locked={!isEnrolled && !currentLesson?.isFreePreview}
//             onFreePreview={handleEnroll}
//             lessonNotesUrl={currentLesson?.notesUrl}
//           />

//           {/* LESSON DETAILS
//           {currentLesson && (
//             <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//               <h2 className="text-xl font-bold text-gray-800">
//                 {currentLesson.title}
//               </h2>
//               <p className="text-gray-600 mt-2">{currentLesson.description}</p>
//               <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
//                 <span>Duration: {currentLesson.duration} minutes</span>
//                 {currentLesson.isFreePreview && !isEnrolled && (
//                   <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
//                     Free Preview
//                   </span>
//                 )}
//               </div>
//             </div>
//           )} */}

//           {/* TABS */}
//           <div className="mt-6 border-b">
//             <div className="flex gap-6 overflow-x-auto">
//               {[
//                 "syllabus",
//                 "curriculum-mobile",
//                 "Short Notes",
//                 "PYQs",
//                 "instructor",
//               ].map((tab) => (
//                 <button
//                   key={tab}
//                   className={`pb-2 whitespace-nowrap ${
//                     activeTab === tab
//                       ? "border-b-2 border-blue-600 font-semibold"
//                       : "text-gray-500"
//                   }`}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab === "curriculum-mobile"
//                     ? "Study material"
//                     : tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* TAB CONTENT */}
//           <div className="mt-4">
//             {/* NOTES (VIEW PDF) */}
//             {activeTab === "Short Notes" && (
//               <div className="space-y-4">
//                 {selectedCourse.courseDocuments?.notesPdf ? (
//                   <button
//                     onClick={() =>
//                       openPdfInNewTab(selectedCourse.courseDocuments.notesPdf)
//                     }
//                     className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//                   >
//                     <FaFilePdf />
//                     View Course Notes
//                   </button>
//                 ) : (
//                   <p className="text-gray-500">No course notes available.</p>
//                 )}
//               </div>
//             )}

//             {/* SYLLABUS */}
//             {activeTab === "syllabus" && (
//               <div className="space-y-4">
//                 {selectedCourse.courseDocuments?.syllabusPdf && (
//                   <button
//                     onClick={() =>
//                       openPdfInNewTab(
//                         selectedCourse.courseDocuments.syllabusPdf
//                       )
//                     }
//                     className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     <FaFilePdf />
//                     View Syllabus PDF
//                   </button>
//                 )}

//                 <ul className="space-y-3">
//                   {selectedCourse.syllabus?.map((item, i) => (
//                     <li key={i} className="p-3 bg-gray-100 rounded-lg">
//                       <strong>{item.title}</strong>
//                       <p className="text-sm text-gray-600">
//                         {item.description}
//                       </p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* PREVIOUS PAPERS */}
//             {activeTab === "PYQs" && (
//               <div>
//                 {selectedCourse.courseDocuments?.previousPapersPdf ? (
//                   <button
//                     onClick={() =>
//                       openPdfInNewTab(
//                         selectedCourse.courseDocuments.previousPapersPdf
//                       )
//                     }
//                     className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
//                   >
//                     <FaFilePdf />
//                     View Previous Papers
//                   </button>
//                 ) : (
//                   <p className="text-gray-500">No previous papers uploaded.</p>
//                 )}
//               </div>
//             )}

//             {/* INSTRUCTOR */}
//             {activeTab === "instructor" && (
//               <div>
//                 <h3 className="font-semibold text-lg">
//                   {selectedCourse.trainer?.name || "Instructor"}
//                 </h3>
//                 <p className="text-gray-600 mt-2">
//                   Instructor details coming soon.....
//                 </p>
//               </div>
//             )}

//             {/* MOBILE CURRICULUM */}
//             {activeTab === "curriculum-mobile" && (
//               <div className="lg:hidden">
//                 <CurriculumAccordion
//                   chapters={chapters}
//                   isEnrolled={isEnrolled}
//                   onSelectLesson={handleSelectLesson}
//                   expanded={expanded}
//                   toggle={toggle}
//                   currentLessonId={currentLesson?._id}
//                   onViewNotes={openPdfInNewTab}
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ------------------ RIGHT: SIDEBAR ------------------ */}
//         <div className="hidden lg:block">
//           <div className="p-5 border rounded-xl shadow-md bg-white mb-5">
//             <p className="text-3xl font-bold">
//               {selectedCourse.price === 0 ? "FREE" : `₹${selectedCourse.price}`}
//             </p>

//             {!isEnrolled ? (
//               <button
//                 onClick={handleEnroll}
//                 className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
//               >
//                 Enroll Now
//               </button>
//             ) : (
//               <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg">
//                 Continue Learning
//               </button>
//             )}
//           </div>

//           <CurriculumAccordion
//             chapters={chapters}
//             isEnrolled={isEnrolled}
//             onSelectLesson={handleSelectLesson}
//             expanded={expanded}
//             toggle={toggle}
//             currentLessonId={currentLesson?._id}
//             onViewNotes={openPdfInNewTab}
//           />
//         </div>

//         {/* FREE PREVIEW MODAL */}
//         <AnimatePresence>
//           {modalVideo && (
//             <motion.div
//               className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//               onClick={() => setModalVideo(null)}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <motion.div
//                 className="bg-black w-full max-w-3xl rounded-xl overflow-hidden"
//                 initial={{ scale: 0.7 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0.7 }}
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="p-4 bg-white">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold">
//                       {modalVideo.lesson.title}
//                     </h3>
//                     <button
//                       onClick={() => setModalVideo(null)}
//                       className="text-gray-500 hover:text-gray-700"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                   <VideoPlayer
//                     url={modalVideo.url}
//                     locked={false}
//                     title={modalVideo.lesson.title}
//                   />

//                   {/* Notes button in modal */}
//                   {modalVideo.lesson.notesUrl && (
//                     <button
//                       onClick={() =>
//                         openPdfInNewTab(modalVideo.lesson.notesUrl)
//                       }
//                       className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                     >
//                       <FaFilePdf />
//                       View Lesson Notes
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// const CurriculumAccordion = ({
//   chapters,
//   expanded,
//   toggle,
//   isEnrolled,
//   onSelectLesson,
//   currentLessonId,
//   onViewNotes,
// }) => {
//   return (
//     <div className="space-y-4">
//       {chapters.map((chapter, index) => (
//         <div
//           key={index}
//           className="border rounded-lg bg-white shadow-sm overflow-hidden transition-all"
//         >
//           {/* Chapter Header */}
//           <button
//             className="w-full p-4 bg-gray-100 flex justify-between items-center hover:bg-gray-200 transition-all"
//             onClick={() => toggle(index)}
//           >
//             <span className="font-semibold text-gray-900 text-left">
//               {chapter.title}
//             </span>

//             {expanded === index ? (
//               <FaChevronUp className="text-gray-600" />
//             ) : (
//               <FaChevronDown className="text-gray-600" />
//             )}
//           </button>

//           {/* Lessons — Animated */}
//           <AnimatePresence>
//             {expanded === index && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.35, ease: "easeInOut" }}
//                 className="overflow-hidden"
//               >
//                 <div className="p-4 space-y-3">
//                   {(chapter.lessons || []).map((lesson, i) => {
//                     const locked = !lesson.isFreePreview && !isEnrolled;
//                     const isActive = lesson._id === currentLessonId;

//                     return (
//                       <div
//                         key={i}
//                         className={`p-3 rounded-lg ${
//                           isActive
//                             ? "bg-blue-50 border border-blue-200"
//                             : "border border-gray-100"
//                         } hover:bg-gray-50 transition-all`}
//                       >
//                         <div className="flex items-center justify-between mb-2">
//                           <button
//                             onClick={() => onSelectLesson(lesson)}
//                             className="flex items-center gap-3 text-left flex-1"
//                           >
//                             {locked ? (
//                               <FaLock className="text-gray-500" />
//                             ) : (
//                               <FaPlay className="text-green-600" />
//                             )}

//                             <div className="flex flex-col">
//                               <span className="font-medium text-gray-800">
//                                 {lesson.title}
//                               </span>
//                             </div>
//                           </button>
//                         </div>

//                         {/* Notes section - always visible */}
//                         <div className="flex justify-between items-center mt-2">
//                           <div className="text-sm text-gray-500 flex items-center gap-2">
//                             <span>Duration: {lesson.duration} min</span>
//                             {lesson.isFreePreview && !isEnrolled && (
//                               <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
//                                 Free Preview
//                               </span>
//                             )}
//                           </div>

//                           {/* Notes button/display */}
//                           <div className="flex items-center gap-2">
//                             {lesson.notesUrl ? (
//                               <div className="flex items-center gap-2">
//                                 <span className="text-sm text-gray-600 font-medium">
//                                   Lesson Notes:
//                                 </span>
//                                 {isEnrolled || lesson.isFreePreview ? (
//                                   <button
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       onViewNotes(lesson.notesUrl);
//                                     }}
//                                     className="inline-flex items-center gap-1  text-blue-600 hover:text-blue-800 text-sm font-medium"
//                                     title="Click to view notes"
//                                   >
//                                     <FaEye size={20} />
//                                   </button>
//                                 ) : (
//                                   <span className="text-sm text-gray-400 flex items-center gap-1">
//                                     <FaLock className="text-xs" />
//                                     Locked
//                                   </span>
//                                 )}
//                               </div>
//                             ) : (
//                               <span className="text-sm text-gray-400">
//                                 No notes available
//                               </span>
//                             )}
//                           </div>
//                         </div>

//                         {/* Description (only for active lesson) */}
//                         {isActive && (
//                           <div className="mt-2 pt-2 border-t border-gray-200">
//                             <p className="text-sm text-gray-600">
//                               {lesson.description}
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CourseDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseById,
  enrollCourse,
  getEnrolledCourses,
} from "../redux/courseSlice";

import {
  FaLock,
  FaChevronDown,
  FaChevronUp,
  FaPlay,
  FaFilePdf,
  FaExternalLinkAlt,
  FaEye,
} from "react-icons/fa";

import { AnimatePresence, motion } from "framer-motion";
import Loader from "../common/Loader";
import NotFound from "../common/NotFound";

// VIDEO PLAYER (TOP FIXED)
const VideoPlayer = ({ url, locked, title, onFreePreview, lessonNotesUrl }) => {
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

  const [activeTab, setActiveTab] = useState("syllabus");
  const [expanded, setExpanded] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);

  const [modalVideo, setModalVideo] = useState(null);

  const chapters = selectedCourse?.chapters || [];

  const isEnrolled = enrolledCourses?.some(
    (c) => c._id === selectedCourse?._id
  );

  // Mock data for multiple PDFs (you'll replace this with actual API data)
  const [multipleNotes, setMultipleNotes] = useState([
    { id: 1, title: "Chapter 1 Notes", url: "https://example.com/notes1.pdf" },
    { id: 2, title: "Chapter 2 Notes", url: "https://example.com/notes2.pdf" },
    { id: 3, title: "Chapter 3 Notes", url: "https://example.com/notes3.pdf" },
  ]);

  const [multiplePYQs, setMultiplePYQs] = useState([
    {
      id: 1,
      title: "2023 Previous Paper",
      url: "https://example.com/pyq2023.pdf",
    },
    {
      id: 2,
      title: "2022 Previous Paper",
      url: "https://example.com/pyq2022.pdf",
    },
    {
      id: 3,
      title: "2021 Previous Paper",
      url: "https://example.com/pyq2021.pdf",
    },
  ]);

  useEffect(() => {
    dispatch(fetchCourseById(id));
    if (token) dispatch(getEnrolledCourses());

    // Here you would fetch the multiple PDFs from your API
    // For now, using mock data
    // fetchMultipleNotes();
    // fetchMultiplePYQs();
  }, [id, token]);

  // ENROLL HANDLER
  const handleEnroll = async () => {
    if (!token) {
      window.dispatchEvent(new Event("open-login-modal"));
      return;
    }

    await dispatch(enrollCourse(selectedCourse._id));
    dispatch(enrollCourse(selectedCourse._id));
  };

  // CHAPTER TOGGLE
  const toggle = (index) => {
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  // PLAY VIDEO (FREE OR PAID)
  const handleSelectLesson = (lesson) => {
    if (lesson.isFreePreview && !isEnrolled) {
      setModalVideo({
        url: lesson.videoUrl,
        lesson: lesson,
      });
      return;
    }

    if (!isEnrolled) return;

    setCurrentLesson(lesson);
  };

  // Set first free preview or first lesson as default
  useEffect(() => {
    const freePreview = chapters
      .flatMap((c) => c.lessons || [])
      .find((l) => l.isFreePreview);

    if (freePreview) {
      setCurrentLesson(freePreview);
    } else if (chapters.length > 0 && chapters[0].lessons.length > 0) {
      // Set first lesson if available
      setCurrentLesson(chapters[0].lessons[0]);
    }
  }, [selectedCourse]);

  // Function to open PDF in new tab using Google Docs viewer
  const openPdfInNewTab = (pdfUrl) => {
    if (!pdfUrl) return;

    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
      pdfUrl
    )}&embedded=true`;
    window.open(viewerUrl, "_blank", "noopener,noreferrer");
  };

  if (loading || selectedCourse === null) {
    return <Loader />;
  }
  if (!selectedCourse) return <NotFound message="Course not found" />;

  return (
    <div className="min-h-screen flex">
      <div className="flex-grow max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ------------------ LEFT: VIDEO + TABS ------------------ */}
        <div className="lg:col-span-2">
          {/* ENROLL BUTTON FOR MOBILE (above video) */}
          <div className="lg:hidden mb-4">
            <div className="p-5 border rounded-xl shadow-md bg-white">
              <p className="text-3xl font-bold">
                {selectedCourse.price === 0
                  ? "FREE"
                  : `₹${selectedCourse.price}`}
              </p>

              {!isEnrolled ? (
                <button
                  onClick={handleEnroll}
                  className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Enroll Now
                </button>
              ) : (
                <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg">
                  Continue Learning
                </button>
              )}
            </div>
          </div>

          {/* VIDEO PLAYER */}
          <VideoPlayer
            url={currentLesson?.videoUrl}
            title={currentLesson?.title}
            locked={!isEnrolled && !currentLesson?.isFreePreview}
            onFreePreview={handleEnroll}
            lessonNotesUrl={currentLesson?.notesUrl}
          />

          {/* STUDY MATERIAL FOR MOBILE (always visible below video) */}
          <div className="lg:hidden mt-6">
            <CurriculumAccordion
              chapters={chapters}
              isEnrolled={isEnrolled}
              onSelectLesson={handleSelectLesson}
              expanded={expanded}
              toggle={toggle}
              currentLessonId={currentLesson?._id}
              onViewNotes={openPdfInNewTab}
            />
          </div>

          {/* TABS */}
          <div className="mt-6 border-b">
            <div className="flex gap-6 overflow-x-auto">
              {["syllabus", "short-notes", "pyqs", "instructor"].map((tab) => (
                <button
                  key={tab}
                  className={`pb-2 whitespace-nowrap ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 font-semibold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "short-notes"
                    ? "Short Notes"
                    : tab === "pyqs"
                    ? "PYQs"
                    : tab === "instructor"
                    ? "Instructor"
                    : "Syllabus"}
                </button>
              ))}
            </div>
          </div>

          {/* TAB CONTENT */}
          <div className="mt-4">
            {/* SHORT NOTES TAB - MULTIPLE PDFs */}
            {activeTab === "short-notes" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-3">Course Notes</h3>

                {/* Single PDF if from API */}
                {selectedCourse.courseDocuments?.notesPdf && (
                  <div className="mb-4">
                    <button
                      onClick={() =>
                        openPdfInNewTab(selectedCourse.courseDocuments.notesPdf)
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <FaFilePdf />
                      View Complete Course Notes
                    </button>
                  </div>
                )}

                {/* Multiple PDFs Section */}
                {multipleNotes.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Chapter-wise Notes:
                    </h4>
                    <div className="space-y-2">
                      {multipleNotes.map((note, index) => (
                        <div
                          key={note.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                        >
                          <span className="font-medium text-gray-800">
                            {index + 1}. {note.title}
                          </span>
                          <button
                            onClick={() => openPdfInNewTab(note.url)}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <FaFilePdf className="text-sm" />
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!selectedCourse.courseDocuments?.notesPdf &&
                  multipleNotes.length === 0 && (
                    <p className="text-gray-500">No course notes available.</p>
                  )}
              </div>
            )}

            {/* SYLLABUS TAB */}
            {activeTab === "syllabus" && (
              <div className="space-y-4">
                {selectedCourse.courseDocuments?.syllabusPdf && (
                  <button
                    onClick={() =>
                      openPdfInNewTab(
                        selectedCourse.courseDocuments.syllabusPdf
                      )
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaFilePdf />
                    View Syllabus PDF
                  </button>
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

            {/* PYQs TAB - MULTIPLE PDFs */}
            {activeTab === "pyqs" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-3">
                  Previous Year Questions
                </h3>

                {/* Single PDF if from API */}
                {selectedCourse.courseDocuments?.previousPapersPdf && (
                  <div className="mb-4">
                    <button
                      onClick={() =>
                        openPdfInNewTab(
                          selectedCourse.courseDocuments.previousPapersPdf
                        )
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <FaFilePdf />
                      View All Previous Papers
                    </button>
                  </div>
                )}

                {/* Multiple PDFs Section */}
                {multiplePYQs.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Year-wise Papers:
                    </h4>
                    <div className="space-y-2">
                      {multiplePYQs.map((paper, index) => (
                        <div
                          key={paper.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                        >
                          <span className="font-medium text-gray-800">
                            {index + 1}. {paper.title}
                          </span>
                          <button
                            onClick={() => openPdfInNewTab(paper.url)}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                          >
                            <FaFilePdf className="text-sm" />
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!selectedCourse.courseDocuments?.previousPapersPdf &&
                  multiplePYQs.length === 0 && (
                    <p className="text-gray-500">
                      No previous papers uploaded.
                    </p>
                  )}
              </div>
            )}

            {/* INSTRUCTOR TAB */}
            {activeTab === "instructor" && (
              <div>
                <h3 className="font-semibold text-lg">
                  {selectedCourse.trainer?.name || "Instructor"}
                </h3>
                <p className="text-gray-600 mt-2">
                  Instructor details coming soon.....
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ------------------ RIGHT: SIDEBAR (DESKTOP ONLY) ------------------ */}
        <div className="hidden lg:block">
          <div className="p-5 border rounded-xl shadow-md bg-white mb-5">
            <p className="text-3xl font-bold">
              {selectedCourse.price === 0 ? "FREE" : `₹${selectedCourse.price}`}
            </p>

            {!isEnrolled ? (
              <button
                onClick={handleEnroll}
                className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
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
            currentLessonId={currentLesson?._id}
            onViewNotes={openPdfInNewTab}
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
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      {modalVideo.lesson.title}
                    </h3>
                    <button
                      onClick={() => setModalVideo(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <VideoPlayer
                    url={modalVideo.url}
                    locked={false}
                    title={modalVideo.lesson.title}
                  />

                  {/* Notes button in modal */}
                  {modalVideo.lesson.notesUrl && (
                    <button
                      onClick={() =>
                        openPdfInNewTab(modalVideo.lesson.notesUrl)
                      }
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FaFilePdf />
                      View Lesson Notes
                    </button>
                  )}
                </div>
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
  currentLessonId,
  onViewNotes,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-gray-800">Study Material</h3>
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
                    const isActive = lesson._id === currentLessonId;

                    return (
                      <div
                        key={i}
                        className={`p-3 rounded-lg ${
                          isActive
                            ? "bg-blue-50 border border-blue-200"
                            : "border border-gray-100"
                        } hover:bg-gray-50 transition-all`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <button
                            onClick={() => onSelectLesson(lesson)}
                            className="flex items-center gap-3 text-left flex-1"
                          >
                            {locked ? (
                              <FaLock className="text-gray-500" />
                            ) : (
                              <FaPlay className="text-green-600" />
                            )}

                            <div className="flex flex-col">
                              <span className="font-medium text-gray-800">
                                {lesson.title}
                              </span>
                            </div>
                          </button>
                        </div>

                        {/* Notes section - always visible */}
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <span>{lesson.duration} min</span>
                            {lesson.isFreePreview && !isEnrolled && (
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                                Free Preview
                              </span>
                            )}
                          </div>

                          {/* Notes button/display */}
                          <div className="flex items-center gap-2">
                            {lesson.notesUrl ? (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 font-medium">
                                  Notes:
                                </span>
                                {isEnrolled || lesson.isFreePreview ? (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onViewNotes(lesson.notesUrl);
                                    }}
                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    title="Click to view notes"
                                  >
                                    <FaEye size={20} />
                                  </button>
                                ) : (
                                  <span className="text-sm text-gray-400 flex items-center gap-1">
                                    <FaLock className="text-xs" />
                                    Locked
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">
                                No notes
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Description (only for active lesson) */}
                        {isActive && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                              {lesson.description}
                            </p>
                          </div>
                        )}
                      </div>
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
