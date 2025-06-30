import { useAuthStore } from "@/store/authStore";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { default as theme } from "../cadterreiros-theme.json";

const RootLayout = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      const result = await checkAuth();
      setIsAuthenticated(result);
    };
    authenticate();
  }, [checkAuth]);

  return (
    <>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <Stack>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
          </Stack.Protected>

          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
      </ApplicationProvider>
    </>
  );
};

export default RootLayout;
