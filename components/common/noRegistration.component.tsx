import { Layout, Text } from "@ui-kitten/components";
import { Image } from "expo-image";

const NoRegistration = () => {
  const noRegistrationImage = require("@/assets/images/no_registrations_colored.png");
  return (
    <Layout style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        contentFit="contain"
        source={noRegistrationImage}
        style={{ width: 100, height: 100 }}
      />
      <Text category="p1" style={{ textAlign: "center" }}>
        Nenhum cadastro encontrado
      </Text>
    </Layout>
  );
};

export default NoRegistration;
