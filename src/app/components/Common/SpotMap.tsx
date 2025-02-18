"use client";
// components/SpotMap.tsx
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface SpotMapProps {
  location: {
    lat: number;
    lon: number;
  };
  title: string;
}

const SpotMap: React.FC<SpotMapProps> = ({ location, title }) => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: location.lat,
    lng: location.lon,
  };

  return (
    <div className="w-full h-[400px] overflow-hidden rounded-lg">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={defaultCenter}
        >
          <Marker position={defaultCenter} title={title} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default SpotMap;
