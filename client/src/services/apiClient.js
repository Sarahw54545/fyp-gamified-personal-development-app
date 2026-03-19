export async function apiFetch(url, options = {}) {

    const token = localStorage.getItem("token");

    const res = await fetch(
        `${import.meta.env.VITE_API_URL}${url}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers
            }
        }
    );

    // Auto Logout when token expires
    if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");

        // optional: redirect
        window.location.href = "/login";

        throw new Error("Session expired. Please log in again.");
    }

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Request failed");
    }

    return data;
}