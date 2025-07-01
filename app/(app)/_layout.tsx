import { router, Tabs } from "expo-router";

import { useAuthStore } from "@/store/authStore";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  const { isAuth, checkAuth } = useAuthStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
      }}
      screenListeners={{
        tabPress: (e) => {
          checkAuth();
          if (!isAuth) router.push("/sign-in");
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: "Cadastrar Terreiro",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
