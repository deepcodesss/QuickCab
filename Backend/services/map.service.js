// const axios = require("axios");
// const mapService = require("./map.service");
// const captainModel = require("../models/captain.model");
// const apiKey = process.env.LOCATIONIQ_API_KEY;
// require("dotenv").config();

// module.exports.getLatLngFromAddress = async (address) => {
//   if (!address || typeof address !== "string") {
//     throw new Error("Invalid address input : must be a string");
//   }

//   // const apiKey = process.env.LOCATIONIQ_API_KEY;

//   const url = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(
//     address
//   )}&format=json`;

//   try {
//     const response = await axios.get(url);
//     const data = response.data;

//     if (Array.isArray(data) && data.length > 0) {
//       const { lat, lon, display_name } = data[0];

//       // console.log(display_name);

//       return { lat, lon, display_name };
//     }

//     return null;
//   } catch (error) {
//     console.error("LocationIQ Error:", error.message);
//     throw new Error("Failed to fetch coordinates");
//   }
// };

// // Function to calculate the distance between 2 co-ordinates

// /*function haversineDistance(coord1, coord2) {
//         const toRad = (value) => (value * Math.PI) / 180;
//         const R = 6371; // Radius of Earth in km

//         const dLat = toRad(coord2.lat - coord1.lat);
//         const dLon = toRad(coord2.lon - coord1.lon);

//         const lat1 = toRad(coord1.lat);
//         const lat2 = toRad(coord2.lat);

//         const a =
//             Math.sin(dLat / 2) ** 2 +
//             Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//         return R * c;
//         } */

// module.exports.getDistanceTime = async (origin, destination) => {
//   const originCoords = await mapService.getLatLngFromAddress(origin);
//   const destinationCoords = await mapService.getLatLngFromAddress(destination);

//   if (!originCoords || !destinationCoords) {
//     throw new Error("Could not find coordinates for origin or destination");
//   }

//   const start = `${originCoords.lon},${originCoords.lat}`;
//   const end = `${destinationCoords.lon},${destinationCoords.lat}`;
//   const url = `https://us1.locationiq.com/v1/directions/driving/${start};${end}?key=${apiKey}&overview=false`;

//   try {
//     const response = await axios.get(url);
//     const route = response.data.routes[0];

//     const distanceInKm = (route.distance / 1000).toFixed(2); // in km
//     const durationInMin = Math.ceil(route.duration / 60); // in minutes

//     // console.log(originCoords.display_name);
//     // console.log(destinationCoords.display_name);

//     return {
//       origin: {
//         lat: originCoords.lat,
//         lon: originCoords.lon,
//         display_name: originCoords.display_name,
//       },
//       destination: {
//         lat: destinationCoords.lat,
//         lon: destinationCoords.lon,
//         display_name: destinationCoords.display_name,
//       },
//       distanceInKm,
//       durationInMin,
//     };
//   } catch (error) {
//     console.error("Directions API Error:", error.message);
//     throw new Error("Failed to fetch route data");
//   }
// };

// // const apiKey = process.env.LOCATIONIQ_API_KEY;
// // const url = `https://us1.locationiq.com/v1/autocomplete?key=${apiKey}&q=${encodeURIComponent(query)}&limit=5`;

// // try {
// //   const response = await axios.get(url);
// //   return response.data.map(item => ({
// //     display_name: item.display_name,
// //     lat: item.lat,
// //     lon: item.lon
// //   }));
// // } catch (error) {
// //   console.error("LocationIQ Autocomplete Error:", error.message);
// //   throw new Error("Failed to fetch autocomplete suggestions");
// // }

// // used for building the structure of the prediction to use as auto complete suggestions
// function buildPrediction(result) {
//   const description = result.display_name;
//   const parts = description.split(",").map((part) => part.trim());

//   const mainText = parts[0];
//   const secondaryText = parts.slice(1).join(", ");
//   let offset = 0;

//   const terms = parts.map((part) => {
//     const term = { offset, value: part };
//     offset += part.length + 2; // +2 for comma and space
//     return term;
//   });

//   return {
//     description,
//     matched_substrings: [
//       {
//         length: mainText.length,
//         offset: 0,
//       },
//     ],
//     place_id: result.place_id,
//     structured_formatting: {
//       main_text: mainText,
//       main_text_matched_substrings: [
//         {
//           length: mainText.length,
//           offset: 0,
//         },
//       ],
//       secondary_text: secondaryText,
//     },
//     terms,
//     types: result.type,
//     class: result.class,
//     boundingbox: result.boundingbox,
//     osm_type: result.osm_type,
//     osm_id: result.osm_id,
//     lat: result.lat,
//     lon: result.lon,
//     importance: result.importance,
//     icon: result.icon,
//     licence: result.licence,
//   };
// }

// module.exports.getAutoCompleteSuggestions = async (query) => {
//   if (!query || typeof query !== "string") {
//     throw new Error("Invalid query input");
//   }

//   const url = `https://us1.locationiq.com/v1/autocomplete?key=${apiKey}&q=${encodeURIComponent(
//     query
//   )}&limit=10`;

//   try {
//     const response = await axios.get(url);
//     const rawResults = response.data;

//     const formattedResults = rawResults.map(buildPrediction);

//     return {
//       predictions: formattedResults,
//       status: "OK",
//     };
//   } catch (error) {
//     console.error("LocationIQ Autocomplete Error:", error.message);
//     return {
//       predictions: [],
//       status: "ERROR",
//     };
//   }
// };

// module.exports.getCaptainInTheRadius = async (lat, lon, radius) => {
//   // radius in km
//   const captains = await captainModel.find({
//     location: {
//       $geoWithin: {
//         $centerSphere: [[lat, lon], radius / 6371],
//       },
//     },
//   });
//   return captains;
// };


const axios = require("axios");
const captainModel = require("../models/captain.model");
require("dotenv").config();

const apiKey = process.env.MAPBOX_ACCESS_TOKEN;

// 📍 Get coordinates from address
module.exports.getLatLngFromAddress = async (address) => {
  if (!address || typeof address !== "string") {
    throw new Error("Invalid address input : must be a string");
  }

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${apiKey}&limit=1`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (Array.isArray(data.features) && data.features.length > 0) {
      const location = data.features[0];
      return {
        lat: location.center[1], // Mapbox returns [lon, lat]
        lon: location.center[0],
        display_name: location.place_name,
      };
    }

    return null;
  } catch (error) {
    console.error("Mapbox Geocoding Error:", error.message);
    throw new Error("Failed to fetch coordinates");
  }
};

// 🚗 Calculate distance and time using Mapbox Directions API
module.exports.getDistanceTime = async (origin, destination) => {
  const originCoords = await module.exports.getLatLngFromAddress(origin);
  const destinationCoords = await module.exports.getLatLngFromAddress(destination);

  if (!originCoords || !destinationCoords) {
    throw new Error("Could not find coordinates for origin or destination");
  }

  const start = `${originCoords.lon},${originCoords.lat}`;
  const end = `${destinationCoords.lon},${destinationCoords.lat}`;
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start};${end}?access_token=${apiKey}&overview=false&geometries=geojson`;

  try {
    const response = await axios.get(url);
    const route = response.data.routes[0];

    const distanceInKm = (route.distance / 1000).toFixed(2);
    const durationInMin = Math.ceil(route.duration / 60);

    return {
      origin: {
        lat: originCoords.lat,
        lon: originCoords.lon,
        display_name: originCoords.display_name,
      },
      destination: {
        lat: destinationCoords.lat,
        lon: destinationCoords.lon,
        display_name: destinationCoords.display_name,
      },
      distanceInKm,
      durationInMin,
    };
  } catch (error) {
    console.error("Mapbox Directions Error:", error.message);
    throw new Error("Failed to fetch route data");
  }
};

// 🔄 Format autocomplete prediction
function buildPrediction(result) {
  const description = result.place_name;
  const parts = description.split(",").map((part) => part.trim());

  const mainText = parts[0];
  const secondaryText = parts.slice(1).join(", ");
  let offset = 0;

  const terms = parts.map((part) => {
    const term = { offset, value: part };
    offset += part.length + 2; // +2 for comma and space
    return term;
  });

  return {
    description,
    matched_substrings: [
      {
        length: mainText.length,
        offset: 0,
      },
    ],
    place_id: result.id,
    structured_formatting: {
      main_text: mainText,
      main_text_matched_substrings: [
        {
          length: mainText.length,
          offset: 0,
        },
      ],
      secondary_text: secondaryText,
    },
    terms,
    types: result.place_type,
    lat: result.center[1],
    lon: result.center[0],
  };
}

// 🔍 Autocomplete suggestions using Mapbox
module.exports.getAutoCompleteSuggestions = async (query) => {
  if (!query || typeof query !== "string") {
    throw new Error("Invalid query input");
  }

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    query
  )}.json?access_token=${apiKey}&autocomplete=true&limit=10`;

  try {
    const response = await axios.get(url);
    const rawResults = response.data.features;

    const formattedResults = rawResults.map(buildPrediction);

    return {
      predictions: formattedResults,
      status: "OK",
    };
  } catch (error) {
    console.error("Mapbox Autocomplete Error:", error.message);
    return {
      predictions: [],
      status: "ERROR",
    };
  }
};

// // 📍 Find nearby captains (MongoDB geo query)
// module.exports.getCaptainInTheRadius = async (lat, lon, radius) => {
//   const captains = await captainModel.find({
//     location: {
//       $geoWithin: {
//         $centerSphere: [[lat, lon], radius / 6371],
//       },
//     },
//   });
//   return captains;
// };

// using some formula
module.exports.getCaptainInTheRadius = async (lat, lon, radiusKm) => {
  const allCaptains = await captainModel.find({
    "location.lat": { $exists: true },
    "location.lon": { $exists: true }
  });

  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const isWithinRadius = (captain) => {
    const dLat = toRad(captain.location.lat - lat);
    const dLon = toRad(captain.location.lon - lon);
    const lat1 = toRad(lat);
    const lat2 = toRad(captain.location.lat);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance <= radiusKm;
  };

  return allCaptains.filter(isWithinRadius);
};

