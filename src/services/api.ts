const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface RequestOptions extends RequestInit {
  token?: string;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, headers, ...fetchOptions } = options;

  const authToken =
    token ||
    (typeof window !== "undefined"
      ? localStorage.getItem("luxora_token")
      : null);

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...(authToken
          ? {
              Authorization: `Bearer ${authToken}`,
            }
          : {}),
        ...headers,
      },
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || "Something went wrong"
    );
  }

  return data;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "GET",
    }),

  post: <T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: <T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(
    endpoint: string,
    options?: RequestOptions
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "DELETE",
    }),
};