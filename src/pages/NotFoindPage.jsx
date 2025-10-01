import React from "react";
import { Link } from "react-router-dom";
import notFoundImg from "../../public/undraw_code-review_jdgp.svg"; 

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
       
      <img
        src={notFoundImg}
        alt="404 Not Found"
        className="w-full max-w-md mb-8"
      />

      
      <h1 className="text-4xl font-bold text-[#0f172a] mb-4">Oops! Page Not Found</h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>


      <Link
        to="/"
        className="px-6 py-3 bg-[#0f172a] text-white rounded-lg shadow-md hover:bg-[#1e293b] transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
