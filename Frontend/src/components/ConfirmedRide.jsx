import React from "react";
import carImage from "../assets/car.webp";
import bikeImage from "../assets/moto.webp";
import autoImage from "../assets/auto.webp";

const vehicleImage = carImage;

const ConfirmedRide = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
        className="p-1 text-center absolute top-0 w-[93%]"
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
      </h5>
      <h3 className="font-semibold text-2xl mb-5">Confirm Your Ride</h3>
      <div className="flex flex-col gap-5 w-full items-center">
        <img src={vehicleImage} alt="vehicle" className="h-25" />

        <div className="flex flex-col gap-5 w-full px-3">
          <div className="flex items-start gap-3 border-gray-300 border-b-2 p-3">
            <i className="ri-map-pin-4-line text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Gooba Gardens, Kanpur,Uttar Pradesh
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-gray-300 border-b-2 p-3">
            <i className="ri-map-pin-range-line text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Gooba Gardens, Kanpur,Uttar Pradesh
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-gray-300 border-b-2 p-3">
            <i className="ri-money-rupee-circle-line text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">₹193.20</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Cash cash
              </p>
            </div>
          </div>
        </div>

        <button onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
        }} className="w-full bg-green-500 text-white font-bold rounded-lg py-2">
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
