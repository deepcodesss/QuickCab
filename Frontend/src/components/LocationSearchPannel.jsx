
import React from "react";

const LocationSearchPannel = (props) => {
  return (
    <div className="h-full overflow-y-auto pr-2 pb-3">
      {props.suggestions.map((suggestion, idx) => (
        <div
          key={idx}
          onClick={() => {
            if (props.activeField === "pickup") {
              props.setPickup(suggestion.description);
            } else if (props.activeField === "destination") {
              props.setDestination(suggestion.description);
            }
            props.setSuggestions([]);
          }}
          className="w-full flex gap-3 border border-gray-200 px-4 py-2 rounded-lg items-center mb-2 cursor-pointer bg-white
                     lg:hover:bg-gray-200 lg:hover:border-gray-600 
                     active:bg-gray-200 active:border-gray-600 transition-all duration-200"
        >
          <div className="bg-gray-100 text-gray-700 p-2 rounded-full shadow-sm">
            <i className="ri-map-pin-fill text-base"></i>
          </div>
          <p className="text-sm font-medium text-gray-800 leading-snug">
            {suggestion.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPannel;

