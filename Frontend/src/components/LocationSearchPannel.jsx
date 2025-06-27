import React from "react";
import mapPinIcon from "../assets/map-pin-line.png";

const LocationSearchPannel = (props) => {
  console.log(props);

  const locations = [
    "24B, Mishra's Building, Rajeev's Coding School, ChaubePur",
    "24B, Mishra's Building, Rajeev's Coding School, ChaubePur",
    "24B, Mishra's Building, Rajeev's Coding School, ChaubePur",
    "24B, Mishra's Building, Rajeev's Coding School, ChaubePur",
    "24B, Mishra's Building, Rajeev's Coding School, ChaubePur",
    "24B, Mishra's Building, Rajeev's Coding School, ChaubePur",
    "24B, Mishra's Building, Rajeev's Coding School, ChaubePur",
    "24B, Mishra's Building, Rajeev's Coding School, ChaubePur",
    "24B, Mishra's Building, Rajeev's Coding School, ChaubePur",
    "24B, Mishra's Building, Rajeev's Coding School, ChaubePur",
    "24B, Mishra's Building, Rajeev's Coding School, ChaubePur",
    "24B, Mishra's Building, Rajeev's Coding School, ChaubePur",
  ];
  return (
    <div>
      {/* these are just the sample datasets */}

      {locations.map(function (elem, idx) {
        return (
          <div
            key={idx}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
              console.log(props.vehiclePanel);
            }}
            className="flex gap-4 border-2 border-gray-200 p-2 rounded-xl active:border-black items-center my-4 justify-start"
          >
            <h2 className="bg-gray-200 p-1 rounded-full px-2">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">
              24B, Mishra's Building, Rajeev's Coding School, ChaubePur
            </h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPannel;
