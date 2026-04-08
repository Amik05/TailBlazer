import { useReports } from "../hooks";
import { useState } from "react";
import ReportMap from "./ReportMap";
import ReportList from "./ReportList";
import { AnimalType, ReportStatus } from "../types";

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
      <h1>Home</h1>

      <ReportMap reports={filtered} />
      <input
        type="text"
        placeholder="Search by name..."
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value as AnimalType | "all")}
      >
        <option value="all">All</option>
        {Object.values(AnimalType).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(e.target.value as ReportStatus | "all")
        }
      >
        <option value="all">All</option>
        {Object.values(ReportStatus).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <ReportList reports={filtered} />
    </>
  );
}

export default Home;
