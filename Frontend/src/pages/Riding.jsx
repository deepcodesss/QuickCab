import React from "react";
import carImage from "../assets/car.webp";
import bikeImage from "../assets/moto.webp";
import autoImage from "../assets/auto.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import {SocketContext} from "../context/SocketContext";


// user riding 
const Riding = () => {


  const navigate = useNavigate();

  const{socket} = useContext(SocketContext);
  
  const location = useLocation();
  const { ride } = location.state || {}


  socket.on('ride-ended', () => {
    navigate('/user/home');
  })

  return (
    <div className="h-screen">
        <Link to='/user/home' className="fixed h-10 w-10 bg-white rounded-2xl flex items-center justify-center"><i className="ri-home-5-line text-2xl font-extrabold right-2 top-2 block"></i></Link>
      <div className="h-1/2">
        <img src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" className="h-full w-full object-cover " />
      </div>
      <div className="h-1/2 p-5">
        <div className="flex items-center justify-between">
          <img src={bikeImage} alt="" className="w-40" />

          <div className="flex flex-col text-right">
            <h2 className="text-lg font-medium capitalize">{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
            <p className="text-sm text-gray-600">Ford EcoSport</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full items-center mt-5 mb-8">
          <div className="flex flex-col gap-5 w-full px-3">

            <div className="flex items-start gap-3 border-gray-300 border-b-2 p-3">
              <i className="ri-map-pin-range-line text-lg"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {ride?.destination}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-gray-300 border-b-2 p-3">
              <i className="ri-money-rupee-circle-line text-lg"></i>
              <div>
                <h3 className="text-lg font-medium">₹{ride.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash cash</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2">
        <button className="w-full bg-green-500 text-white font-bold rounded-lg p-2"> Proceed To Pay</button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
