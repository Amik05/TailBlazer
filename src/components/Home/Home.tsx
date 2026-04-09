import { useReports } from "../../hooks";
import { useState } from "react";
import ReportMap from "./ReportMap";
import ReportList from "./ReportList";
import { AnimalType, ReportStatus } from "../../types";

function Home() {
  // Filter the reports states
  const [typeFilter, setTypeFilter] = useState<AnimalType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "all">("all");
  const [nameFilter, setNameFilter] = useState("");

  // Get the reports
  const { reports, loading, error } = useReports();
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Filter on hook state change
  const filtered = reports.filter((report) => {
    const matchesType = typeFilter === "all" || report.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;
    const matchesName = report.name
      .toLowerCase()
      .includes(nameFilter.toLocaleLowerCase());
    return matchesType && matchesStatus && matchesName;
  });

  return (
    <>
      <div className="container py-4">
        <h1 className="mb-4">Community Reports</h1>

        {/* MAP - Added a fixed height so it actually appears */}
        <div
          className="rounded overflow-hidden shadow-sm mb-4 border"
          style={{ height: "500px", width: "100%" }}
        >
          <ReportMap reports={filtered} />
        </div>

        {/* Filters - Wrapped in col-md for side-by-side layout */}
        <div className="row g-3 mb-5">
          <div className="col-md-6">
            <label className="form-label small text-uppercase fw-bold text-muted">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name..."
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label small text-uppercase fw-bold text-muted">
              Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as AnimalType | "all")
              }
              className="form-select"
            >
              <option value="all">All Animals</option>
              {Object.values(AnimalType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label small text-uppercase fw-bold text-muted">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as ReportStatus | "all")
              }
              className="form-select"
            >
              <option value="all">All Statuses</option>
              {Object.values(ReportStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* List */}
        <div className="mt-4">
          <h2 className="h4 mb-3">Recent Reports ({filtered.length})</h2>
          <ReportList reports={filtered} />
        </div>
      </div>
    </>
  );
}

export default Home;
