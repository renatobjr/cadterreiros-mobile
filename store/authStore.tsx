import authService from "@/service/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const TOKEN_KEY = "@auth_token";
const USER_KEY = "@auth_user";

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
  ) => Promise<{ success: boolean; error?: string }>;
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
      const { user, token } = response.data;

      await AsyncStorage.setItem(TOKEN_KEY, token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));

      set({ user, token, isAuth: true, isLoading: false, error: undefined });

      return { success: true };
    } catch (error: any) {
      console.error(error);

      set({
        isLoading: false,
        isAuth: false,
        token: undefined,
        user: null,
        error: "Falha ao fazer login",
      });

      return { success: false, error: "Falha ao fazer login" };
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

    console.log("logout");
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
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      const userString = await AsyncStorage.getItem(USER_KEY);

      if (token && userString) {
        const response = await authService.validateToken(token);
        const user = response.data.user;

        set({
          user,
          token,
          isAuth: true,
          isLoading: false,
          error: undefined,
        });
      }
    } catch (error) {
      console.error("Erro ao restaurar sessão:", error);

      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);

      set({
        user: null,
        token: undefined,
        isAuth: false,
        isLoading: false,
        error: "Erro ao restaurar sessão",
      });

      return false;
    }
  },
}));
