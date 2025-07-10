import ApiConfig from "@/config/api.config";

const authURL = "auth";

const authService = {
  login: async (email: string, password: string) => {
    const response = await ApiConfig.post(`${authURL}/login`, {
      email,
      password,
    });

    console.log("response", response);

    return response.data;
  },
  validateToken: async (token: string) => {
    const response = await ApiConfig.post(`${authURL}/validate-token`, null, {
      headers: {
        "X-Access-Token": `Bearer ${token}`,
      },
    });

    return response.data;
  },
};

export default authService;
