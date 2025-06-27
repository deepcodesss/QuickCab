// import React from 'react';
// import { Link } from 'react-router-dom';
// import Footer from '../components/Footer';
// import { useState , useContext } from 'react';
// import { CaptainDataContext } from '../context/CaptainContext';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import { UIContext } from "../context/UIContext";
// import { Eye, EyeClosed, EyeOff } from "lucide-react";


// const CaptainSignup = () => {

//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const { eyeOpen, setEyeOpen,  } = useContext(UIContext);
  

//   const { captain, setCaptain } = useContext(CaptainDataContext);

//   const submitHandler = async (e) => {
//     e.preventDefault()
//     const captainData = {
//       fullname: {
//         firstname: firstName,
//         lastname: lastName
//       },
//       email: email,
//       password: password,
//       // vehicle removed
//     }
    
//     // const response = await axios.post(${import.meta.env.VITE_BASE_URL}/captains/register, captainData)

//     // if (response.status === 201) {
//     //   const data = response.data
//     //   setCaptain(data.captain);
//     //   localStorage.setItem('token', data.token);
//     //   navigate('/captain/kyc');
//     // }

//     // setEmail('');
//     // setFirstName('');
//     // setLastName('');
//     // setPassword('');
    

//   }


//   return (
//     <div>
//       <Navbar />
//       <div className="h-screen w-full pt-16 px-4 sm:px-6 md:px-10 bg-white flex flex-col overflow-hidden">
//     {/<div className="min-h-screen w-full  pt-20 px-4 py-4 sm:px-6 md:px-10 bg-white flex flex-col justify-between overflow-hidden">/}
      

//       {/* Form */}
//       <div className="flex-grow flex items-center justify-center h:[90%]">
//         <form onSubmit={submitHandler} className="w-full max-w-md bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl rounded-2xl px-4 py-3 sm:px-8 sm:py-5 backdrop-blur-md">
//           <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-gray-800">
//             QuickCab Captain
//           </h3>

//           {/* Name */}
//           <div className="mb-3">
//             <label className="text-gray-700 text-sm sm:text-base font-medium block mb-1">What's Your Name?</label>
//             <div className="flex flex-col sm:flex-row gap-3">
//               <input
//                 type="text"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 placeholder="First name"
//                 required
//                 className="w-full px-3 py-2 rounded-lg bg-gray-100 border focus:outline-green-500 text-base border-gray-100"
//               />
//               <input
//                 type="text"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 placeholder="Last name"
//                 required
//                 className="w-full px-3 py-2 rounded-lg bg-gray-100 border focus:outline-green-500 text-base border-gray-100"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div className="mb-3">
//             <label className="text-gray-700 text-sm sm:text-base font-medium block mb-1">What's Your Email?</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="example@example.com"
//               required
//               className="w-full px-3 py-2 rounded-lg bg-gray-100 border focus:outline-green-500 text-base border-gray-100"
//             />
//           </div>

//           {/* Password */}
//             <div className="mb-4">
//               <label className="text-gray-700 text-sm sm:text-base font-medium block mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={eyeOpen ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Create a password"
//                   required
//                   className="w-full px-3 py-2 pr-10 rounded-lg border-gray-100 bg-gray-100 border text-base focus:outline-green-500"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setEyeOpen((prev) => !prev)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                 >
//                   {eyeOpen ? <Eye size={18} /> : <EyeClosed size={18} />}
//                 </button>
//               </div>
//             </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-900 transition"
//           >
//             Sign Up
//           </button>

//           <Link
//             to="/captain/login"
//             className="block text-center mt-3 text-blue-600 hover:underline text-sm"
//           >
//             Already have an account? Login
//           </Link>
//         </form>
//       </div>

//       {/* Bottom user sign up Button */}
//       <div className="mt-5 w-full max-w-md mx-auto">
//         <Link to="/user/signup">
//           <button
//             type="button"
//             className="w-full bg-green-600 text-white py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-green-700 transition mb-5"
//           >
//             Sign Up as User
//           </button>
//         </Link>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   </div>
//   );
// };

// export default CaptainSignup;


import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { CaptainDataContext } from '../context/CaptainContext';
import { UIContext } from "../context/UIContext";
import { Eye, EyeClosed } from "lucide-react";
import { ArrowRight } from 'lucide-react';

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { eyeOpen, setEyeOpen } = useContext(UIContext);
  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email,
      password
    };

    // Store signup info temporarily in context for KYC
    setCaptain(captainData);

    // Navigate to KYC form
    navigate('/captain/kyc');
  };

  return (
    <div>
      <Navbar />
      <div className="h-screen w-full pt-16 px-4 sm:px-6 md:px-10 bg-white flex flex-col overflow-hidden">
        <div className="flex-grow flex items-center justify-center">
          <form onSubmit={submitHandler} className="w-full max-w-md bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl rounded-2xl px-4 py-3 sm:px-8 sm:py-5 backdrop-blur-md">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-gray-800">
              QuickCab Captain
            </h3>

            {/* Name */}
            <div className="mb-3">
              <label className="text-gray-700 text-sm sm:text-base font-medium block mb-1">What's Your Name?</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 border focus:outline-green-500 text-base border-gray-100"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 border focus:outline-green-500 text-base border-gray-100"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="text-gray-700 text-sm sm:text-base font-medium block mb-1">What's Your Email?</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                required
                className="w-full px-3 py-2 rounded-lg bg-gray-100 border focus:outline-green-500 text-base border-gray-100"
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
              className="w-full flex justify-center items-center gap-2 bg-black text-white py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-900 transition"
            >
              Next <ArrowRight size={18} />
            </button>

            <Link
              to="/captain/login"
              className="block text-center mt-3 text-blue-600 hover:underline text-sm"
            >
              Already have an account? Login
            </Link>
          </form>
        </div>

        {/* Bottom user sign up Button */}
        <div className="mt-5 w-full max-w-md mx-auto">
          <Link to="/user/signup">
            <button
              type="button"
              className="w-full bg-green-600 text-white py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-green-700 transition mb-5"
            >
              Sign Up as User
            </button>
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default CaptainSignup;
