import { Stack } from "expo-router";

const CommunityLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]/view" options={{ title: "Visualizar Comunidade" }} />
      <Stack.Screen name="[id]/edit" options={{ title: "Editar Comunidade" }} />
    </Stack>
  )
};

export default CommunityLayout;