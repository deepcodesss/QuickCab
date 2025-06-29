import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: props.ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (response.status === 200) {
      props.setConfirmRidePopUpPanel(false);
      props.setRidePopUpPanel(false);
      navigate("/captain/riding", { state : { ride : props.ride } });
    }
  };

  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePopUpPanel(false);
        }}
        className="p-1 text-center absolute top-0 w-[93%]"
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
      </h5>
      <h3 className="font-semibold text-2xl mb-6">Go To Pick Up</h3>
      <div className="flex justify-between items-center bg-yellow-400 p-3 rounded-lg mt-3">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://i.pinimg.com/736x/cb/33/d8/cb33d80fe655e221ae05f41c8edd0cdb.jpg"
            alt="user"
          />
          <h2 className="text-xl font-medium">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex flex-col gap-5 w-full items-center mt-3">
        <div className="flex flex-col gap-1 w-full px-3">
          <div className="flex items-start gap-3 border-gray-300 border-b-2 p-3">
            <i className="ri-map-pin-4-line text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-gray-300 border-b-2 p-3">
            <i className="ri-map-pin-range-line text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-gray-300 p-3">
            <i className="ri-money-rupee-circle-line text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash cash</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='mt-6 flex flex-col justify-center items-center gap-5'> */}
      <div className="w-full mt-5">
        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <input
            type="text"
            name="otp"
            id="otp"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            placeholder="Enter OTP"
            className=" bg-gray-200 p-5 text-2xl font-medium rounded-2xl w-full focus:outline-gray-400 "
          />
          <button className="w-full flex justify-center items-center bg-green-600 text-white font-semibold text-xl rounded-lg p-4">
            Confirm
          </button>
          <button
            onClick={() => {
              props.setRidePopUpPanel(false);
              props.setConfirmRidePopUpPanel(false);
            }}
            className="w-full bg-red-600 text-white font-semibold text-xl p-4 rounded-lg"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
