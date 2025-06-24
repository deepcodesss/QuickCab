import React from "react";
import notFound from "../assets/notfound.gif"; // or use the uploaded PNG if preferred
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <img
        src={notFound}
        alt="Not Found"
        className="w-72 sm:w-96 md:w-[400px] mb-6"
      />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Look like you're lost
      </h2>
      <p className="text-gray-500 mb-6">
        The page you are looking for is not available!
      </p>
      <Link
        to="/"
        className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
