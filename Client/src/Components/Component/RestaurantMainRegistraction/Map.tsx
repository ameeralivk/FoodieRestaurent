import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type MapProps = {
  initialLatitude?: number;
  initialLongitude?: number;
  zoom?: number;
  height?: string;
  onLocationSelect?: (lat: number, lng: number) => void;
};


const MapUpdater: React.FC<{
  position: [number, number];
  setLoading: (state: boolean) => void;
}> = ({ position, setLoading }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      setLoading(true);
      map.flyTo(position, map.getZoom(), {
        animate: true,
        duration: 1.2,
      });

      // Hide loader once map movement ends
      map.once("moveend", () => setLoading(false));
    }
  }, [position, map, setLoading]);

  return null;
};


const LocationMarker: React.FC<{
  position: [number, number];
  setPosition: (pos: [number, number]) => void;
  onLocationSelect?: (lat: number, lng: number) => void;
  setLoading: (state: boolean) => void;
}> = ({ position, setPosition, onLocationSelect, setLoading }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelect?.(lat, lng);
      setLoading(true);
    },
  });

  return (
    <Marker position={position}>
      <Popup>
        Selected Location: {position[0].toFixed(4)}, {position[1].toFixed(4)}
      </Popup>
    </Marker>
  );
};

const StaticMap: React.FC<MapProps> = ({
  initialLatitude = 28.6139,
  initialLongitude = 77.209,
  zoom = 13,
  height = "h-64",
  onLocationSelect,
}) => {
  const [position, setPosition] = useState<[number, number]>([
    initialLatitude,
    initialLongitude,
  ]);
  const [loading, setLoading] = useState(false);

  // Fix marker icons
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });

  useEffect(() => {
    setPosition([initialLatitude, initialLongitude]);
  }, [initialLatitude, initialLongitude]);

  return (
    <div className={`relative w-full rounded-lg overflow-hidden shadow-lg ${height}`}>
   
      {loading && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center ">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <MapUpdater position={position} setLoading={setLoading} />

        <LocationMarker
          position={position}
          setPosition={setPosition}
          onLocationSelect={onLocationSelect}
          setLoading={setLoading}
        />
      </MapContainer>
    </div>
  );
};

export default StaticMap;
