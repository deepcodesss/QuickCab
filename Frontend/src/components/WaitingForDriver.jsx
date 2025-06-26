import React from "react";
import carImage from "../assets/car.webp";
import bikeImage from "../assets/moto.webp";
import autoImage from "../assets/auto.webp";

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setWaitingForDriver(false);
          console.log("clicked")
        }}
        className="p-1 text-center absolute top-0 w-[93%]"
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
      </h5>

      <div className="flex items-center justify-between">
        <img src={bikeImage} alt="" className="w-40" />

        <div className="flex flex-col text-right">
          <h2 className="text-lg font-medium ">Karan Pandit</h2>
        <h4 className="text-xl font-semibold -mt-1 -mb-1">UP 78 DX 8743</h4>
        <p className="text-sm text-gray-600">Ford EcoSport</p>
        </div>
      </div>

      <div className="flex flex-col gap-5 w-full items-center">
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
              <p className="text-sm -mt-1 text-gray-600">Cash cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
