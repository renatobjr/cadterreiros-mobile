import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

type Props = {
  bio: string | undefined;
};

const Bio = ({ bio }: Props) => {
  return (
    <Layout level="4" style={styles.bio}>
      <Text category="h6" style={{ fontWeight: "700", marginBottom: 8 }}>
        Sobre a comunidade
      </Text>
      <Text
        numberOfLines={undefined}
        category="p1"
        style={{ fontWeight: "normal" }}
      >
        {bio}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  bio: {
    padding: 16,
  },
});

export default Bio;
