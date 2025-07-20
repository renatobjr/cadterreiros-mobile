import { IReligiousCommunity } from "@/@types/religiousCommunity.type";
import Loading from "@/components/common/loading.component";
import ReligiousCommunityForm from "@/components/common/religiousCommunityForm.component";
import ToastSystem from "@/components/common/toast.component";
import { EToastType } from "@/enums/toastType.enum";
import religiousCommunitiesService from "@/service/religiousCommunities.service";
import { useReligiousCommunityStore } from "@/store/religiousCommunityStore";
import { Layout } from "@ui-kitten/components";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

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
        ToastSystem(EToastType.ERROR, "Ops!", "Erro ao obter comunidade");
      }
    }
  }, [id, fecthCommunity]);

  const onHandleSubmit = async (payload: any) => {
    const response = await religiousCommunitiesService.updateReligiousCommunity(
      id as string,
      payload
    )

    if (response.status) {
      ToastSystem(EToastType.SUCCESS, "Sucesso", "Comunidade atualizada com sucesso");
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
