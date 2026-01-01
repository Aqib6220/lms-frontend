import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../redux/courseSlice";
import {
  FaArrowRight,
  FaUsers,
  FaCertificate,
  FaClock,
  FaChalkboardTeacher,
  FaMobileAlt,
  FaBook,
  FaGraduationCap,
  FaUniversity,
  FaAward,
} from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import { MdSupportAgent, MdSchool } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import Testimonial from "../components/Testimonial";
// import MousePointer from "../components/MousePointer";
import { motion } from "framer-motion";
import ScrollToTopButton from "../components/ScrollToTopButton";

// Import slider images
import slide1 from "../assets/slide1.avif";
import slide2 from "../assets/slide2.avif";
import slide3 from "../assets/slide3.avif";

const Home = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  useEffect(() => {
    if (courses.length > 0) {
      setFeaturedCourses(courses.slice(0, 6));
    }
  }, [courses]);

  // Motivational quotes slider with J&K focus
  const motivationalQuotes = [
    {
      text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
      author: "Malcolm X",
      image: slide1,
    },
    {
      text: "The beautiful thing about learning is that no one can take it away from you.",
      author: "B.B. King",
      image: slide2,
    },
    {
      text: "Your education is the foundation upon which you will build your future success.",
      author: "Jammu & Kashmir Education Board",
      image: slide3,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Academic Features
  const features = [
    {
      icon: <GiTeacher className="text-2xl" />,
      title: "Expert JKBOSE Faculty",
      description:
        "Learn from certified teachers with JKBOSE curriculum expertise",
    },
    {
      icon: <FaCertificate className="text-2xl" />,
      title: "Comprehensive Syllabus",
      description:
        "Complete coverage of 11th, 12th, UG, PG & competitive exams",
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Flexible Learning",
      description: "Study at your own pace with 24/7 access to all materials",
    },
    {
      icon: <FaBook className="text-2xl" />,
      title: "Study Materials",
      description: "Detailed notes, practice papers, and reference books",
    },
    {
      icon: <FaMobileAlt className="text-2xl" />,
      title: "Mobile Learning",
      description: "Access courses on any device, perfect for J&K students",
    },
    {
      icon: <MdSupportAgent className="text-2xl" />,
      title: "Doubt Support",
      description: "24/7 doubt solving with subject matter experts",
    },
  ];

  const stats = [
    { number: "25+", label: "J&K Students", icon: <FaUsers /> },
    { number: "8+", label: "Expert Teachers", icon: <FaChalkboardTeacher /> },
    { number: "20+", label: "Courses Available", icon: <HiAcademicCap /> },
    { number: "95%", label: "Success Rate", icon: <FaGraduationCap /> },
  ];

  const academicSubjects = [
    {
      level: "11th & 12th Science",
      subjects: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Botany",
        "Zoology",
        "Computer Science",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      level: "11th & 12th Commerce",
      subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
      color: "from-green-500 to-emerald-500",
    },
    {
      level: "11th & 12th Arts",
      subjects: [
        "History",
        "Political Science",
        "Geography",
        "Psychology",
        "Sociology",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      level: "UG Courses",
      subjects: ["B.A", "B.Sc", "B.Com", "B.Tech", "BBA", "BCA"],
      color: "from-orange-500 to-red-500",
    },
    {
      level: "PG Courses",
      subjects: ["M.A", "M.Sc", "M.Com", "M.Tech", "MBA", "MCA"],
      color: "from-teal-500 to-blue-500",
    },
    {
      level: "Competitive Exams",
      subjects: ["JEE", "NEET", "UPSC", "JKSSB", "Banking", "SSC"],
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const competitiveExams = [
    {
      name: "JEE Main & Advanced",
      description: "Engineering entrance preparation",
      students: "100+",
      success: "78%",
    },
    {
      name: "NEET UG",
      description: "Medical entrance coaching",
      students: "200+",
      success: "82%",
    },
    {
      name: "JKSSB",
      description: "Jammu & Kashmir Services Selection Board",
      students: "500+",
      success: "65%",
    },
    {
      name: "UPSC Civil Services",
      description: "Civil services examination",
      students: "50+",
      success: "12%",
    },
    {
      name: "Banking Exams",
      description: "PO, Clerk, SO examinations",
      students: "250+",
      success: "58%",
    },
    {
      name: "SSC CGL/CHSL",
      description: "Staff Selection Commission",
      students: "300+",
      success: "62%",
    },
  ];

  const learningPaths = [
    {
      title: "School Education",
      description: "Complete JKBOSE curriculum for 11th & 12th",
      courses: 45,
      duration: "2 years",
      icon: <MdSchool />,
    },
    {
      title: "Undergraduate",
      description: "Degree courses for college students",
      courses: 38,
      duration: "3-4 years",
      icon: <FaGraduationCap />,
    },
    {
      title: "Postgraduate",
      description: "Master's and advanced degree programs",
      courses: 32,
      duration: "2 years",
      icon: <FaUniversity />,
    },
    {
      title: "Competitive Exams",
      description: "Government job and entrance exam prep",
      courses: 28,
      duration: "1-2 years",
      icon: <FaAward />,
    },
  ];

  return (
    <div className="font-sans bg-white min-h-screen">
      {/* <MousePointer /> */}

      {/* Motivational Hero Section with Slider */}
      <section className="px-3 relative min-h-screen flex items-center bg-gradient-to-br from-emerald-50 via-white to-green-100 overflow-hidden">
        {/* Soft Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-80 h-80 bg-green-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-1 grid md:grid-cols-2 gap-2 items-center">
          {/* LEFT CONTENT */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm mb-6">
              🌙 Empowering J&K Students Since 2020
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
              Learn Smarter. <br />
              Build Your Future in{" "}
              <span className="text-green-700">Jammu & Kashmir</span>
            </h1>

            {/* Description */}
            <p className="mt-5 text-lg text-slate-600 max-w-xl">
              Live classes, recorded lectures & exam-focused courses for 11th,
              12th, UG & PG students.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 mt-8 flex-wrap">
              <Link
                to="/courses"
                className="flex items-center gap-2 px-7 py-3 rounded-xl bg-green-700 text-white font-semibold shadow-lg hover:bg-green-800 transition"
              >
                ▶ Start Learning Free
              </Link>

              <Link
                to="/courses"
                className="flex items-center gap-2 px-7 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition"
              >
                Browse Courses →
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 mt-10 text-sm text-slate-600 max-w-md">
              <div className="flex items-center gap-2">
                ⭐ <span>4.8 Rated by 5,000+ students</span>
              </div>
              <div className="flex items-center gap-2">
                🔒 <span>150+ Courses</span>
              </div>
              <div className="flex items-center gap-2">
                🎓 <span>Expert Faculty</span>
              </div>
              <div className="flex items-center gap-2">
                📘 <span>JKBOSE Focused</span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden md:flex justify-center">
            <img
              src="/muslim-student.png" // replace with your image path
              alt="Student"
              className="w-full max-w-xl scale-110 drop-shadow-2xl scale-110 lg:scale-155"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <div className="text-3xl">{stat.icon}</div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium text-sm sm:text-base">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Levels Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Academic Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From school education to competitive exams - we cover it all for
              J&K students
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academicSubjects.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${level.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <h3 className="text-xl font-bold mb-4">{level.level}</h3>
                <div className="space-y-2">
                  {level.subjects.map((subject, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex items-center gap-2 text-white/90"
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">{subject}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/courPopular Courses
ses"
                >
                  <button className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300">
                    Explore Courses
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Designed specifically for Jammu & Kashmir students' educational
              needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-300 group"
              >
                <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Exams Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Competitive Exam Preparation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive coaching for all major competitive examinations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitiveExams.map((exam, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {exam.name}
                  </h3>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    {exam.success} Success
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{exam.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{exam.students} enrolled</span>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold">
                    View Details →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Structured Learning Paths
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow curated paths designed by JKBOSE experts and career
              counselors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <div className="text-blue-600 text-2xl">{path.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {path.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{path.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{path.courses} courses</span>
                  <span>{path.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Popular Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Most enrolled courses by Jammu & Kashmir students
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.slice(0, 3).map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <CourseCard
                  image={course.thumbnail}
                  category={course.category}
                  heading={course.title}
                  level={course.level}
                  duration={course.duration}
                  link={`/CourseDetails/${course._id}`}
                  rating={4.8}
                  students={1200}
                  instructor={course.instructor}
                  price={course.price}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/courses"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group text-lg"
            >
              View All Courses
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonial />

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Excel in Your Academic Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of Jammu & Kashmir students who are achieving their
              academic goals with our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-3 text-lg"
                >
                  Get Started Free
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/courses"
                  className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-3 text-lg"
                >
                  Browse Courses
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <ScrollToTopButton />
    </div>
  );
};

export default Home;
