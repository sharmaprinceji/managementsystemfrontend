import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor → add access token
api.interceptors.request.use((config) => {

    const token =
        localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});

// Response interceptor → auto refresh token
api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest =
            error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                const refreshToken =
                    localStorage.getItem("refreshToken");

                const res = await axios.post(
                    "http://localhost:5000/auth/refresh",
                    { refreshToken }
                );

                const newAccessToken =
                    res.data.accessToken;

                localStorage.setItem(
                    "accessToken",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (err) {

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                window.location.href = "/login";

            }

        }

        return Promise.reject(error);

    }
);

export default api;
