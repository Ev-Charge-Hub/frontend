const API_URL = process.env.NEXT_PUBLIC_API_URL + "/users";

// Register function
export const registerUser = async (username, email, password, role) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        role,
      }),
    });

    // Check if the response is OK (status code 200)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username_or_email: username,
        password: password,
      }),
    });

    // Check if the response is OK (status code 200)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to login");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error login:", error);
    throw error;
  }
};

export const logoutUser = () => {
  // We'll handle token removal in the component
  return { success: true };
};