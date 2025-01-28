const baseUrl = "https://chat-app-backend-so8n.onrender.com/api";
// const baseUrl = "http://localhost:8080/api";

export const postRequest = async (url, value) => {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    });

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      throw new Error("Unexpected content type, expected JSON");
    }

    if (!response.ok) {
      let message = data?.message || "An error occurred";
      return { error: true, message };
    }
    return data;
  } catch (error) {
    // Handle fetch errors or JSON parsing errors
    return { error: true, message: error.message || "Network error" };
  }
};

export const getRequest = async (url) => {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      throw new Error("Unexpected content type, expected JSON");
    }

    if (!response.ok) {
      let message = data?.message || "An error occurred";
      return { error: true, message };
    }
    return data;
  } catch (error) {
    return { error: true, message: error.message || "Network error" };
  }
};
