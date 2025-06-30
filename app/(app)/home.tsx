import { useAuthStore } from "@/store/authStore";
import { Button } from "@ui-kitten/components";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <SafeAreaView>
      <View>
        <Text>Home</Text>
        <Button
          onPress={() => {
            logout();
            router.navigate("/sign-in");
          }}
        >
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Home;
