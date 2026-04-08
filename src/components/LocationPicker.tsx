import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import { useState } from "react";
import { reverseGeocode } from "../services";

// Leaflet tries to load marker images from a relative path that doesn't exist
// after bundling. We need to load the CDNs manually
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Pin {
  lat: number;
  lng: number;
  address: string;
}

type LocationPickerProps = {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
};

type ClickHandlerProps = {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  setPin: (pin: Pin) => void;
};

const SFU: [number, number] = [49.2761, -122.9162];

// This inner component handles the click event
function ClickHandler({ onLocationSelect, setPin }: ClickHandlerProps) {
  useMapEvents({
    click(e) {
      // e.latlng gives you the clicked coordinates
      // call onLocationSelect with the lat and lng here
      reverseGeocode(e.latlng.lat, e.latlng.lng).then((address) => {
        setPin({ lat: e.latlng.lat, lng: e.latlng.lng, address });
        onLocationSelect(e.latlng.lat, e.latlng.lng, address);
      });
    },
  });
  return null;
}

function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [pin, setPin] = useState<Pin | null>(null);
  return (
    <MapContainer
      center={SFU} // SFU coordinates
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Add ClickHandler here, passing onLocationSelect as a prop */}
      <ClickHandler onLocationSelect={onLocationSelect} setPin={setPin} />

      {/* Show pin */}
      {pin && (
        <Marker position={[pin.lat, pin.lng]}>
          <Popup>{pin.address}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default LocationPicker;
