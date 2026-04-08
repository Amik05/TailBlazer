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
      <img src={report.photo} alt={report.name} style={{ width: "300px" }} />
      <h1>{report.name}</h1>
      <p>Type: {report.type}</p>
      <p>Status: {report.status}</p>
      <p>Description: {report.description}</p>
      <p>Contact: {report.contact}</p>
      <p>Last seen: {report.lastLocation.address}</p>
      <p>Date posted: {new Date(report.date).toLocaleDateString()}</p>
      {report.status === ReportStatus.Lost && (
        <>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleMarkAsFound} disabled={verifying}>
            Mark as Found
          </button>
          {verifying
            ? "Verifying..."
            : error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </>
  );
}

export default ReportDetails;
