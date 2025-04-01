import { apiClient } from "./apiService";
import { setToken, removeToken } from "@/utils/tokenManager";

export const registerUser = async (username, email, password, role = "USER") => {
  try {
    return await apiClient.post("/users/register", {
      username,
      email,
      password,
      role,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (username_or_email, password) => {
  try {
    const response = await apiClient.post("/users/login", {
      username_or_email,
      password,
    });
    console.log("Login response:", response);

    if (response.token.token) {
      setToken(response.token.token);
      return response.token.token;
    }

    return null
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutUser = () => {
  removeToken();
  return { success: true };
};
