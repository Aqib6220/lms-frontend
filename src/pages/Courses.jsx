import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../redux/courseSlice";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaTimes, FaSearch, FaSortAmountDown } from "react-icons/fa";
import { FiBook } from "react-icons/fi";
import Loader from "../common/Loader";

const slugify = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getSubjectKey = (course) =>
  slugify(course?.subject || course?.category || course?.title || "");

const academicClasses = [
  { label: "Class 11", value: "class-11" },
  { label: "Class 12", value: "class-12" },
  { label: "Undergraduate", value: "ug" },
  { label: "Postgraduate", value: "pg" },
  { label: "Competitive Exams", value: "competitive" },
  { label: "Skill Development", value: "skill-dev" },
];

const subjects = [
  { label: "Physics", value: "physics" },
  { label: "Chemistry", value: "chemistry" },
  { label: "Mathematics", value: "mathematics" },
  { label: "Botany", value: "botany" },
  { label: "Zoology", value: "Zoology" },
  { label: "Computer Science", value: "computer-science" },
  { label: "Accountancy", value: "accountancy" },
  { label: "Business Studies", value: "business-studies" },
  { label: "Economics", value: "economics" },
  { label: "History", value: "history" },
  { label: "Political Science", value: "political-science" },
  { label: "Geography", value: "geography" },
  { label: "English", value: "english" },
];

const getClassValueFromSlug = (slug) => {
  if (!slug) return "";
  const normalized = slugify(slug);
  const match = academicClasses.find(
    (cls) =>
      slugify(cls.value) === normalized || slugify(cls.label) === normalized
  );
  return match?.value || "";
};

const getClassLabel = (value) =>
  academicClasses.find((cls) => cls.value === value)?.label || value;

const getSubjectValueFromSlug = (slug) => {
  if (!slug) return "";
  const normalized = slugify(slug);
  const match = subjects.find(
    (subject) =>
      slugify(subject.value) === normalized ||
      slugify(subject.label) === normalized
  );
  return match?.value || "";
};

const getSubjectLabel = (value) =>
  subjects.find((subject) => subject.value === value)?.label || value;

const formatSlugLabel = (slug) =>
  slug
    ? slug
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    : "";

const buildCoursesPath = (classSlug, streamSlug, subjectSlug) => {
  const segments = [];
  if (classSlug) segments.push(classSlug);
  if (streamSlug) segments.push(streamSlug);
  if (subjectSlug) segments.push(subjectSlug);
  return segments.length ? `/courses/${segments.join("/")}` : "/courses";
};

const CoursesList = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);
  const location = useLocation();
  const navigate = useNavigate();
  const { classLevelSlug, streamSlug, subjectSlug } = useParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const itemsPerPage = 10;

  // Filter states
  const [priceFilter, setPriceFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const routeClassFilter = getClassValueFromSlug(classLevelSlug);
  const routeSubjectFilter = getSubjectValueFromSlug(subjectSlug);
  const routeStreamFilter = slugify(streamSlug || "");

  useEffect(() => {
    if (!courses || courses.length === 0) {
      dispatch(fetchAllCourses());
    }
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    setSearchQuery(query);
  }, [location.search]);

  useEffect(() => {
    // if (!courses || courses.length === 0) return;
    const safeCourses = Array.isArray(courses) ? courses : [];
    let filtered = [...safeCourses];

    // let filtered = [...courses];

    // Search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    if (priceFilter) {
      filtered = filtered.filter((course) => {
        const price = course.price || 0;
        switch (priceFilter) {
          case "free":
            return price === 0;
          case "<1000":
            return price > 0 && price < 1000;
          case "1000-3000":
            return price >= 1000 && price <= 3000;
          case "3000-5000":
            return price > 3000 && price <= 5000;
          case ">5000":
            return price > 5000;
          default:
            return true;
        }
      });
    }

    // Type filter
    if (typeFilter) {
      filtered = filtered.filter((course) =>
        typeFilter === "free"
          ? (course.price || 0) === 0
          : (course.price || 0) > 0
      );
    }

    // Duration filter
    if (durationFilter) {
      filtered = filtered.filter((course) => {
        const duration = course.duration || 0;
        if (durationFilter === "short") return duration <= 10;
        if (durationFilter === "medium") return duration > 10 && duration <= 30;
        if (durationFilter === "long") return duration > 30;
        return true;
      });
    }

    // Level filter
    if (levelFilter) {
      filtered = filtered.filter(
        (course) => course.courseLevel === levelFilter
      );
    }

    // Class filter
    if (classFilter) {
      filtered = filtered.filter((course) =>
        slugify(course.classLevel || course.category || "").includes(
          classFilter
        )
      );
    }

    // Subject filter
    if (subjectFilter) {
      filtered = filtered.filter((course) =>
        getSubjectKey(course).includes(subjectFilter)
      );
    }

    // Teacher filter
    if (teacherFilter) {
      filtered = filtered.filter((course) =>
        course.instructor?.toLowerCase().includes(teacherFilter.toLowerCase())
      );
    }

    // Route-based filters from navbar (class / stream / subject)
    if (routeClassFilter) {
      filtered = filtered.filter((course) =>
        slugify(course.classLevel || course.category || "").includes(
          routeClassFilter
        )
      );
    }

    if (routeStreamFilter) {
      filtered = filtered.filter((course) =>
        slugify(course.category || "").includes(routeStreamFilter)
      );
    }

    if (routeSubjectFilter) {
      filtered = filtered.filter((course) =>
        getSubjectKey(course).includes(routeSubjectFilter)
      );
    }

    // Default to subject-based sorting so related courses stay grouped
    filtered.sort((a, b) => getSubjectKey(a).localeCompare(getSubjectKey(b)));

    // Additional sorting selections
    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "subject-az":
            return getSubjectKey(a).localeCompare(getSubjectKey(b));
          case "subject-za":
            return getSubjectKey(b).localeCompare(getSubjectKey(a));
          case "price-low":
            return (a.price || 0) - (b.price || 0);
          case "price-high":
            return (b.price || 0) - (a.price || 0);
          case "rating":
            return (b.rating || 0) - (a.rating || 0);
          case "duration":
            return (a.duration || 0) - (b.duration || 0);
          case "popular":
            return (b.enrolledStudents || 0) - (a.enrolledStudents || 0);
          default:
            return 0;
        }
      });
    }

    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, [
    courses,
    searchQuery,
    priceFilter,
    typeFilter,
    durationFilter,
    levelFilter,
    classFilter,
    subjectFilter,
    teacherFilter,
    sortBy,
    routeClassFilter,
    routeStreamFilter,
    routeSubjectFilter,
  ]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const resetFilters = () => {
    setPriceFilter("");
    setTypeFilter("");
    setDurationFilter("");
    setLevelFilter("");
    setClassFilter("");
    setSubjectFilter("");
    setTeacherFilter("");
    setSortBy("");
    setSearchQuery("");
    if (classLevelSlug || streamSlug || subjectSlug) {
      navigate("/courses");
    }
  };

  const activeFiltersCount =
    [
      priceFilter,
      typeFilter,
      durationFilter,
      levelFilter,
      classFilter,
      subjectFilter,
      teacherFilter,
      sortBy,
    ].filter(Boolean).length +
    (classLevelSlug ? 1 : 0) +
    (streamSlug ? 1 : 0) +
    (subjectSlug ? 1 : 0);

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Explore Courses
              </h1>
              <p className="text-gray-600">
                Discover the perfect course for your academic journey
              </p>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200"
              >
                <FaFilter className="text-blue-600" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white pl-10 pr-8 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sort by</option>
                  <option value="subject-az">Subject A → Z</option>
                  <option value="subject-za">Subject Z → A</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="duration">Duration</option>
                </select>
                <FaSortAmountDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mt-6 max-w-2xl">
            <input
              type="text"
              placeholder="Search courses, subjects, teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FaFilter className="text-blue-600" />
                  Filters
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Reset All
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Class Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Class Level
                  </label>
                  <select
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">All Classes</option>
                    {academicClasses.map((cls) => (
                      <option key={cls.value} value={cls.value}>
                        {cls.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">All Subjects</option>
                    {subjects.map((subject) => (
                      <option key={subject.value} value={subject.value}>
                        {subject.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Teacher Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Teacher
                  </label>
                  <input
                    type="text"
                    value={teacherFilter}
                    onChange={(e) => setTeacherFilter(e.target.value)}
                    placeholder="Teacher name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price
                  </label>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">All Prices</option>
                    <option value="free">Free</option>
                    <option value="<1000">Under ₹1000</option>
                    <option value="1000-3000">₹1000 - ₹3000</option>
                    <option value="3000-5000">₹3000 - ₹5000</option>
                    <option value=">5000">Above ₹5000</option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration
                  </label>
                  <select
                    value={durationFilter}
                    onChange={(e) => setDurationFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Any Duration</option>
                    <option value="short">Short (0–10 hrs)</option>
                    <option value="medium">Medium (10–30 hrs)</option>
                    <option value="long">Long (30+ hrs)</option>
                  </select>
                </div>

                {/* Level (Semester) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Semester / Level
                  </label>
                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">All Levels</option>
                    <option value="Semester-1">Semester 1</option>
                    <option value="Semester-2">Semester 2</option>
                    <option value="Semester-3">Semester 3</option>
                    <option value="Semester-4">Semester 4</option>
                    <option value="Semester-5">Semester 5</option>
                    <option value="Semester-6">Semester 6</option>
                    <option value="Semester-7">Semester 7</option>
                    <option value="Semester-8">Semester 8</option>
                  </select>
                </div>

                {/* Apply Button */}
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg"
                >
                  Apply Filters
                </button>
              </div>

              {/* Results Count */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {(filteredCourses.length > 0) ? ("" + ((currentPage - 1) * itemsPerPage + 1)) : 0}
                  </span>
                  {" - "}
                  <span className="font-semibold text-gray-900">
                    {Math.min(currentPage * itemsPerPage, filteredCourses.length)}
                  </span>
                  {" of "}
                  <span className="font-semibold text-gray-900">
                    {filteredCourses.length}
                  </span>
                  {" courses"}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {priceFilter && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    💰 {priceFilter === "free" ? "Free" : "Paid"}
                    <button onClick={() => setPriceFilter("")}>×</button>
                  </span>
                )}
                {classFilter && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    📚 {getClassLabel(classFilter)}
                    <button onClick={() => setClassFilter("")}>×</button>
                  </span>
                )}
                {routeClassFilter && (
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-green-200">
                    🧭 {getClassLabel(routeClassFilter)}
                    <button onClick={() => navigate("/courses")}>×</button>
                  </span>
                )}
                {subjectFilter && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    📖 {getSubjectLabel(subjectFilter)}
                    <button onClick={() => setSubjectFilter("")}>×</button>
                  </span>
                )}
                {routeSubjectFilter && (
                  <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-purple-200">
                    🧭 {getSubjectLabel(routeSubjectFilter)}
                    <button
                      onClick={() =>
                        navigate(
                          buildCoursesPath(
                            classLevelSlug,
                            streamSlug,
                            undefined
                          )
                        )
                      }
                    >
                      ×
                    </button>
                  </span>
                )}
                {routeStreamFilter && (
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-blue-200">
                    🧭 {formatSlugLabel(streamSlug)}
                    <button
                      onClick={() =>
                        navigate(
                          buildCoursesPath(classLevelSlug, undefined, undefined)
                        )
                      }
                    >
                      ×
                    </button>
                  </span>
                )}
                {teacherFilter && (
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    👨‍🏫 {teacherFilter}
                    <button onClick={() => setTeacherFilter("")}>×</button>
                  </span>
                )}
              </motion.div>
            )}

            {/* Courses Grid */}
            <AnimatePresence mode="wait">
              {currentCourses.length > 0 ? (
                <motion.div
                  key="courses-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {currentCourses.map((course, index) => (
                    <motion.div
                      key={course._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05, duration: 0.25 }}
                      whileHover={{ y: -5 }}
                    >
                      <CourseCard
                        image={course.thumbnail}
                        category={course.category}
                        heading={course.title}
                        level={course.level}
                        duration={course.duration}
                        link={`/CourseDetails/${course._id}`}
                        rating={course.rating || 4.5}
                        students={course.enrolledStudents || 0}
                        instructor={course.instructor}
                        price={course.price}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-12 text-center"
                >
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <FiBook className="text-4xl text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No courses found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    onClick={resetFilters}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 flex flex-col items-center space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white shadow-lg border border-gray-200"
                    }`}
                  >
                    Previous
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-white text-gray-700 hover:bg-gray-100 shadow border border-gray-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white shadow-lg border border-gray-200"
                    }`}
                  >
                    Next
                  </button>
                </div>

                <p className="text-sm text-gray-600">
                  Page{" "}
                  <span className="font-semibold text-gray-900">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {totalPages}
                  </span>{" "}
                  •{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredCourses.length}
                  </span>{" "}
                  courses
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed inset-y-0 left-0 w-80 bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>

                {/* Mobile Filter Content - Same as desktop but stacked */}
                <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
                  {/* Class Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Class Level
                    </label>
                    <select
                      value={classFilter}
                      onChange={(e) => setClassFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">All Classes</option>
                      {academicClasses.map((cls) => (
                        <option key={cls.value} value={cls.value}>
                          {cls.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject Filter (SCROLLABLE FIX) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 ">
                      Subject
                    </label>
                    <select
                      size={6}
                      value={subjectFilter}
                      onChange={(e) => setSubjectFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">All Subjects</option>
                      {subjects.map((subject) => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Teacher */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Teacher
                    </label>
                    <input
                      type="text"
                      value={teacherFilter}
                      onChange={(e) => setTeacherFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Search teacher..."
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price
                    </label>
                    <select
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">All Prices</option>
                      <option value="free">Free</option>
                      <option value="<1000">Under ₹1000</option>
                      <option value="1000-3000">₹1000 - ₹3000</option>
                      <option value="3000-5000">₹3000 - ₹5000</option>
                      <option value=">5000">Above ₹5000</option>
                    </select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Duration
                    </label>
                    <select
                      value={durationFilter}
                      onChange={(e) => setDurationFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Any Duration</option>
                      <option value="short">Short (0–10 hrs)</option>
                      <option value="medium">Medium (10–30 hrs)</option>
                      <option value="long">Long (30+ hrs)</option>
                    </select>
                  </div>

                  {/* Level (Semester) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Semester / Level
                    </label>
                    <select
                      value={levelFilter}
                      onChange={(e) => setLevelFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">All Levels</option>
                      {Array.from({ length: 8 }).map((_, i) => (
                        <option key={i} value={`Semester-${i + 1}`}>
                          Semester {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Apply Button */}
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursesList;
