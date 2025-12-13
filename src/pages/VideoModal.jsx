import React from "react";

const VideoModal = ({ isOpen, onClose, videoUrl, title = "Preview Lecture" }) => {
  if (!isOpen) return null;

  const isYouTube = videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be");
  const isCloudinary = videoUrl?.includes("cloudinary.com");

  return (
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
              <h2 className="text-white text-xl font-bold">{title}</h2>
              <p className="text-gray-400 text-sm">Click play to watch the preview</p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-all duration-200"
            aria-label="Close video"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Video Player Container */}
        <div className="bg-black relative">
          {/* Video Aspect Ratio Container (16:9) */}
          <div className="relative pt-[56.25%]">
            {isYouTube ? (
              <iframe
                src={videoUrl.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/") + "?autoplay=1&rel=0&modestbranding=1"}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video preview"
              />
            ) : isCloudinary ? (
              <video
                src={videoUrl}
                className="absolute top-0 left-0 w-full h-full bg-black"
                controls
                autoPlay
                controlsList="nodownload"
                playsInline
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <video
                src={videoUrl}
                className="absolute top-0 left-0 w-full h-full bg-black"
                controls
                autoPlay
                controlsList="nodownload"
                playsInline
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
              <div className="text-sm text-gray-300">
                Press ESC to exit
              </div>
            </div>
          </div>
        </div>

        {/* Course Info Footer */}
        <div className="px-6 py-4 bg-[#1a1a1a] border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">From Course:</h3>
              <p className="text-gray-400 text-sm">Full video available in complete course</p>
            </div>
            <button
              onClick={onClose}
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
        onClick={onClose}
        aria-label="Close modal"
      />
    </div>
  );
};

export default VideoModal;