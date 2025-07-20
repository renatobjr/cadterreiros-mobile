import ToastSystem from "@/components/common/toast.component";
import CameraUpload from "@/components/community/cameraUpload.component";
import { EToastType } from "@/enums/toastType.enum";
import { router, useLocalSearchParams } from "expo-router";

const UploadMainPicture = () => {
  const { id } = useLocalSearchParams();

  return (
    <CameraUpload
      communityId={id as string}
      onUploaded={() => {
        ToastSystem(EToastType.SUCCESS, "Sucesso", "Casa/Ilê cadastrada com sucesso");
        router.push("/(app)/home");
      }}
    />
  );
};

export default UploadMainPicture;
