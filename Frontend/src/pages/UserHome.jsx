// import React, { useContext, useRef, useState } from "react";
// import quickCabLogo from "../assets/quickcab.svg";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import "remixicon/fonts/remixicon.css";
// import LocationSearchPannel from "../components/LocationSearchPannel";
// import VehiclePannel from "../components/VehiclePannel";
// import ConfirmedRide from "../components/ConfirmedRide";
// import LookingForDriver from "../components/LookingForDriver";
// import WaitingForDriver from "../components/WaitingForDriver";
// import axios from "axios";
// import { SocketContext } from "../context/SocketContext";
// import { UserDataContext } from "../context/UserContext";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from 'react-hot-toast'
// import MapView from "../components/MapView";

// const UserHome = () => {
//   const [pickup, setPickup] = useState("");
//   const [destination, setDestination] = useState("");
//   const [panelOpen, setPanelOpen] = useState(false);
//   const [vehiclePanel, setVehiclePanel] = useState(false);
//   const panelRef = useRef(null);
//   const panelCloseRef = useRef(null);
//   const vehiclePanelRef = useRef(null);
//   const confirmRidePanelRef = useRef(null);
//   const vehicleFoundRef = useRef(null);
//   const WaitingForDriverRef = useRef(null);
//   const [confirmRidePanel, setConfirmRidePanel] = useState(false);
//   const [vehicleFound, setVehicleFound] = useState(false);
//   const [waitingForDriver, setWaitingForDriver] = useState(false);
//   const [activeField, setActiveField] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [fare, setFare] = useState({});
//   const [vehicleType, setVehicleType] = useState(null);
//   const [ride, setRide] = useState(null);

//   const { socket } = useContext(SocketContext);
//   const { user } = useContext(UserDataContext);

//   const navigate = useNavigate();

//   useEffect(() => {
//     socket.emit("join", { userType: "user", userId: user._id });
//   }, [user]);

//   socket.on("ride-confirmed", (ride) => {
//     setVehicleFound(false);
//     setWaitingForDriver(true);
//     setRide(ride);
//   });

//   socket.on("ride-cancelled", (ride) => {
//     setWaitingForDriver(false);
//     navigate("/user/home");
//   });

//   socket.on("ride-started", (ride) => {
//     setWaitingForDriver(false);
//     navigate("/user/riding", { state: { ride } });
//   });

//   const fetchSuggestions = async (query) => {
//     if (!query.trim()) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/map/get-suggestions`,
//         {
//           params: { query },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = response.data;
//       setSuggestions(data.status === "OK" ? data.predictions : []);
//     } catch (err) {
//       console.error("Error fetching suggestions:", err);
//       setSuggestions([]);
//     }
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//   };

//   useGSAP(
//     function () {
//       if (panelOpen) {
//         gsap.to(panelRef.current, {
//           height: "60%",
//           paddingLeft: 25,
//           paddingRight: 25,
//         });

//         gsap.to(panelCloseRef.current, {
//           opacity: 1,
//         });
//       } else {
//         gsap.to(panelRef.current, {
//           height: "0%",
//           paddingLeft: 0,
//           paddingRight: 0,
//         });

//         gsap.to(panelCloseRef.current, {
//           opacity: 0,
//         });
//       }
//     },
//     [panelOpen]
//   );

//   useGSAP(
//     function () {
//       if (vehiclePanel) {
//         gsap.to(vehiclePanelRef.current, {
//           y: "0%",
//         });
//       } else {
//         gsap.to(vehiclePanelRef.current, {
//           y: "100%",
//         });
//       }
//     },
//     [vehiclePanel]
//   );

//   useGSAP(
//     function () {
//       if (confirmRidePanel) {
//         gsap.to(confirmRidePanelRef.current, {
//           y: "0%",
//         });
//       } else {
//         gsap.to(confirmRidePanelRef.current, {
//           y: "100%",
//         });
//       }
//     },
//     [confirmRidePanel]
//   );

//   useGSAP(
//     function () {
//       if (vehicleFound) {
//         gsap.to(vehicleFoundRef.current, {
//           y: "0%",
//         });
//       } else {
//         gsap.to(vehicleFoundRef.current, {
//           y: "100%",
//         });
//       }
//     },
//     [vehicleFound]
//   );

//   useGSAP(
//     function () {
//       if (waitingForDriver) {
//         gsap.to(WaitingForDriverRef.current, {
//           y: "0%",
//         });
//       } else {
//         gsap.to(WaitingForDriverRef.current, {
//           y: "100%",
//         });
//       }
//     },
//     [waitingForDriver]
//   );

// async function findTrip() {
//   setPanelOpen(false);

//   const loadingToast = toast.loading("Finding your trip...", {
//     style: {
//       background: "#1f1f1f",
//       color: "#fff",
//       border: "1px solid #444",
//     },
//   });

//   try {
//     const response = await axios.get(
//       `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
//       {
//         params: { pickup, destination },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );

//     setFare(response.data);
//     setVehiclePanel(true);

//     toast.success("Trips found!", {
//       id: loadingToast,
//       style: {
//         background: "#1f1f1f",
//         color: "#fff",
//         border: "1px solid #444",
//       },
//     });
//   } catch (err) {
//     toast.error("Error finding trip", {
//       id: loadingToast,
//       style: {
//         background: "#1f1f1f",
//         color: "#fff",
//         border: "1px solid #444",
//       },
//     });
//     console.error("Failed to fetch fare:", err);
//   }
// }


// async function createRide() {
//   const loadingToast = toast.loading("Confirming your ride...", {
//     style: {
//       background: "#1f1f1f",
//       color: "#fff",
//       border: "1px solid #444",
//     },
//   });

//   try {
//     const response = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/rides/create`,
//       {
//         pickup,
//         destination,
//         vehicleType,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );

//     console.log(response.data);
//      setVehicleFound(true);
//           setConfirmRidePanel(false);

//     toast.success("Ride confirmed!", {
//       id: loadingToast,
//       style: {
//         background: "#1f1f1f",
//         color: "#fff",
//         border: "1px solid #444",
//       },
//     });


//   } catch (err) {
//     console.error("Error creating ride:", err);

//     toast.error("Error confirming ride", {
//       id: loadingToast,
//       style: {
//         background: "#1f1f1f",
//         color: "#fff",
//         border: "none",
//       },
//     });
//   }
// }


//   return (
//     <div className="h-screen relative overflow-hidden">
//       <div>
//         <img
//           src={quickCabLogo}
//           alt="logo"
//           className="bg-black w-25 absolute top-5 left-5 rounded-xl"
//         />
//       </div>

//       <div className="h-screen w-full">
//         <MapView pickup={pickup} destination={destination} />
//       </div>

//       <div className="flex flex-col justify-end absolute h-screen top-0 w-full z-10">
//         <div className="h-fit p-6 bg-white relative rounded-tr-2xl rounded-tl-2xl lg:w-[60%] lg:left-[20%]">
//           <h5
//             ref={panelCloseRef}
//             onClick={() => {
//               setPanelOpen(false);
//             }}
//             className="opacity-0 absolute right-6 top-6 text-2xl"
//           >
//             <i className="ri-arrow-down-wide-line"></i>
//           </h5>
//           <h4 className="text-2xl font-semibold">Find Your Trip</h4>

//           <form onSubmit={(e) => submitHandler(e)}>
//             <div className="relative mt-5">
//               {/* vertical line + icons */}
//               <div className="absolute left-0 top-3 flex flex-col items-center text-[10px] text-black z-10 pl-3">
//                 <i className="ri-circle-line font-extrabold"></i>
//                 <div className="h-10 w-1 bg-gray-800 rounded-full"></div>
//                 <i className="ri-square-line font-extrabold"></i>
//               </div>

//               {/* pickup input */}
//               <input
//                 onClick={() => setPanelOpen(true)}
//                 type="text"
//                 value={pickup}
//                 onChange={(e) => {
//                   setPickup(e.target.value);
//                   setActiveField("pickup");
//                   fetchSuggestions(e.target.value);
//                 }}
//                 placeholder="Add a pick-up location"
//                 className="bg-gray-200 px-12 py-2 text-base rounded-lg w-full border-2 border-gray-400 focus:outline-gray-600"
//               />

//               {/* destination input */}
//               <input
//                 onClick={() => {
//                   setPanelOpen(true);
//                   setActiveField("destination");
//                 }}
//                 type="text"
//                 value={destination}
//                 onChange={(e) => {
//                   setActiveField("destination");
//                   fetchSuggestions(e.target.value);
//                   setDestination(e.target.value);
//                 }}
//                 placeholder="Enter your destination"
//                 className="bg-gray-200 px-12 py-2 text-base rounded-lg mt-3 w-full border-2 border-gray-400 focus:outline-gray-600"
//               />

//               {/* Find Trip button */}
//               <button
//                 onClick={findTrip}
//                 className="bg-black text-xl text-white p-3 flex rounded-xl justify-center items-center w-full gap-3 mt-5"
//               >
//                 Find Trip
//               </button>
//             </div>
//           </form>
//         </div>

//         <div ref={panelRef} className="h-0 bg-white relative lg:w-[60%] lg:left-[20%] lg:max-h-[45%]">
//           <LocationSearchPannel
//             suggestions={suggestions}
//             setSuggestions={setSuggestions}
//             activeField={activeField}
//             setPickup={setPickup}
//             setDestination={setDestination}
//             setPanelOpen={setPanelOpen}
//             setVehiclePanel={setVehiclePanel}
//           />
//         </div>
//       </div>

//       <div
//         ref={vehiclePanelRef}
//         className="fixed rounded-tr-2xl rounded-tl-2xl w-full z-10 bottom-0 bg-white px-5 lg:px-8 translate-y-full py-5 lg:w-[60%] lg:left-[20%] lg:max-h-[60%]"
//       >
//         <VehiclePannel
//           selectVehicle={setVehicleType}
//           setConfirmRidePanel={setConfirmRidePanel}
//           setVehiclePanel={setVehiclePanel}
//           fare={fare}
//         />
//       </div>

//       <div
//         ref={confirmRidePanelRef}
//         className="fixed rounded-tr-2xl rounded-tl-2xl w-full z-10 bottom-0 bg-white px-5 lg:px-8 translate-y-full py-5 lg:w-[60%] lg:left-[20%] lg:max-h-[60%]"
//       >
//         <ConfirmedRide
//           createRide={createRide}
//           pickup={pickup}
//           destination={destination}
//           fare={fare}
//           vehicleType={vehicleType}
//           // setVehiclePanel={setVehiclePanel}
//           setConfirmRidePanel={setConfirmRidePanel}
//           setVehicleFound={setVehicleFound}
//         />
//       </div>

//       <div
//         ref={vehicleFoundRef}
//         className="fixed rounded-tr-2xl rounded-tl-2xl w-full z-10 bottom-0 bg-white px-5 lg:px-8 translate-y-full py-5 lg:w-[60%] lg:left-[20%] lg:max-h-[60%]"
//       >
//         <LookingForDriver
//           pickup={pickup}
//           destination={destination}
//           fare={fare}
//           vehicleType={vehicleType}
//           setConfirmRidePanel={setConfirmRidePanel}
//           setVehicleFound={setVehicleFound}
//         />
//       </div>

//       <div
//         ref={WaitingForDriverRef}
//         className="fixed rounded-tr-2xl rounded-tl-2xl w-full z-10 bottom-0 bg-white px-5 lg:px-8 translate-y-full py-5 lg:w-[60%] lg:left-[20%] lg:max-h-[60%]"
//       >
//         <WaitingForDriver
//           ride={ride}
//           setVehicleFound={setVehicleFound}
//           setWaitingForDriver={setWaitingForDriver}
//         />
//       </div>
//     </div>
//   );
// };

// export default UserHome;



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
import toast from "react-hot-toast";
import MapView from "../components/MapView";

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
  const [userLocation, setUserLocation] = useState(null);
  const [captainsNearby, setCaptainsNearby] = useState([]);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [rideActive, setRideActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const emitLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const loc = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setUserLocation(loc);

        socket.emit("user-location", {
          userId: user._id,
          location: loc,
        });
      });
    };

    emitLocation();
    const interval = setInterval(emitLocation, 10000);
    return () => clearInterval(interval);
  }, [socket, user._id]);

  useEffect(() => {
    socket.on("nearby-captains", (captains) => {
      setCaptainsNearby(captains);
    });

    socket.on("ride-started", () => {
      setRideActive(true);
    });

    socket.on("ride-ended", () => {
      navigate("/user/home");
      setRideActive(false);
      setPickupCoords(null);
      setDestinationCoords(null);
    });

    return () => {
      socket.off("nearby-captains");
      socket.off("ride-started");
      socket.off("ride-ended");
    };
  }, [socket]);

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
      if (vehiclePanel) {
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
      if (confirmRidePanel) {
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
      if (vehicleFound) {
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
      if (waitingForDriver) {
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
    if (!pickup.trim() || !destination.trim()) {
      toast.error("Please enter both pickup and destination locations.");
      return;
    }

    setPanelOpen(false);

    const loadingToast = toast.loading("Finding your trip...", {
      style: {
        background: "#1f1f1f",
        color: "#fff",
        border: "1px solid #444",
      },
    });

    try {
      // 1. Fetch fare
      const fareResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(fareResponse.data);
      setVehiclePanel(true);

      // 2. Fetch coordinates
      // 2. Fetch pickup & destination coordinates in parallel
      const [pickupRes, destinationRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-coordinates`, {
          params: { address: pickup },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-coordinates`, {
          params: { address: destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ]);

      setPickupCoords(pickupRes.data);
      setDestinationCoords(destinationRes.data);

      toast.success("Trips found!", {
        id: loadingToast,
        style: {
          background: "#1f1f1f",
          color: "#fff",
          border: "1px solid #444",
        },
      });
    } catch (err) {
      toast.error(err?.response?.data?.error || "Error finding trip", {
        id: loadingToast,
        style: {
          background: "#1f1f1f",
          color: "#fff",
          border: "1px solid #444",
        },
      });
      console.error("Failed to fetch fare or coordinates:", err);
    }
  }

  async function createRide() {
    const loadingToast = toast.loading("Confirming your ride...");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // printing the ride data on user side
      console.log(response);

      setVehicleFound(true);
      setConfirmRidePanel(false);
      toast.success("Ride confirmed!", { id: loadingToast });

      const { pickupCoords, destinationCoords } = response.data;
      setPickupCoords(pickupCoords);
      setDestinationCoords(destinationCoords);
    } catch (err) {
      console.error("Error creating ride:", err);
      toast.error("Error confirming ride", { id: loadingToast });
    }
  }

  return (
    <div className="h-screen relative">
      <div>
        <img
          src={quickCabLogo}
          alt="logo"
          className="bg-black w-25 absolute top-5 left-5 rounded-xl"
        />
      </div>

      <div className="h-screen w-screen">
        {/* image fortemporary usage */}
        {/* <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="img"
          className="h-full w-full object-cover"
        /> */}
        <MapView
          userLocation={userLocation}
          captainLocations={rideActive ? [] : captainsNearby}
          pickupCoords={pickupCoords}
          destinationCoords={destinationCoords}
        />
      </div>

      <div className="flex flex-col justify-end absolute h-screen top-0 w-full">
        <div className="h-fit z-20 p-6 bg-white relative rounded-tr-2xl rounded-tl-2xl lg:w-[60%] lg:left-[20%]">
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
                className="bg-gray-200 px-12 py-2 text-base rounded-lg w-full border-2 border-gray-400 focus:outline-gray-600"
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
                className="bg-gray-200 px-12 py-2 text-base rounded-lg mt-3 w-full border-2 border-gray-400 focus:outline-gray-600"
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

        <div
          ref={panelRef}
          className="h-0 bg-white relative lg:w-[60%] lg:left-[20%] lg:max-h-[45%] z-10"
        >
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
        className="fixed rounded-tr-2xl rounded-tl-2xl w-full bottom-0 bg-white px-5 lg:px-8 translate-y-full py-5 lg:w-[60%] lg:left-[20%] lg:max-h-[60%] z-20"
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
        className="fixed rounded-tr-2xl rounded-tl-2xl w-full bottom-0 bg-white px-5 lg:px-8 translate-y-full py-5 lg:w-[60%] lg:left-[20%] lg:max-h-[60%] z-20"
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
        className="fixed rounded-tr-2xl rounded-tl-2xl w-full z-20 bottom-0 bg-white px-5 lg:px-8 translate-y-full py-5 lg:w-[60%] lg:left-[20%] lg:max-h-[60%]"
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
        className="fixed rounded-tr-2xl rounded-tl-2xl w-full z-20 bottom-0 bg-white px-5 lg:px-8 translate-y-full py-5 lg:w-[60%] lg:left-[20%] lg:max-h-[60%]"
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
