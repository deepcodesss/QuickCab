// import React from "react";
// import carImage from "../assets/car.webp";
// import bikeImage from "../assets/moto.webp";
// import autoImage from "../assets/auto.webp";

// const VehiclePannel = (props) => {
//   return (
//     <div>
//       <h5
//         onClick={() => {
//           props.setVehiclePanel(false);
//         }}
//         className="p-1 text-center absolute top-0 w-[93%]"
//       >
//         <i className="ri-arrow-down-wide-line text-3xl text-gray-300"></i>
//       </h5>
//       <h3 className="font-semibold text-2xl mb-5">Choose Your Ride</h3>
//       <div
//         onClick={() => {
//           props.setConfirmRidePanel(true);
//           // props.setVehiclePanel(false);
//           props.selectVehicle('car');
//         }}
//         className="flex w-full border-2 border-gray-300 active:border-black px-3 py-1 rounded-xl items-center justify-between mb-3"
//         >
//         <img src={carImage} alt="car" className="h-15" />
//         <div className="ml-2 w-1/2">
//           <h4 className="font-bold text-lg">
//             QuickCar{" "}
//             <span>
//               <i className="ri-user-3-fill"></i>4
//             </span>{" "}
//           </h4>
//           <h5 className="font-medium text-sm">2 Mins Away</h5>
//           <p className="font-normal text-xs text-gray-600">
//             Affordable, Compact rides
//           </p>
//         </div>
//         <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
//       </div>

//       <div
//         onClick={() => {
//           props.setConfirmRidePanel(true);
//           // props.setVehiclePanel(false);
//           props.selectVehicle('moto');
//         }}
//         className="flex w-full border-2 border-gray-300 active:border-black px-3 py-1 rounded-xl items-center justify-between mb-3"
//         >
//         <img src={bikeImage} alt="car" className="h-15" />
//         <div className="ml-2 w-1/2">
//           <h4 className="font-bold text-lg">
//             QuickBike{" "}
//             <span>
//               <i className="ri-user-3-fill"></i>1
//             </span>{" "}
//           </h4>
//           <h5 className="font-medium text-sm">2 Mins Away</h5>
//           <p className="font-normal text-xs text-gray-600">
//             Affordable, Motorcycle rides
//           </p>
//         </div>
//         <h2 className="text-lg font-semibold">₹{props.fare.moto}</h2>
//       </div>

//       <div
//         onClick={() => {
//           props.setConfirmRidePanel(true);
//           // props.setVehiclePanel(false);
//           props.selectVehicle('auto');
//         }}
//         className="flex w-full border-2 border-gray-300 active:border-black px-3 py-1 rounded-xl items-center justify-between mb-3"
//       >
//         <img src={autoImage} alt="car" className="h-15" />
//         <div className="ml-2 w-1/2">
//           <h4 className="font-bold text-lg">
//             QuickAuto{" "}
//             <span>
//               <i className="ri-user-3-fill"></i>3
//             </span>{" "}
//           </h4>
//           <h5 className="font-medium text-sm">4 Mins Away</h5>
//           <p className="font-normal text-xs text-gray-600">
//             Affordable, Auto rides
//           </p>
//         </div>
//         <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
//       </div>
//     </div>
//   );
// };

// export default VehiclePannel;




// import React from "react";
// import carImage from "../assets/car.webp";
// import bikeImage from "../assets/moto.webp";
// import autoImage from "../assets/auto.webp";

// const VehiclePannel = (props) => {
//   return (
//     <div className="px-4 pt-8 pb-4 w-full">
//       {/* Close Arrow */}
//       <h5
//         onClick={() => props.setVehiclePanel(false)}
//         className="absolute top-2 w-full text-center cursor-pointer"
//       >
//         <i className="ri-arrow-down-wide-line text-3xl text-gray-400 hover:text-black transition duration-200"></i>
//       </h5>

//       {/* Title */}
//       <h3 className="font-semibold text-xl mb-4 text-center">Choose Your Ride</h3>

//       {/* Vehicle Cards */}
//       <div className="flex flex-col gap-3">
//         {/* Car */}
//         <div
//           onClick={() => {
//             props.setConfirmRidePanel(true);
//             props.selectVehicle("car");
//           }}
//           className="flex items-center gap-3 bg-gray-100 shadow-md px-3 py-2 rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
//         >
//           <img src={carImage} alt="car" className="h-12 w-12 object-contain rounded-md" />
//           <div className="flex-1">
//             <div className="flex justify-between items-center">
//               <h4 className="font-semibold text-base flex items-center gap-2">
//                 QuickCar <i className="ri-user-3-fill text-sm text-gray-700"></i>4
//               </h4>
//               <span className="text-sm font-semibold">₹{props.fare.car}</span>
//             </div>
//             <p className="text-xs text-gray-600 mt-1">2 mins away • Compact & Affordable</p>
//           </div>
//         </div>

//         {/* Bike */}
//         <div
//           onClick={() => {
//             props.setConfirmRidePanel(true);
//             props.selectVehicle("moto");
//           }}
//           className="flex items-center gap-3 bg-gray-100 shadow-md px-3 py-2 rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
//         >
//           <img src={bikeImage} alt="moto" className="h-12 w-12 object-contain rounded-md" />
//           <div className="flex-1">
//             <div className="flex justify-between items-center">
//               <h4 className="font-semibold text-base flex items-center gap-2">
//                 QuickBike <i className="ri-user-3-fill text-sm text-gray-700"></i>1
//               </h4>
//               <span className="text-sm font-semibold">₹{props.fare.moto}</span>
//             </div>
//             <p className="text-xs text-gray-600 mt-1">2 mins away • Motorcycle Ride</p>
//           </div>
//         </div>

//         {/* Auto */}
//         <div
//           onClick={() => {
//             props.setConfirmRidePanel(true);
//             props.selectVehicle("auto");
//           }}
//           className="flex items-center gap-3 bg-gray-100 shadow-md px-3 py-2 rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
//         >
//           <img src={autoImage} alt="auto" className="h-12 w-12 object-contain rounded-md" />
//           <div className="flex-1">
//             <div className="flex justify-between items-center">
//               <h4 className="font-semibold text-base flex items-center gap-2">
//                 QuickAuto <i className="ri-user-3-fill text-sm text-gray-700"></i>3
//               </h4>
//               <span className="text-sm font-semibold">₹{props.fare.auto}</span>
//             </div>
//             <p className="text-xs text-gray-600 mt-1">4 mins away • Auto Ride</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehiclePannel;





import React from "react";
import carImage from "../assets/car.webp";
import bikeImage from "../assets/moto.webp";
import autoImage from "../assets/auto.webp";

const VehiclePannel = (props) => {
  return (
    <div className="w-full">
      {/* Header: Title Left, Arrow Right */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-xl">Choose Your Ride</h3>
        <h5
          onClick={() => props.setVehiclePanel(false)}
          className="cursor-pointer"
        >
          <i className="ri-arrow-down-wide-line text-3xl text-gray-400 hover:text-black transition duration-200"></i>
        </h5>
      </div>

      {/* Vehicle Cards */}
      <div className="flex flex-col gap-3">
        {/* Car */}
        <div
          onClick={() => {
            props.setConfirmRidePanel(true);
            props.selectVehicle("car");
          }}
          className="flex items-center gap-3 bg-gray-100 shadow-sm border border-gray-200 px-2 py-2 rounded-xl hover:border-gray-500 focus-within:border-gray-600 active:border-gray-600 transition-all cursor-pointer"
        >
          <img src={carImage} alt="car" className="h-12 w-12 lg:h-20 lg:w-20 object-contain rounded-md" />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-base flex items-center gap-2">
                QuickCar <i className="ri-user-3-fill text-sm text-gray-700"></i>4
              </h4>
              <span className="text-lg font-semibold lg:text-xl">₹{props.fare.car}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">2 mins away • Compact & Affordable</p>
          </div>
        </div>

        {/* Bike */}
        <div
          onClick={() => {
            props.setConfirmRidePanel(true);
            props.selectVehicle("moto");
          }}
          className="flex items-center gap-3 bg-gray-100 shadow-sm border border-gray-200 px-2 py-2 rounded-xl hover:border-gray-500 focus-within:border-gray-600 active:border-gray-600 transition-all cursor-pointer"
        >
          <img src={bikeImage} alt="moto" className="h-12 w-12 lg:h-20 lg:w-20 object-contain rounded-md" />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-base flex items-center gap-2">
                QuickBike <i className="ri-user-3-fill text-sm text-gray-700"></i>1
              </h4>
              <span className="text-lg font-semibold lg:text-xl">₹{props.fare.moto}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">2 mins away • Motorcycle Ride</p>
          </div>
        </div>

        {/* Auto */}
        <div
          onClick={() => {
            props.setConfirmRidePanel(true);
            props.selectVehicle("auto");
          }}
          className="flex items-center gap-3 bg-gray-100 shadow-sm border border-gray-200 px-2 py-2 rounded-xl hover:border-gray-500 focus-within:border-gray-600 active:border-gray-600 transition-all cursor-pointer"
        >
          <img src={autoImage} alt="auto" className="h-12 w-12 lg:h-20 lg:w-20 object-contain rounded-md" />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-base flex items-center gap-2">
                QuickAuto <i className="ri-user-3-fill text-sm text-gray-700"></i>3
              </h4>
              <span className="text-lg font-semibold lg:text-xl">₹{props.fare.auto}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">4 mins away • Auto Ride</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclePannel;
