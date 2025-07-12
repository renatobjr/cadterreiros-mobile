import religiousCommunitiesService from "@/service/religiousCommunities.service";
import { useReligiousCommunityStore } from "@/store/religiousCommunityStore";
import { Button, Layout, Spinner } from "@ui-kitten/components";
import { router } from "expo-router";
import "moment/locale/pt-br";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ImageProps, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Authorization from "../community/form/authorization.component";
import CommunityGoogleApiLocalization from "../community/form/communityGoogleApiLocalization.component";
import CommunityInfo from "../community/form/communityInfo.component";
import LeaderInfo from "../community/form/leaderInfo.component";

type Props = {
  isEditing?: boolean;
};

const ReligiousCommunityForm = ({ isEditing = false }: Props) => {
  const {setCurrentCommunity, currentCommunity} = useReligiousCommunityStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      searchAddress: "",
      authorization: true,
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
      religiousSpaceNameDateStartedBy: "",
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

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setCurrentCommunity(data);

    const response = await religiousCommunitiesService.createReligiousCommunity(data);

    if (response.status) {
      router.push(`/community/${response.data._id}/upload-main-picture`);
      return;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if(!isEditing) methods.reset();
  }, [isEditing]);

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
          <Authorization isEditing={isEditing} />
          <CommunityGoogleApiLocalization isEditing={isEditing} />
          <CommunityInfo isEditing={isEditing} />
          <LeaderInfo isEditing={isEditing} />

          <Button
            accessoryRight={isLoading ? () => <LoadingIndicator /> : undefined}
            status="danger"
            style={{ marginTop: 40 }}
            disabled={isLoading}
            onPress={methods.handleSubmit(onSubmit)}
          >
            Cadastrar
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
