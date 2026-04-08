import type { AnimalReport } from "../types";

export interface JsonBinResponse {
  record: {
    reports: AnimalReport[];
  };
}

// -- Config from .env -- //
const KEY = import.meta.env.VITE_JSONBIN_KEY as string;
const BIN_ID = import.meta.env.VITE_BIN_ID as string;

const BASE = "https://api.jsonbin.io/v3";

// CRUD functions for JSONbin
export async function getReports(): Promise<AnimalReport[]> {
  if (!KEY) throw new Error("VITE_JSONBIN_KEY is not set in .env");
  if (!BIN_ID) throw new Error("VITE_BIN_ID is not set in .env");
  const res = await fetch(`${BASE}/b/${BIN_ID}`, {
    headers: { "X-Master-Key": KEY },
  });
  if (!res.ok) throw new Error(`Read failed: ${res.status}`);
  const json: JsonBinResponse = await res.json();
  // The actual data is always in json.record
  return json.record.reports ?? [];
}

export async function saveReports(
  reports: AnimalReport[],
): Promise<AnimalReport[]> {
  if (!KEY) throw new Error("VITE_JSONBIN_KEY is not set in .env");
  if (!BIN_ID) throw new Error("VITE_BIN_ID is not set in .env");
  const res = await fetch(`${BASE}/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": KEY,
    },
    body: JSON.stringify({ reports }),
  });
  if (!res.ok) throw new Error(`Write failed: ${res.status}`);
  const json: JsonBinResponse = await res.json();
  return json.record.reports ?? [];
}
