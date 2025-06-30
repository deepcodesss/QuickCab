

// import React from "react";
// import carImage from "../assets/car.webp";
// import bikeImage from "../assets/moto.webp";
// import autoImage from "../assets/auto.webp";

// const VehiclePannel = (props) => {
//   return (
//     <div className="w-full">
//       {/* Header: Title Left, Arrow Right */}
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="font-semibold text-xl">Choose Your Ride</h3>
//         <h5
//           onClick={() => props.setVehiclePanel(false)}
//           className="cursor-pointer"
//         >
//           <i className="ri-arrow-down-wide-line text-3xl text-gray-400 hover:text-black transition duration-200"></i>
//         </h5>
//       </div>

//       {/* Vehicle Cards */}
//       <div className="flex flex-col gap-3">
//         {/* Car */}
//         <div
//           onClick={() => {
//             props.setConfirmRidePanel(true);
//             props.selectVehicle("car");
//           }}
//           className="flex items-center gap-3 bg-gray-100 shadow-sm border border-gray-200 px-1 py-1 rounded-xl hover:border-gray-500 focus-within:border-gray-600 active:border-gray-600 transition-all cursor-pointer"
//         >
//           <img src={carImage} alt="car" className="h-12 w-12 lg:h-20 lg:w-20 object-contain rounded-md" />
//           <div className="flex-1">
//             <div className="flex justify-between items-center">
//               <h4 className="font-semibold text-base flex items-center gap-2">
//                 QuickCar <i className="ri-user-3-fill text-sm text-gray-700"></i>4
//               </h4>
//               <span className="text-lg font-semibold lg:text-xl">₹{props.fare.car}</span>
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
//           className="flex items-center gap-3 bg-gray-100 shadow-sm border border-gray-200 px-1 py-1 rounded-xl hover:border-gray-500 focus-within:border-gray-600 active:border-gray-600 transition-all cursor-pointer"
//         >
//           <img src={bikeImage} alt="moto" className="h-12 w-12 lg:h-20 lg:w-20 object-contain rounded-md" />
//           <div className="flex-1">
//             <div className="flex justify-between items-center">
//               <h4 className="font-semibold text-base flex items-center gap-2">
//                 QuickBike <i className="ri-user-3-fill text-sm text-gray-700"></i>1
//               </h4>
//               <span className="text-lg font-semibold lg:text-xl">₹{props.fare.moto}</span>
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
//           className="flex items-center gap-3 bg-gray-100 shadow-sm border border-gray-200 px-1 py-1 rounded-xl hover:border-gray-500 focus-within:border-gray-600 active:border-gray-600 transition-all cursor-pointer"
//         >
//           <img src={autoImage} alt="auto" className="h-12 w-12 lg:h-20 lg:w-20 object-contain rounded-md" />
//           <div className="flex-1">
//             <div className="flex justify-between items-center">
//               <h4 className="font-semibold text-base flex items-center gap-2">
//                 QuickAuto <i className="ri-user-3-fill text-sm text-gray-700"></i>3
//               </h4>
//               <span className="text-lg font-semibold lg:text-xl">₹{props.fare.auto}</span>
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
    <div className="w-full px-4 pt-4 pb-2">
      {/* Header: Title Left, Arrow Right */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-xl text-gray-900">Choose Your Ride</h3>
        <h5
          onClick={() => props.setVehiclePanel(false)}
          className="cursor-pointer"
        >
          <i className="ri-arrow-down-wide-line text-3xl text-gray-400 hover:text-black transition duration-200"></i>
        </h5>
      </div>

      {/* Vehicle Options */}
      <div className="flex flex-col divide-y divide-gray-300">
        {[
          {
            type: "car",
            name: "QuickCar",
            icon: <i className="ri-user-3-fill text-sm text-gray-600" />,
            capacity: 4,
            time: "2 mins away • Compact & Affordable",
            img: carImage,
            fare: props.fare.car,
          },
          {
            type: "moto",
            name: "QuickBike",
            icon: <i className="ri-user-3-fill text-sm text-gray-600" />,
            capacity: 1,
            time: "2 mins away • Motorcycle Ride",
            img: bikeImage,
            fare: props.fare.moto,
          },
          {
            type: "auto",
            name: "QuickAuto",
            icon: <i className="ri-user-3-fill text-sm text-gray-600" />,
            capacity: 3,
            time: "4 mins away • Auto Ride",
            img: autoImage,
            fare: props.fare.auto,
          },
        ].map((vehicle, index) => (
          <div
            key={index}
            onClick={() => {
              props.setConfirmRidePanel(true);
              props.selectVehicle(vehicle.type);
            }}
            className="flex items-center gap-4 py-3 cursor-pointer hover:bg-gray-100 transition active:bg-gray-200"
          >
            <img
              src={vehicle.img}
              alt={vehicle.name}
              className="h-12 w-12 lg:h-16 lg:w-16 object-contain"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-base flex items-center gap-2 text-gray-900">
                  {vehicle.name} {vehicle.icon}
                  {vehicle.capacity}
                </h4>
                <span className="text-lg font-semibold text-black">
                  ₹{vehicle.fare}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{vehicle.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehiclePannel;

