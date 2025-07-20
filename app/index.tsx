import Loading from "@/components/common/loading.component";
import { useAuthStore } from "@/store/authStore";
import { Redirect } from "expo-router";

export default function Index() {
  const { isAuth } = useAuthStore();

  if (isAuth === undefined) return <Loading />; 

  return <Redirect href={isAuth ? "/(app)/home" : "/(auth)/sign-in"} />;
}
