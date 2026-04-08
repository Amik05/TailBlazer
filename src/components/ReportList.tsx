import type { AnimalReport } from "../types";
import { Link } from "react-router-dom";

type ReportListProps = {
  reports: AnimalReport[];
};

function ReportList({ reports }: ReportListProps) {
  return (
    <>
      <h1>List</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <img
              src={report.photo}
              alt={report.name}
              style={{ width: "80px" }}
            />
            <strong>{report.name}</strong> — {report.type} — {report.status}
            <Link to={`/report/${report.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ReportList;
