import { useAuthStore } from "@/store/authStore";
import { Text } from "@react-navigation/elements";
import { Button, Layout } from "@ui-kitten/components";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <SafeAreaView>
      <Layout>
        <Text>Profile</Text>
        <Button
          onPress={() => {
            logout();
            router.navigate("/sign-in");
          }}
        >
          Logout
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default Profile;
