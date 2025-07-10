import { Layout, Spinner, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const Loading = () => {
  return (
    <Layout level="4" style={styles.spinnerContainer}>
      <Spinner size="large" status="danger" />
      <Text
        category="h6"
        style={{ fontWeight: "600", marginTop: 8, textAlign: "center" }}
      >
        Estamos preparando tudo para você!
      </Text>
      <Text category="h6" style={{ fontWeight: "600", textAlign: "center" }}>
        Logo vamos estar prontos.
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
