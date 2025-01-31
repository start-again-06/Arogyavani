import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

const handleLogin = async () => {
  try {
    const response = await axiosInstance.post("/login", { userType });
    const { success, redirectUrl } = response.data;

    if (success) {
      window.location.href = redirectUrl;
    } else {
      alert("Login failed. Please try again.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login.");
  }
};

