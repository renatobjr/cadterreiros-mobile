import axios from "./axios.config";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const ApiConfig = {
  get: async (url: string, params?: any) => {
    console.log(`${API_URL}/${url}`);
    const response = await axios.get(`${API_URL}/${url}`, { params });
    return response.data;
  },

  post: async (url: string, data?: any) => {
    const response = await axios.post(`${API_URL}/${url}`, data);
    return response.data;
  },
};

export default ApiConfig;
