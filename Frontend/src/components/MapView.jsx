
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapView = ({ pickupCoords, destinationCoords }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const pickupMarker = useRef(null);
  const destinationMarker = useRef(null);
  const currentLocationMarker = useRef(null);

  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/streets-v11");
  const [userLocation, setUserLocation] = useState(null);

  // Initialize Map
  useEffect(() => {
    if (mapRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const currentLoc = { lat: latitude, lon: longitude };
        setUserLocation(currentLoc);
        initMap(currentLoc);
      },
      (err) => {
        console.error("Geolocation error:", err.message);
        const fallback = { lat: 12.9716, lon: 77.5946 };
        setUserLocation(fallback);
        initMap(fallback);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const initMap = ({ lat, lon }) => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [lon, lat],
      zoom: 13,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    mapRef.current.on("load", () => {
      if (!pickupCoords && !destinationCoords) {
        currentLocationMarker.current = new mapboxgl.Marker({ color: "blue" })
          .setLngLat([lon, lat])
          .setPopup(new mapboxgl.Popup().setText("Your Location"))
          .addTo(mapRef.current);
      }

      drawRoute(); // draw route only when map is loaded
    });

    mapRef.current.on("styledata", () => {
      drawRoute(); // redraw route after style switch
    });
  };

  // Draw route & markers
  const drawRoute = () => {
    const map = mapRef.current;
    if (!map || !userLocation) return;

    // Remove current location marker if pickup or destination is set
    if ((pickupCoords || destinationCoords) && currentLocationMarker.current) {
      currentLocationMarker.current.remove();
      currentLocationMarker.current = null;
    }

    // Pickup Marker
    if (pickupCoords) {
      if (!pickupMarker.current) {
        pickupMarker.current = new mapboxgl.Marker({ color: "green" })
          .setLngLat([pickupCoords.lon, pickupCoords.lat])
          .addTo(map);
      } else {
        pickupMarker.current.setLngLat([pickupCoords.lon, pickupCoords.lat]);
      }
    } else if (pickupMarker.current) {
      pickupMarker.current.remove();
      pickupMarker.current = null;
    }

    // Destination Marker
    if (destinationCoords) {
      if (!destinationMarker.current) {
        destinationMarker.current = new mapboxgl.Marker({ color: "red" })
          .setLngLat([destinationCoords.lon, destinationCoords.lat])
          .addTo(map);
      } else {
        destinationMarker.current.setLngLat([destinationCoords.lon, destinationCoords.lat]);
      }
    } else if (destinationMarker.current) {
      destinationMarker.current.remove();
      destinationMarker.current = null;
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
    }
  };

  // Redraw route when pickup/destination changes
  useEffect(() => {
    drawRoute();
  }, [pickupCoords, destinationCoords]);

  // Zoom + Style Switcher
  const handleZoomIn = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();
  const toggleStyle = () => {
    const styles = [
      "mapbox://styles/mapbox/streets-v11",
      "mapbox://styles/mapbox/dark-v10",
      "mapbox://styles/mapbox/satellite-streets-v11",
    ];
    const next = styles[(styles.indexOf(mapStyle) + 1) % styles.length];
    setMapStyle(next);
    mapRef.current?.setStyle(next);
  };

  return (
    <div className="relative w-full h-full z-10">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute top-5 right-5 flex flex-col gap-2 z-50 pointer-events-auto">
        <button onClick={toggleStyle} className="bg-white rounded shadow-md px-3 py-1 text-xs hover:bg-gray-100">Toggle Style</button> 
      </div>
    </div>
  );
};

export default MapView;
