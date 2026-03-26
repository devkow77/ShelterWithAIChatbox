"use client";

import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const center = { lat: 50.0417, lng: 22.0047 };

const GoogleMaps = () => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="mx-auto h-60 max-w-5xl bg-black/20 sm:h-75 md:h-100">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={15}
          options={{
            disableDefaultUI: false,
          }}
        >
          <MarkerF position={center} title="Fundacja Schronisko" />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default GoogleMaps;
