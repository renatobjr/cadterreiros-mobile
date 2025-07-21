// app/(tabs)/home.tsx
import Loading from "@/components/common/loading.component";
import CardHome from "@/components/home/cardHome.component";
import ListMyRegisterItem from "@/components/home/listMyRegister.component";
import { useAuthStore } from "@/store/authStore";
import { useReligiousCommunityStore } from "@/store/religiousCommunityStore";
import { Button, Layout, Text } from "@ui-kitten/components";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, ToastAndroid } from "react-native";

const Home = () => {
  const user = useAuthStore((state) => state.user);
  const {
    fetchCountByUserId,
    fetchListFromUserId,
    isLoading: loadingResources,
    listByUserId: list,
  } = useReligiousCommunityStore();

  const [total, setTotal] = useState<any>({});
  const [refreshing, setRefreshing] = useState(false); // novo estado

  const loadCounts = useCallback(async () => {
    if (user?.id) {
      try {
        const response = await fetchCountByUserId();
        if (response) setTotal(response);
      } catch (error) {
        console.error("Erro ao obter contagem:", error);
        ToastAndroid.show("Ops. Algo deu errado", ToastAndroid.SHORT);
      }
    }
  }, [fetchCountByUserId, user?.id]);

  const loadListFromUserId = useCallback(async () => {
    if (user?.id) {
      try {
        await fetchListFromUserId();
      } catch (error) {
        console.error("Erro ao obter registros:", error);
        ToastAndroid.show("Ops. Algo deu errado", ToastAndroid.SHORT);
      }
    }
  }, [fetchListFromUserId, user?.id]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([loadCounts(), loadListFromUserId()]);
    setRefreshing(false);
  }, [loadCounts, loadListFromUserId]);

  useEffect(() => {
    loadCounts();
    loadListFromUserId();
  }, [loadCounts, loadListFromUserId]);

  if (loadingResources && !refreshing) {
    return (
      <Layout level="4" style={styles.loadingContainer}>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout level="4" style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id || Math.random().toString()}
        contentContainerStyle={styles.content}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={() => (
          <>
            <Text category="h5">Olá {user?.fullname}</Text>
            <Text
              style={{
                marginTop: 16,
                marginBottom: 16,
                lineHeight: 24,
                fontWeight: "500",
              }}
              category="p1"
            >
              Aqui você pode acompanhar o andamento dos seus cadastros, além de
              ser a principal fonte de informação sobre o Mapemanto.
            </Text>

            <Button
              style={{ borderRadius: 8 }}
              status="danger"
              onPress={() => router.push("/register")}
            >
              Adicionar Terreiro
            </Button>

            <CardHome data={total.data} />

            <Text style={{ marginBottom: 16 }} category="h6">
              Meus terreiros cadastrados
            </Text>
          </>
        )}
        renderItem={({ item }) => <ListMyRegisterItem item={item} />}
        ListEmptyComponent={() => (
          <Text style={{ marginTop: 20 }}>Nenhum registro encontrado.</Text>
        )}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  content: { paddingLeft: 16, paddingRight: 16 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
