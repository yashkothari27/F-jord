import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[var(--bg-default)] text-white">
      <div className="max-w-screen-md p-8 mx-auto text-center">
        <h1 className="text-[20vw] font-bold leading-none text-[var(--text-default)] md:text-[15vw] lg:text-[10vw] xl:text-[8vw]">
          404
        </h1>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
          Page Not Found
        </h2>
        <p className="mb-6 text-lg md:text-xl lg:text-2xl">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 mt-4 text-lg font-semibold text-white rounded-md bg-[var(--bg-light)] hover:bg-[var(--bg-placehover)] transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
