import { Trace} from "@/app/models/trace";

const DEFAULT_BASE = "https://localhost:7080";

const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? DEFAULT_BASE;

export async function getPropertyTrace(id: string): Promise<Trace[]> {
  const base = getBaseUrl();
  const url = `${base}/api/PropertyTrace/${id}`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return await res.json();
}
