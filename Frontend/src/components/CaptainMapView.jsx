import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const CaptainMapView = ({ ride }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const currentLocationMarker = useRef(null);
  const pickupMarker = useRef(null);
  const destinationMarker = useRef(null);

  const [captainCoords, setCaptainCoords] = useState(null);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  // Initialize map
  useEffect(() => {
    if (mapRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const loc = { lat: latitude, lon: longitude };
        setCaptainCoords(loc);
        initMap(loc);
      },
      (err) => {
        console.error("Geolocation error:", err.message);
        const fallback = { lat: 12.9716, lon: 77.5946 };
        setCaptainCoords(fallback);
        initMap(fallback);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const initMap = ({ lat, lon }) => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lon, lat],
      zoom: 13,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    mapRef.current.on("load", () => {
      if (!ride) {
        currentLocationMarker.current = new mapboxgl.Marker({ color: "blue" })
          .setLngLat([lon, lat])
          .setPopup(new mapboxgl.Popup().setText("Your Location"))
          .addTo(mapRef.current);
      }

      geocodeRideAddresses();
    });

    mapRef.current.on("styledata", () => {
      drawRideRoute();
    });
  };

  const geocodeAddress = async (address) => {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await res.json();
    const [lon, lat] = data.features?.[0]?.center || [];
    return lat && lon ? { lat, lon } : null;
  };

  const geocodeRideAddresses = async () => {
    if (!ride?.pickup || !ride?.destination) return;

    const [pickupResult, destinationResult] = await Promise.all([
      geocodeAddress(ride.pickup),
      geocodeAddress(ride.destination),
    ]);

    if (pickupResult) setPickupCoords(pickupResult);
    if (destinationResult) setDestinationCoords(destinationResult);
  };

  const drawRideRoute = () => {
    const map = mapRef.current;
    if (!map) return;

    if (ride && currentLocationMarker.current) {
      currentLocationMarker.current.remove();
      currentLocationMarker.current = null;
    }

    // Pickup Marker
    if (pickupCoords) {
      if (!pickupMarker.current) {
        pickupMarker.current = new mapboxgl.Marker({ color: "green" })
          .setLngLat([pickupCoords.lon, pickupCoords.lat])
          .setPopup(new mapboxgl.Popup().setText("Pickup Location"))
          .addTo(map);
      } else {
        pickupMarker.current.setLngLat([pickupCoords.lon, pickupCoords.lat]);
      }
    }

    // Destination Marker
    if (destinationCoords) {
      if (!destinationMarker.current) {
        destinationMarker.current = new mapboxgl.Marker({ color: "red" })
          .setLngLat([destinationCoords.lon, destinationCoords.lat])
          .setPopup(new mapboxgl.Popup().setText("Destination"))
          .addTo(map);
      } else {
        destinationMarker.current.setLngLat([destinationCoords.lon, destinationCoords.lat]);
      }
    }

    // Draw Route
    if (pickupCoords && destinationCoords) {
      const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoords.lon},${pickupCoords.lat};${destinationCoords.lon},${destinationCoords.lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

      fetch(routeUrl)
        .then((res) => res.json())
        .then((data) => {
          const route = data.routes[0]?.geometry;
          if (!route || !map.isStyleLoaded()) return;

          if (map.getLayer("route")) map.removeLayer("route");
          if (map.getSource("route")) map.removeSource("route");

          map.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: route,
            },
          });

          map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#3b82f6",
              "line-width": 5,
            },
          });

          const bounds = route.coordinates.reduce(
            (b, coord) => b.extend(coord),
            new mapboxgl.LngLatBounds(route.coordinates[0], route.coordinates[0])
          );
          map.fitBounds(bounds, { padding: 60 });
        })
        .catch((err) => console.error("Route fetch error:", err));
    } else if (captainCoords) {
      map.flyTo({ center: [captainCoords.lon, captainCoords.lat], zoom: 13 });
    }
  };

  useEffect(() => {
    if (ride) geocodeRideAddresses();
  }, [ride]);

  useEffect(() => {
    if (pickupCoords && destinationCoords) drawRideRoute();
  }, [pickupCoords, destinationCoords]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};

export default CaptainMapView;
