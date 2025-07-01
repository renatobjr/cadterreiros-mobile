import { useAuthStore } from "@/store/authStore";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { default as theme } from "../cadterreiros-theme.json";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { isAuth, isLoading, checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();

    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [checkAuth, isLoading]);

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuth ? (
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        )}
      </Stack>
    </ApplicationProvider>
  );
};

export default RootLayout;
