import React, { useRef, useState } from "react";
import quickCabLogo from "../assets/quickcab.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPannel from "../components/LocationSearchPannel";
import VehiclePannel from "../components/VehiclePannel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const UserHome = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [ vehiclePanel, setVehiclePanel ] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);
  const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
  const [ vehicleFound, setVehicleFound ] = useState(false)
  const [ waitingForDriver, setWaitingForDriver ] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "60%",
          padding: 30,
        });

        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });

        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(function() {
    // console.log("inside gsap ")
    if(vehiclePanel){
      console.log(vehiclePanel);
      gsap.to(vehiclePanelRef.current, {
      y : '0%'
    })
    }
    else{
      gsap.to(vehiclePanelRef.current, {
      y : "100%"
    })
    }
  }, [vehiclePanel]);


   useGSAP(function() {
    // console.log("inside gsap ")
    if(confirmRidePanel){
      // console.log(confirmRidePanel);
      gsap.to(confirmRidePanelRef.current, {
      y : '0%'
    })
    }
    else{
      gsap.to(confirmRidePanelRef.current, {
      y : "100%"
    })
    }
  }, [confirmRidePanel]);

  useGSAP(function() {
    // console.log("inside gsap ")
    if(vehicleFound){
      // console.log(vehicleFound);
      gsap.to(vehicleFoundRef.current, {
      y : '0%'
    })
    }
    else{
      gsap.to(vehicleFoundRef.current, {
      y : "100%"
    })
    }
  }, [vehicleFound]);

    useGSAP(function() {
    // console.log("inside gsap ")
    if(vehicleFound){
      // console.log(vehicleFound);
      gsap.to(WaitingForDriverRef.current, {
      y : '0%'
    })
    }
    else{
      gsap.to(WaitingForDriverRef.current, {
      y : "100%"
    })
    }
  }, [WaitingForDriver]);

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
        <div className="h-[25%] p-8 bg-white relative rounded-tr-2xl rounded-tl-2xl lg:w-[60%] lg:left-[20%]">
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

          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            {/* <div className="line absolute h-10 w-1 top-[52%] left-12 bg-gray-800 rounded-full"></div> */}
            <div className="absolute top-[42%] left-12 flex flex-col items-center text-[10px] text-black">
              <i className="ri-circle-line font-extrabold"></i>
              <div className="h-10 w-1 bg-gray-800 rounded-full"></div>
              <i className="ri-square-line font-extrabold"></i>
            </div>

            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              type="text"
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              name=""
              id=""
              placeholder="Add a pick-up location"
              className="bg-gray-200 px-15 py-2 text-base rounded-lg w-full mt-5 focus:outline-gray-700"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              type="text"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              name=""
              id=""
              placeholder="Enter your destination"
              className="bg-gray-200 px-15 py-2 text-base rounded-lg mt-3 w-full focus:outline-gray-700"
            />
          </form>
        </div>

        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPannel vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} panelOpen={panelOpen} setPanelOpen={setPanelOpen} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 p-3 bg-white px-3 py-6 translate-y-full pt-12">
        <VehiclePannel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>

      <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 p-3 bg-white px-3 py-6 translate-y-full pt-12">
          <ConfirmedRide setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 p-3 bg-white px-3 py-6 translate-y-full pt-12">
          <LookingForDriver setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={WaitingForDriverRef} className="fixed w-full z-10 bottom-0 p-3 bg-white px-3 py-6 translate-y-full pt-12">
          <WaitingForDriver setVehicleFound={setVehicleFound} setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default UserHome;
