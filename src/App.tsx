import { Routes, Route, Link } from "react-router-dom";
import { Home, Report, ReportDetails } from "./components";

function NavBar() {
  return (
    <nav className="bg-white border-bottom sticky-top py-3">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link
          className="text-decoration-none fw-bold text-primary fs-4 d-flex align-items-center"
          to="/"
        >
          <span className="me-2">🐾</span>
          <span>TailBlazer</span>
        </Link>

        {/* Link*/}
        <div className="d-flex align-items-center gap-4">
          <Link className={"text-decoration-none fw-medium "} to="/">
            Home
          </Link>

          <Link
            className="btn btn-primary px-4 rounded-pill shadow-sm fw-bold"
            to="/report/new"
          >
            Report Pet
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report/new" element={<Report />} />
        <Route path="/report/:id" element={<ReportDetails />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
