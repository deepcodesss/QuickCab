
import React from "react";
import toast from "react-hot-toast";

const RidePopUp = (props) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-xl text-black">New Ride Available</h3>
        <i
          onClick={() => props.setRidePopUpPanel(false)}
          className="ri-arrow-down-wide-line text-2xl text-gray-400 cursor-pointer hover:text-black transition"
        ></i>
      </div>

      {/* User Info */}
      <div className="flex justify-between items-center bg-yellow-400 p-3 rounded-xl mb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://i.pinimg.com/736x/cb/33/d8/cb33d80fe655e221ae05f41c8edd0cdb.jpg"
            alt="user"
          />
          <h4 className="text-base font-semibold capitalize">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
          </h4>
        </div>
        <span className="text-sm font-medium text-gray-700">2.2 km</span>
      </div>

      {/* Ride Info */}
      <div className="flex flex-col gap-3 text-sm text-gray-800 mb-5">
        {/* Pickup */}
        <div className="flex items-start gap-2 border-b border-gray-300 pb-2">
          <i className="ri-map-pin-4-line text-xl text-black pt-1"></i>
          <div>
            <p className="text-base font-medium text-gray-900">
              {props.ride?.pickup}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Pickup</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-2 border-b border-gray-300 pb-2">
          <i className="ri-map-pin-range-line text-xl text-black pt-1"></i>
          <div>
            <p className="text-base font-medium text-gray-900">
              {props.ride?.destination}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Destination</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-2">
          <i className="ri-money-rupee-circle-line text-xl text-black pt-1"></i>
          <div>
            <p className="text-base font-medium text-gray-900">
              ₹{props.ride?.fare}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Payment: Cash</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => {
            toast("Ride ignored", {
              icon: "🚫",
              style: {
                borderRadius: "10px",
                background: "#f9fafb",
                color: "#333",
              },
            });
            props.setRidePopUpPanel(false);
          }}
          className="w-1/2 bg-gray-200 text-gray-600 font-semibold rounded-lg py-3 hover:bg-gray-300 transition"
        >
          Ignore
        </button>
        <button
          onClick={() => {
            props.setConfirmRidePopUpPanel(true);
            props.confirmRide();
          }}
          className="w-1/2 bg-green-700 text-white font-semibold rounded-lg py-3 hover:bg-green-800 transition"
        >
          Accept Ride
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
