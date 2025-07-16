// import React, { useRef, useState, useEffect, useContext } from "react";
// import carImage from "../assets/car.webp";
// import bikeImage from "../assets/moto.webp";
// import autoImage from "../assets/auto.webp";
// import { Link, useNavigate } from "react-router-dom";
// import quickCabLogo from "../assets/quickcab.svg";
// // import quickCabLogo from '../assets/quickcab_black.svg'
// import CaptainDetails from "../components/CaptainDetails";
// import RidePopUp from "../components/RidePopUp";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
// import { SocketContext } from "../context/SocketContext";
// import { CaptainDataContext } from "../context/CaptainContext";
// import axios from "axios";
// import toast from 'react-hot-toast'
// import CaptainMapView from "../components/CaptainMapView";

// const CaptainHome = () => {
//   const RidePopUpPanelRef = useRef(null);
//   const ConfirmRidePopUpPanelRef = useRef(null);
//   const [RidePopUpPanel, setRidePopUpPanel] = useState(false);
//   const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
//   const [ride, setRide] = useState(null);
//   const navigate = useNavigate();

//   const { socket } = useContext(SocketContext);
//   const { captain } = useContext(CaptainDataContext);

//   useEffect(() => {
//     socket.emit("join", {
//       userId: captain._id,
//       userType: "captain",
//     });

//     const updateLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           console.log({
//             userId: captain._id,
//             location: {
//               lat: position.coords.latitude,
//               lon: position.coords.longitude,
//             },
//           });
//           console.log("update location for captain called ");
//           socket.emit("update-location-captain", {
//             userId: captain._id,
//             location: {
//               lat: position.coords.latitude,
//               lon: position.coords.longitude,
//             },
//           });
//         });
//       }
//     };

//     const locationInterval = setInterval(updateLocation, 10000);
//     updateLocation();
//   }, []);

//   socket.on("new-ride", (data) => {
//     setRide(data);
//     setRidePopUpPanel(true);
//     console.log("data aa gya h doston............");
//     console.log(data);
//   });


// async function confirmRide() {
//   try {
//     toast.loading("Confirming ride...", { id: "confirm" });

//     const response = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
//       {
//         rideId: ride._id,
//         captainId: captain._id,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );

//     toast.success("Ride confirmed!", { id: "confirm" });

//     setRidePopUpPanel(false);
//     setConfirmRidePopUpPanel(true);
//   } catch (error) {
//     console.error(error);
//     toast.error("Error confirming ride", { id: "confirm" });
//   }
// }


// async function cancelRide() {
//   try {
//     toast.loading("Cancelling ride...", { id: "cancel" });

//     const response = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/rides/cancel`,
//       {
//         rideId: ride._id,
//         captain: captain,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );

//     toast.success("Ride cancelled", { id: "cancel" });

//     console.log(response.data, captain);
//     setRidePopUpPanel(false);
//     setConfirmRidePopUpPanel(false);
//     navigate("/captain/home");
//   } catch (error) {
//     console.error(error);
//     toast.error("Failed to cancel ride", { id: "cancel" });
//   }
// }


//   useGSAP(
//     function () {
//       if (RidePopUpPanel) {
//         gsap.to(RidePopUpPanelRef.current, {
//           y: "0%",
//         });
//       } else {
//         gsap.to(RidePopUpPanelRef.current, {
//           y: "100%",
//         });
//       }
//     },
//     [RidePopUpPanel]
//   );

//   useGSAP(
//     function () {
//       if (ConfirmRidePopUpPanel) {
//         gsap.to(ConfirmRidePopUpPanelRef.current, {
//           y: "0%",
//         });
//       } else {
//         gsap.to(ConfirmRidePopUpPanelRef.current, {
//           y: "100%",
//         });
//       }
//     },
//     [ConfirmRidePopUpPanel]
//   );

//   return (
//     <div className="h-screen">
//       <div className="fixed p-6 top-0 flex items-center justify-between w-full">
//         <img
//           src={quickCabLogo}
//           alt="logo"
//           className="bg-black w-25 rounded-xl"
//         />
//         <Link
//           to="/captain/logout"
//           className=" h-10 w-10 bg-white rounded-2xl flex items-center justify-center"
//         >
//           <i className="ri-logout-box-r-line text-2xl font-semibold"></i>
//         </Link>
//       </div>
//       <div className="h-[67%]">
//         <img
//           src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
//           alt=""
//           className="h-full w-full object-cover "
//         />
//       </div>
//       <div className="w-full lg:w-[60%] lg:mx-auto">
//         <CaptainDetails />
//       </div>

//       <div
//         ref={RidePopUpPanelRef}
//         className="fixed rounded-tr-2xl rounded-tl-2xl w-full z-10 bottom-0 bg-white px-5 lg:px-8 translate-y-full py-5 lg:w-[60%] lg:left-[20%] lg:max-h-[60%]"
//       >
//         <RidePopUp
//           setRidePopUpPanel={setRidePopUpPanel}
//           setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
//           ride={ride}
//           confirmRide={confirmRide}
//         />
//       </div>
//       <div
//         ref={ConfirmRidePopUpPanelRef}
//         className="fixed rounded-tr-2xl rounded-tl-2xl w-full z-10 bottom-0 bg-white px-5 lg:px-8 translate-y-full py-5 lg:w-[60%] lg:left-[20%]"
//       >
//         <ConfirmRidePopUp
//           cancelRide={cancelRide}
//           ride={ride}
//           setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
//           setRidePopUpPanel={setRidePopUpPanel}
//         />
//       </div>
//     </div>
//   );
// };

// export default CaptainHome;




// CaptainHome.jsx
import React, { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import quickCabLogo from "../assets/quickcab.svg";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import CaptainMapView from "../components/CaptainMapView";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import toast from "react-hot-toast";

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
    return () => clearInterval(locationInterval);
  }, []);

  useEffect(() => {
    socket.on("new-ride", (data) => {
      setRide(data);
      setRidePopUpPanel(true);
    });
  }, []);

  async function confirmRide() {
    try {
      toast.loading("Confirming ride...", { id: "confirm" });

      await axios.post(
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

      toast.success("Ride confirmed!", { id: "confirm" });

      setRidePopUpPanel(false);
      setConfirmRidePopUpPanel(true);
    } catch (error) {
      console.error(error);
      toast.error("Error confirming ride", { id: "confirm" });
    }
  }

  async function cancelRide() {
    try {
      toast.loading("Cancelling ride...", { id: "cancel" });

      await axios.post(
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

      toast.success("Ride cancelled", { id: "cancel" });

      setRidePopUpPanel(false);
      setConfirmRidePopUpPanel(false);
      setRide(null);
      navigate("/captain/home");
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel ride", { id: "cancel" });
    }
  }

  useGSAP(() => {
    gsap.to(RidePopUpPanelRef.current, {
      y: RidePopUpPanel ? "0%" : "100%",
    });
  }, [RidePopUpPanel]);

  useGSAP(() => {
    gsap.to(ConfirmRidePopUpPanelRef.current, {
      y: ConfirmRidePopUpPanel ? "0%" : "100%",
    });
  }, [ConfirmRidePopUpPanel]);

  return (
    <div className="h-screen relative">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full z-20">
        <img src={quickCabLogo} alt="logo" className="bg-black w-25 rounded-xl" />
        <Link
          to="/captain/logout"
          className="h-10 w-10 bg-white rounded-2xl flex items-center justify-center"
        >
          <i className="ri-logout-box-r-line text-2xl font-semibold"></i>
        </Link>
      </div>

      <div className="h-[67%] z-0">
        <CaptainMapView ride={ride} />
      </div>

      <div className="w-full lg:w-[60%] lg:mx-auto z-10">
        <CaptainDetails />
      </div>

      <div
        ref={RidePopUpPanelRef}
        className="fixed rounded-tr-2xl rounded-tl-2xl w-full z-30 bottom-0 bg-white px-5 lg:px-8 translate-y-full py-5 lg:w-[60%] lg:left-[20%] lg:max-h-[60%]"
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
        className="fixed rounded-tr-2xl rounded-tl-2xl w-full z-30 bottom-0 bg-white px-5 lg:px-8 translate-y-full py-5 lg:w-[60%] lg:left-[20%]"
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
