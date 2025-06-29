import React from "react";

const LocationSearchPannel = (props) => {
  // console.log(props);

  return (
    <div>
      {/* these are just the sample datasets */}

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
    className="flex gap-4 border-2 border-gray-200 p-2 rounded-xl active:border-black items-center my-4 justify-start"
  >
    <h2 className="bg-gray-200 p-1 rounded-full px-2">
      <i className="ri-map-pin-fill"></i>
    </h2>
    <h4 className="font-medium">{suggestion.description}</h4>
  </div>
))}
    </div>
  );
};

export default LocationSearchPannel;
