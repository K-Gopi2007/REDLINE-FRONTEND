export const API_URL = "https://redline-backend-lf0y.onrender.com";

export const getAuthToken = () => localStorage.getItem("token");

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  // Only set Content-Type to JSON if it's not already set
  // This allows overriding it for form-urlencoded or multipart data
  if (!headers.has("Content-Type") && options.body && typeof options.body === 'string' && options.body.startsWith('{')) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response;
};
