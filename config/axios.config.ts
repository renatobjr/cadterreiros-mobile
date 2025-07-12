import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY || "@auth_token";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    config.headers = config.headers || {};
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    if (token && config.headers) {
      config.headers["X-Access-Token"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
