import { IReligiousCommunity } from "@/@types/religiousCommunity.type";
import Loading from "@/components/common/loading.component";
import AboutCommunity from "@/components/community/aboutCommunity.component";
import Bio from "@/components/community/bioCommunity.component";
import CameraUpload from "@/components/community/cameraUpload.component";
import HeaderView from "@/components/community/headerView.component";
import { useReligiousCommunityStore } from "@/store/religiousCommunityStore";
import { Layout, useTheme } from "@ui-kitten/components";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const ViewCommunity = () => {
  const theme = useTheme();
  const imageUrl = process.env.EXPO_PUBLIC_IMAGE_API;

  const [imageError, setImageError] = useState(false);

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

  const imagePath = currentCommunity?.religiousSpaceMainPicture;
  const imageSource =
    imagePath && imagePath !== "undefined" ? `${imageUrl}/${imagePath}` : null;

  useEffect(() => {
    loadCommmunity();
  }, [loadCommmunity]);

  return (
    <Layout level="4" style={styles.container}>
      {isLoading || !currentCommunity ? (
        <View style={styles.spinnerContainer}>
          <Loading />
        </View>
      ) : (
        <ScrollView>
          <HeaderView
            religiousSpaceName={currentCommunity?.religiousSpaceName}
            religiousSpaceLeaderName={
              currentCommunity?.religiousSpaceLeaderName
            }
            communityType={currentCommunity?.communityType}
            religiousSpaceNation={currentCommunity?.religiousSpaceNation}
          />
          {!imageSource || imageError ? (
            <CameraUpload
              communityId={currentCommunity?.id || ""}
              onUploaded={loadCommmunity}
            />
          ) : (
            <View style={{ padding: 16 }}>
              <Image
                source={imageSource}
                style={{ width: "100%", height: 400, borderRadius: 8 }}
                contentFit="cover"
                onError={() => setImageError(true)}
              />
            </View>
          )}
          {currentCommunity?.communityGoogleApiLocalization?.lat &&
            currentCommunity?.communityGoogleApiLocalization?.long && (
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude:
                      currentCommunity.communityGoogleApiLocalization.lat,
                    longitude:
                      currentCommunity.communityGoogleApiLocalization.long,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                  <Marker
                    key={currentCommunity.id}
                    coordinate={{
                      latitude:
                        currentCommunity.communityGoogleApiLocalization.lat,
                      longitude:
                        currentCommunity.communityGoogleApiLocalization.long,
                    }}
                    title={currentCommunity.religiousSpaceName}
                    description={currentCommunity.communityAddress?.fullAddress}
                  />
                </MapView>
              </View>
            )}
          <AboutCommunity
            religiousSpaceYearFoundation={
              currentCommunity?.religiousSpaceYearFoundation
            }
            fullAddress={currentCommunity?.communityAddress?.fullAddress}
            religiousSpacePraticalLanguages={
              currentCommunity?.religiousSpacePraticalLanguages
            }
          />
          <Bio bio={currentCommunity?.bio} />
        </ScrollView>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginBottom: Dimensions.get("window").height * 0.1,
  },
  spinnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  scrollView: {
    flex: 1,
  },
  mapContainer: {
    padding: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  map: {
    width: Dimensions.get("window").width - 32,
    height: 200,
  },
  infoContainer: {
    padding: 16,
    marginBottom: 26,
  },
});

export default ViewCommunity;
