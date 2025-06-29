import React, { useState } from "react";
import axios from "axios";

const LocationInput = ({ value, setValue, placeholder }) => {
  const [suggestions, setSuggestions] = useState([]);
  const token = localStorage.getItem("token");

  const handleChange = async (e) => {
    const val = e.target.value;
    setValue(val);

    if (val.length > 2) {
      try {
        const res = await axios.get(
          `http://localhost:4000/map/get-suggestions?query=${encodeURIComponent(val)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuggestions(res.data.predictions);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (description) => {
    setValue(description);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="bg-gray-200 px-15 py-2 text-base rounded-lg mt-3 w-full focus:outline-gray-700"
      />
      {suggestions.length > 0 && (
        <div className="absolute z-10 bg-white w-full shadow-lg max-h-60 overflow-y-auto mt-1 rounded-md">
          {suggestions.map((sug, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(sug.description)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {sug.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
