import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Layout>
        <Text>Lista de atividades</Text>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default Home;
