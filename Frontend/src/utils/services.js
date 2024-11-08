const baseUrl = "https://chat-app-backend-so8n.onrender.com";

export const postRequest = async (url, value) => {
  const response = await fetch(`${baseUrl}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(value)
  });


  const data = await response.json();
  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }
  return data;
};

export const getRequest = async (url) => {
  const response = await fetch(`${baseUrl}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  if (!response.ok) {
    let message = "An error occurred";
    if (data?.message) {
      message = data.message;
    }
    return { error: true, message };
  }
  return data;
};
