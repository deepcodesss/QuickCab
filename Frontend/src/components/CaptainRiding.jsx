import React, { useRef, useState } from "react";
import quickCabLogo from "../assets/quickcab.svg";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FinishRide from "./FinishRide";

const CaptainRiding = () => {
  const finishRidePanelRef = useRef(null);
  const [finishRidePanel, setFinishRidePanel] = useState(false);

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          y: "0%",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          y: "100%",
        });
      }
    },
    [finishRidePanel]
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
      <div className="h-[80%]">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
          className="h-full w-full object-cover "
        />
      </div>
      <div
      onClick={() => {
        setFinishRidePanel(true);
      }}
       className="bg-yellow-400 h-[20%] flex items-center justify-between p-6 relative">
        <h5
          onClick={() => {
            props.setRidePopUpPanel(false);
          }}
          className="p-1 text-center absolute top-1 w-[93%]"
        >
          <i className="ri-arrow-up-wide-line text-3xl text-gray-800"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM Away</h4>
        <button className="bg-green-600 text-white font-semibold rounded-lg py-3 px-10">
          Complete Ride
        </button>

      </div>
        <div ref={finishRidePanelRef} className="fixed w-full z-10 bottom-0 p-3 bg-white px-3 py-6 pt-12">
        <FinishRide setFinishRidePanel={setFinishRidePanel}  />
      </div>
    </div>
  );
};

export default CaptainRiding;
