

import React from "react";
import carImage from "../assets/car.webp";
import bikeImage from "../assets/moto.webp";
import autoImage from "../assets/auto.webp";

const ConfirmedRide = (props) => {
  const vehicleImages = {
    car: carImage,
    moto: bikeImage,
    auto: autoImage,
  };

  const vehicleImage = vehicleImages[props.vehicleType] || carImage;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center sm:mb-4">
        <h3 className="font-semibold text-xl text-black">Confirm Your Ride</h3>
        <i
          onClick={() => props.setConfirmRidePanel(false)}
          className="ri-arrow-down-wide-line text-2xl text-gray-400 cursor-pointer hover:text-black transition"
        ></i>
      </div>

      {/* Vehicle Image */}
      <div className="flex justify-center sm:mb-2 sm:mt-2">
        <img
          src={vehicleImage}
          alt="vehicle"
          className="h-20 w-28 lg:h-30 lg:w-38 object-contain"
        />
      </div>

      {/* Ride Info Blocks */}
      <div className="flex flex-col gap-3 text-sm text-gray-800">
        {/* Pickup */}
        <div className="flex items-start gap-2 border-b border-gray-300 pb-1">
          <i className="ri-map-pin-4-line text-xl text-black pt-1"></i>
          <div>
            <p className="text-base font-medium text-gray-900">{props.pickup}</p>
            <p className="text-xs text-gray-500 mt-0.5">Pickup</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-2 border-b border-gray-300 pb-1">
          <i className="ri-map-pin-range-line text-xl text-black pt-1"></i>
          <div>
            <p className="text-base font-medium text-gray-900">{props.destination}</p>
            <p className="text-xs text-gray-500 mt-0.5">Destination</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-2 border-b border-gray-300 pb-1">
          <i className="ri-money-rupee-circle-line text-xl text-black pt-1"></i>
          <div>
            <p className="text-base font-medium text-gray-900">
              ₹{props.fare[props.vehicleType]}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Payment: Cash</p>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={() => {
          props.createRide();
        }}
        className="mt-6 w-full bg-black text-white font-semibold rounded-lg py-3 hover:bg-gray-900 transition"
      >
        Confirm Ride
      </button>
    </div>
  );
};

export default ConfirmedRide;
