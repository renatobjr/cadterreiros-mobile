import ApiConfig from "@/config/api.config";

const authURL = "auth";

const authService = {
  login: async (email: string, password: string) => {
    const response = await ApiConfig.post(`${authURL}/login`, {
      email,
      password,
    });

    return response.data;
  },
  validateToken: async (token: string) => {
    const response = await ApiConfig.post(`${authURL}/validate-token`);

    return response.data;
  },
};

export default authService;
