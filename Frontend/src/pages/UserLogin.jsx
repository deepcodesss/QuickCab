import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState, useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import { UIContext } from "../context/UIContext";
import { Eye, EyeClosed } from "lucide-react";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const { isOpen, setIsOpen, eyeOpen, setEyeOpen } = useContext(UIContext);

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    } else {
      console.error("Login failed:", response.data.message);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Navbar />
      <div
        className="min-h-screen w-full px-4 py-4 sm:px-6 md:px-10 bg-white flex flex-col justify-between overflow-hidden"
        onClick={() => {
          if (isOpen && window.innerWidth <= 640) setIsOpen(!isOpen);
        }}
      >
        {/* Center Form Card */}
        <div className="my-auto">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl rounded-2xl px-6 py-7 sm:px-8 sm:py-9 backdrop-blur-md mx-auto"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
              QuickCab User
            </h3>

            <div className="mb-5">
              <label className="text-gray-700 text-base font-medium block mb-2">
                What's Your Email?
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                required
                className="w-full px-4 py-2.5 rounded-lg border-gray-100 bg-gray-100 border focus:outline-yellow-500 text-base"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="text-gray-700 text-sm sm:text-base font-medium block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={eyeOpen ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  required
                  className="w-full px-3 py-2 pr-10 rounded-lg border-gray-100 bg-gray-100 border text-base focus:outline-yellow-500"
                />
                <button
                  type="button"
                  onClick={() => setEyeOpen((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {eyeOpen ? <Eye size={18} /> : <EyeClosed size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2.5 rounded-lg text-base font-semibold hover:bg-gray-900 transition"
            >
              Login
            </button>

            <Link
              to="/user/signup"
              className="block text-center mt-4 text-blue-600 hover:underline text-sm"
            >
              Don't have an account? Sign Up
            </Link>
          </form>
        </div>

        {/* Bottom Captain Login Button */}
        <div className="mt-6 w-full max-w-md mx-auto">
          <Link to="/captain/login">
            <button
              type="button"
              className="w-full mb-5 bg-yellow-600 text-white py-2.5 px-6 rounded-lg text-base font-semibold hover:bg-yellow-700 transition"
            >
              Log In as Captain
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserLogin;
