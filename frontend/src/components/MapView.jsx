import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon for Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

import { useMap } from "react-leaflet";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const MapView = ({ lat, lon }) => {
  if (!lat || !lon) return (
    <div className="h-[300px] flex items-center justify-center text-slate-600 text-sm">
      No location data
    </div>
  );

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={15}
      style={{ height: "300px", width: "100%", borderRadius: "1rem" }}
      scrollWheelZoom={false}
    >
      <ChangeView center={[lat, lon]} zoom={15} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]}>
        <Popup>Asset Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;