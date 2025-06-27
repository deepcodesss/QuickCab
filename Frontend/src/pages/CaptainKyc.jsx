import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CaptainKyc = () => {
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState("");
  //const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [panNumber, setPanNumber] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const kycData = {
  //     vehicle: {
  //       color: vehicleColor,
  //       plate: vehiclePlate,
  //       capacity: vehicleCapacity,
  //       vehicleType: vehicleType
  //     },
  //     aadhaarNumber,
  //     panNumber
  //   };

  //   try {
  //     const token = localStorage.getItem('token');
  //     //console.log(token);
  //     const response = await axios.put(
  //       ${import.meta.env.VITE_BASE_URL}/captains/kyc,
  //       kycData,
  //       {
  //         headers: {
  //           Authorization: Bearer ${token}
  //         }
  //       }
  //     );
  //     //console.log(response);
  //     if (response.status === 200) {
  //       setCaptain(response.data.captain);
  //       navigate('/captain/home');
  //     }
  //   } catch (error) {
  //     console.error('KYC submission error:', error);
  //     //alert('Failed to submit KYC. Please try again.');
  //     //console.log(response);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullRegistrationData = {
      fullname: captain.fullname,
      email: captain.email,
      password: captain.password,
      drivingLicenseNumber,
      //aadhaarNumber,
      panNumber,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType,
        location: {
          lat: 0,
          lng: 0,
        },
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register-full`,
        fullRegistrationData
      );

      if (response.status === 201) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/captain/home");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="h-screen w-full pt-16 px-4 sm:px-6 md:px-10 bg-white flex flex-col overflow-hidden">
        <div className="flex-grow flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl rounded-2xl px-6 py-4 sm:px-8 sm:py-5 backdrop-blur-md"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-gray-800">
              Get Verified
            </h3>

            {/* KYC Fields */}
            {/* <div className="mb-3">
              <label className="text-gray-700 text-sm font-medium block mb-1">
                Aadhaar Number
              </label>
              <input
                type="text"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                placeholder="12-digit Aadhaar"
                maxLength={12}
                minLength={12}
                required
                className="w-full px-3 py-2 rounded-lg bg-gray-100 border text-base border-gray-100"
              />
            </div> */}

            <div className="mb-3">
              <label className="text-gray-700 text-sm font-medium block mb-1">
                Driving License Number
              </label>
              <input
                type="text"
                value={drivingLicenseNumber}
                onChange={(e) =>
                  setDrivingLicenseNumber(e.target.value.toUpperCase())
                }
                placeholder="e.g. MH0120190012345"
                maxLength={16}
                minLength={10}
                required
                className="w-full px-3 py-2 rounded-lg bg-gray-100 border text-base border-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-700 text-sm font-medium block mb-1">
                PAN Number
              </label>
              <input
                type="text"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                placeholder="e.g. ABCDE1234F"
                maxLength={10}
                minLength={10}
                required
                className="w-full px-3 py-2 rounded-lg bg-gray-100 border text-base border-gray-100"
              />
            </div>

            {/* Vehicle Fields */}
            <div className="mb-3">
              <label className="text-gray-700 text-sm font-medium block mb-1">
                Vehicle Type
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg bg-gray-100 border text-base border-gray-100"
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="text-gray-700 text-sm font-medium block mb-1">
                Vehicle Plate
              </label>
              <input
                type="text"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                placeholder="e.g. MH12 AB1234"
                required
                className="w-full px-3 py-2 rounded-lg bg-gray-100 border text-base border-gray-100"
              />
            </div>

            <div className="mb-3">
              <label className="text-gray-700 text-sm font-medium block mb-1">
                Vehicle Color
              </label>
              <input
                type="text"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                placeholder="e.g. White"
                required
                className="w-full px-3 py-2 rounded-lg bg-gray-100 border text-base border-gray-100"
              />
            </div>

            <div className="mb-3">
              <label className="text-gray-700 text-sm font-medium block mb-1">
                Vehicle Capacity
              </label>
              <input
                type="number"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                placeholder="e.g. 4"
                required
                min={1}
                max={6}
                className="w-full px-3 py-2 rounded-lg bg-gray-100 border text-base border-gray-100"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-900 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CaptainKyc;
