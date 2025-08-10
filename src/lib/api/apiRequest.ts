// lib/apiClient.ts
const DEFAULT_BASE = "https://localhost:7080";

const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? DEFAULT_BASE;

interface ApiOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
  body?: any;
  withAuth?: boolean;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const base = getBaseUrl();

  // Construir URL con parámetros
  let url = `${base}${endpoint}`;
  if (options.params) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(options.params)) {
      if (value !== undefined && value !== null)
        query.append(key, String(value));
    }
    url += `?${query.toString()}`;
  }

  const headers = new Headers({
    "Content-Type": "application/json",
    ...(options.headers || {}),
  });

  if (options.withAuth) {
    const token = localStorage.getItem("token");
    if (token) headers.append("Authorization", `Bearer ${token}`);
  }

  // Configuración final del fetch
  const res = await fetch(url, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}
