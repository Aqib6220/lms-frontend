import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoadingScreen from "./components/LoadingScreen";
import NotFound from "./common/NotFound.jsx";
import ScrollToTop from "./common/ScrollToTop.jsx";

import useSecurity from "./hooks/useSecurity.js";
import { useSelector } from "react-redux";
import UserWatermark from "./common/UserWatermark.jsx";

// Lazy Loading Pages
const Home = lazy(() => import("./pages/Home.jsx"));
const CourseDetails = lazy(() => import("./pages/CourseDetails.jsx"));
const TrainerCourseDetails = lazy(() =>
  import("./pages/TrainerCourseDetails.jsx")
);
const Profile = lazy(() => import("./pages/Profile.jsx"));
const CourseForm = lazy(() => import("./pages/CourseForm.jsx"));
const CoursesList = lazy(() => import("./pages/Courses.jsx"));
const UpdateUserDetails = lazy(() =>
  import("./components/UpdateUserDetails.jsx")
);
const UsersList = lazy(() => import("./components/UsersList.jsx"));
const UserDetails = lazy(() => import("./components/UserDetails.jsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"));
const AllCourses = lazy(() => import("./components/AllCourses.jsx"));
const TrainerCourses = lazy(() => import("./components/TrainerCourses.jsx"));

function App() {
  const currentUser = useSelector((state) => state.users.currentUser);
  const watermarkText = currentUser
    ? `${currentUser.fullName?.trim()} • ${currentUser.email}`
    : "";
  useSecurity(watermarkText);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <ScrollToTop />
      {currentUser && <UserWatermark text={watermarkText} />}
      <Navbar />
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Home />} />
            <Route path="/CourseDetails/:id" element={<CourseDetails />} />
            <Route
              path="/TrainerCourseDetails/:id"
              element={<TrainerCourseDetails />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/courseForm" element={<CourseForm />} />
            <Route
              path="/courses/:classLevelSlug?/:streamSlug?/:subjectSlug?"
              element={<CoursesList />}
            />
            <Route path="/updateUser" element={<UpdateUserDetails />} />
            <Route path="/admin/usersList" element={<UsersList />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/admin/Dash" element={<AdminDashboard />} />
            <Route path="/admin/coursesList" element={<AllCourses />} />
            <Route path="/trainer-courses" element={<TrainerCourses />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
