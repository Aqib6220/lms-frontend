import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetAuthState, loginUser } from "../redux/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTimes,
  FaPhone,
} from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";

function Register({ isOpen, onClose, onLoginClick }) {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "learner", // Set automatically to learner
  });

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflow = "hidden";

      return () => {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.overflow = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (success) {
      toast.success(
        "🎉 Account created successfully! Welcome to Rehbar Online!"
      );
      dispatch(
        loginUser({ email: formData.email, password: formData.password })
      );
      onClose();
      dispatch(resetAuthState());
    }
  }, [success, dispatch, onClose, formData]);

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!formData.password) {
      toast.error("Please enter your password");
      return;
    }

    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password strength validation (optional)
    if (formData.password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    await dispatch(registerUser(formData));
    setIsLoading(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 md:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Register Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[95vw] xs:max-w-[90vw] sm:max-w-md mx-auto"
            onClick={handleModalClick}
          >
            <div className="relative bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 overflow-hidden max-h-[85vh] sm:max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="relative p-3 sm:p-4 md:p-6 pb-2 sm:pb-3 flex-shrink-0">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Create Your Account
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="text-base sm:text-lg" />
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-3 sm:mx-4 md:mx-6 mb-3 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm flex-shrink-0"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    {error.message || "Registration failed. Please try again."}
                  </div>
                </motion.div>
              )}

              {/* Form Content - Scrollable Area */}
              <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 pb-4 sm:pb-6">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 sm:space-y-4"
                >
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 text-center mb-3 sm:mb-4">
                    Join Our Community
                  </h3>

                  <div className="space-y-2 sm:space-y-3">
                    {/* Full Name */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400 text-xs sm:text-sm" />
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-xs sm:text-sm"
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400 text-xs sm:text-sm" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-xs sm:text-sm"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-400 text-xs sm:text-sm" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="w-full pl-9 sm:pl-10 pr-8 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-xs sm:text-sm"
                        placeholder="Password *"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <FaEyeSlash className="text-xs sm:text-sm" />
                        ) : (
                          <FaEye className="text-xs sm:text-sm" />
                        )}
                      </button>
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400 text-xs sm:text-sm" />
                      </div>
                      <input
                        type="tel"
                        name="phoneNumber"
                        className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-xs sm:text-sm"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start gap-2 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <input
                      type="checkbox"
                      id="terms"
                      className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 rounded focus:ring-blue-500 mt-0.5 sm:mt-1 flex-shrink-0"
                      required
                    />
                    <label htmlFor="terms" className="text-xs text-gray-700">
                      I agree to the{" "}
                      <button
                        type="button"
                        className="text-blue-600 hover:underline"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="text-blue-600 hover:underline"
                      >
                        Privacy Policy
                      </button>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-3 rounded-lg font-semibold shadow hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    {isLoading ? (
                      <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <FiUserPlus className="text-sm" />
                    )}
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </motion.button>
                </form>

                {/* Login Link */}
                <div className="text-center mt-3 sm:mt-4">
                  <p className="text-xs text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={onLoginClick}
                      className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Register;
