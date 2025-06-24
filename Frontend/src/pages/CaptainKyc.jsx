import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UIContext } from "../context/UIContext";

const CaptainKyc = () => {
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");

  const { isOpen, setIsOpen, } = useContext(UIContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const kycData = {
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
      aadhaarNumber,
      panNumber,
    };

    try {
      const token = localStorage.getItem("token");
      //console.log(token);
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/captains/kyc`,
        kycData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log(response);
      if (response.status === 200) {
        setCaptain(response.data.captain);
        navigate("/captain/home");
      }
    } catch (error) {
      console.error("KYC submission error:", error);
      //alert('Failed to submit KYC. Please try again.');
      //console.log(response);
    }
  };

  return (
    <div onClick={() => {
      if(isOpen && window.innerWidth <= 640)
        setIsOpen(!isOpen);
    }}>
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
            <div className="mb-3">
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
                className="w-full px-3 py-2 rounded-lg bg-gray-100 border text-base border-gray-100 focus:outline-green-500"
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
                className="w-full px-3 py-2 rounded-lg bg-gray-100 border text-base border-gray-100 focus:outline-green-500 "
              />
            </div>

            {/* Vehicle Fields */}
            <div className="mb-4">
              <label className="text-gray-700 text-sm font-medium block mb-2">
                Vehicle Information
              </label>

              {/* Row 1: Vehicle Color & Plate */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                    placeholder="e.g. White"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-100 focus:outline-green-500 text-base"
                  />
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    placeholder="e.g. MH12 AB1234"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-100 focus:outline-green-500 text-base"
                  />
                </div>
              </div>

              {/* Row 2: Capacity & Type */}
              <div className="flex gap-3 mt-3">
                <div className="flex-1">
                  <input
                    type="number"
                    value={vehicleCapacity}
                    onChange={(e) => setVehicleCapacity(e.target.value)}
                    placeholder="e.g. 4"
                    required
                    min={1}
                    max={6}
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-100 focus:outline-green-500 text-base"
                  />
                </div>

                <div className="flex-1">
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-100 focus:outline-green-500 text-base"
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    <option value="car">Car</option>
                    <option value="auto">Auto</option>
                    <option value="motorcycle">Motorcycle</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white py-2 rounded-lg text-sm font-semibold transition bg-green-600 hover:bg-green-700"
            >
              Verify
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CaptainKyc;
