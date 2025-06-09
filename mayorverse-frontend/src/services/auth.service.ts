import {TLoginForm, TRegisterForm, TUser} from "@/types/auth.types";
import {
  getAccessToken,
  removeFromStorage,
  saveTokenStorage
} from "./auth-token.service";
import {API_URL} from "@/constants";

class AuthService {
  async register(formData: TRegisterForm) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(formData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data?.accessToken) saveTokenStorage(data?.accessToken);

    return data;
  }

  async login(formData: TLoginForm) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data?.accessToken) saveTokenStorage(data?.accessToken);
    return data;
  }

  async getProfile() {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${API_URL}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        removeFromStorage();
      }

      const error = await response.json();
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    const data: TUser = await response.json();

    return data;
  }

  async logout() {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    removeFromStorage();
  }
}

export const authService = new AuthService();
