import { ApiResponse, PagedResponse, Property } from "@/app/models/property";

const DEFAULT_BASE = "https://localhost:7080";

const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? DEFAULT_BASE;

export async function getPropertiesServer({
  name,
  address,
  minPrice,
  maxPrice,
  pageNumber = 1,
  pageSize = 10,
}: {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
  pageNumber?: number;
  pageSize?: number;
} = {}): Promise<ApiResponse<PagedResponse<Property>>> {
  
  const base = getBaseUrl();
  const params = new URLSearchParams();

  if (name) params.append("name", name);
  if (address) params.append("address", address);
  if (minPrice != null) params.append("minPrice", String(minPrice));
  if (maxPrice != null) params.append("maxPrice", String(maxPrice));
  params.append("pageNumber", String(pageNumber));
  params.append("pageSize", String(pageSize));

  const url = `${base}/api/Property?${params.toString()}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  // ⬅ Aquí "aplanamos" para que devuelva directamente el PagedResponse
  const json = await res.json();
  return json;
}


