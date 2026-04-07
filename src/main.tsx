import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { getReports } from "./services/jsonbin.ts";

// import { AnimalType, ReportStatus } from "./types";
// import { getReports, saveReports } from "./services";

// const MOCK_REPORTS = [
//   {
//     id: 1,
//     name: "Buddy",
//     type: AnimalType.Dog,
//     photo: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
//     description:
//       "Golden Retriever wearing a blue collar. Very friendly but easily distracted by squirrels.",
//     contact: "555-0101",
//     lastLocation: {
//       address: "Van",
//       lat: 49.2827,
//       lng: -123.1207,
//     },
//     date: "2024-03-15T10:30:00Z",
//     password: "hashed_password_123",
//     status: ReportStatus.Lost,
//   },
//   {
//     id: 2,
//     name: "Unknown Calico",
//     type: AnimalType.Cat,
//     photo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
//     description:
//       "Found a calico cat wandering near the park. No collar, seems well-fed.",
//     contact: "555-0202",
//     lastLocation: {
//       address: "Van",
//       lat: 49.2463,
//       lng: -123.1162,
//     },
//     date: "2024-03-16T14:45:00Z",
//     password: "secure_pass_456",
//     status: ReportStatus.Found,
//   },
//   {
//     id: 3,
//     name: "Pip",
//     type: AnimalType.Bird,
//     photo: "https://images.unsplash.com/photo-1522926193341-e9fed195d6c1",
//     description:
//       "Green Budgie escaped through an open window. Responds to whistling.",
//     contact: "555-0303",
//     lastLocation: {
//       address: "Van",
//       lat: 49.2555,
//       lng: -123.0777,
//     },
//     date: "2024-03-17T09:00:00Z",
//     password: "birdie_pass_789",
//     status: ReportStatus.Lost,
//   },
//   {
//     id: 4,
//     name: "Snowball",
//     type: AnimalType.Rabbit,
//     photo: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308",
//     description:
//       "White rabbit found in the backyard. Very calm and likes carrots.",
//     contact: "555-0404",
//     lastLocation: {
//       address: "Van",
//       lat: 49.21,
//       lng: -123.13,
//     },
//     date: "2024-03-18T16:20:00Z",
//     password: "bunny_safe_101",
//     status: ReportStatus.Found,
//   },
// ];

// Test write (uncomment to test)
// saveReports(MOCK_REPORTS).then(console.log).catch(console.error);

getReports().then(console.log).catch(console.error);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
