import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Helper to change map view
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

// Fix Leaflet marker icon issue
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ position, setPosition, onLocationSelected }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelected(lat, lng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function MapPicker({ onAddressSelected, onClose }) {
  const [position, setPosition] = useState([20.5937, 78.9629]); 
  const [address, setAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newPos = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPos);
        setAddress(display_name);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelected = async (lat, lng) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const addr = data.display_name;
      setAddress(addr);
    } catch (error) {
      console.error("Reverse geocoding error:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmLocation = () => {
    if (address) {
      onAddressSelected(address);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-widest text-white">Select Property Location</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">✕</button>
        </div>
        
        {/* SEARCH BAR */}
        <form onSubmit={handleSearch} className="p-4 bg-white/5 border-b border-white/5 flex gap-2">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for an address (e.g. Whitefield, Bangalore)..."
            className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all">
            Search
          </button>
        </form>

        <div className="h-[350px] relative">
          <MapContainer center={position} zoom={5} style={{ height: "100%", width: "100%" }}>
            <ChangeView center={position} zoom={13} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} setPosition={setPosition} onLocationSelected={handleLocationSelected} />
          </MapContainer>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Selected Address</p>
            <p className="text-sm text-slate-200">
              {loading ? "Fetching address..." : address || "Click on the map to pick a location"}
            </p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={confirmLocation}
              disabled={!address || loading}
              className="flex-[2] px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-all"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
