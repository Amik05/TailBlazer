import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { AnimalReport } from "../types";
import { ReportStatus } from "../types";
import { Link } from "react-router-dom";

// custom iconds
const lostIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const foundIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type ReportMapProps = {
  reports: AnimalReport[];
};

// Default location
const SFU: [number, number] = [49.2761, -122.9162];

function ReportMap({ reports }: ReportMapProps) {
  return (
    <MapContainer
      center={SFU} // SFU coordinates
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Show pin */}
      {reports &&
        reports
          //   .filter((report) => report.status === ReportStatus.Lost)
          .map((report) => (
            <Marker
              key={report.id}
              position={[report.lastLocation.lat, report.lastLocation.lng]}
              icon={report.status === ReportStatus.Lost ? lostIcon : foundIcon}
            >
              <Popup>
                <img
                  src={report.photo}
                  alt={report.name}
                  style={{ width: "100px" }}
                />
                <br />
                <strong>{report.name}</strong> — {report.type}
                <br />
                <Link to={`/report/${report.id}`}>View Details</Link>
              </Popup>
            </Marker>
          ))}
    </MapContainer>
  );
}

export default ReportMap;
