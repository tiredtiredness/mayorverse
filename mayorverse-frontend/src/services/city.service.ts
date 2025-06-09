import {TCity, TCreateCity} from "@/types/city.types";
import {getAccessToken} from "./auth-token.service";
import {API_URL} from "@/constants";
import {createSearchParams} from "@/utils/createSearchParams";

class CityService {
  async getCities({name, tags, userId, isFollowing}: {
    name?: string;
    tags?: string[];
    userId?: string; isFollowing?: boolean
  }) {
    const response = await fetch(`${API_URL}/city?${createSearchParams({
      name,
      tags,
      userId,
      isFollowing,
    })}`);

    const data: TCity[] = await response.json();

    return data;
  }

  async getCity(cityId: string) {
    const accessToken = getAccessToken();

    const response = await fetch(`${API_URL}/city/${cityId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: TCity = await response.json();

    return data;
  }

  async createCity(newCity: TCreateCity) {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${API_URL}/city`, {
      method: "POST",
      body: JSON.stringify(newCity),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: TCity = await response.json();
    return data;
  }

  async updateCity(oldCity: TCity) {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${API_URL}/city/${oldCity.id}`, {
      method: "PUT",
      body: JSON.stringify(oldCity),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: TCity = await response.json();
    return data;
  }
}

export const cityService = new CityService();
