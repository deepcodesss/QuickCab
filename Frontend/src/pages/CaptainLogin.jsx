import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import Navbar from "../components/Navbar";
import { UIContext } from "../context/UIContext";
import { Eye, EyeClosed } from "lucide-react";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isOpen, setIsOpen, eyeOpen, setEyeOpen } = useContext(UIContext);

  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captain
    );

    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain/home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full px-4 py-4 sm:px-6 md:px-10 bg-white flex flex-col justify-between overflow-hidden">
        {/* Form */}
        <div className="flex-grow flex items-center justify-center">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl rounded-2xl px-6 py-7 sm:px-8 sm:py-9 backdrop-blur-md"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
              QuickCab Captain
            </h3>

            {/* Email */}
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
                className="w-full px-4 py-2.5 rounded-lg border-gray-100 bg-gray-100 border focus:outline-green-500 text-base"
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
                  className="w-full px-3 py-2 pr-10 rounded-lg border-gray-100 bg-gray-100 border text-base focus:outline-green-500"
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2.5 rounded-lg text-base font-semibold hover:bg-gray-900 transition"
            >
              Login
            </button>

            <Link
              to="/captain/signup"
              className="block text-center mt-4 text-blue-600 hover:underline text-sm"
            >
              Don't have an account? Sign Up
            </Link>
          </form>
        </div>

        {/* Bottom user login Button */}
        <div className="mt-6 w-full max-w-md mx-auto">
          <Link to="/user/login">
            <button
              type="button"
              className="w-full mb-5 bg-green-600 text-white py-2.5 px-6 rounded-lg text-base font-semibold hover:bg-green-700 transition"
            >
              Log In as User
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CaptainLogin;
