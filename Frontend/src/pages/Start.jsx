import React, { useContext } from "react";
import homeGif from "../assets/home.gif";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { UIContext } from "../context/UIContext";

const Start = () => {
  const { isOpen, setIsOpen } = useContext(UIContext);
  return (
    <div
      onClick={() => {
        if (isOpen && window.innerWidth <= 640) setIsOpen(!isOpen);
      }}
    >
      <Navbar />
      <div className="h-screen w-full flex flex-col justify-between relative bg-white">
        {/* <Navbar /> */}

        {/*  Background Image */}
        <div
          className="mx-auto mt-24 bg-no-repeat bg-center bg-contain w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]"
          style={{ backgroundImage: `url(${homeGif})` }}
        ></div>

        {/*  Bottom Section */}
        <div className="w-full px-6 sm:px-8 md:px-12 pb-8">
          <div
            className="bg-gradient-to-br from-white via-gray-50 to-white/90 shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-md 
          lg:max-w-md lg:mx-auto lg:bg-yellow-50"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center text-gray-900">
              Getting Started With QuickCab
            </h2>

            <p className="text-center text-sm sm:text-base text-gray-600 mb-6">
              Your ride companion — easy, fast, and reliable.
            </p>

            <Link
              to="/user/login"
              className="flex items-center justify-center gap-2 bg-black text-white py-3 px-6 rounded-lg text-sm sm:text-base md:text-lg hover:bg-gray-900 transition duration-200"
            >
              Continue <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Start;
