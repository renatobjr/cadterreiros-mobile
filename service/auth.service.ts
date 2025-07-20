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
    const response = await ApiConfig.post(`${authURL}/validate-token`, null, {
      headers: {
        "X-Access-Token": `Bearer ${token}`,
      },
    });

    return response.data;
  },

  generateUserToken: async (email: string, isFromForget: boolean = false) => {
    const response = await ApiConfig.get(
      `${authURL}/generate-user-token/${email}/${isFromForget}`
    );
    return response.data;
  },

  setPassword: async (token: string, password: string, fullname: string) => {
    const response = await ApiConfig.post(`${authURL}/set-password`, {
      token,
      password,
      fullname,
    });
    return response.data;
  },

  verifyOTP: async (token: string, otp: string) => {
    const response = await ApiConfig.post(`${authURL}/verify-otp`, {
      token,
      otp,
    });
    return response.data;
  },
};

export default authService;
