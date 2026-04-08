import { Routes, Route, Link } from "react-router-dom";
import { Home, Report, ReportDetails } from "./components";

function NavBar() {
  return (
    <nav>
      <Link to="/">Home | </Link>
      <Link to="/report/new">Report Lost Pet</Link>
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
