
import React from "react";
import carImage from "../assets/car.webp";
import bikeImage from "../assets/moto.webp";
import autoImage from "../assets/auto.webp";

const WaitingForDriver = (props) => {
  const vehicleType = props.ride?.vehicleType || "moto";
  const vehicleImages = {
    car: carImage,
    moto: bikeImage,
    auto: autoImage,
  };

  const vehicleImage = vehicleImages[vehicleType] || bikeImage;

  return (
    <div className="w-full px-4 pt-4 pb-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-xl text-black">Waiting For Driver</h3>
        <i
          onClick={() => {
            props.setWaitingForDriver(false);
            console.log("clicked");
          }}
          className="ri-arrow-down-wide-line text-2xl text-gray-400 cursor-pointer hover:text-black transition"
        ></i>
      </div>

      {/* Driver Info */}
      <div className="flex items-center justify-between mb-6">
        <img src={vehicleImage} alt="vehicle" className="w-28 object-contain" />
        <div className="flex flex-col items-end">
          <h2 className="text-base font-medium text-gray-900 capitalize">
            {props.ride?.captain?.fullname?.firstname + " " + props.ride?.captain?.fullname?.lastname}
          </h2>
          <h4 className="text-lg font-semibold text-black -mt-1">{props.ride?.captain?.vehicle?.plate}</h4>
          <p className="text-sm text-gray-500">Ford EcoSport</p>
          <p className="text-base font-semibold text-black mt-1">OTP: {props.ride?.otp}</p>
        </div>
      </div>

      {/* Ride Info Blocks */}
      <div className="flex flex-col gap-4 text-sm text-gray-800">
        {/* Pickup */}
        <div className="flex items-start gap-3 border-b border-gray-300 pb-2">
          <i className="ri-map-pin-4-line text-xl text-black pt-1"></i>
          <div>
            <p className="text-base font-medium text-gray-900 capitalize">{props.ride?.pickup}</p>
            <p className="text-xs text-gray-500 mt-0.5">Pickup</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-3 border-b border-gray-300 pb-2">
          <i className="ri-map-pin-range-line text-xl text-black pt-1"></i>
          <div>
            <p className="text-base font-medium text-gray-900">{props.ride?.destination}</p>
            <p className="text-xs text-gray-500 mt-0.5">Destination</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-3 border-b border-gray-300 pb-2">
          <i className="ri-money-rupee-circle-line text-xl text-black pt-1"></i>
          <div>
            <p className="text-base font-medium text-gray-900">₹{props.ride?.fare}</p>
            <p className="text-xs text-gray-500 mt-0.5">Payment: Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
