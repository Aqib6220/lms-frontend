// // import React, { useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import CourseForm from "./CourseForm";
// // import { motion } from "framer-motion";
// // import { useDispatch } from "react-redux";
// // import { updateCourse } from "../redux/courseSlice";

// // const UpdateCourseModal = ({ course, isOpen, onClose }) => {
// //   const dispatch = useDispatch();

// //   const [updatedData, setUpdatedData] = useState({
// //     title: course?.title || "",
// //     description: course?.description || "",
// //     category: course?.category || "",
// //     price: course?.price || 0,
// //     duration: course?.duration || "",
// //     level: course?.level || "",
// //     prerequisites: course?.prerequisites || "",
// //     certificationAvailable: course?.certificationAvailable || false,
// //     syllabus: course?.syllabus || [],
// //     lessons: course?.lessons || [],
// //   });

// //   const [thumbnail, setThumbnail] = useState(null);
// //   const [thumbnailPreview, setThumbnailPreview] = useState(
// //     course?.thumbnail || ""
// //   );

// //   const [lessonVideos, setLessonVideos] = useState({});
// //   const [lessonVideoPreviews, setLessonVideoPreviews] = useState({});

// //   // Handle text inputs
// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setUpdatedData((prevData) => ({
// //       ...prevData,
// //       [name]: type === "checkbox" ? checked : value,
// //     }));
// //   };

// //   // Handle Thumbnail Upload
// //   const handleThumbnailChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setThumbnail(file);
// //       setThumbnailPreview(URL.createObjectURL(file));
// //     }
// //   };

// //   // Handle Lesson Video Upload
// //   const handleVideoChange = (index, e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setLessonVideos((prev) => ({ ...prev, [index]: file }));
// //     }
// //   };

// //   // Handle syllabus updates
// //   const handleSyllabusChange = (index, field, value) => {
// //     setUpdatedData((prevData) => {
// //       const updatedSyllabus = [...prevData.syllabus];
// //       updatedSyllabus[index] = { ...updatedSyllabus[index], [field]: value };
// //       return { ...prevData, syllabus: updatedSyllabus };
// //     });
// //   };

// //   // Add new syllabus module
// //   // Add new syllabus module
// //   const addSyllabus = () => {
// //     setUpdatedData((prevData) => ({
// //       ...prevData,
// //       syllabus: [...prevData.syllabus, { title: "", description: "" }],
// //     }));
// //   };

// //   // Remove syllabus module
// //   const removeSyllabus = (index) => {
// //     setUpdatedData((prevData) => ({
// //       ...prevData,
// //       syllabus: prevData.syllabus.filter((_, i) => i !== index),
// //     }));
// //   };

// //   // Handle lesson updates
// //   // Handle Lesson Updates
// //   const handleLessonChange = (index, field, value) => {
// //     const updatedLessons = [...updatedData.lessons];
// //     updatedLessons[index] = { ...updatedLessons[index], [field]: value };
// //     setUpdatedData((prevData) => ({ ...prevData, lessons: updatedLessons }));
// //   };

// //   // Add a New Lesson
// //   const addLesson = () => {
// //     setUpdatedData((prevData) => ({
// //       ...prevData,
// //       lessons: [...prevData.lessons, { title: "", description: "", video: "" }],
// //     }));
// //   };

// //   // Remove lesson
// //   const removeLesson = (index) => {
// //     setUpdatedData((prevData) => ({
// //       ...prevData,
// //       lessons: prevData.lessons.filter((_, i) => i !== index),
// //     }));

// //     setLessonVideos((prev) => {
// //       const newVideos = { ...prev };
// //       delete newVideos[index];
// //       return newVideos;
// //     });

// //     setLessonVideoPreviews((prev) => {
// //       const newPreviews = { ...prev };
// //       delete newPreviews[index];
// //       return newPreviews;
// //     });
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const formData = new FormData();
// //     formData.append("title", updatedData.title);
// //     formData.append("description", updatedData.description);
// //     formData.append("category", updatedData.category);
// //     formData.append("price", updatedData.price);
// //     formData.append("duration", updatedData.duration);
// //     formData.append("level", updatedData.level);
// //     formData.append("prerequisites", updatedData.prerequisites);
// //     formData.append(
// //       "certificationAvailable",
// //       updatedData.certificationAvailable
// //     );
// //     formData.append("syllabus", JSON.stringify(updatedData.syllabus));

// //     if (thumbnail) {
// //       formData.append("thumbnail", thumbnail);
// //     }
// //     updatedData.lessons.forEach((lesson, index) => {
// //       formData.append(`lessons[${index}][title]`, lesson.title);
// //       formData.append(`lessons[${index}][description]`, lesson.description);

// //       if (lessonVideos[index]) {
// //         formData.append(`lessonVideos[${index}]`, lessonVideos[index]); // Append videos correctly
// //       } else {
// //         formData.append(`lessons[${index}][video]`, lesson.video);
// //       }
// //     });

// //     // Dispatch Redux action to update the course
// //     await dispatch(
// //       updateCourse({ courseId: course._id, updatedData: formData })
// //     );
// //     onClose();
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center text-black justify-center bg-black/30 backdrop-blur-sm">
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.95 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         exit={{ opacity: 0, scale: 0.95 }}
// //         transition={{ duration: 0.3 }}
// //         className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-2xl"
// //       >
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-2xl font-bold">Update Course</h2>
// //           <button
// //             onClick={onClose}
// //             className="text-gray-500 hover:text-gray-700 text-xl"
// //           >
// //             &times;
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit}>
// //           {/* Title */}
// //           <div className="mb-3">
// //             <label className="block text-sm font-medium">Title</label>
// //             <input
// //               type="text"
// //               name="title"
// //               value={updatedData.title}
// //               onChange={handleChange}
// //               className="w-full p-2 border rounded-md"
// //               required
// //             />
// //           </div>

// //           {/* Category */}
// //           <div className="mb-3">
// //             <label className="block text-sm font-medium">Category</label>
// //             <input
// //               type="text"
// //               name="category"
// //               value={updatedData.category}
// //               onChange={handleChange}
// //               className="w-full p-2 border rounded-md"
// //               required
// //             />
// //           </div>

// //           {/* Price */}
// //           <div className="mb-3">
// //             <label className="block text-sm font-medium">Price ($)</label>
// //             <input
// //               type="number"
// //               name="price"
// //               value={updatedData.price}
// //               onChange={handleChange}
// //               className="w-full p-2 border rounded-md"
// //               required
// //             />
// //           </div>

// //           {/* Duration */}
// //           <div className="mb-3">
// //             <label className="block text-sm font-medium">
// //               Duration (e.g., 6 weeks)
// //             </label>
// //             <input
// //               type="text"
// //               name="duration"
// //               value={updatedData.duration}
// //               onChange={handleChange}
// //               className="w-full p-2 border rounded-md"
// //               required
// //             />
// //           </div>

// //           {/* Level */}
// //           <div className="mb-3">
// //             <label className="block text-sm font-medium">Level</label>
// //             <select
// //               name="level"
// //               value={updatedData.level}
// //               onChange={handleChange}
// //               className="w-full p-2 border rounded-md"
// //             >
// //               <option value="Semester-1">Semester-1</option>
// //               <option value="Semester-2">Semester-2</option>
// //               <option value="Semester-3">Semester-3</option>
// //               <option value="Semester-4">Semester-4</option>
// //               <option value="Semester-5">Semester-5</option>
// //               <option value="Semester-6">Semester-6</option>
// //               <option value="Semester-7">Semester-7</option>
// //               <option value="Semester-8">Semester-8</option>
// //             </select>
// //           </div>

// //           {/* Prerequisites */}
// //           <div className="mb-3">
// //             <label className="block text-sm font-medium">Prerequisites</label>
// //             <input
// //               type="text"
// //               name="prerequisites"
// //               value={updatedData.prerequisites}
// //               onChange={handleChange}
// //               className="w-full p-2 border rounded-md"
// //             />
// //           </div>

// //           {/* Certification Available */}
// //           <div className="mb-3 flex items-center">
// //             <input
// //               type="checkbox"
// //               name="certificationAvailable"
// //               checked={updatedData.certificationAvailable}
// //               onChange={handleChange}
// //               className="mr-2"
// //             />
// //             <label className="text-sm">Certification Available</label>
// //           </div>

// //           {/* Thumbnail Upload */}
// //           <div className="mb-3">
// //             <label className="block text-sm font-medium">Thumbnail</label>
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={handleThumbnailChange}
// //               className="w-full p-2 border rounded-md"
// //             />
// //             {thumbnailPreview && (
// //               <img
// //                 src={thumbnailPreview}
// //                 alt="Thumbnail Preview"
// //                 className="mt-2 w-32 h-32 object-cover rounded-md"
// //               />
// //             )}
// //           </div>
// //           {/* Lessons Section */}
// //           <div className="mt-4">
// //             <h3 className="text-lg font-semibold mb-2">Lessons</h3>

// //             {updatedData.lessons.map((lesson, index) => (
// //               <div
// //                 key={index}
// //                 className="mb-4 p-3 border rounded-lg bg-gray-100"
// //               >
// //                 <div className="flex justify-between items-center">
// //                   <h4 className="text-md font-semibold">Lesson {index + 1}</h4>
// //                   <button
// //                     type="button"
// //                     onClick={() => removeLesson(index)}
// //                     className="text-red-500 text-sm"
// //                   >
// //                     Remove
// //                   </button>
// //                 </div>

// //                 <label className="block text-sm font-medium">
// //                   Lesson Title
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={lesson.title}
// //                   onChange={(e) =>
// //                     handleLessonChange(index, "title", e.target.value)
// //                   }
// //                   className="w-full p-2 border rounded-md mb-2"
// //                 />

// //                 <label className="block text-sm font-medium">
// //                   Lesson Description
// //                 </label>
// //                 <textarea
// //                   value={lesson.description}
// //                   onChange={(e) =>
// //                     handleLessonChange(index, "description", e.target.value)
// //                   }
// //                   className="w-full p-2 border rounded-md mb-2"
// //                 />

// //                 <label className="block text-sm font-medium">
// //                   Upload Lesson Video
// //                 </label>
// //                 <input
// //                   type="file"
// //                   accept="video/*"
// //                   onChange={(e) => handleVideoChange(index, e)}
// //                   className="w-full p-2 border rounded-md"
// //                 />
// //                 {lessonVideoPreviews[index] && (
// //                   <video
// //                     src={lessonVideoPreviews[index]}
// //                     controls
// //                     className="mt-2 w-48 rounded-md"
// //                   />
// //                 )}
// //               </div>
// //             ))}

// //             <button
// //               type="button"
// //               onClick={() => addLesson()}
// //               className="bg-green-500 text-white text-sm px-3 py-1 rounded-md"
// //             >
// //               Add Lesson
// //             </button>
// //           </div>
// //           {/* Syllabus Section */}
// //           {updatedData.syllabus.map((item, index) => (
// //             <div key={index} className="mb-4 border p-3 rounded-lg">
// //               <div className="flex justify-between items-center">
// //                 <h3 className="text-lg font-semibold">Module {index + 1}</h3>
// //                 <button
// //                   type="button"
// //                   onClick={() => removeSyllabus(index)}
// //                   className="text-red-500 text-sm"
// //                 >
// //                   Remove
// //                 </button>
// //               </div>

// //               {/* Module Title Input */}
// //               <label className="block text-sm font-medium">Module Title</label>
// //               <input
// //                 type="text"
// //                 value={item.title}
// //                 onChange={(e) =>
// //                   handleSyllabusChange(index, "title", e.target.value)
// //                 }
// //                 className="w-full p-2 border rounded-md"
// //                 placeholder="Enter module title"
// //               />

// //               {/* Module Description Input */}
// //               <label className="block text-sm font-medium mt-2">
// //                 Module Description
// //               </label>
// //               <textarea
// //                 value={item.description}
// //                 onChange={(e) =>
// //                   handleSyllabusChange(index, "description", e.target.value)
// //                 }
// //                 className="w-full p-2 border rounded-md"
// //                 placeholder="Enter module description"
// //               />
// //             </div>
// //           ))}

// //           {/* Add New Module Button */}
// //           <button
// //             type="button"
// //             onClick={addSyllabus}
// //             className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md mb-4"
// //           >
// //             Add Module
// //           </button>

// //           {/* Submit Buttons */}
// //           <div className="flex justify-end gap-2 mt-4">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="px-4 py-2 bg-gray-500 text-white rounded-md"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="px-4 py-2 bg-blue-600 text-white rounded-md"
// //             >
// //               Save Changes
// //             </button>
// //           </div>
// //         </form>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default UpdateCourseModal;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateCourse } from "../redux/courseSlice";
// import { toast } from "react-toastify";
// import { FaTimes, FaSpinner } from "react-icons/fa";

// const UpdateCourseModal = ({ course, isOpen, onClose }) => {
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.courses);

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     price: "",
//     duration: "",
//     prerequisites: "",
//     certificationAvailable: false,
//     // Add other fields as needed
//   });

//   const [chapters, setChapters] = useState([]);
//   const [syllabus, setSyllabus] = useState([]);

//   useEffect(() => {
//     if (course) {
//       setFormData({
//         title: course.title || "",
//         description: course.description || "",
//         price: course.price || "",
//         duration: course.duration || "",
//         prerequisites: course.prerequisites || "",
//         certificationAvailable: course.certificationAvailable || false,
//         // Add other fields
//       });
//       setChapters(course.chapters || []);
//       setSyllabus(course.syllabus || []);
//     }
//   }, [course]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const updatedData = {
//       ...formData,
//       chapters,
//       syllabus,
//     };

//     try {
//       await dispatch(
//         updateCourse({
//           courseId: course._id,
//           updatedData,
//         })
//       ).unwrap();

//       toast.success("Course updated successfully!");
//       onClose();
//     } catch (error) {
//       toast.error(error || "Failed to update course");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-gray-900">Edit Course</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <FaTimes size={24} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           {/* You can reuse the CourseForm structure here */}
//           {/* For brevity, I'll show a simplified version */}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Course Title
//               </label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) =>
//                   setFormData({ ...formData, title: e.target.value })
//                 }
//                 className="w-full p-3 border border-gray-300 rounded-lg"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Price (₹)
//               </label>
//               <input
//                 type="number"
//                 value={formData.price}
//                 onChange={(e) =>
//                   setFormData({ ...formData, price: e.target.value })
//                 }
//                 className="w-full p-3 border border-gray-300 rounded-lg"
//                 required
//               />
//             </div>
//           </div>

//           {/* Add more form fields as needed */}

//           <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <FaSpinner className="animate-spin" />
//                   Updating...
//                 </>
//               ) : (
//                 "Update Course"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateCourseModal;



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Mark field as touched
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        thumbnail: file,
        thumbnailPreview: URL.createObjectURL(file),
      });
      toast.info("Thumbnail updated!");

      if (errors.thumbnail) {
        setErrors((prev) => ({ ...prev, thumbnail: "" }));
      }
    }
  };

  const addChapter = () => {
    const newChapter = {
      title: "",
      description: "",
      lessons: [],
    };
    setChapters([...chapters, newChapter]);
    setExpandedChapters({ ...expandedChapters, [chapters.length]: true });
    toast.info("New chapter added!");
  };

  const removeChapter = (chapterIndex) => {
    const updatedChapters = chapters.filter((_, i) => i !== chapterIndex);
    setChapters(updatedChapters);
    toast.warning("Chapter removed!");
  };

  const handleChapterChange = (chapterIndex, field, value) => {
    const updatedChapters = chapters.map((chapter, i) =>
      i === chapterIndex ? { ...chapter, [field]: value } : chapter
    );
    setChapters(updatedChapters);

    // Clear chapter errors
    if (errors[`chapter_${field}_${chapterIndex}`]) {
      setErrors((prev) => ({
        ...prev,
        [`chapter_${field}_${chapterIndex}`]: "",
      }));
    }
  };

  const toggleChapterExpand = (chapterIndex) => {
    setExpandedChapters({
      ...expandedChapters,
      [chapterIndex]: !expandedChapters[chapterIndex],
    });
  };

  const addLessonToChapter = (chapterIndex) => {
    const newLesson = {
      title: "",
      description: "",
      videoType: "upload",
      video: null,
      videoUrl: "",
      isFreePreview: false,
      duration: "",
      notes: null,
    };
    const updatedChapters = chapters.map((chapter, i) =>
      i === chapterIndex
        ? { ...chapter, lessons: [...chapter.lessons, newLesson] }
        : chapter
    );
    setChapters(updatedChapters);
    toast.info(`New lesson added to Chapter ${chapterIndex + 1}`);
  };

  const removeLessonFromChapter = (chapterIndex, lessonIndex) => {
    const updatedChapters = chapters.map((chapter, i) =>
      i === chapterIndex
        ? {
            ...chapter,
            lessons: chapter.lessons.filter((_, j) => j !== lessonIndex),
          }
        : chapter
    );
    setChapters(updatedChapters);
    toast.warning("Lesson removed!");
  };

  const handleLessonChange = (chapterIndex, lessonIndex, field, value) => {
    const updatedChapters = chapters.map((chapter, i) =>
      i === chapterIndex
        ? {
            ...chapter,
            lessons: chapter.lessons.map((lesson, j) =>
              j === lessonIndex ? { ...lesson, [field]: value } : lesson
            ),
          }
        : chapter
    );
    setChapters(updatedChapters);

    // Clear lesson errors
    if (errors[`lesson_${field}_${chapterIndex}_${lessonIndex}`]) {
      setErrors((prev) => ({
        ...prev,
        [`lesson_${field}_${chapterIndex}_${lessonIndex}`]: "",
      }));
    }
  };

  const handleLessonTypeChange = (chapterIndex, lessonIndex, type) => {
    const updatedChapters = chapters.map((chapter, i) =>
      i === chapterIndex
        ? {
            ...chapter,
            lessons: chapter.lessons.map((lesson, j) =>
              j === lessonIndex
                ? { ...lesson, videoType: type, video: null, videoUrl: "" }
                : lesson
            ),
          }
        : chapter
    );
    setChapters(updatedChapters);
    toast.info(
      `Video type changed to ${
        type === "upload" ? "file upload" : "YouTube link"
      }`
    );
  };

  const handleLessonFileChange = (chapterIndex, lessonIndex, file) => {
    if (file) {
      const updatedChapters = chapters.map((chapter, i) =>
        i === chapterIndex
          ? {
              ...chapter,
              lessons: chapter.lessons.map((lesson, j) =>
                j === lessonIndex ? { ...lesson, video: file } : lesson
              ),
            }
          : chapter
      );
      setChapters(updatedChapters);
      toast.success(`Video "${file.name}" selected`);

      // Clear video error
      if (errors[`lesson_video_${chapterIndex}_${lessonIndex}`]) {
        setErrors((prev) => ({
          ...prev,
          [`lesson_video_${chapterIndex}_${lessonIndex}`]: "",
        }));
      }
    }
  };

  const handleYouTubeUrlChange = (chapterIndex, lessonIndex, url) => {
    const updatedChapters = chapters.map((chapter, i) =>
      i === chapterIndex
        ? {
            ...chapter,
            lessons: chapter.lessons.map((lesson, j) =>
              j === lessonIndex ? { ...lesson, videoUrl: url } : lesson
            ),
          }
        : chapter
    );
    setChapters(updatedChapters);

    // Clear video error
    if (errors[`lesson_video_${chapterIndex}_${lessonIndex}`]) {
      setErrors((prev) => ({
        ...prev,
        [`lesson_video_${chapterIndex}_${lessonIndex}`]: "",
      }));
    }
  };

  const toggleFreePreview = (chapterIndex, lessonIndex) => {
    const updatedChapters = chapters.map((chapter, i) =>
      i === chapterIndex
        ? {
            ...chapter,
            lessons: chapter.lessons.map((lesson, j) =>
              j === lessonIndex
                ? { ...lesson, isFreePreview: !lesson.isFreePreview }
                : lesson
            ),
          }
        : chapter
    );
    setChapters(updatedChapters);
    const status = updatedChapters[chapterIndex].lessons[lessonIndex]
      .isFreePreview
      ? "enabled"
      : "disabled";
    toast.info(`Free preview ${status}`);
  };

  const addSyllabusItem = () => {
    setSyllabus([...syllabus, { title: "", description: "" }]);
  };

  const removeSyllabusItem = (index) => {
    const updatedSyllabus = syllabus.filter((_, i) => i !== index);
    setSyllabus(updatedSyllabus);
  };

  const handleSyllabusChange = (index, field, value) => {
    const updatedSyllabus = syllabus.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setSyllabus(updatedSyllabus);

    // Clear syllabus errors
    if (errors[`syllabus_${field}_${index}`]) {
      setErrors((prev) => ({ ...prev, [`syllabus_${field}_${index}`]: "" }));
    }
  };

  const nextStep = () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    } else {
      toast.error("Please fix the errors before proceeding");
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep3()) {
      toast.error("Please fix the errors in course content");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Prepare form data for update
      const updatedData = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (
          formData[key] !== null &&
          formData[key] !== undefined &&
          formData[key] !== ""
        ) {
          if (key === "certificationAvailable") {
            updatedData.append(key, formData[key] ? "true" : "false");
          } else if (key !== "thumbnailPreview") {
            updatedData.append(key, formData[key]);
          }
        }
      });

      // Add thumbnail if changed
      if (formData.thumbnail instanceof File) {
        updatedData.append("thumbnail", formData.thumbnail);
      }

      // Append chapters and lessons
      const chaptersForBackend = chapters.map((chapter, chapterIndex) => ({
        title: chapter.title,
        description: chapter.description,
        lessons: chapter.lessons.map((lesson, lessonIndex) => ({
          title: lesson.title,
          description: lesson.description,
          videoType: lesson.videoType,
          videoUrl: lesson.videoType === "youtube" ? lesson.videoUrl : "",
          isFreePreview: lesson.isFreePreview,
          duration: lesson.duration || "",
          ...(lesson._id && { _id: lesson._id }), // Keep existing lesson ID if updating
        })),
      }));
      updatedData.append("chapters", JSON.stringify(chaptersForBackend));

      // Append video files
      const lessonVideoMappings = [];
      chapters.forEach((chapter, chIdx) => {
        chapter.lessons.forEach((lesson, lessonIdx) => {
          if (lesson.videoType === "upload" && lesson.video instanceof File) {
            updatedData.append("lessonVideos", lesson.video);
            lessonVideoMappings.push({ chapterIndex: chIdx, lessonIndex: lessonIdx });
          }
        });
      });
      if (lessonVideoMappings.length > 0) {
        updatedData.append("lessonVideoMappings", JSON.stringify(lessonVideoMappings));
      }

      // Send thumbnail removal flag if requested
      if (removeThumbnail) {
        updatedData.append("removeThumbnail", "true");
      }

      // Append syllabus
      updatedData.append("syllabus", JSON.stringify(syllabus));

      // Dispatch update action
      // Debug: print form data entries to ensure files are present before sending
      for (let pair of updatedData.entries()) {
        console.debug("FormData entry:", pair[0], pair[1]);
      }

      await dispatch(
        updateCourse({
          courseId: course._id,
          updatedData,
        })
      ).unwrap();

      toast.success("Course updated successfully! 🎉");
      onClose();
    } catch (error) {
      toast.error(error || "Failed to update course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
          <FaBook className="mr-2" />
          Course Basics
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Class Level *
          </label>
          <select
            name="classLevel"
            value={formData.classLevel}
            onChange={handleChange}
            onBlur={() => handleBlur("classLevel")}
            className={`w-full p-3 border rounded-lg ${
              errors.classLevel ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
          >
            <option value="">Select Class Level</option>
            {classLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          {errors.classLevel && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" size={12} />
              {errors.classLevel}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={() => handleBlur("subject")}
            className={`w-full p-3 border rounded-lg ${
              errors.subject ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            disabled={!formData.classLevel}
          >
            <option value="">
              {formData.classLevel ? "Select Subject" : "Select Class First"}
            </option>
            {formData.classLevel &&
              subjects[formData.classLevel]?.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
          </select>
          {errors.subject && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" size={12} />
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Education Board
          </label>
          <select
            name="board"
            value={formData.board}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            {boards.map((board) => (
              <option key={board.value} value={board.value}>
                {board.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Language
          </label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={() => handleBlur("title")}
            className={`w-full p-3 border rounded-lg ${
              errors.title ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" size={12} />
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price (₹) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            onBlur={() => handleBlur("price")}
            className={`w-full p-3 border rounded-lg ${
              errors.price ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
          />
          {errors.price && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" size={12} />
              {errors.price}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Audience
          </label>
          <input
            type="text"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
          <FaClock className="mr-2" />
          Course Details
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration *
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            onBlur={() => handleBlur("duration")}
            placeholder="e.g., 30 hours, 6 weeks"
            className={`w-full p-3 border rounded-lg ${
              errors.duration ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
          />
          {errors.duration && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" size={12} />
              {errors.duration}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Level *
          </label>
          <select
            name="courseLevel"
            value={formData.courseLevel}
            onChange={handleChange}
            onBlur={() => handleBlur("courseLevel")}
            className={`w-full p-3 border rounded-lg ${
              errors.courseLevel
                ? "border-red-500 bg-red-50"
                : "border-gray-300"
            }`}
          >
            <option value="">Select Course Level</option>
            <option value="Semester-1">Semester-1</option>
            <option value="Semester-2">Semester-2</option>
            <option value="Semester-3">Semester-3</option>
            <option value="Semester-4">Semester-4</option>
            <option value="Semester-5">Semester-5</option>
            <option value="Semester-6">Semester-6</option>
            <option value="Semester-7">Semester-7</option>
            <option value="Semester-8">Semester-8</option>
          </select>
          {errors.courseLevel && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" size={12} />
              {errors.courseLevel}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={() => handleBlur("description")}
            rows="6"
            className={`w-full p-3 border rounded-lg ${
              errors.description
                ? "border-red-500 bg-red-50"
                : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <FaExclamationCircle className="mr-1" size={12} />
              {errors.description}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prerequisites
          </label>
          <input
            type="text"
            name="prerequisites"
            value={formData.prerequisites}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thumbnail
          </label>
          <div className="flex items-center gap-4">
            {formData.thumbnailPreview && (
              <img
                src={formData.thumbnailPreview}
                alt="Current thumbnail"
                className="w-32 h-32 object-cover rounded-lg"
              />
            )}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="thumbnail-upload"
              />
              <label
                htmlFor="thumbnail-upload"
                className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
              >
                Change Thumbnail
              </label>
              <button
                type="button"
                onClick={() => {
                  setRemoveThumbnail(true);
                  setFormData((prev) => ({ ...prev, thumbnailPreview: "", thumbnail: null }));
                }}
                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
              >
                Remove Thumbnail
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Click to upload new thumbnail image or remove existing
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="certificationAvailable"
              checked={formData.certificationAvailable}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              Certification Available upon completion
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold text-purple-800 mb-2 flex items-center">
          <FaListAlt className="mr-2" />
          Course Content
        </h3>
      </div>

      {/* Syllabus Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-gray-800">
            Course Syllabus
          </h4>
          <button
            type="button"
            onClick={addSyllabusItem}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Section
          </button>
        </div>

        {syllabus.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg mb-6">
            <FaListAlt className="text-4xl text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No syllabus sections added yet</p>
          </div>
        ) : (
          syllabus.map((item, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-200 rounded-lg"
            >
              {/* PDF Upload for syllabus */}
              <div
                className={`border-2 border-dashed rounded-lg p-3 mt-3 ${
                  item.pdf ? "border-green-300 bg-green-50" : "border-gray-300"
                }`}
              >
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  id={`syllabus-pdf-${index}`}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const updated = [...syllabus];
                      updated[index].pdf = file;
                      setSyllabus(updated);
                      toast.success(`PDF added: ${file.name}`);
                    }
                  }}
                />

                {item.pdf ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaFilePdf className="text-red-500 mr-2" />
                      <span className="text-green-700 text-sm">
                        {item.pdf.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => {
                        const updated = [...syllabus];
                        updated[index].pdf = null;
                        setSyllabus(updated);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor={`syllabus-pdf-${index}`}
                    className="cursor-pointer flex justify-center text-red-600 text-sm"
                  >
                    <FaFilePdf className="mr-2" /> Upload Syllabus PDF
                  </label>
                )}
              </div>

              <div className="flex justify-between items-center mb-3">
                <h5 className="font-medium">Section {index + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeSyllabusItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
              <input
                type="text"
                placeholder="Section Title *"
                value={item.title}
                onChange={(e) =>
                  handleSyllabusChange(index, "title", e.target.value)
                }
                className={`w-full p-3 border rounded-lg mb-3 ${
                  errors[`syllabus_title_${index}`]
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
              />
              {errors[`syllabus_title_${index}`] && (
                <p className="text-red-600 text-sm mb-2 flex items-center">
                  <FaExclamationCircle className="mr-1" size={12} />
                  {errors[`syllabus_title_${index}`]}
                </p>
              )}
              <textarea
                placeholder="Section Description *"
                value={item.description}
                onChange={(e) =>
                  handleSyllabusChange(index, "description", e.target.value)
                }
                rows="2"
                className={`w-full p-3 border rounded-lg ${
                  errors[`syllabus_description_${index}`]
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
              />
              {errors[`syllabus_description_${index}`] && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <FaExclamationCircle className="mr-1" size={12} />
                  {errors[`syllabus_description_${index}`]}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Chapters Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-gray-800">
            Course Chapters
          </h4>
          <button
            type="button"
            onClick={addChapter}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Chapter
          </button>
        </div>

        {chapters.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <FaLayerGroup className="text-4xl text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No chapters added yet</p>
          </div>
        ) : (
          chapters.map((chapter, chapterIndex) => (
            <div
              key={chapterIndex}
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            >
              <div
                className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
                onClick={() => toggleChapterExpand(chapterIndex)}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3">
                    {chapterIndex + 1}
                  </div>
                  <div className="text-left">
                    <input
                      type="text"
                      placeholder="Chapter Title *"
                      value={chapter.title}
                      onChange={(e) =>
                        handleChapterChange(
                          chapterIndex,
                          "title",
                          e.target.value
                        )
                      }
                      onClick={(e) => e.stopPropagation()}
                      className={`p-2 border rounded-lg w-full ${
                        errors[`chapter_title_${chapterIndex}`]
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                    />
                    {errors[`chapter_title_${chapterIndex}`] && (
                      <p className="text-red-600 text-xs mt-1 flex items-center">
                        <FaExclamationCircle className="mr-1" size={10} />
                        {errors[`chapter_title_${chapterIndex}`]}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      {chapter.lessons?.length || 0} lessons
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeChapter(chapterIndex);
                    }}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <FaTrash />
                  </button>
                  {expandedChapters[chapterIndex] ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
              </div>

              {expandedChapters[chapterIndex] && (
                <div className="p-4">
                  <textarea
                    placeholder="Chapter description (optional)"
                    value={chapter.description}
                    onChange={(e) =>
                      handleChapterChange(
                        chapterIndex,
                        "description",
                        e.target.value
                      )
                    }
                    rows="2"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                  />

                  <div className="space-y-4">
                    {chapter.lessons?.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h6 className="font-medium">
                            Lesson {lessonIndex + 1}
                          </h6>
                          <button
                            type="button"
                            onClick={() =>
                              removeLessonFromChapter(chapterIndex, lessonIndex)
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Lesson Title *"
                            value={lesson.title}
                            onChange={(e) =>
                              handleLessonChange(
                                chapterIndex,
                                lessonIndex,
                                "title",
                                e.target.value
                              )
                            }
                            className={`w-full p-3 border rounded-lg ${
                              errors[
                                `lesson_title_${chapterIndex}_${lessonIndex}`
                              ]
                                ? "border-red-500 bg-red-50"
                                : "border-gray-300"
                            }`}
                          />
                          {errors[
                            `lesson_title_${chapterIndex}_${lessonIndex}`
                          ] && (
                            <p className="text-red-600 text-xs flex items-center">
                              <FaExclamationCircle className="mr-1" size={10} />
                              {
                                errors[
                                  `lesson_title_${chapterIndex}_${lessonIndex}`
                                ]
                              }
                            </p>
                          )}

                          <textarea
                            placeholder="Lesson description"
                            value={lesson.description}
                            onChange={(e) =>
                              handleLessonChange(
                                chapterIndex,
                                lessonIndex,
                                "description",
                                e.target.value
                              )
                            }
                            rows="2"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />

                          <input
                            type="text"
                            placeholder="Duration (e.g., 15 min)"
                            value={lesson.duration}
                            onChange={(e) =>
                              handleLessonChange(
                                chapterIndex,
                                lessonIndex,
                                "duration",
                                e.target.value
                              )
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleLessonTypeChange(
                                  chapterIndex,
                                  lessonIndex,
                                  "upload"
                                )
                              }
                              className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                                lesson.videoType === "upload"
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              Upload Video
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleLessonTypeChange(
                                  chapterIndex,
                                  lessonIndex,
                                  "youtube"
                                )
                              }
                              className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                                lesson.videoType === "youtube"
                                  ? "bg-red-500 text-white"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              YouTube Link
                            </button>
                          </div>

                          {lesson.videoType === "upload" ? (
                            <div>
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) =>
                                  handleLessonFileChange(
                                    chapterIndex,
                                    lessonIndex,
                                    e.target.files[0]
                                  )
                                }
                                className={`w-full p-3 border rounded-lg ${
                                  errors[
                                    `lesson_video_${chapterIndex}_${lessonIndex}`
                                  ]
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-300"
                                }`}
                              />
                              {lesson.videoUrl && !lesson.video && (
                                <p className="text-sm text-gray-500 mt-1">
                                  Existing video: {lesson.videoUrl}
                                </p>
                              )}
                              {errors[
                                `lesson_video_${chapterIndex}_${lessonIndex}`
                              ] && (
                                <p className="text-red-600 text-xs mt-1 flex items-center">
                                  <FaExclamationCircle
                                    className="mr-1"
                                    size={10}
                                  />
                                  {
                                    errors[
                                      `lesson_video_${chapterIndex}_${lessonIndex}`
                                    ]
                                  }
                                </p>
                              )}
                            </div>
                          ) : (
                            <div>
                              <input
                                type="url"
                                placeholder="YouTube URL *"
                                value={lesson.videoUrl}
                                onChange={(e) =>
                                  handleYouTubeUrlChange(
                                    chapterIndex,
                                    lessonIndex,
                                    e.target.value
                                  )
                                }
                                className={`w-full p-3 border rounded-lg ${
                                  errors[
                                    `lesson_video_${chapterIndex}_${lessonIndex}`
                                  ]
                                    ? "border-red-500 bg-red-50"
                                    : "border-gray-300"
                                }`}
                              />
                              {errors[
                                `lesson_video_${chapterIndex}_${lessonIndex}`
                              ] && (
                                <p className="text-red-600 text-xs mt-1 flex items-center">
                                  <FaExclamationCircle
                                    className="mr-1"
                                    size={10}
                                  />
                                  {
                                    errors[
                                      `lesson_video_${chapterIndex}_${lessonIndex}`
                                    ]
                                  }
                                </p>
                              )}
                            </div>
                          )}

                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <span className="text-sm text-gray-700">
                              Free Preview
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                toggleFreePreview(chapterIndex, lessonIndex)
                              }
                              className={`w-12 h-6 rounded-full transition-colors ${
                                lesson.isFreePreview
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                                  lesson.isFreePreview
                                    ? "translate-x-7"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addLessonToChapter(chapterIndex)}
                      className="w-full border-2 border-dashed border-purple-300 rounded-lg p-4 text-purple-600 hover:border-purple-400 hover:bg-purple-50 transition-colors flex items-center justify-center"
                    >
                      <FaPlus className="mr-2" />
                      Add Lesson to Chapter {chapterIndex + 1}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold text-orange-800 mb-2 flex items-center">
          <FaCheckCircle className="mr-2" />
          Review & Update
        </h3>
        <p className="text-orange-700 text-sm">
          Review your course details before submitting the update
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 text-lg mb-3">
              Course Information
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Title:</span>
                <span className="text-gray-800">{formData.title}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Class:</span>
                <span className="text-gray-800">
                  {classLevels.find((c) => c.value === formData.classLevel)
                    ?.label || formData.classLevel}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Subject:</span>
                <span className="text-gray-800">
                  {subjects[formData.classLevel]?.find(
                    (s) => s.value === formData.subject
                  )?.label || formData.subject}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Board:</span>
                <span className="text-gray-800">{formData.board}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Language:</span>
                <span className="text-gray-800">{formData.language}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 text-lg mb-3">
              Course Details
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Duration:</span>
                <span className="text-gray-800">{formData.duration}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Level:</span>
                <span className="text-gray-800">{formData.courseLevel}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Price:</span>
                <span className="text-gray-800">₹{formData.price}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">
                  Certification:
                </span>
                <span
                  className={`font-medium ${
                    formData.certificationAvailable
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {formData.certificationAvailable ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 text-lg mb-3">
            Course Structure
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium text-gray-600">
                Syllabus Sections:
              </span>
              <span className="text-gray-800">{syllabus.length}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium text-gray-600">Total Chapters:</span>
              <span className="text-gray-800">{chapters.length}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium text-gray-600">Total Lessons:</span>
              <span className="text-gray-800">
                {chapters.reduce(
                  (total, ch) => total + (ch.lessons?.length || 0),
                  0
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Course</h2>
            <p className="text-sm text-gray-600">Update your course details and content</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 transition-colors">
            <FaTimes size={24} />
          </button>
        </div>

        <div className="p-6">
          <CourseForm
            mode="edit"
            existingCourse={course}
            onSuccess={() => {
              toast.success("Course updated successfully!");
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateCourseModal;
