import { useParams, useNavigate } from "react-router-dom";
import { useReports } from "../hooks";
import { ReportStatus } from "../types";
import { useState } from "react";
import { getReports, saveReports } from "../services";

function ReportDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { reports, loading, error: fetchError } = useReports();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Verifying stage
  const [verifying, setVerifying] = useState(false);

  // Get the correct report
  const report = reports.find((r) => r.id === Number(id));

  if (loading) return <p>Loading...</p>;
  if (fetchError) return <p style={{ color: "red" }}>{fetchError}</p>;
  if (!report) return <p>Report not found</p>;

  // Update Found report
  async function handleMarkAsFound() {
    if (!report) return;
    try {
      setVerifying(true);
      if (password !== report.password) {
        setError("Incorrect password");
        return;
      }
      // password matches, update the report
      const allReports = await getReports();
      const updated = allReports.map((r) =>
        r.id === report.id ? { ...r, status: ReportStatus.Found } : r,
      );
      await saveReports(updated);
      navigate(`/`); // navigate to home
    } catch {
      setError("Something went wrong. Please try again");
    } finally {
      setVerifying(false);
    }
  }

  return (
    <>
      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          {/* Left Column: Image */}
          <div className="col-md-5">
            <div className="card border-0 shadow-sm overflow-hidden">
              <img
                src={report.photo}
                alt={report.name}
                className="img-fluid"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Right Column: Information */}
          <div className="col-md-7">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span
                className={`badge ${report.status === ReportStatus.Lost ? "bg-danger" : "bg-success"}`}
              >
                {report.status}
              </span>
              <span className="text-muted small">
                Posted on {new Date(report.date).toLocaleDateString()}
              </span>
            </div>

            <h1 className="display-5 fw-bold mb-3">{report.name}</h1>

            <div className="p-4 bg-light rounded-4 border mb-4">
              <div className="row g-3">
                <div className="col-6">
                  <label className="text-muted small text-uppercase fw-bold">
                    Type
                  </label>
                  <p className="mb-0 fw-semibold">{report.type}</p>
                </div>
                <div className="col-6">
                  <label className="text-muted small text-uppercase fw-bold">
                    Contact Info
                  </label>
                  <p className="mb-0 fw-semibold text-primary">
                    {report.contact}
                  </p>
                </div>
                <div className="col-12">
                  <label className="text-muted small text-uppercase fw-bold">
                    Last Seen At
                  </label>
                  <p className="mb-0 fw-semibold">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                    {report.lastLocation.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="h5 fw-bold">Description</h3>
              <p className="text-secondary" style={{ whiteSpace: "pre-wrap" }}>
                {report.description}
              </p>
            </div>

            {/* Admin Action: Mark as Found */}
            {report.status === ReportStatus.Lost && (
              <div className="card border-warning bg-warning bg-opacity-10 p-4">
                <h4 className="h6 fw-bold text-warning-emphasis mb-3 text-uppercase">
                  Manage this Report
                </h4>
                <p className="small mb-3">
                  Found your pet? Enter your report password to update the
                  status.
                </p>

                <div className="input-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={verifying}
                  />
                  <button
                    className="btn btn-warning px-4 fw-bold"
                    onClick={handleMarkAsFound}
                    disabled={verifying || !password}
                  >
                    {verifying ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : null}
                    Mark as Found
                  </button>
                </div>

                {error && (
                  <p className="text-danger small mt-2 mb-0 fw-bold">{error}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportDetails;
