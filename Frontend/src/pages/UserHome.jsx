import React, { useContext, useRef, useState } from "react";
import quickCabLogo from "../assets/quickcab.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPannel from "../components/LocationSearchPannel";
import VehiclePannel from "../components/VehiclePannel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-cancelled", (ride) => {
    setWaitingForDriver(false);
    navigate("/user/home");
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate("/user/riding", { state: { ride } });
  });

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/map/get-suggestions`,
        {
          params: { query },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      setSuggestions(data.status === "OK" ? data.predictions : []);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "60%",
          paddingLeft: 25,
          paddingRight: 25,
        });

        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          paddingLeft: 0,
          paddingRight: 0,
        });

        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      // console.log("inside gsap ")
      if (vehiclePanel) {
        console.log(vehiclePanel);
        gsap.to(vehiclePanelRef.current, {
          y: "0%",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          y: "100%",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      // console.log("inside gsap ")
      if (confirmRidePanel) {
        // console.log(confirmRidePanel);
        gsap.to(confirmRidePanelRef.current, {
          y: "0%",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          y: "100%",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      // console.log("inside gsap ")
      if (vehicleFound) {
        // console.log(vehicleFound);
        gsap.to(vehicleFoundRef.current, {
          y: "0%",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          y: "100%",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      // console.log("inside gsap ")
      if (waitingForDriver) {
        // console.log(waitingForDriver);
        gsap.to(WaitingForDriverRef.current, {
          y: "0%",
        });
      } else {
        gsap.to(WaitingForDriverRef.current, {
          y: "100%",
        });
      }
    },
    [waitingForDriver]
  );

  async function findTrip() {
    setPanelOpen(false);
    console.log(pickup);
    console.log(destination);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setFare(response.data);
    setVehiclePanel(true);
    // console.log(response.data);
  }

  async function createRide() {
    // console.log(pickup);
    // console.log(destination);
    // console.log(vehicleType);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup: pickup,
        destination: destination,
        vehicleType: vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  }

  // async function createRide() {
  //   const response = await axios.post(
  //     `${import.meta.env.VITE_BASE_URL}/rides/create`,
  //     {
  //       pickup,
  //       destination,
  //       vehicleType,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     }
  //   );

  //   console.log(response.data);
  // }

  return (
    <div className="h-screen relative overflow-hidden">
      <div>
        <img
          src={quickCabLogo}
          alt="logo"
          className="bg-black w-25 absolute top-5 left-5 rounded-xl"
        />
      </div>

      <div className="h-screen w-screen">
        {/* image fortemporary usage */}
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="img"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-end absolute h-screen top-0 w-full">
        <div className="h-fit p-6 bg-white relative rounded-tr-2xl rounded-tl-2xl lg:w-[60%] lg:left-[20%]">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="opacity-0 absolute right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find Your Trip</h4>

          <form onSubmit={(e) => submitHandler(e)}>
            <div className="relative mt-5">
              {/* vertical line + icons */}
              <div className="absolute left-0 top-3 flex flex-col items-center text-[10px] text-black z-10 pl-3">
                <i className="ri-circle-line font-extrabold"></i>
                <div className="h-10 w-1 bg-gray-800 rounded-full"></div>
                <i className="ri-square-line font-extrabold"></i>
              </div>

              {/* pickup input */}
              <input
                onClick={() => setPanelOpen(true)}
                type="text"
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value);
                  setActiveField("pickup");
                  fetchSuggestions(e.target.value);
                }}
                placeholder="Add a pick-up location"
                className="bg-gray-200 px-12 py-2 text-base rounded-lg w-full focus:outline-gray-600"
              />

              {/* destination input */}
              <input
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                type="text"
                value={destination}
                onChange={(e) => {
                  setActiveField("destination");
                  fetchSuggestions(e.target.value);
                  setDestination(e.target.value);
                }}
                placeholder="Enter your destination"
                className="bg-gray-200 px-12 py-2 text-base rounded-lg mt-3 w-full focus:outline-gray-600"
              />

              {/* Find Trip button */}
              <button
                onClick={findTrip}
                className="bg-black text-xl text-white p-3 flex rounded-xl justify-center items-center w-full gap-3 mt-5"
              >
                Find Trip
              </button>
            </div>
          </form>
        </div>

        <div ref={panelRef} className="h-0 bg-white relative lg:w-[60%] lg:left-[20%] lg:max-h-[45%]">
          <LocationSearchPannel
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            activeField={activeField}
            setPickup={setPickup}
            setDestination={setDestination}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 p-3 bg-white px-3 py-6 translate-y-full pt-12"
      >
        <VehiclePannel
          selectVehicle={setVehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          fare={fare}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 p-3 bg-white px-3 py-6 translate-y-full pt-12"
      >
        <ConfirmedRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          // setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 p-3 bg-white px-3 py-6 translate-y-full pt-12"
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={WaitingForDriverRef}
        className="fixed w-full z-10 bottom-0 p-3 bg-white px-3 py-6 translate-y-full pt-12"
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default UserHome;
