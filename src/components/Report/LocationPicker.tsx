import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import { useState } from "react";
import { reverseGeocode } from "../../services";

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
  setGeocodeError: (error: string | null) => void;
};

const SFU: [number, number] = [49.2761, -122.9162];

// This inner component handles the click event
function ClickHandler({
  onLocationSelect,
  setPin,
  setGeocodeError,
}: ClickHandlerProps) {
  useMapEvents({
    async click(e) {
      // e.latlng gives you the clicked coordinates
      // call reverseGeocode service
      const { lat, lng } = e.latlng;
      try {
        setGeocodeError(null);
        const address = await reverseGeocode(lat, lng);
        // Update the pins with human readable addrress
        setPin({ lat, lng, address });
        onLocationSelect(lat, lng, address);
      } catch (err) {
        console.error("Geocoding failed:", err);
        setGeocodeError("Could not determine the address for this location.");
      }
    },
  });
  return null;
}

function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [pin, setPin] = useState<Pin | null>(null);
  // Error handling
  const [geocodeError, setGeocodeError] = useState<string | null>(null);
  return (
    <MapContainer
      center={SFU} // SFU coordinates
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* ClickHandler passing onLocationSelect as a prop */}
      <ClickHandler
        onLocationSelect={onLocationSelect}
        setPin={setPin}
        setGeocodeError={setGeocodeError}
      />
      {/* Show the error to the user here */}
      {geocodeError && (
        <p style={{ color: "red", fontWeight: "bold" }}>{geocodeError}</p>
      )}
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
