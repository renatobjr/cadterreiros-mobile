import { useAuthStore } from "@/store/authStore";
import { Button, Layout } from "@ui-kitten/components";
import { router } from "expo-router";

const Profile = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Layout level="4" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          onPress={() => {
            logout();
            router.navigate("/sign-in");
          }}
        >
          Logout
        </Button>
    </Layout>
  );
};

export default Profile;
