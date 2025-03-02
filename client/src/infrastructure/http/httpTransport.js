/**
 * HTTP Transport based on Fetch API
 */

export const createTransport = (baseUrl = 'http://localhost:3333') => ({
  get: async (url) => {
    const fullUrl = `${baseUrl}${url}`;
    const response = await fetch(fullUrl);
    return response.json();
  },
  post: async (url, data) => {
    const fullUrl = `${baseUrl}${url}`;
    const response = await fetch(fullUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },
  delete: async (url) => {
    const fullUrl = `${baseUrl}${url}`;
    const response = await fetch(fullUrl, {
      method: "DELETE",
    });
    return response.json();
  }
});
