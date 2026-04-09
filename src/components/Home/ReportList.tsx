import type { AnimalReport } from "../../types";
import { Link } from "react-router-dom";
import { ReportStatus } from "../../types";

type ReportListProps = {
  reports: AnimalReport[];
};

function ReportList({ reports }: ReportListProps) {
  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {reports.map((report) => (
          <div className="col" key={report.id}>
            <div className="card h-100 shadow-sm hover-shadow transition">
              {/* Status Badge */}
              <div className="position-absolute top-0 end-0 m-2">
                <span
                  className={`badge ${report.status === ReportStatus.Lost ? "bg-danger" : "bg-success"}`}
                >
                  {report.status}
                </span>
              </div>

              {/* Pet Image */}
              <img
                src={report.photo}
                alt={report.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-1">{report.name}</h5>
                <p className="text-muted small mb-3">
                  <i className="bi bi-tag me-1"></i>
                  {report.type}
                </p>

                <p className="card-text text-truncate-2 small flex-grow-1">
                  {report.description}
                </p>

                <Link
                  to={`/report/${report.id}`}
                  className="btn btn-outline-primary btn-sm w-100 mt-2"
                >
                  View Details
                </Link>
              </div>

              <div className="card-footer bg-transparent border-top-0 pb-3">
                <small className="text-muted">
                  <i className="bi bi-calendar-event me-1"></i>
                  {new Date(report.date).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ReportList;
