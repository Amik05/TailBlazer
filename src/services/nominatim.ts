interface NominatimResponse {
  display_name: string;
}

export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<string> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
  );
  if (!response.ok) throw new Error(`Geocoding failed: ${response.status}`);
  const result: NominatimResponse = await response.json();
  return result.display_name;
}
