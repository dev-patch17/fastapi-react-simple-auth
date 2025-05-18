import axios from 'axios';

const API_URL = 'http://localhost:8000';

interface LoginCredentials {
    username: string;
    password: string;
    [key: string]: string;
}

interface LoginResponse {
    access_token: string;
    token_type: string;
    // ...add other fields if needed
}

interface RegisterUserData {
    username: string;
    password: string;
    email?: string;
    // ...add other fields if needed
}

interface UserProfile {
    id: number;
    username: string;
    email: string;
    // ...add other fields if needed
}

const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const params = new URLSearchParams();
        for (const key in credentials) {
            params.append(key, credentials[key]);
        }

        const response = await axios.post<LoginResponse>(
            `${API_URL}/auth/token`,
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

const registerUser = async (userData: RegisterUserData): Promise<void> => {
    try {
        await axios.post(`${API_URL}/auth/register`, userData);
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};

const fetchUserProfile = async (token: string): Promise<UserProfile> => {
    try {
        const response = await axios.get<UserProfile>(`${API_URL}/users/me/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Fetch user profile error:", error);
        throw error;
    }
};

export { loginUser, registerUser, fetchUserProfile };
