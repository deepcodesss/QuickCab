import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import menu from "../assets/openmenu.png";
import close from "../assets/close.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [signupDropdownOpen, setSignupDropdownOpen] = useState(false);
  const [mobileLoginOpen, setMobileLoginOpen] = useState(false);
  const [mobileSignupOpen, setMobileSignupOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const loginRef = useRef(null);
  const signupRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedCloseIcon = event.target.id === "mobile-close-icon";

      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setLoginDropdownOpen(false);
      }
      if (signupRef.current && !signupRef.current.contains(event.target)) {
        setSignupDropdownOpen(false);
      }

      // Don't close if clicked the close icon
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !clickedCloseIcon
      ) {
        setIsOpen(false);
        setMobileLoginOpen(false);
        setMobileSignupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-x-0 z-20 w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Left Side: Logo + Links */}
          <div className="flex items-center gap-8">
            <a href="/" className="text-xl font-bold text-white hover:text-white transition-colors">
              QuickCab
            </a>

            <div className="hidden sm:flex gap-6">
              <a href="#ride" className="text-neutral-400 hover:text-white">Ride</a>
              <a href="#drive" className="text-neutral-400 hover:text-white">Drive</a>
              <Link to="/about" className="text-neutral-400 hover:text-white">About</Link>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="hidden sm:flex gap-6 items-center">
            <a href="#help" className="text-neutral-400 hover:text-white">Help</a>

            <div className="relative" ref={loginRef}>
              <button
                onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                className="text-neutral-400 hover:text-white focus:outline-none"
              >
                Login ▾
              </button>
              {loginDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-2xl shadow-lg z-30">
                  <Link to="/user/login" className="block px-4 py-2 hover:bg-gray-100 rounded-2xl">User</Link>
                  <Link to="/captain/login" className="block px-4 py-2 hover:bg-gray-100 rounded-2xl">Captain</Link>
                </div>
              )}
            </div>

            <div className="relative" ref={signupRef}>
              <button
                onClick={() => setSignupDropdownOpen(!signupDropdownOpen)}
                className="bg-white text-black font-semibold px-4 py-1 rounded-2xl hover:bg-gray-200"
              >
                Sign Up ▾
              </button>
              {signupDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-2xl shadow-lg z-30">
                  <Link to="/user/signup" className="block px-4 py-2 hover:bg-gray-100 rounded-2xl">User</Link>
                  <Link to="/captain/signup" className="block px-4 py-2 hover:bg-gray-100 rounded-2xl">Captain</Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setMobileLoginOpen(false);
              setMobileSignupOpen(false);
            }}
            className="sm:hidden flex items-center text-neutral-400 hover:text-white"
          >
            <img
              id="mobile-close-icon"
              src={isOpen ? close : menu}
              alt="Toggle menu"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <motion.div
          ref={mobileMenuRef}
          className="block sm:hidden text-center bg-black pb-5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col gap-4 mt-4">
            <a href="#ride" className="text-neutral-400 hover:text-white">Ride</a>
            <a href="#drive" className="text-neutral-400 hover:text-white">Drive</a>
            <Link to="/about" className="text-neutral-400 hover:text-white">About</Link>
            <a href="#help" className="text-neutral-400 hover:text-white">Help</a>

            <button
              onClick={() => {
                setMobileLoginOpen(!mobileLoginOpen);
                if (mobileSignupOpen) setMobileSignupOpen(false);
              }}
              className="text-neutral-400 hover:text-white"
            >
              Login ▾
            </button>
            {mobileLoginOpen && (
              <div className="flex flex-col text-white gap-1">
                <Link to="/user/login" className="hover:underline">User</Link>
                <Link to="/captain/login" className="hover:underline">Captain</Link>
              </div>
            )}

            <button
              onClick={() => {
                setMobileSignupOpen(!mobileSignupOpen);
                if (mobileLoginOpen) setMobileLoginOpen(false);
              }}
              className="text-neutral-400 hover:text-white"
            >
              Sign Up ▾
            </button>
            {mobileSignupOpen && (
              <div className="flex flex-col text-white gap-1">
                <Link to="/user/signup" className="hover:underline">User</Link>
                <Link to="/captain/signup" className="hover:underline">Captain</Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;