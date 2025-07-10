import { router, Tabs } from "expo-router";

import { useAuthStore } from "@/store/authStore";
import { useReligiousCommunityStore } from "@/store/religiousCommunityStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "@ui-kitten/components";

export default function TabLayout() {
  const { isAuth, checkAuth } = useAuthStore();
  const { fetchCountByUserId, fetchListFromUserId } =
    useReligiousCommunityStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
      }}
      screenListeners={{
        tabPress: (e) => {
          checkAuth();
          if (!isAuth) router.push("/sign-in");

          const tab = e.target;
          if (tab?.includes("home")) {
            fetchCountByUserId();
            fetchListFromUserId();
          }
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
          headerRight: () => {
            return (
              <Button
                style={{ marginRight: 20 }}
                appearance="filled"
                status="info"
                size="small"
                onPress={() => console.log("oi")}
              >Logout</Button>
            );
          },
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
