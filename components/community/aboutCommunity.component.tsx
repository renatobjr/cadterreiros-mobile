import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

type Props = {
  religiousSpaceYearFoundation: number | undefined;
  fullAddress: string | undefined;
  religiousSpacePraticalLanguages: string | undefined;
};

const AboutCommunity = ({
  religiousSpaceYearFoundation,
  fullAddress,
  religiousSpacePraticalLanguages,
}: Props) => {
  return (
    <Layout level="4" style={styles.about}>
      <Text category="h6" style={{ fontWeight: "700", marginBottom: 8 }}>
        Informações da comunidade
      </Text>
      <Text category="p1" style={{ fontWeight: "normal" }}>
        Fundada em {religiousSpaceYearFoundation}
      </Text>
      <Text category="p1" style={{ fontWeight: "normal" }}>
        Endereço: {fullAddress}
      </Text>
      <Text category="p1" style={{ fontWeight: "normal", textTransform: "capitalize" }}>
        Linguas praticadas: {religiousSpacePraticalLanguages}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  about: {
    padding: 16,
  }
});

export default AboutCommunity;
