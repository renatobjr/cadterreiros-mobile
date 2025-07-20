import CapitionError from "@/components/common/capitionError.component";
import ToastSystem from "@/components/common/toast.component";
import { EToastType } from "@/enums/toastType.enum";
import { useAuthStore } from "@/store/authStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Input, Layout, Spinner } from "@ui-kitten/components";
import { Image, ImageProps } from "expo-image";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

const SetEmailForm = () => {
  const isLoading = useAuthStore((state) => state.isLoading);
  const generateTokenUser = useAuthStore((state) => state.generateTokenUser);

  const loginImage = require("@/assets/svg/cad.complete.svg");
  const setPlatform = Platform.OS === "ios" ? "padding" : "height";

  const navigation = useNavigation();
  const { isFromForget } = useLocalSearchParams();

  useLayoutEffect(() => {
    navigation.setOptions({
      title:
        isFromForget === "true"
          ? "Esqueceu sua senha?"
          : "Cadastrar minha senha",
    });
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "renato.bonfim.jr@cciao.org",
    },
  });

  const handlerSetEmail = async ({ email }: { email: string }) => {
    const response = await generateTokenUser(email, isFromForget === "true");

    if (!response.status) {
      ToastSystem(EToastType.ERROR, "Ops!", "Email inválido");
      return;
    }

    ToastSystem(EToastType.SUCCESS, "Sucesso", "Email enviado com sucesso");
    router.navigate({
      pathname: "/(auth)/otp",
      params: {
        token: response.data,
        isFromForget: isFromForget,
      },
    });
  };

  const renderEmailIcon = (): React.ReactElement => (
    <Ionicons name="mail-outline" size={20} />
  );

  const LoadingIndicator = (props: ImageProps): React.ReactElement => (
    <View style={[props.style, styles.indicator]}>
      <Spinner status="basic" size="small" />
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={setPlatform} style={styles.container}>
      <Layout level="4">
        <Image
          contentFit="contain"
          style={styles.imageContainer}
          source={loginImage}
        />
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email é obrigatório" }}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              accessoryRight={renderEmailIcon}
              onChangeText={onChange}
              keyboardType="email-address"
              size="large"
              status={errors.email ? "danger" : "basic"}
              caption={() => <CapitionError message={errors.email?.message} />}
              placeholder="Email"
            />
          )}
        ></Controller>
      </Layout>
      <Layout level="4" style={styles.buttonContainer}>
        <Button
          accessoryRight={isLoading ? () => <LoadingIndicator /> : undefined}
          status="info"
          style={{ marginBottom: 16 }}
          onPress={handleSubmit(handlerSetEmail)}
        >
          {isFromForget === "true"
            ? "Esqueci minha senha"
            : "Cadastrar minha senha"}
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

export default SetEmailForm;
