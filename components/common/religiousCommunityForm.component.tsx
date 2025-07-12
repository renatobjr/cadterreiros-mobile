import { IReligiousCommunity } from "@/@types/religiousCommunity.type";
import { useReligiousCommunityStore } from "@/store/religiousCommunityStore";
import { Button, Layout, Spinner } from "@ui-kitten/components";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import "moment/locale/pt-br";
import React, { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ImageProps, StyleSheet, ToastAndroid, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CameraUpload from "../community/cameraUpload.component";
import Authorization from "../community/form/authorization.component";
import CommunityGoogleApiLocalization from "../community/form/communityGoogleApiLocalization.component";
import CommunityInfo from "../community/form/communityInfo.component";
import LeaderInfo from "../community/form/leaderInfo.component";

type Props = {
  isEditing?: boolean;
  onSubmit: (data: IReligiousCommunity) => void;
};

const ReligiousCommunityForm = ({ isEditing = false, onSubmit }: Props) => {
  const imageUrl = process.env.EXPO_PUBLIC_IMAGE_API;
  const { id } = useLocalSearchParams();

  const { setCurrentCommunity, currentCommunity, fecthCommunity } =
    useReligiousCommunityStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageSource, setImageSource] = React.useState<string | null>(null);
  const [imageError, setImageError] = React.useState(false);

  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      searchAddress: "",
      authorization: false,
      communityGoogleApiLocalization: {
        lat: 0,
        long: 0,
      },
      communityAddress: {
        fullAddress: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        zipcode: "",
      },
      communityType: "",
      religiousSpaceYearFoundation: "",
      religiousSpaceLeaderFoundation: "",
      religiousSpaceNation: "",
      religiousSpacePraticalLanguages: "",
      religiousSpaceName: "",
      religiousSpaceLeaderName: "",
      religiousSpacePositionName: "",
      religiousSpaceStartedBy: "",
      religiousSpaceNameDateStartedBy: undefined,
      leaderContacts: {
        phone: "",
        mobile: "",
        email: "",
      },
      leaderEthnicity: "",
      leaderGender: "",
      leaderEducationalLevel: "",
      leaderSocialProgram: "",
      leaderSufferedRacism: false,
      religiousSpaceMainPicture: "",
    },
  });

  const LoadingIndicator = (props: ImageProps): React.ReactElement => (
    <View style={[props.style, styles.indicator]}>
      <Spinner status="basic" size="small" />
    </View>
  );

  const onHandleSubmit = async (data: any) => {
    setIsLoading(true);
    onSubmit(data);
    setIsLoading(false);
  };

  const loadCommmunity = useCallback(async () => {
    if (id) {
      try {
        const response = await fecthCommunity(id);

        if (response) {
          setCurrentCommunity([response]);
        }
      } catch (error) {
        console.error("Erro ao obter comunidade:", error);
        ToastAndroid.show("Ops. Algo deu errado", ToastAndroid.SHORT);
      }
    }
  }, [id, fecthCommunity, setCurrentCommunity]);

  useEffect(() => {
    if (isEditing && currentCommunity) {
      const communityData: IReligiousCommunity | undefined =
        currentCommunity?.[0];
      const imagePath = communityData?.religiousSpaceMainPicture;
      const imageSource =
        imagePath && imagePath !== "undefined"
          ? `${imageUrl}/${imagePath}`
          : null;
      setImageSource(imageSource);
      console.log(communityData);

      methods.reset(communityData as unknown as any);
    }
  }, [isEditing, currentCommunity, methods, imageUrl]);

  return (
    <KeyboardAwareScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <FormProvider {...methods}>
        <Layout level="4" style={styles.container}>
          {isEditing && (
            <View>
              {isEditing && (imageSource || imageError) ? (
                <View style={{ padding: 16 }}>
                  <Image
                    source={imageSource}
                    style={{ width: "100%", height: 400, borderRadius: 8 }}
                    contentFit="cover"
                    onError={() => setImageError(true)}
                  />
                </View>
              ) : (
                <CameraUpload
                  communityId={id as string}
                  onUploaded={loadCommmunity}
                />
              )}
            </View>
          )}
          <Authorization isEditing={isEditing} />
          <CommunityGoogleApiLocalization isEditing={isEditing} />
          <CommunityInfo isEditing={isEditing} />
          <LeaderInfo isEditing={isEditing} />

          <Button
            accessoryRight={isLoading ? () => <LoadingIndicator /> : undefined}
            status="danger"
            style={{ marginTop: 40 }}
            disabled={isLoading}
            onPress={methods.handleSubmit(onHandleSubmit)}
          >
            {isEditing ? "Editar comunidade" : "Criar comunidade"}
          </Button>
        </Layout>
      </FormProvider>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: "#E4E9F2",
    flex: 1,
    padding: 16,
    alignContent: "center",
    justifyContent: "flex-start",
  },
  section: {
    gap: 8,
  },
  placesContainer: {
    padding: 16,
    borderRadius: 8,
  },
  formTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ReligiousCommunityForm;
