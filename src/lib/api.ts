const BASE_URL = import.meta.env.VITE_API_URL

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch (err) {
    // Network failure (server unreachable, DNS, CORS at network level).
    throw new ApiError(
      err instanceof Error ? err.message : 'Falha de conexão.',
      0,
    )
  }

  let json: { data?: unknown; error?: string } = {}
  try {
    json = await res.json()
  } catch {
    // ignore parse errors; will be handled below
  }

  if (!res.ok) {
    throw new ApiError(json.error ?? 'Erro inesperado.', res.status)
  }

  return json.data as T
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
}
