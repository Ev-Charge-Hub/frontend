
const API_URL = "http://localhost:8080/users"; 

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

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    const data = await response.json();
    return data; // The response from the server (e.g., { message: 'User registered successfully' })
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
