import religiousCommunitiesService from "@/service/religiousCommunities.service";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, IconElement, Layout, Text } from "@ui-kitten/components";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import uuid from "react-native-uuid";

type Props = {
  communityId: string;
  onUploaded: () => void;
};

const CameraUpload = ({ communityId, onUploaded }: Props) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [isUploading, setIsUploading] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);

  const CameraIcon = (): React.ReactElement<IconElement> => (
    <Ionicons color="#fff" name="camera-outline" size={20} />
  );

  const handleTakePhoto = async () => {
    try {
      if (!cameraRef.current) return;
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      setIsUploading(true);

      const resized = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      const fileName = `${uuid.v4()}.jpg`;
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
      await FileSystem.copyAsync({ from: resized.uri, to: fileUri });

      const file = {
        uri: fileUri,
        name: fileName,
        type: "image/jpeg",
      };

      await religiousCommunitiesService.uploadMainPicture(communityId, file);
      ToastAndroid.show("Imagem enviada com sucesso", ToastAndroid.SHORT);
      onUploaded();
      setCameraOpen(false);
    } catch (err) {
      console.error("Erro ao tirar ou enviar foto:", err);
      ToastAndroid.show("Erro ao enviar imagem", ToastAndroid.SHORT);
    } finally {
      setIsUploading(false);
    }
  };

  const openCamera = async () => {
    if (!permission) return;
    if (!permission.granted) {
      await requestPermission();
    } else {
      setCameraOpen(true);
    }
  };

  return (
    <Layout level="4" style={styles.container}>
      <Text
        category="h6"
        style={{ fontWeight: "500", marginBottom: 8, textAlign: "center" }}
      >
        Este terreiro foi mapeado com sucesso, mas ainda falta uma foto, voce
        pode adicionar uma! Mas antes de tirar a foto, leia as dicas abaixo:
      </Text>

      <Text style={{ textAlign: "center", fontSize: 14 }}>
        1. A foto deve ser clara e com boa qualidade;{"\n"}
        2. A imagem deve ser uma foto da fachada da Comunidade;{"\n"}
        3. Posicione o smartphone na posição paisagem;{"\n"}
        4. Não esqueça de verificar sua internet antes de tirar a foto.{"\n"}
      </Text>

      <Button accessoryLeft={CameraIcon} status="danger" onPress={openCamera}>
        Adicionar Foto
      </Button>

      <Modal visible={cameraOpen} animationType="slide">
        <Layout style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
            enableTorch={false}
          />

          <Layout style={styles.controls}>
            <TouchableOpacity
              onPress={() => setFacing(facing === "back" ? "front" : "back")}
            >
              <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleTakePhoto} disabled={isUploading}>
              <Ionicons name="camera-outline" size={64} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCameraOpen(false)}>
              <Ionicons name="close-outline" size={32} color="#fff" />
            </TouchableOpacity>
          </Layout>

          {isUploading && (
            <Layout style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={{ color: "#fff", marginTop: 8 }}>
                Enviando imagem...
              </Text>
            </Layout>
          )}
        </Layout>
      </Modal>
    </Layout>
  );
};

export default CameraUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  controls: {
    position: "absolute",
    bottom: 32,
    width: "100%",
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "transparent",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
