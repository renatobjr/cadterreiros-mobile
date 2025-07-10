import { Stack } from "expo-router";
import 'react-native-get-random-values';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ title: "Esqueceu a senha?" }} />
    </Stack>
  )
}