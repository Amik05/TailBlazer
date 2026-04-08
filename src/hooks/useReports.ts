import { useState, useEffect } from "react";
import type { AnimalReport } from "../types";
import { getReports } from "../services";

export function useReports() {
  const [reports, setReports] = useState<AnimalReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // onLoad
  useEffect(() => {
    // fetch reports
    async function fetchReports() {
      try {
        setLoading(true);
        setReports(await getReports());
      } catch (err) {
        setError("Failed to load reports. Please try again.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  return { reports, loading, error };
}
