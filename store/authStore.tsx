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
  login: (
    email: string,
    password: string
  ) => Promise<{ status: boolean; data: any }>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  checkAuth: () => void;
};

export const useAuthStore = create<State & Actions>((set) => ({
  user: null,
  token: undefined,
  isAuth: false,
  isLoading: false,
  error: undefined,

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

  register: async (email: string, password: string) => {
    // try {
    //   set({ isLoading: true });
    //   const response = await authService.register(email, password);
    //   const { user, token } = response.data;
    //   await AsyncStorage.setItem(TOKEN_KEY, token);
    //   await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    //   set({ user, token, isAuth: true, isLoading: false, error: undefined });
    // } catch (error) {
    //   console.error("Erro no registro:", error);
    //   set({ isLoading: false, error: "Erro ao registrar" });
    // }
  },

  checkAuth: async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    const userString = await AsyncStorage.getItem(USER_KEY);
    
    if (token && userString) {
      const response = await authService.validateToken(token);
      console.log("checkAuth", token, userString, response);

      // if (!response.status) {
      //   await AsyncStorage.removeItem(TOKEN_KEY);
      //   await AsyncStorage.removeItem(USER_KEY);
      //   set({
      //     user: null,
      //     token: undefined,
      //     isAuth: false,
      //     isLoading: false,
      //     error: undefined,
      //   });
      //   return false;
      // }

      set({ isAuth: true, user: response.data.user });
      return true;
    }
  },
}));
