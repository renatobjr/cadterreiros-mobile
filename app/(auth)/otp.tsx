import { OtpInputKitten } from "@/components/common/otp.component";
import ToastSystem from "@/components/common/toast.component";
import { EToastType } from "@/enums/toastType.enum";
import { useAuthStore } from "@/store/authStore";
import { Button, Layout, Spinner, Text } from "@ui-kitten/components";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageProps,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";

const Otp = () => {
  const isLoading = useAuthStore((state) => state.isLoading);
  const getTokenFromStore = useAuthStore((state) => state.getToken);
  const checkOTP = useAuthStore((state) => state.verifyOTP);

  const { isFromForget, token } = useLocalSearchParams();

  const loginImage = require("@/assets/svg/cad.complete.svg");
  const setPlatform = Platform.OS === "ios" ? "padding" : "height";

  const [receivedToken, setReceivedToken] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const handleOtpChange = (text: string) => {
    setOtpValue(text);
    setIsComplete(text.length === 6);
  };

  const handleOtpFilled = () => {
    setIsComplete(true);
  };

  const LoadingIndicator = (props: ImageProps): React.ReactElement => (
    <View style={[props.style, styles.indicator]}>
      <Spinner status="basic" size="small" />
    </View>
  );

  const handlerOTP = async () => {
    const response = await checkOTP(receivedToken, otpValue);

    if (!response.status) {
      ToastSystem(EToastType.ERROR, "Ops!", "Ocorreu um erro ao verificar OTP");
      return;
    }

    ToastSystem(EToastType.SUCCESS, "Sucesso", "OTP verificado com sucesso");
    router.navigate({
      pathname: "/(auth)/set-password",
      params: {
        token: receivedToken,
        isFromForget: isFromForget,
      },
    });
  };

  useEffect(() => {
    if (!token) {
      async function getToken() {
        const token = (await getTokenFromStore()) as string;
        setReceivedToken(token);
      }

      getToken();
    } else {
      setReceivedToken(token as string);
    }
  }, [isFromForget, getTokenFromStore, token]);

  return (
    <KeyboardAvoidingView behavior={setPlatform} style={styles.container}>
      <Layout level="4">
        <Image
          contentFit="contain"
          style={styles.imageContainer}
          source={loginImage}
        />
        <Text style={styles.disclaimer}>
          Enviamos para o seu email um Código de 6 dígitos, verifique sua caixa
          de entrada e o spam.{" "}
          Atenção, O Código tem
          validade de 15 minutos
        </Text>
        <OtpInputKitten
          numberOfDigits={6}
          onTextChange={handleOtpChange}
          onFilled={handleOtpFilled}
          size="large"
        />
      </Layout>
      <Layout level="4" style={styles.buttonContainer}>
        <Button
          accessoryRight={isLoading ? () => <LoadingIndicator /> : undefined}
          status="info"
          style={{ marginBottom: 16 }}
          disabled={!isComplete}
          onPress={handlerOTP}
        >
          Verificar Código
        </Button>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E4E9F2",
    flex: 1,
    padding: 16,
    alignContent: "center",
    justifyContent: "center",
  },
  disclaimer: {
    marginBottom: 20,
    fontSize: 16,
  },
  imageContainer: {
    width: 300,
    height: 200,
    alignSelf: "center",
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 80,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Otp;
