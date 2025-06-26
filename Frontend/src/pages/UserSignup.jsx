import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState, useContext } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import { UIContext } from "../context/UIContext";
import { Eye, EyeClosed, EyeOff } from "lucide-react";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const { eyeOpen, setEyeOpen,  } = useContext(UIContext);

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/user/home");
    }

    // console.log('User Data:', userData);

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full px-4 py-4 sm:px-6 md:px-10 bg-white flex flex-col justify-between overflow-x-hidden overflow-y-auto">
        {/* Signup Form */}
        <div className="flex flex-grow items-center justify-center">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md  bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl rounded-2xl px-6 py-4 sm:px-8 sm:py-5 backdrop-blur-md"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-gray-800">
              QuickCab User
            </h3>

            {/* Name Fields */}
            <div className="mb-3">
              <label className="text-gray-700 text-sm sm:text-base font-medium block mb-1">
                What's Your Name?
              </label>
              <div className="flex flex-row gap-3">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  required
                  className="w-1/2 px-3 py-2 rounded-lg border-gray-100 bg-gray-100 border text-base focus:outline-yellow-500"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  required
                  className="w-1/2 px-3 py-2 rounded-lg border-gray-100 bg-gray-100 border text-base focus:outline-yellow-500"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="text-gray-700 text-sm sm:text-base font-medium block mb-1">
                What's Your Email?
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                required
                className="w-full px-3 py-2 rounded-lg border-gray-100 bg-gray-100 border text-base focus:outline-yellow-500"
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
                  placeholder="Create a password"
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

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-900 transition"
            >
              Sign Up
            </button>

            <Link
              to="/user/login"
              className="block text-center mt-3 text-blue-600 hover:underline text-sm"
            >
              Already have an account? Login
            </Link>
          </form>
        </div>

        {/* Captain Sign Up Button */}
        <div className="mt-5 w-full max-w-md mx-auto">
          <Link to="/captain/signup">
            <button
              type="button"
              className="w-full bg-yellow-600 text-white py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-yellow-700 transition mb-5"
            >
              Sign Up as Captain
            </button>
          </Link>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default UserSignup;
