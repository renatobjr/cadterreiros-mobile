import ReligiousCommunityForm from "@/components/common/religiousCommunityForm.component";
import religiousCommunitiesService from "@/service/religiousCommunities.service";
import { router } from "expo-router";

const Register = () => {
  const onHandleSubmit = async (data: any) => {
    const response = await religiousCommunitiesService.createReligiousCommunity(
      data
    );

    if (response.status) {
      router.push(`/community/${response.data._id}/upload-main-picture`);
      return;
    }
  };
  return <ReligiousCommunityForm isEditing={false} onSubmit={onHandleSubmit}/>;

};

export default Register;
