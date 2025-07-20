import { useAuthStore } from "@/store/authStore";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, useTheme } from "@ui-kitten/components";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-native-get-random-values';
import Toast from "react-native-toast-message";

moment.locale('pt-br');

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const theme = useTheme();
  const { isAuth, isLoading, checkAuth } = useAuthStore();
  const [fontLoaded] = useFonts({
    Nunito: require("@/assets/fonts/NunitoSans.ttf"),
  });

  useEffect(() => {
    const performAuthCheck = async () => {
      await checkAuth();
    };
    performAuthCheck();
  }, []);

  useEffect(() => {
    if (fontLoaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, isLoading]);

  if (!fontLoaded) {
    return null;
  }

  const customMapping = {
    strict: {
      "text-font-family": "Nunito",
    },
    components: {},
  };

  return (
    <ApplicationProvider
      {...eva}
      theme={{
        ...eva.light,
        ...theme,
      }}
      customMapping={customMapping}
    >
      <Stack screenOptions={{ headerShown: false, statusBarStyle: "dark" }}>
        {!isAuth ? (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        ) : (
          <Slot />
        )}
      </Stack>
      <Toast />
    </ApplicationProvider>
  );
};

export default RootLayout;
