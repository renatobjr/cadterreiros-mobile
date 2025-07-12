import CameraUpload from "@/components/community/cameraUpload.component";
import { router, useLocalSearchParams } from "expo-router";

const UploadMainPicture = () => {
  const { id } = useLocalSearchParams();

  return (
    <CameraUpload
      communityId={id as string}
      onUploaded={() => router.push("/(app)/home")}
    />
  );
};

export default UploadMainPicture;
