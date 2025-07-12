import { IReligiousCommunity } from "@/@types/religiousCommunity.type";
import Loading from "@/components/common/loading.component";
import ReligiousCommunityForm from "@/components/common/religiousCommunityForm.component";
import religiousCommunitiesService from "@/service/religiousCommunities.service";
import { useReligiousCommunityStore } from "@/store/religiousCommunityStore";
import { Layout } from "@ui-kitten/components";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";

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

  const onHandleSubmit = async (payload: any) => {
    const response = await religiousCommunitiesService.updateReligiousCommunity(
      id as string,
      payload
    )

    if (response.status) {
      ToastAndroid.show("Comunidade atualizada com sucesso", ToastAndroid.SHORT);
      setCurrentCommunity(response.data);
      router.push("/(app)/home")
    }
  }

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
        <View style={{ flex: 1, marginBottom: 50 }}>
          <ReligiousCommunityForm isEditing onSubmit={onHandleSubmit}/>
        </View>
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
