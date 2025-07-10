import { IReligiousCommunity } from "@/@types/religiousCommunity.type";
import Loading from "@/components/common/loading.component";
import { useReligiousCommunityStore } from "@/store/religiousCommunityStore";
import { Layout, Text } from "@ui-kitten/components";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, ToastAndroid } from "react-native";

const EditCommunity = () => {
  const { fecthCommunity, isLoading } = useReligiousCommunityStore();
  const { id } = useLocalSearchParams();

  const [currentCommunity, setCurrentCommunity] =
    useState<IReligiousCommunity>();

  const loadCommmunity = useCallback(async () => {
    if (id) {
      try {
        const response = await fecthCommunity(id);

        if (response) {
          setCurrentCommunity(response);
        }
      } catch (error) {
        console.error("Erro ao obter comunidade:", error);
        ToastAndroid.show("Ops. Algo deu errado", ToastAndroid.SHORT);
      }
    }
  }, [id, fecthCommunity]);

  useEffect(() => {
    loadCommmunity();
  }, [loadCommmunity]);

  return (
    <Layout level="4" style={{ flex: 1 }}>
      {isLoading ? (
        <Layout level="4" style={styles.spinnerContainer}>
          <Loading />
        </Layout>
      ) : (
        <Text>Editar comunidade</Text>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

export default EditCommunity;
