interface ImgBBResponse {
  data: {
    url: string;
  };
}

const KEY = import.meta.env.VITE_IMGBB_KEY as string;

const BASE = "https://api.imgbb.com/1/upload";

export async function uploadImage(file: File): Promise<string> {
  if (!KEY) throw new Error("VITE_IMAGEBB_KEY is not set in .env");
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${BASE}?key=${KEY}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Image upload failed");

  const result: ImgBBResponse = await response.json();
  return result.data.url;
}
