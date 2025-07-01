import AsyncStorage from "@react-native-async-storage/async-storage";
import ax from "axios";

const axios = ax.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(
      process.env.EXPO_PUBLIC_TOKEN_KEY as string
    );
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
