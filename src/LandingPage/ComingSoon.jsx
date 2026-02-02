import React from "react";

const ComingSoon = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black bg-opacity-70">
      {/* Modal Content */}
      <div className="relative w-full max-w-md p-8 m-5 text-center bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Coming Soon</h2>
        {/* <p className="text-gray-600">
          This feature is under development and will be available soon. Stay
          tuned!
        </p> */}
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
