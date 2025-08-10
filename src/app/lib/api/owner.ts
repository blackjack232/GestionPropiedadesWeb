import { ApiResponse } from "@/app/models/property"; // o crea un modelo Owner si lo tienes

const DEFAULT_BASE = "https://localhost:7080";

const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? DEFAULT_BASE;

export async function getOwnerById(
  id: string
): Promise<ApiResponse<any>> {
  const base = getBaseUrl();
  const url = `${base}/api/Owner/${id}`;

  const res = await fetch(url, { next: { revalidate: 60 } }); // sin cache para info en tiempo real
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = await res.json();
  return json; // ApiResponse con data = owner
}
