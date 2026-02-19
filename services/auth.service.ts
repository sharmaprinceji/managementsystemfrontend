import api from "@/lib/axios";

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
}

// Register user
export const registerUser = async (data: RegisterData) => {
    const response = await api.post("/auth/register", data);
    return response.data;
};

// Login user
export const loginUser = async (data: LoginData) => {
    const response = await api.post("/auth/login", data);

    const { accessToken, refreshToken } = response.data;

    // store tokens in localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
};

// Logout user
export const logoutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

// Get access token
export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
};
