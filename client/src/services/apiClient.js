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

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Request failed");
    }

    return data;
}