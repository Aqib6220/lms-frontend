import React from "react";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import CourseForm from "./CourseForm";

const UpdateCourseModal = ({ course, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSuccess = () => {
    toast.success("Course updated successfully!");
    onClose();
  };

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
          <CourseForm mode="edit" existingCourse={course} onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

export default UpdateCourseModal;
