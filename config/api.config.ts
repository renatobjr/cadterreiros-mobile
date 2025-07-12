import axios from "./axios.config";

const ApiConfig = {
  get: async (url: string, params?: any) => {
    const response = await axios.get(url, { params });
    return response.data;
  },

  post: async (url: string, data?: any, config?: any) => {
    const response = await axios.post(url, data, config);
    return response.data;
  },

  put: async (url: string, data?: any, config?: any) => {
    const response = await axios.put(url, data, config);
    return response.data;
  },
};

export default ApiConfig;
