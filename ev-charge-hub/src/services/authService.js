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

    if (response.token) {
      // Send the token to the set-token API
      const tokenResponse = await fetch("/api/set-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: response.token,
        }),
      });

      if (tokenResponse.ok) {
        console.log("Token saved successfully");
      } else {
        console.error("Error saving token");
      }
    }

    if (response.token) {
      setToken(response.token);
      return response.token;
    }

    return null
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  removeToken();
  const removeResponse = await fetch("/api/remove-token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (removeResponse.ok) {
    console.log("remove successfully");
  } else {
    console.error("Error remove token");
  }
  return { success: true };
};
