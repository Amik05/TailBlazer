import { useState } from "react";
import { AnimalType, ReportStatus } from "../../types";
import LocationPicker from "./LocationPicker";
import { uploadImage, saveReports, getReports } from "../../services";
import { useNavigate } from "react-router-dom";
import type { AnimalReport } from "../../types";

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
      const reports = await getReports();
      const newId = reports.length + 1;

      const newReport: AnimalReport = {
        id: newId,
        name: form.name,
        type: form.type,
        photo: imageUrl,
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
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <h1 className="card-title h3 mb-4 text-center">Report a Lost Pet</h1>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* LEFT SIDE: Form Fields */}
              <div className="col-md-6 border-end-md">
                <div className="mb-3">
                  <label className="form-label">Pet Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Buddy"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Animal Type</label>
                  <select
                    className="form-select"
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
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Distinguishing marks..."
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contact Info</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.contact}
                    onChange={(e) =>
                      setForm({ ...form, contact: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Photo of Pet</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Report Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* RIGHT SIDE: Map*/}
              <div className="col-md-6 ps-md-4">
                <div className="mb-2">
                  <label className="form-label">Last Seen Location</label>
                  <div
                    className="border rounded overflow-hidden"
                    style={{ minHeight: "300px" }}
                  >
                    <LocationPicker
                      onLocationSelect={(lat, lng, address) =>
                        setLocation({ lat, lng, address })
                      }
                    />
                  </div>
                </div>

                {location && (
                  <div className="alert alert-info py-2 small mt-2">
                    <i className="bi bi-geo-alt-fill me-1"></i>{" "}
                    {location.address}
                  </div>
                )}
              </div>
            </div>

            {/* Action Section */}
            <hr className="my-4" />
            <div className="row justify-content-center">
              <div className="col-md-4 text-center">
                {error && <div className="text-danger small mb-3">{error}</div>}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Submit Report"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Report;
