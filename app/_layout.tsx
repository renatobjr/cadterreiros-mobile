import { useAuthStore } from "@/store/authStore";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, useTheme } from "@ui-kitten/components";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

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
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuth ? (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        ) : (
          <Slot />
        )}
      </Stack>
    </ApplicationProvider>
  );
};

export default RootLayout;
