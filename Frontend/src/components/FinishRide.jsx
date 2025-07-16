
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const FinishRide = (props) => {
  const navigate = useNavigate();

  async function endRide() {
    try {
      toast.loading("Finishing ride...", { id: "finish" });

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        { rideId: props.ride._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Ride completed successfully", { id: "finish" });
        props.setFinishRidePanel(false);
        navigate("/captain/home");
      }
    } catch (err) {
      toast.error("Failed to finish ride", { id: "finish" });
      console.error(err);
    }
  }

  return (
    <div className="text-gray-800">

      {/* Title */}
      <h3 className="font-bold text-2xl mb-5 text-center">Finish This Ride</h3>

      {/* Rider Info */}
      <div className="flex justify-between items-center bg-yellow-400 p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <img
            className="h-12 w-12 rounded-full object-cover border"
            src="https://i.pinimg.com/736x/cb/33/d8/cb33d80fe655e221ae05f41c8edd0cdb.jpg"
            alt="user"
          />
          <h2 className="text-lg font-semibold capitalize">
            {props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <span className="text-md font-semibold text-black">2.2 KM</span>
      </div>

      {/* Ride Details */}
      <div className="mt-6 w-full space-y-4 px-1">
        {/* Pickup */}
        <div className="flex items-start gap-3 border-b border-gray-300 pb-2">
          <i className="ri-map-pin-4-line text-xl pt-1 text-gray-700"></i>
          <div>
            <h4 className="text-base font-semibold">Pickup</h4>
            <p className="text-sm text-gray-600">{props.ride?.pickup}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-3 border-b border-gray-300 pb-2">
          <i className="ri-map-pin-range-line text-xl pt-1 text-gray-700"></i>
          <div>
            <h4 className="text-base font-semibold">Destination</h4>
            <p className="text-sm text-gray-600">{props.ride?.destination}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-3">
          <i className="ri-money-rupee-circle-line text-xl pt-1 text-gray-700"></i>
          <div>
            <h4 className="text-base font-semibold">Fare</h4>
            <p className="text-sm text-gray-600">₹{props.ride?.fare} • Cash</p>
          </div>
        </div>
      </div>

      {/* Finish Button */}
      <div className="mt-6">
        <button
          onClick={endRide}
          className="w-full bg-green-600 hover:bg-green-700 transition text-white font-bold text-lg rounded-xl py-4 shadow-md"
        >
          Finish Ride
        </button>
      </div>
    </div>
  );
};

export default FinishRide;

