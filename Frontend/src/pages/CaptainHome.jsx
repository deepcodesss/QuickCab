import React, { useRef, useState, useEffect, useContext } from "react";
import carImage from "../assets/car.webp";
import bikeImage from "../assets/moto.webp";
import autoImage from "../assets/auto.webp";
import { Link, useNavigate } from "react-router-dom";
import quickCabLogo from "../assets/quickcab.svg";
// import quickCabLogo from '../assets/quickcab_black.svg'
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainHome = () => {
  const RidePopUpPanelRef = useRef(null);
  const ConfirmRidePopUpPanelRef = useRef(null);
  const [RidePopUpPanel, setRidePopUpPanel] = useState(false);
  const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log({
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
          });
          console.log("update location for captain called ");
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
  }, []);

  socket.on("new-ride", (data) => {
    setRide(data);
    setRidePopUpPanel(true);
    console.log("data aa gya h doston............");
    console.log(data);
  });

  async function confirmRide() {
    console.log(ride, captain);
    const response = axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setRidePopUpPanel(false);
    setConfirmRidePopUpPanel(true);
  }


    async function cancelRide() {
      const response = axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/cancel`,
        {
          rideId: ride._id,
          captain: captain,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data, captain);
    setRidePopUpPanel(false);
    setConfirmRidePopUpPanel(false);
    navigate('/captain/home');
  }


  useGSAP(
    function () {
      if (RidePopUpPanel) {
        gsap.to(RidePopUpPanelRef.current, {
          y: "0%",
        });
      } else {
        gsap.to(RidePopUpPanelRef.current, {
          y: "100%",
        });
      }
    },
    [RidePopUpPanel]
  );

  useGSAP(
    function () {
      if (ConfirmRidePopUpPanel) {
        gsap.to(ConfirmRidePopUpPanelRef.current, {
          y: "0%",
        });
      } else {
        gsap.to(ConfirmRidePopUpPanelRef.current, {
          y: "100%",
        });
      }
    },
    [ConfirmRidePopUpPanel]
  );

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full">
        <img
          src={quickCabLogo}
          alt="logo"
          className="bg-black w-25 rounded-xl"
        />
        <Link
          to="/captain/logout"
          className=" h-10 w-10 bg-white rounded-2xl flex items-center justify-center"
        >
          <i className="ri-logout-box-r-line text-2xl font-semibold"></i>
        </Link>
      </div>
      <div className="h-[67%]">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
          className="h-full w-full object-cover "
        />
      </div>
      <div className="h-[33%] p-6">
        <CaptainDetails />
      </div>

      <div
        ref={RidePopUpPanelRef}
        className="fixed w-full z-10 bottom-0 p-3 bg-white px-3 py-6 pt-12"
      >
        <RidePopUp
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          ride={ride}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={ConfirmRidePopUpPanelRef}
        className="fixed h-screen w-full z-10 bottom-0 p-3 bg-white px-3 py-6 pt-12"
      >
        <ConfirmRidePopUp
        cancelRide={cancelRide}
        ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
