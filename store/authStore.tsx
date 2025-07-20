import authService from "@/service/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY as string;
const USER_KEY = process.env.EXPO_PUBLIC_USER_KEY as string;

type State = {
  user: any;
  token: string | undefined;
  isAuth: boolean;
  isLoading: boolean;
  error: string | undefined;
};

type Actions = {
  getToken: () => Promise<string | null>;
  login: (
    email: string,
    password: string
  ) => Promise<{ status: boolean; data: any }>;
  logout: () => Promise<void>;
  generateTokenUser: (email: string, isFromForget: boolean) => Promise<{status: boolean, data: any}>;
  verifyOTP: (token: string, otp: string) => Promise<{status: boolean, data: any}>;
  setPassword: (token: string, password: string, fullname: string) => Promise<{status: boolean, data: any}>;
  checkAuth: () => void;
};

export const useAuthStore = create<State & Actions>((set) => ({
  user: null,
  token: undefined,
  isAuth: false,
  isLoading: false,
  error: undefined,

  getToken: async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  },

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });

      const response = await authService.login(email, password);

      if (response.status) {
        await AsyncStorage.setItem(TOKEN_KEY, response.data.token);
        await AsyncStorage.setItem(
          USER_KEY,
          JSON.stringify(response.data.user)
        );

        set({
          user: response.data.user,
          token: response.data.token,
          isAuth: true,
          isLoading: false,
          error: undefined,
        });

        return { status: true, data: response.data };
      }

      set({ isLoading: false });
      return { status: false, data: null };
    } catch (error: any) {
      set({
        isLoading: false,
        isAuth: false,
        token: undefined,
        user: null,
        error: error.message,
      });

      return { status: false, data: null };
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);

    set({
      user: null,
      token: undefined,
      isAuth: false,
      isLoading: false,
      error: undefined,
    });
  },

  generateTokenUser: async (email: string, isFromForget: boolean) => {
    set({ isLoading: true });

    const response = await authService.generateUserToken(email, isFromForget);
    
    if(response.status) {
      await AsyncStorage.setItem(TOKEN_KEY, response.data);
    }

    set({ isLoading: false });
    return response;
  },

  verifyOTP: async (token: string, otp: string) => {
    set({ isLoading: true });

    const response = await authService.verifyOTP(token, otp);
    
    set({ isLoading: false });
    return response;
  },

  setPassword: async (token: string, password: string, fullname: string) => {
    set({ isLoading: true });

    const response = await authService.setPassword(token, password, fullname);
    
    set({ isLoading: false });
    return response;
  },

  checkAuth: async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    const userString = await AsyncStorage.getItem(USER_KEY);
    
    if (token && userString) {
      const response = await authService.validateToken(token);

      if (!response.status) {
        await AsyncStorage.removeItem(TOKEN_KEY);
        await AsyncStorage.removeItem(USER_KEY);
        set({
          user: null,
          token: undefined,
          isAuth: false,
          isLoading: false,
          error: undefined,
        });
        return false;
      }

      set({ isAuth: true, user: response.data.user });
      return true;
    }
  },
}));
