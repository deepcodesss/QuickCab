
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import aboutImg from "../assets/about.png";
import about1 from "../assets/about1.jpg";
import rajdeep from "../assets/rajdeep.jpg";
import rajeev from "../assets/rajeev.jpeg";
import { Github, Linkedin, Twitter,Instagram, Globe } from 'lucide-react';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col ">
        {/* Hero section */}
        <section className="relative h-60 sm:h-72 bg-cover bg-center">
  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-white text-3xl sm:text-5xl font-bold mb-2">
      About QuickCab
    </h1>
    <p className="text-white text-base sm:text-lg">
      Your smart way to move
    </p>
  </div>
        </section>      
        {/* Mission statement */}
        <section className="py-12 px-4 sm:px-8 lg:px-24 bg-gray-50">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At QuickCab, we believe in seamless travel that empowers people
                to reach their destinations safely, quickly, and responsibly.
                Our ride-booking platform connects passengers with trusted
                drivers, delivering convenience at every step.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>🚗 Seamless & reliable travel experience</li>
                <li>🔐 Safety and trust at every ride</li>
                <li>💡 Tech-first, customer-focused approach</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <img
                src={aboutImg}
                alt="QuickCab mission"
                className="rounded-xl shadow-lg w-full max-w-md object-cover"
              />
            </div>
          </div>
        </section>
        {/* NEW: What We Offer */}
        <section className="py-12 px-4 sm:px-8 lg:px-24 bg-white">
  <div className="max-w-6xl mx-auto flex flex-col-reverse md:grid md:grid-cols-2 gap-10 items-center">

            {/* Image Side */}
            <div className="flex justify-center">
              <img
                src={about1}
                alt="What we offer"
                className="rounded-xl shadow-lg w-full max-w-md object-cover mt-6 md:mt-0"
              />
            </div>

            {/* Content Side */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                What We Offer
              </h2>
              <p className="text-gray-700 mb-4">
                Whether you're a daily commuter or a professional driver,
                QuickCab has something for you.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800">🧍 For Riders</h4>
                  <ul className="list-disc list-inside text-gray-700 ml-2">
                    <li>Easy, one-tap ride booking</li>
                    <li>Upfront pricing with no surprises</li>
                    <li>Trusted and verified drivers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    🚖 For Captains
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 ml-2">
                    <li>Fair earning opportunities</li>
                    <li>Flexible driving hours</li>
                    <li>Real-time trip management tools</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Developer Section */}
        <section className="py-12 px-6 sm:px-12 lg:px-24 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">
              Meet the Developers
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Developer 1 */}
              <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
                <img
                  src={rajdeep} // Replace with real avatar
                  alt="Rajdeep Mishra"
                  className="w-24 h-24 rounded-full mb-4 object-cover "
                />
                <h4 className="text-lg font-semibold text-gray-800">
                  Rajdeep Mishra
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Full Stack Developer
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/deepcodesss/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black"
                  > <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rajdeep-mishra-349872244/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black"
                  > <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/m.rajdeep__/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Developer 2 */}
              <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
                <img
                  src={rajeev} // Replace with real avatar
                  alt="Rajeev Singh"
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                />
                <h4 className="text-lg font-semibold text-gray-800">
                  Rajeev Singh
                </h4>
                <p className="text-sm text-gray-600 mb-4">Full Stack Developer</p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/rajeevsingh3108"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rajeevsingh3108/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/_r_aj_e_e_v_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default About;
