// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createCourse } from "../redux/courseSlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"

// const CourseForm = () => {
//     const dispatch = useDispatch();
//     const { loading } = useSelector((state) => state.courses);
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         category: "",
//         price: "",
//         duration: "",
//         prerequisites: "",
//         courseLevel: "",
//         certificationAvailable: false,
//         thumbnail: null,
//     });

//     const [lessons, setLessons] = useState([]); // Store lessons
//     const [syllabus, setSyllabus] = useState([]); // Store syllabus items

//     // ✅ Handle Text Inputs & Checkbox
//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === "checkbox" ? checked : value,
//         });
//     };

//     // ✅ Handle File Inputs (Thumbnail)
//     const handleFileChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.files[0] });
//     };

//     // ✅ Handle Syllabus Input Change
//     const handleSyllabusChange = (index, field, value) => {
//         const updatedSyllabus = syllabus.map((item, i) =>
//             i === index ? { ...item, [field]: value } : item
//         );
//         setSyllabus(updatedSyllabus);
//     };

//     // ✅ Add New Syllabus Item
//     const addSyllabusItem = () => {
//         setSyllabus([...syllabus, { title: "", description: "" }]);
//     };

//     // ✅ Handle Lesson Input Change
//     const handleLessonChange = (index, field, value) => {
//         const updatedLessons = lessons.map((lesson, i) =>
//             i === index ? { ...lesson, [field]: value } : lesson
//         );
//         setLessons(updatedLessons);
//     };

//     // ✅ Handle Lesson Video Upload
//     const handleLessonFileChange = (index, file) => {
//         const updatedLessons = lessons.map((lesson, i) =>
//             i === index ? { ...lesson, video: file } : lesson
//         );
//         setLessons(updatedLessons);
//     };

//     // ✅ Add New Lesson Dynamically
//     const addLesson = () => {
//         setLessons([
//             ...lessons,
//             {
//                 title: "",
//                 description: "",
//                 video: null,
//                 order: lessons.length + 1,
//             },
//         ]);
//     };

//     // ✅ Handle Form Submit
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // ✅ Validate syllabus before submission
//         if (syllabus.some(item => !item.title.trim() || !item.description.trim())) {
//             toast.warning("Each syllabus item must have a title and description.");
//             return;
//         }

//         const courseData = new FormData();

//         // ✅ Append all form fields except lessons
//         for (const key in formData) {
//             if (formData[key]) {
//                 if (key === "certificationAvailable") {
//                     courseData.append(key, formData[key] ? "true" : "false");
//                 } else {
//                     courseData.append(key, formData[key]);
//                 }
//             }
//         }

//         // ✅ Append Lesson Details
//         lessons.forEach((lesson, index) => {
//             courseData.append(`lessons[${index}][title]`, lesson.title);
//             courseData.append(`lessons[${index}][description]`, lesson.description);
//             courseData.append(`lessons[${index}][order]`, lesson.order);
//             if (lesson.video) {
//                 courseData.append(`lessonVideos`, lesson.video); // ✅ Keep same key for all videos
//             }
//         });

//         // ✅ Append Syllabus Details (with correct `description` key)
//         syllabus.forEach((item, index) => {
//             courseData.append(`syllabus[${index}][title]`, item.title);
//             courseData.append(`syllabus[${index}][description]`, item.description);
//         });

//         // ✅ Dispatch Course Creation
//         dispatch(createCourse(courseData))
//             .then(() => {
//                 toast.success("Course submitted successfully! 🚀\nYour course is now under review. Please wait for admin approval.");
//                 navigate("/profile");
//             })
//             .catch((err) => {
//                 toast.error(`❌ Error: ${err.message || "Failed to create course"}`);
//             });
//     };

//     return (
//         <div className="max-w-lg mx-auto p-6 my-5 bg-white shadow-lg rounded-lg">

//             <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a Course</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <input type="text" name="title" placeholder="Title" onChange={handleChange} className="w-full p-2 border rounded" required />
//                 <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border rounded" required />
//                 <input type="text" name="category" placeholder="Category" onChange={handleChange} className="w-full p-2 border rounded" required />
//                 <input type="number" name="price" placeholder="Price" onChange={handleChange} className="w-full p-2 border rounded" required />
//                 <input type="text" name="duration" placeholder="Duration" onChange={handleChange} className="w-full p-2 border rounded" required />
//                 <input type="text" name="prerequisites" placeholder="Prerequisites" onChange={handleChange} className="w-full p-2 border rounded" />
//                 <select
//                     className="w-full p-2 border rounded"
//                     name="courseLevel"
//                     required
//                     value={formData.courseLevel} // ✅ React-controlled state
//                     onChange={handleChange}
//                 >
//                     <option value="" disabled hidden>Select Course Level</option>
//                     <option value="Beginner">Beginner</option>
//                     <option value="Intermediate">Intermediate</option>
//                     <option value="Advance">Advance</option>
//                 </select>

//                 <label className="flex items-center space-x-2">
//                     <input type="checkbox" name="certificationAvailable" onChange={handleChange} />
//                     <span>Certification Available</span>
//                 </label>

//                 <label className="block">
//                     Thumbnail:
//                     <input type="file" name="thumbnail" accept="image/*" onChange={handleFileChange} required />
//                 </label>

//                 {/* ✅ Syllabus Section */}
//                 <h3 className="text-lg font-semibold">Course Syllabus</h3>
//                 {syllabus.map((item, index) => (
//                     <div key={index} className="p-4 border rounded mt-2">
//                         <input
//                             type="text"
//                             placeholder="Enter syllabus title (e.g., Introduction to JavaScript)"
//                             value={item.title}
//                             onChange={(e) => handleSyllabusChange(index, "title", e.target.value)}
//                             required
//                             className="w-full p-2 border rounded"
//                         />
//                         <textarea
//                             placeholder="Provide a brief description of this syllabus"
//                             value={item.description}
//                             onChange={(e) => handleSyllabusChange(index, "description", e.target.value)}
//                             required
//                             className="w-full p-2 border rounded mt-2"
//                         />
//                     </div>
//                 ))}
//                 <button
//                     type="button"
//                     onClick={addSyllabusItem}
//                     className="w-full p-2 bg-blue-500 text-white rounded mt-2"
//                 >
//                     + Add New Syllabus Section
//                 </button>

//                 {/* ✅ Lessons Section */}
//                 <h3 className="text-lg font-semibold mt-6">Course Lessons</h3>
//                 {lessons.map((lesson, index) => (
//                     <div key={index} className="p-4 border rounded mt-2">
//                         <input
//                             type="text"
//                             placeholder="Enter lesson title (e.g., Basics of HTML)"
//                             value={lesson.title}
//                             onChange={(e) => handleLessonChange(index, "title", e.target.value)}
//                             required
//                             className="w-full p-2 border rounded"
//                         />
//                         <textarea
//                             placeholder="Provide a detailed description of this lesson"
//                             value={lesson.description}
//                             onChange={(e) => handleLessonChange(index, "description", e.target.value)}
//                             className="w-full p-2 border rounded mt-2"
//                         />
//                         <input
//                             type="file"
//                             accept="video/*"
//                             onChange={(e) => handleLessonFileChange(index, e.target.files[0])}
//                             className="w-full p-2 mt-2"
//                         />
//                     </div>
//                 ))}
//                 <button
//                     type="button"
//                     onClick={addLesson}
//                     className="w-full p-2 bg-green-500 text-white rounded mt-2"
//                 >
//                     + Add New Lesson
//                 </button>

//                 <button type="submit" disabled={loading} className="w-full p-2 bg-blue-500 text-white rounded">
//                     {loading ? "Creating..." : "Create Course"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CourseForm;

// ------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../redux/courseSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaUpload,
  FaYoutube,
  FaLink,
  FaPlus,
  FaTrash,
  FaSpinner,
  FaBook,
  FaGraduationCap,
  FaRupeeSign,
  FaClock,
  FaListAlt,
  FaVideo,
  FaCheckCircle,
  FaArrowLeft,
  FaChalkboardTeacher,
  FaLanguage,
  FaCalculator,
  FaFlask,
  FaGlobe,
  FaHistory,
  FaChevronRight,
  FaChevronLeft,
  FaChevronDown,
  FaChevronUp,
  FaExclamationCircle,
  FaFilePdf,
  FaLayerGroup,
} from "react-icons/fa";

const CourseForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.courses);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    classLevel: "",
    subject: "",
    board: "JKBOSE",
    price: "",
    duration: "",
    prerequisites: "",
    courseLevel: "",
    certificationAvailable: false,
    thumbnail: null,
    language: "English",
    targetAudience: "",
  });

  const [chapters, setChapters] = useState([]);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [syllabus, setSyllabus] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Enhanced educational structure
  const classLevels = [
    { value: "class-11", label: "Class 11th", icon: <FaGraduationCap /> },
    { value: "class-12", label: "Class 12th", icon: <FaGraduationCap /> },
    { value: "ug", label: "Undergraduate", icon: <FaGraduationCap /> },
    { value: "pg", label: "Postgraduate", icon: <FaGraduationCap /> },
    { value: "competitive", label: "Competitive Exams", icon: <FaBook /> },
    {
      value: "skill-dev",
      label: "Skill Development",
      icon: <FaChalkboardTeacher />,
    },
  ];

  const subjects = {
    "class-11": [
      { value: "physics", label: "Physics", icon: <FaCalculator /> },
      { value: "chemistry", label: "Chemistry", icon: <FaFlask /> },
      { value: "mathematics", label: "Mathematics", icon: <FaCalculator /> },
      { value: "biology", label: "Biology", icon: <FaFlask /> },
      { value: "english", label: "English", icon: <FaLanguage /> },
      { value: "hindi", label: "Hindi", icon: <FaLanguage /> },
      { value: "urdu", label: "Urdu", icon: <FaLanguage /> },
      { value: "history", label: "History", icon: <FaHistory /> },
      { value: "geography", label: "Geography", icon: <FaGlobe /> },
      { value: "economics", label: "Economics", icon: <FaCalculator /> },
      { value: "accountancy", label: "Accountancy", icon: <FaCalculator /> },
      {
        value: "business-studies",
        label: "Business Studies",
        icon: <FaBook />,
      },
    ],
    "class-12": [
      { value: "physics", label: "Physics", icon: <FaCalculator /> },
      { value: "chemistry", label: "Chemistry", icon: <FaFlask /> },
      { value: "mathematics", label: "Mathematics", icon: <FaCalculator /> },
      { value: "biology", label: "Biology", icon: <FaFlask /> },
      { value: "english", label: "English", icon: <FaLanguage /> },
      { value: "hindi", label: "Hindi", icon: <FaLanguage /> },
      { value: "urdu", label: "Urdu", icon: <FaLanguage /> },
      { value: "history", label: "History", icon: <FaHistory /> },
      { value: "geography", label: "Geography", icon: <FaGlobe /> },
      {
        value: "political-science",
        label: "Political Science",
        icon: <FaBook />,
      },
      { value: "economics", label: "Economics", icon: <FaCalculator /> },
      { value: "accountancy", label: "Accountancy", icon: <FaCalculator /> },
      {
        value: "business-studies",
        label: "Business Studies",
        icon: <FaBook />,
      },
    ],
    ug: [
      { value: "bsc-physics", label: "B.Sc Physics", icon: <FaCalculator /> },
      { value: "bsc-chemistry", label: "B.Sc Chemistry", icon: <FaFlask /> },
      {
        value: "bsc-mathematics",
        label: "B.Sc Mathematics",
        icon: <FaCalculator />,
      },
      { value: "bsc-biology", label: "B.Sc Biology", icon: <FaFlask /> },
      { value: "ba-english", label: "B.A English", icon: <FaLanguage /> },
      { value: "ba-history", label: "B.A History", icon: <FaHistory /> },
      { value: "bcom", label: "B.Com", icon: <FaCalculator /> },
      { value: "bca", label: "BCA", icon: <FaCalculator /> },
    ],
    pg: [
      { value: "msc-physics", label: "M.Sc Physics", icon: <FaCalculator /> },
      { value: "msc-chemistry", label: "M.Sc Chemistry", icon: <FaFlask /> },
      {
        value: "msc-mathematics",
        label: "M.Sc Mathematics",
        icon: <FaCalculator />,
      },
      { value: "ma-english", label: "M.A English", icon: <FaLanguage /> },
      { value: "ma-history", label: "M.A History", icon: <FaHistory /> },
      { value: "mcom", label: "M.Com", icon: <FaCalculator /> },
    ],
    competitive: [
      { value: "jkbose", label: "JKBOSE Exams", icon: <FaBook /> },
      { value: "jkssb", label: "JKSSB Exams", icon: <FaBook /> },
      { value: "jkpsc", label: "JKPSC Exams", icon: <FaBook /> },
      { value: "neet", label: "NEET", icon: <FaFlask /> },
      { value: "jee", label: "JEE", icon: <FaCalculator /> },
      { value: "cuet", label: "CUET", icon: <FaBook /> },
    ],
    "skill-dev": [
      { value: "kashmiri-arts", label: "Kashmiri Arts", icon: <FaGlobe /> },
      {
        value: "kashmiri-language",
        label: "Kashmiri Language",
        icon: <FaLanguage />,
      },
      { value: "urdu-language", label: "Urdu Language", icon: <FaLanguage /> },
      {
        value: "computer-basics",
        label: "Computer Basics",
        icon: <FaCalculator />,
      },
      {
        value: "digital-literacy",
        label: "Digital Literacy",
        icon: <FaCalculator />,
      },
    ],
  };

  const boards = [
    { value: "JKBOSE", label: "JKBOSE" },
    { value: "CBSE", label: "CBSE" },
    { value: "ICSE", label: "ICSE" },
    { value: "State Board", label: "State Board" },
  ];

  const languages = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Urdu", label: "Urdu" },
    { value: "Kashmiri", label: "Kashmiri" },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Validation functions for each step
  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.classLevel.trim()) {
      newErrors.classLevel = "Class level is required";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.title.trim()) {
      newErrors.title = "Course title is required";
    } else if (formData.title.length < 10) {
      newErrors.title = "Title should be at least 10 characters";
    }
    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (parseFloat(formData.price) < 0) {
      newErrors.price = "Price cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required";
    }
    if (!formData.courseLevel.trim()) {
      newErrors.courseLevel = "Course level is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 50) {
      newErrors.description = "Description should be at least 50 characters";
    }
    if (!formData.thumbnail) {
      newErrors.thumbnail = "Thumbnail is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (syllabus.length === 0) {
      newErrors.syllabus = "At least one syllabus section is required";
    } else {
      syllabus.forEach((item, index) => {
        if (!item.title.trim()) {
          newErrors[`syllabus_title_${index}`] = `Section ${index + 1} title is required`;
        }
        if (!item.description.trim()) {
          newErrors[`syllabus_description_${index}`] = `Section ${index + 1} description is required`;
        }
      });
    }

    if (chapters.length === 0) {
      newErrors.chapters = "At least one chapter is required";
    } else {
      chapters.forEach((chapter, chapterIndex) => {
        if (!chapter.title.trim()) {
          newErrors[`chapter_title_${chapterIndex}`] = `Chapter ${chapterIndex + 1} title is required`;
        }
        if (!chapter.lessons || chapter.lessons.length === 0) {
          newErrors[`chapter_lessons_${chapterIndex}`] = `Chapter ${chapterIndex + 1} must have at least one lesson`;
        } else {
          chapter.lessons.forEach((lesson, lessonIndex) => {
            if (!lesson.title.trim()) {
              newErrors[`lesson_title_${chapterIndex}_${lessonIndex}`] = `Lesson ${lessonIndex + 1} in Chapter ${chapterIndex + 1} title is required`;
            }
            if (lesson.videoType === "upload" && !lesson.video) {
              newErrors[`lesson_video_${chapterIndex}_${lessonIndex}`] = `Lesson ${lessonIndex + 1} in Chapter ${chapterIndex + 1} video is required`;
            }
            if (lesson.videoType === "youtube" && !lesson.videoUrl.trim()) {
              newErrors[`lesson_video_${chapterIndex}_${lessonIndex}`] = `Lesson ${lessonIndex + 1} in Chapter ${chapterIndex + 1} YouTube URL is required`;
            }
          });
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Auto-generate title when class and subject are selected
    if (
      (name === "classLevel" || name === "subject") &&
      formData.classLevel &&
      value
    ) {
      const classLabel = classLevels.find(
        (c) => c.value === (name === "classLevel" ? value : formData.classLevel)
      )?.label;
      const subjectLabel = subjects[formData.classLevel]?.find(
        (s) => s.value === (name === "subject" ? value : formData.subject)
      )?.label;

      if (classLabel && subjectLabel) {
        setFormData((prev) => ({
          ...prev,
          title: `${subjectLabel} - ${classLabel}`,
        }));
      }
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
      toast.info("Thumbnail selected successfully!");
      if (errors.thumbnail) {
        setErrors((prev) => ({ ...prev, thumbnail: "" }));
      }
    }
  };

  const handleSyllabusChange = (index, field, value) => {
    const updatedSyllabus = syllabus.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setSyllabus(updatedSyllabus);

    // Clear syllabus errors when user types
    if (errors[`syllabus_${field}_${index}`]) {
      setErrors((prev) => ({ ...prev, [`syllabus_${field}_${index}`]: "" }));
    }
  };

  const addSyllabusItem = () => {
    setSyllabus([...syllabus, { title: "", description: "" }]);
    toast.info("New syllabus section added!");
  };

  const removeSyllabusItem = (index) => {
    const updatedSyllabus = syllabus.filter((_, i) => i !== index);
    setSyllabus(updatedSyllabus);
    toast.info("Syllabus section removed!");
  };

  // ===== CHAPTER HANDLERS =====
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
    const chapterTitle = chapters[chapterIndex].title || `Chapter ${chapterIndex + 1}`;
    const updatedChapters = chapters.filter((_, i) => i !== chapterIndex);
    setChapters(updatedChapters);
    toast.warning(`Removed: ${chapterTitle}`);
  };

  const handleChapterChange = (chapterIndex, field, value) => {
    const updatedChapters = chapters.map((chapter, i) =>
      i === chapterIndex ? { ...chapter, [field]: value } : chapter
    );
    setChapters(updatedChapters);
    if (errors[`chapter_${field}_${chapterIndex}`]) {
      setErrors((prev) => ({ ...prev, [`chapter_${field}_${chapterIndex}`]: "" }));
    }
  };

  const toggleChapterExpand = (chapterIndex) => {
    setExpandedChapters({
      ...expandedChapters,
      [chapterIndex]: !expandedChapters[chapterIndex],
    });
  };

  // ===== LESSON HANDLERS (within chapters) =====
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
    const lessonTitle = chapters[chapterIndex].lessons[lessonIndex].title || `Lesson ${lessonIndex + 1}`;
    const updatedChapters = chapters.map((chapter, i) =>
      i === chapterIndex
        ? { ...chapter, lessons: chapter.lessons.filter((_, j) => j !== lessonIndex) }
        : chapter
    );
    setChapters(updatedChapters);
    toast.warning(`Removed: ${lessonTitle}`);
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
    if (errors[`lesson_${field}_${chapterIndex}_${lessonIndex}`]) {
      setErrors((prev) => ({ ...prev, [`lesson_${field}_${chapterIndex}_${lessonIndex}`]: "" }));
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
    toast.info(`Video type changed to ${type === "upload" ? "file upload" : "YouTube link"}`);
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
      if (errors[`lesson_video_${chapterIndex}_${lessonIndex}`]) {
        setErrors((prev) => ({ ...prev, [`lesson_video_${chapterIndex}_${lessonIndex}`]: "" }));
      }
    }
  };

  const handleLessonNotesChange = (chapterIndex, lessonIndex, file) => {
    if (file) {
      const updatedChapters = chapters.map((chapter, i) =>
        i === chapterIndex
          ? {
              ...chapter,
              lessons: chapter.lessons.map((lesson, j) =>
                j === lessonIndex ? { ...lesson, notes: file } : lesson
              ),
            }
          : chapter
      );
      setChapters(updatedChapters);
      toast.success(`Notes "${file.name}" uploaded`);
    }
  };

  const removeLessonNotes = (chapterIndex, lessonIndex) => {
    const updatedChapters = chapters.map((chapter, i) =>
      i === chapterIndex
        ? {
            ...chapter,
            lessons: chapter.lessons.map((lesson, j) =>
              j === lessonIndex ? { ...lesson, notes: null } : lesson
            ),
          }
        : chapter
    );
    setChapters(updatedChapters);
    toast.info("Notes removed");
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
    if (errors[`lesson_video_${chapterIndex}_${lessonIndex}`]) {
      setErrors((prev) => ({ ...prev, [`lesson_video_${chapterIndex}_${lessonIndex}`]: "" }));
    }
  };

  const toggleFreePreview = (chapterIndex, lessonIndex) => {
    const updatedChapters = chapters.map((chapter, i) =>
      i === chapterIndex
        ? {
            ...chapter,
            lessons: chapter.lessons.map((lesson, j) =>
              j === lessonIndex ? { ...lesson, isFreePreview: !lesson.isFreePreview } : lesson
            ),
          }
        : chapter
    );
    setChapters(updatedChapters);
    const status = updatedChapters[chapterIndex].lessons[lessonIndex].isFreePreview ? "enabled" : "disabled";
    toast.info(`Free preview ${status}`);
  };

  // Helper to get total lessons count
  const getTotalLessons = () => {
    return chapters.reduce((total, chapter) => total + (chapter.lessons?.length || 0), 0);
  };

  const getTotalLessonsWithNotes = () => {
    return chapters.reduce((total, chapter) => 
      total + (chapter.lessons?.filter(l => l.notes)?.length || 0), 0
    );
  };

  const getTotalFreePreviewLessons = () => {
    return chapters.reduce((total, chapter) => 
      total + (chapter.lessons?.filter(l => l.isFreePreview)?.length || 0), 0
    );
  };

  const simulateUploadProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      toast.info("Course upload in progress, please wait...");
      return;
    }

    if (!validateStep3()) {
      toast.error("Please fix the errors in course content");
      return;
    }

    setIsSubmitting(true);
    simulateUploadProgress();

    const courseData = new FormData();

    // Append all form fields
    for (const key in formData) {
      if (
        formData[key] !== null &&
        formData[key] !== undefined &&
        formData[key] !== ""
      ) {
        if (key === "certificationAvailable") {
          courseData.append(key, formData[key] ? "true" : "false");
        } else {
          courseData.append(key, formData[key]);
        }
      }
    }

    // Generate category from class and subject
    const classLabel = classLevels.find(
      (c) => c.value === formData.classLevel
    )?.label;
    const subjectLabel = subjects[formData.classLevel]?.find(
      (s) => s.value === formData.subject
    )?.label;
    if (classLabel && subjectLabel) {
      courseData.append("category", `${classLabel} - ${subjectLabel}`);
    } else {
      // Fallback category if class/subject not found
      courseData.append("category", formData.subject || formData.classLevel || "General");
    }

    // Append Chapters and Lessons (Udemy-like structure)
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
        hasNotes: lesson.notes ? "true" : "false",
      })),
    }));
    courseData.append("chapters", JSON.stringify(chaptersForBackend));

    // Append video and PDF files in order
    chapters.forEach((chapter) => {
      chapter.lessons.forEach((lesson) => {
        if (lesson.videoType === "upload" && lesson.video) {
          courseData.append("lessonVideos", lesson.video);
        }
        if (lesson.notes) {
          courseData.append("lessonNotes", lesson.notes);
        }
      });
    });

    // Append Syllabus Details as JSON
    courseData.append("syllabus", JSON.stringify(syllabus));

    try {
      await dispatch(createCourse(courseData)).unwrap();
      toast.success(
        <div>
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            <span className="font-semibold">
              Course Created Successfully! 🎉
            </span>
          </div>
          <p className="text-sm mt-1">
            Your course is now under review. You'll be notified once approved.
          </p>
        </div>,
        { autoClose: 5000 }
      );
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      console.error("Course creation error:", err);
      toast.error(
        <div>
          <div className="font-semibold">Failed to Create Course</div>
          <p className="text-sm mt-1">
            {err.message || "Please try again later"}
          </p>
        </div>,
        { autoClose: 5000 }
      );
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
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

  // Render steps with improved responsive design
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
          <FaBook className="mr-2" />
          Course Basics
        </h3>
        <p className="text-blue-700 text-sm">
          Start by providing the basic information about your course
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {/* Class Level */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <FaGraduationCap className="mr-2 text-blue-500" />
            Class Level *
          </label>
          <div className="relative">
            <select
              name="classLevel"
              value={formData.classLevel}
              onChange={handleChange}
              onBlur={() => handleBlur("classLevel")}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-10 ${
                errors.classLevel
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300"
              }`}
              required
            >
              <option value="">Select Class Level</option>
              {classLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.classLevel && (
            <p className="text-red-600 text-sm flex items-center mt-1">
              <FaExclamationCircle className="mr-1" />
              {errors.classLevel}
            </p>
          )}
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <FaBook className="mr-2 text-green-500" />
            Subject *
          </label>
          <div className="relative">
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onBlur={() => handleBlur("subject")}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-10 ${
                errors.subject ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              required
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
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.subject && (
            <p className="text-red-600 text-sm flex items-center mt-1">
              <FaExclamationCircle className="mr-1" />
              {errors.subject}
            </p>
          )}
        </div>

        {/* Board */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Education Board
          </label>
          <div className="relative">
            <select
              name="board"
              value={formData.board}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-10"
            >
              {boards.map((board) => (
                <option key={board.value} value={board.value}>
                  {board.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Course Language
          </label>
          <div className="relative">
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-10"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Course Title */}
        <div className="space-y-2 xl:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Course Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={() => handleBlur("title")}
            placeholder="e.g., Mathematics for Class 11th - Comprehensive Course"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.title ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
            required
          />
          {errors.title && (
            <p className="text-red-600 text-sm flex items-center mt-1">
              <FaExclamationCircle className="mr-1" />
              {errors.title}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <FaRupeeSign className="mr-1 text-green-500" />
            Price (₹) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            onBlur={() => handleBlur("price")}
            placeholder="Enter course price"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.price ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
            required
            min="0"
          />
          {errors.price && (
            <p className="text-red-600 text-sm flex items-center mt-1">
              <FaExclamationCircle className="mr-1" />
              {errors.price}
            </p>
          )}
        </div>

        {/* Target Audience */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Target Audience
          </label>
          <input
            type="text"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            placeholder="e.g., Class 11th Science students, NEET aspirants"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Next: Course Details
          <FaChevronRight className="ml-2" />
        </button>
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
        <p className="text-green-700 text-sm">
          Provide detailed information about your course structure
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Duration */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <FaClock className="mr-1 text-purple-500" />
            Duration *
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            onBlur={() => handleBlur("duration")}
            placeholder="e.g., 6 weeks, 30 hours"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.duration ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
            required
          />
          {errors.duration && (
            <p className="text-red-600 text-sm flex items-center mt-1">
              <FaExclamationCircle className="mr-1" />
              {errors.duration}
            </p>
          )}
        </div>

        {/* Course Level */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <FaGraduationCap className="mr-1 text-orange-500" />
            Course Level *
          </label>
          <div className="relative">
            <select
              name="courseLevel"
              value={formData.courseLevel}
              onChange={handleChange}
              onBlur={() => handleBlur("courseLevel")}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-10 ${
                errors.courseLevel
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300"
              }`}
              required
            >
              <option value="">Select Course Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.courseLevel && (
            <p className="text-red-600 text-sm flex items-center mt-1">
              <FaExclamationCircle className="mr-1" />
              {errors.courseLevel}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={() => handleBlur("description")}
          placeholder="Describe your course in detail. What will students learn? Topics covered? Teaching methodology..."
          rows="6"
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.description ? "border-red-300 bg-red-50" : "border-gray-300"
          }`}
          required
        />
        {errors.description && (
          <p className="text-red-600 text-sm flex items-center mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.description}
          </p>
        )}
        <p className="text-gray-500 text-sm mt-1">
          {formData.description.length}/50 characters minimum
        </p>
      </div>

      {/* Prerequisites */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Prerequisites
        </label>
        <input
          type="text"
          name="prerequisites"
          value={formData.prerequisites}
          onChange={handleChange}
          placeholder="e.g., Basic knowledge of algebra, Class 10th completed"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Thumbnail */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Thumbnail *
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
            errors.thumbnail
              ? "border-red-300 bg-red-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="thumbnail"
            required
          />
          <label htmlFor="thumbnail" className="cursor-pointer block">
            <FaUpload className="mx-auto text-2xl text-gray-400 mb-2" />
            <span className="text-blue-600 font-medium">
              Click to upload thumbnail
            </span>
            <p className="text-sm text-gray-500 mt-1">
              PNG, JPG, JPEG up to 5MB
            </p>
            {formData.thumbnail && (
              <p className="text-green-600 text-sm mt-2">
                ✓ {formData.thumbnail.name}
              </p>
            )}
          </label>
        </div>
        {errors.thumbnail && (
          <p className="text-red-600 text-sm flex items-center mt-1">
            <FaExclamationCircle className="mr-1" />
            {errors.thumbnail}
          </p>
        )}
      </div>

      {/* Certification */}
      <div>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="certificationAvailable"
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Certification Available upon completion
          </span>
        </label>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
        >
          <FaChevronLeft className="mr-2" />
          Previous
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Next: Course Content
          <FaChevronRight className="ml-2" />
        </button>
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
        <p className="text-purple-700 text-sm">
          Add syllabus sections and lessons to structure your course content
        </p>
      </div>

      {/* Syllabus Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h4 className="text-lg font-bold text-gray-800 flex items-center">
            <FaListAlt className="mr-2 text-green-500" />
            Course Syllabus
          </h4>
          <button
            type="button"
            onClick={addSyllabusItem}
            className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors w-full sm:w-auto font-medium"
          >
            <FaPlus className="mr-2" />
            Add Section
          </button>
        </div>

        {errors.syllabus && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600 text-sm flex items-center">
              <FaExclamationCircle className="mr-2" />
              {errors.syllabus}
            </p>
          </div>
        )}

        {syllabus.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <FaListAlt className="mx-auto text-4xl text-gray-400 mb-3" />
            <p className="text-gray-600">No syllabus sections added yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Add sections to organize your course content
            </p>
          </div>
        ) : (
          syllabus.map((item, index) => (
            <div
              key={index}
              className="p-4 md:p-6 border border-gray-200 rounded-lg mb-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h5 className="font-semibold text-gray-800">
                  Section {index + 1}
                </h5>
                <button
                  type="button"
                  onClick={() => removeSyllabusItem(index)}
                  className="text-red-500 hover:text-red-700 p-1 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Section Title (e.g., Introduction to Algebra)"
                    value={item.title}
                    onChange={(e) =>
                      handleSyllabusChange(index, "title", e.target.value)
                    }
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors[`syllabus_title_${index}`]
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    required
                  />
                  {errors[`syllabus_title_${index}`] && (
                    <p className="text-red-600 text-sm flex items-center mt-1">
                      <FaExclamationCircle className="mr-1" />
                      {errors[`syllabus_title_${index}`]}
                    </p>
                  )}
                </div>
                <div>
                  <textarea
                    placeholder="Detailed description of what students will learn in this section..."
                    value={item.description}
                    onChange={(e) =>
                      handleSyllabusChange(index, "description", e.target.value)
                    }
                    required
                    rows="3"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors[`syllabus_description_${index}`]
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                  />
                  {errors[`syllabus_description_${index}`] && (
                    <p className="text-red-600 text-sm flex items-center mt-1">
                      <FaExclamationCircle className="mr-1" />
                      {errors[`syllabus_description_${index}`]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chapters Section (Udemy-like structure) */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h4 className="text-lg font-bold text-gray-800 flex items-center">
            <FaLayerGroup className="mr-2 text-purple-500" />
            Course Chapters
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({chapters.length} chapters, {getTotalLessons()} lessons)
            </span>
          </h4>
          <button
            type="button"
            onClick={addChapter}
            className="flex items-center justify-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors w-full sm:w-auto font-medium"
          >
            <FaPlus className="mr-2" />
            Add Chapter
          </button>
        </div>

        {errors.chapters && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600 text-sm flex items-center">
              <FaExclamationCircle className="mr-2" />
              {errors.chapters}
            </p>
          </div>
        )}

        {chapters.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <FaLayerGroup className="mx-auto text-4xl text-gray-400 mb-3" />
            <p className="text-gray-600">No chapters added yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Add chapters to organize your course like Udemy
            </p>
          </div>
        ) : (
          chapters.map((chapter, chapterIndex) => (
            <div
              key={chapterIndex}
              className="border border-gray-200 rounded-lg mb-4 bg-white shadow-sm overflow-hidden"
            >
              {/* Chapter Header (Collapsible) */}
              <div
                className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 cursor-pointer"
                onClick={() => toggleChapterExpand(chapterIndex)}
              >
                <div className="flex items-center flex-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-500 text-white rounded-full mr-3 text-sm font-bold">
                    {chapterIndex + 1}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={`Chapter ${chapterIndex + 1} Title (e.g., Introduction)`}
                      value={chapter.title}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleChapterChange(chapterIndex, "title", e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white ${
                        errors[`chapter_title_${chapterIndex}`]
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                    />
                    {errors[`chapter_title_${chapterIndex}`] && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors[`chapter_title_${chapterIndex}`]}
                      </p>
                    )}
                  </div>
                  <span className="ml-3 text-sm text-gray-500">
                    {chapter.lessons?.length || 0} lessons
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeChapter(chapterIndex);
                    }}
                    className="text-red-500 hover:text-red-700 p-2 transition-colors"
                  >
                    <FaTrash />
                  </button>
                  {expandedChapters[chapterIndex] ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </div>
              </div>

              {/* Chapter Content (Lessons) */}
              {expandedChapters[chapterIndex] && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  {/* Chapter Description */}
                  <div className="mb-4">
                    <textarea
                      placeholder="Chapter description (optional)..."
                      value={chapter.description}
                      onChange={(e) =>
                        handleChapterChange(chapterIndex, "description", e.target.value)
                      }
                      rows="2"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  {errors[`chapter_lessons_${chapterIndex}`] && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      <p className="text-red-600 text-sm flex items-center">
                        <FaExclamationCircle className="mr-2" />
                        {errors[`chapter_lessons_${chapterIndex}`]}
                      </p>
                    </div>
                  )}

                  {/* Lessons List */}
                  {chapter.lessons?.length === 0 ? (
                    <div className="text-center py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 mb-4">
                      <FaVideo className="mx-auto text-3xl text-gray-400 mb-2" />
                      <p className="text-gray-500 text-sm">No lessons in this chapter</p>
                    </div>
                  ) : (
                    chapter.lessons?.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="p-4 bg-white border border-gray-200 rounded-lg mb-3 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <FaVideo className="text-purple-400 mr-2" />
                            <span className="font-medium text-gray-700">
                              Lesson {lessonIndex + 1}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeLessonFromChapter(chapterIndex, lessonIndex)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Lesson Title"
                            value={lesson.title}
                            onChange={(e) =>
                              handleLessonChange(chapterIndex, lessonIndex, "title", e.target.value)
                            }
                            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                              errors[`lesson_title_${chapterIndex}_${lessonIndex}`]
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                            }`}
                          />
                          {errors[`lesson_title_${chapterIndex}_${lessonIndex}`] && (
                            <p className="text-red-600 text-xs">
                              {errors[`lesson_title_${chapterIndex}_${lessonIndex}`]}
                            </p>
                          )}

                          <textarea
                            placeholder="Lesson description..."
                            value={lesson.description}
                            onChange={(e) =>
                              handleLessonChange(chapterIndex, lessonIndex, "description", e.target.value)
                            }
                            rows="2"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="Duration (e.g., 15 min)"
                              value={lesson.duration}
                              onChange={(e) =>
                                handleLessonChange(chapterIndex, lessonIndex, "duration", e.target.value)
                              }
                              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          {/* Video Type Selection */}
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleLessonTypeChange(chapterIndex, lessonIndex, "upload")}
                              className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg border text-sm ${
                                lesson.videoType === "upload"
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "bg-white text-gray-700 border-gray-300"
                              }`}
                            >
                              <FaUpload className="mr-1" size={12} />
                              Upload
                            </button>
                            <button
                              type="button"
                              onClick={() => handleLessonTypeChange(chapterIndex, lessonIndex, "youtube")}
                              className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg border text-sm ${
                                lesson.videoType === "youtube"
                                  ? "bg-red-500 text-white border-red-500"
                                  : "bg-white text-gray-700 border-gray-300"
                              }`}
                            >
                              <FaYoutube className="mr-1" size={12} />
                              YouTube
                            </button>
                          </div>

                          {/* Video Input */}
                          {lesson.videoType === "upload" ? (
                            <div className={`border-2 border-dashed rounded-lg p-3 text-center ${
                              errors[`lesson_video_${chapterIndex}_${lessonIndex}`]
                                ? "border-red-300 bg-red-50"
                                : lesson.video ? "border-green-300 bg-green-50" : "border-gray-300"
                            }`}>
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) =>
                                  handleLessonFileChange(chapterIndex, lessonIndex, e.target.files[0])
                                }
                                className="hidden"
                                id={`video-${chapterIndex}-${lessonIndex}`}
                              />
                              <label
                                htmlFor={`video-${chapterIndex}-${lessonIndex}`}
                                className="cursor-pointer"
                              >
                                {lesson.video ? (
                                  <p className="text-green-600 text-sm">✓ {lesson.video.name}</p>
                                ) : (
                                  <>
                                    <FaVideo className="mx-auto text-gray-400 mb-1" />
                                    <span className="text-blue-600 text-sm">Click to upload video</span>
                                  </>
                                )}
                              </label>
                            </div>
                          ) : (
                            <input
                              type="url"
                              placeholder="YouTube URL"
                              value={lesson.videoUrl}
                              onChange={(e) =>
                                handleYouTubeUrlChange(chapterIndex, lessonIndex, e.target.value)
                              }
                              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                errors[`lesson_video_${chapterIndex}_${lessonIndex}`]
                                  ? "border-red-300 bg-red-50"
                                  : "border-gray-300"
                              }`}
                            />
                          )}
                          {errors[`lesson_video_${chapterIndex}_${lessonIndex}`] && (
                            <p className="text-red-600 text-xs">
                              {errors[`lesson_video_${chapterIndex}_${lessonIndex}`]}
                            </p>
                          )}

                          {/* PDF Notes Upload */}
                          <div className={`border-2 border-dashed rounded-lg p-3 ${
                            lesson.notes ? "border-green-300 bg-green-50" : "border-gray-300"
                          }`}>
                            <input
                              type="file"
                              accept=".pdf"
                              onChange={(e) =>
                                handleLessonNotesChange(chapterIndex, lessonIndex, e.target.files[0])
                              }
                              className="hidden"
                              id={`notes-${chapterIndex}-${lessonIndex}`}
                            />
                            {lesson.notes ? (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <FaFilePdf className="text-red-500 mr-2" />
                                  <span className="text-green-700 text-sm">{lesson.notes.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeLessonNotes(chapterIndex, lessonIndex)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <FaTrash size={12} />
                                </button>
                              </div>
                            ) : (
                              <label
                                htmlFor={`notes-${chapterIndex}-${lessonIndex}`}
                                className="cursor-pointer flex items-center justify-center"
                              >
                                <FaFilePdf className="text-gray-400 mr-2" />
                                <span className="text-red-600 text-sm">Upload PDF Notes</span>
                              </label>
                            )}
                          </div>

                          {/* Free Preview Toggle */}
                          <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                            <span className="text-sm text-gray-700">Free Preview</span>
                            <button
                              type="button"
                              onClick={() => toggleFreePreview(chapterIndex, lessonIndex)}
                              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                lesson.isFreePreview ? "bg-green-500" : "bg-gray-300"
                              }`}
                            >
                              <span
                                className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                                  lesson.isFreePreview ? "translate-x-5" : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  {/* Add Lesson Button */}
                  <button
                    type="button"
                    onClick={() => addLessonToChapter(chapterIndex)}
                    className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
                  >
                    <FaPlus className="mr-2" />
                    Add Lesson to Chapter {chapterIndex + 1}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
        >
          <FaChevronLeft className="mr-2" />
          Previous
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Next: Review & Submit
          <FaChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold text-orange-800 mb-2 flex items-center">
          <FaCheckCircle className="mr-2" />
          Review & Submit
        </h3>
        <p className="text-orange-700 text-sm">
          Review your course details before submission
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  {
                    classLevels.find((c) => c.value === formData.classLevel)
                      ?.label
                  }
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Subject:</span>
                <span className="text-gray-800">
                  {
                    subjects[formData.classLevel]?.find(
                      (s) => s.value === formData.subject
                    )?.label
                  }
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
              <span className="text-gray-800">{getTotalLessons()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium text-gray-600">
                Free Preview Lessons:
              </span>
              <span className="text-gray-800">
                {getTotalFreePreviewLessons()}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium text-gray-600">
                Lessons with Notes:
              </span>
              <span className="text-gray-800">
                {getTotalLessonsWithNotes()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
        >
          <FaChevronLeft className="mr-2" />
          Previous
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin mr-3" />
              <span>Creating Course... ({uploadProgress}%)</span>
            </>
          ) : (
            <>
              <FaCheckCircle className="mr-3" />
              <span>Create Course</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            <FaArrowLeft className="mr-2" />
            Back to Profile
          </button>
          <div className="text-center flex-1 mx-2 sm:mx-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
              Create New Course
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm">
              Share your knowledge with students across Jammu & Kashmir
            </p>
          </div>
          <div className="w-16 sm:w-20 md:w-24"></div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    currentStep >= step
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-8 sm:w-16 md:w-24 h-1 mx-2 transition-colors ${
                      currentStep > step ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs sm:text-sm">
            <span
              className={
                currentStep >= 1 ? "text-blue-600 font-medium" : "text-gray-500"
              }
            >
              Basics
            </span>
            <span
              className={
                currentStep >= 2 ? "text-blue-600 font-medium" : "text-gray-500"
              }
            >
              Details
            </span>
            <span
              className={
                currentStep >= 3 ? "text-blue-600 font-medium" : "text-gray-500"
              }
            >
              Content
            </span>
            <span
              className={
                currentStep >= 4 ? "text-blue-600 font-medium" : "text-gray-500"
              }
            >
              Review
            </span>
          </div>
        </div>

        {/* Upload Progress */}
        {isSubmitting && (
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-base sm:text-lg font-semibold text-gray-800">
                Uploading Course...
              </span>
              <span className="text-sm text-gray-600">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
              <div
                className="bg-green-500 h-2 sm:h-3 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-center mt-3 sm:mt-4 text-blue-600 text-sm">
              <FaSpinner className="animate-spin mr-2" />
              <span>Processing your course content...</span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
