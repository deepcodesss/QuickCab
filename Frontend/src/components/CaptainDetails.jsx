import React, { useContext } from "react";
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {


  const { captain } = useContext(CaptainDataContext);


  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://i.pinimg.com/736x/cb/33/d8/cb33d80fe655e221ae05f41c8edd0cdb.jpg"
            alt=""
          />
          <h4 className="text-lg font-medium capitalize">{captain.fullname.firstname + " " + captain.fullname.lastname} </h4>
        </div>
        <div className="flex flex-col items-end">
          <h4 className="text-center text-2xl font-semibold">₹295.90</h4>
          <p className="text-center font-medium text-gray-600">Earned</p>
        </div>
      </div>

      <div className="p-6 bg-gray-100 rounded-xl flex justify-center items-start gap-10">
        <div className="text-center ">
          <i className="text-3xl mb-2 font-extralight ri-timer-flash-fill"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center ">
          <i className="text-3xl mb-2 font-extralight ri-speed-up-fill"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center ">
          <i className="text-3xl mb-2 font-extralight ri-booklet-fill"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
