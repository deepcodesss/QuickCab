import React from "react";
import carImage from "../assets/car.webp";
import bikeImage from "../assets/moto.webp";
import autoImage from "../assets/auto.webp";

const VehiclePannel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehiclePanel(false);
        }}
        className="p-1 text-center absolute top-0 w-[93%]"
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
      </h5>
      <h3 className="font-semibold text-2xl mb-5">Choose Your Ride</h3>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
        }}
        className="flex w-full border-2 border-gray-300 active:border-black px-3 py-1 rounded-xl items-center justify-between mb-3"
      >
        <img src={carImage} alt="car" className="h-15" />
        <div className="ml-2 w-1/2">
          <h4 className="font-bold text-lg">
            QuickCar{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>{" "}
          </h4>
          <h5 className="font-medium text-sm">2 Mins Away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, Compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹193.20</h2>
      </div>

      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
        }}
        className="flex w-full border-2 border-gray-300 active:border-black px-3 py-1 rounded-xl items-center justify-between mb-3"
      >
        <img src={bikeImage} alt="car" className="h-15" />
        <div className="ml-2 w-1/2">
          <h4 className="font-bold text-lg">
            QuickBike{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>{" "}
          </h4>
          <h5 className="font-medium text-sm">2 Mins Away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, Motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹123.43</h2>
      </div>

      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
        }}
        className="flex w-full border-2 border-gray-300 active:border-black px-3 py-1 rounded-xl items-center justify-between mb-3"
      >
        <img src={autoImage} alt="car" className="h-15" />
        <div className="ml-2 w-1/2">
          <h4 className="font-bold text-lg">
            QuickAuto{" "}
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>{" "}
          </h4>
          <h5 className="font-medium text-sm">4 Mins Away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, Auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹89.65</h2>
      </div>
    </div>
  );
};

export default VehiclePannel;
