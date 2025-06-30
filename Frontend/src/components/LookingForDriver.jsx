

import React from "react";
import carImage from "../assets/car.webp";
import bikeImage from "../assets/moto.webp";
import autoImage from "../assets/auto.webp";

const LookingForDriver = (props) => {
  const vehicleImages = {
    car: carImage,
    moto: bikeImage,
    auto: autoImage,
  };

  const vehicleImage = vehicleImages[props.vehicleType] || carImage;

  return (
    <div className="w-full px-4 pt-4 pb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-xl text-black">Looking for Driver</h3>
        <i
          onClick={() => props.setVehicleFound(false)}
          className="ri-arrow-down-wide-line text-2xl text-gray-400 cursor-pointer hover:text-black transition"
        ></i>
      </div>

      {/* Vehicle Image */}
      <div className="flex justify-center mb-4">
        <img
          src={vehicleImage}
          alt="vehicle"
          className="h-20 w-28 lg:h-30 lg:w-38 object-contain"
        />
      </div>

      {/* Info Blocks */}
      <div className="flex flex-col gap-4 text-sm text-gray-800">
        {/* Pickup */}
        <div className="flex items-start gap-3 border-b border-gray-300 pb-2">
          <i className="ri-map-pin-4-line text-xl text-black pt-1"></i>
          <div>
            <p className="text-base font-medium text-gray-900">{props.pickup}</p>
            <p className="text-xs text-gray-500 mt-0.5">Pickup</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-3 border-b border-gray-300 pb-2">
          <i className="ri-map-pin-range-line text-xl text-black pt-1"></i>
          <div>
            <p className="text-base font-medium text-gray-900">{props.destination}</p>
            <p className="text-xs text-gray-500 mt-0.5">Destination</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-3 border-b border-gray-300 pb-2">
          <i className="ri-money-rupee-circle-line text-xl text-black pt-1"></i>
          <div>
            <p className="text-base font-medium text-gray-900">
              ₹{props.fare[props.vehicleType]}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Payment: Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;

