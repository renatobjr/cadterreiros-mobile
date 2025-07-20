import { Stack } from "expo-router";

export default function AuthLayout() {

  return (
    <Stack screenOptions={{ headerLeft: () => null }}>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="set-email-form"/>
      <Stack.Screen name="otp" options={{ title: "Código de verificação", headerLeft: () => undefined }}/>
      <Stack.Screen name="set-password" />
    </Stack>
  )
}