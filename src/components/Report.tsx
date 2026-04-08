import { useState } from "react";
import { AnimalType } from "../types";
import LocationPicker from "./LocationPicker";
import { uploadImage, saveReports, getReports } from "../services";
import { ReportStatus } from "../types";
import { useNavigate } from "react-router-dom";
import type { AnimalReport } from "../types";

function Report() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    type: AnimalType.Dog,
    description: "",
    contact: "",
    password: "",
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Submit lost pet report
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!photo) {
      setError("Please select a photo");
      return;
    }
    if (!location) {
      setError("Please select a location on the map");
      return;
    }
    try {
      setLoading(true);
      const imageUrl = await uploadImage(photo);

      // Get all the reports
      const reports = await getReports();
      const newId = reports.length + 1;

      // New report obj
      const newReport: AnimalReport = {
        id: newId,
        name: form.name,
        type: form.type,
        photo: imageUrl, // from step 2
        description: form.description,
        contact: form.contact,
        password: form.password,
        status: ReportStatus.Lost,
        date: new Date().toISOString(),
        lastLocation: {
          lat: location.lat,
          lng: location.lng,
          address: location.address,
        },
      };

      await saveReports([...reports, newReport]);
      navigate("/");

      return;
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Report</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter name:
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </label>{" "}
        <br />
        <label>
          Select type:
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as AnimalType })
            }
            required
          >
            {Object.values(AnimalType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>{" "}
        <br />
        <label>
          Description
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </label>{" "}
        <br />
        <label>
          Contact:
          <input
            type="text"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            required
          />
        </label>{" "}
        <br />
        <label>
          Photo:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
            required
          />
        </label>{" "}
        <br />
        <LocationPicker
          onLocationSelect={(lat, lng, address) =>
            setLocation({ lat, lng, address })
          }
        />
        {location && <p>Selected: {location.address}</p>}
        <label>
          Password:
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </label>{" "}
        <br />
        <button type="submit" disabled={loading}>
          Submit
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p>Processing</p>}
      </form>
    </>
  );
}

export default Report;
