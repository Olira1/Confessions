// Real API Configuration
const API_BASE_URL = "https://anonymous-confession-api.onrender.com/api/v1/confessions";

// Helper function for API calls
const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the server');
    }
    throw error;
  }
};

// GET /api/v1/confessions
export const getConfessions = async () => {
  const data = await apiCall(API_BASE_URL);
  
  // Ensure data is an array and sort by newest first
  const confessions = Array.isArray(data) ? data : (data.confessions || data.data || []);
  
  // Normalize the confession objects to ensure consistent field names
  const normalizedConfessions = confessions.map(confession => ({
    ...confession,
    // Ensure we have a 'content' field for backward compatibility
    content: confession.confession || confession.content || confession.message || confession.text || ''
  }));
  
  return normalizedConfessions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

// POST /api/v1/confessions
export const postConfession = async (content) => {
  if (!content || content.trim() === "") {
    throw new Error("Confession content cannot be empty");
  }

  const requestBody = {
    confession: content.trim()  // Changed from 'content' to 'confession'
  };

  const data = await apiCall(API_BASE_URL, {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });

  return data;
};