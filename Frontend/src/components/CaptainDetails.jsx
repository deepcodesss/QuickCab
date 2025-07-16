// import React, { useContext } from "react";
// import { CaptainDataContext } from '../context/CaptainContext'

// const CaptainDetails = () => {


//   const { captain } = useContext(CaptainDataContext);


//   return (
// <div className="rounded-tr-2xl rounded-tl-2xl z-10 bg-white px-4 py-5">
//       <div className="flex justify-between items-center mb-5">
//         <div className="flex items-center justify-start gap-3">
//           <img
//             className="h-10 w-10 rounded-full object-cover"
//             src="https://i.pinimg.com/736x/cb/33/d8/cb33d80fe655e221ae05f41c8edd0cdb.jpg"
//             alt=""
//           />
//           <h4 className="text-lg font-medium capitalize">{captain.fullname.firstname + " " + captain.fullname.lastname} </h4>
//         </div>
//         <div className="flex flex-col items-end">
//           <h4 className="text-center text-2xl font-semibold">₹295.90</h4>
//           <p className="text-center font-medium text-gray-600">Earned</p>
//         </div>
//       </div>

// <div className="p-4 bg-gray-100 rounded-xl flex justify-between items-start gap-4">
//         <div className="text-center ">
//           <i className="text-3xl mb-2 font-extralight ri-timer-flash-fill"></i>
//           <h5 className="text-lg font-medium">10.2</h5>
//           <p className="text-sm text-gray-600">Hours Online</p>
//         </div>
//         <div className="text-center ">
//           <i className="text-3xl mb-2 font-extralight ri-speed-up-fill"></i>
//           <h5 className="text-lg font-medium">10.2</h5>
//           <p className="text-sm text-gray-600">Hours Online</p>
//         </div>
//         <div className="text-center ">
//           <i className="text-3xl mb-2 font-extralight ri-booklet-fill"></i>
//           <h5 className="text-lg font-medium">10.2</h5>
//           <p className="text-sm text-gray-600">Hours Online</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CaptainDetails;



import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div className="bg-white rounded-t-2xl px-5 py-6">
      {/* Top Row */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://i.pinimg.com/736x/cb/33/d8/cb33d80fe655e221ae05f41c8edd0cdb.jpg"
            alt="captain"
          />
          <h4 className="text-lg font-semibold capitalize text-gray-900">
            {captain.fullname.firstname + " " + captain.fullname.lastname}
          </h4>
        </div>
        <div className="text-right">
          <h4 className="text-2xl font-bold text-black">₹295.90</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="bg-gray-100 rounded-xl p-4 flex justify-between text-center text-gray-800">
        <div>
          <i className="ri-timer-flash-fill text-2xl mb-1 text-black"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>
        <div>
          <i className="ri-speed-up-fill text-2xl mb-1 text-black"></i>
          <h5 className="text-lg font-medium">25</h5>
          <p className="text-sm text-gray-500">Trips Completed</p>
        </div>
        <div>
          <i className="ri-booklet-fill text-2xl mb-1 text-black"></i>
          <h5 className="text-lg font-medium">4.9</h5>
          <p className="text-sm text-gray-500">Rating</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;

