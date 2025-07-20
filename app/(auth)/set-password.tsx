import CapitionError from "@/components/common/capitionError.component";
import ToastSystem from "@/components/common/toast.component";
import { EToastType } from "@/enums/toastType.enum";
import { useAuthStore } from "@/store/authStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Input, Layout, Spinner } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { Image, ImageProps } from "expo-image";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

const SetPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isLoading = useAuthStore((state) => state.isLoading);
  const getTokenFromStore = useAuthStore((state) => state.getToken);
  const setPassword = useAuthStore((state) => state.setPassword);

  const passwordValue = useWatch({ control, name: "password" });

  const [receivedToken, setReceivedToken] = useState("");
  const [securePasswordEntry, setSecurePasswordEntry] = useState(true);
  const [secureConfirmEntry, setSecureConfirmEntry] = useState(true);

  const loginImage = require("@/assets/svg/cad.complete.svg");
  const setPlatform = Platform.OS === "ios" ? "padding" : "height";

  const navigation = useNavigation();
  const { isFromForget, token } = useLocalSearchParams();

  useLayoutEffect(() => {
    navigation.setOptions({
      title:
        isFromForget === "true"
          ? "Atualizar minha senha"
          : "Cadastrar minha senha",
      headerLeft: () => null,
    });
  });

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
  const handlerSetPassword = async ({
    fullname,
    password,
  }: {
    fullname?: string;
    password: string;
  }) => {
    const response = await setPassword(
      token as string,
      password,
      fullname || ""
    );

    if (response.status) {
      const message =
        isFromForget === "true"
          ? "Senha atualizada com sucesso"
          : "Senha cadastrada com sucesso";
      ToastSystem(EToastType.SUCCESS, "Sucesso", message);
      router.navigate({
        pathname: "/(auth)/sign-in",
      });
    } else {
      const message =
        isFromForget === "true"
          ? "Erro ao atualizar senha"
          : "Erro ao cadastrar senha";
      ToastSystem(EToastType.ERROR, "Ops!", message);
    }
  };

  const togglePasswordEntry = () => {
    setSecurePasswordEntry(!securePasswordEntry);
  };

  const toggleConfirmEntry = () => {
    setSecureConfirmEntry(!secureConfirmEntry);
  };

  const LoadingIndicator = (props: ImageProps): React.ReactElement => (
    <View style={[props.style, styles.indicator]}>
      <Spinner status="basic" size="small" />
    </View>
  );

  const renderPersonIcon = (): React.ReactElement => (
    <Ionicons name="person-outline" size={20} />
  );

  const renderEyeIcon = (
    secure: boolean,
    onPress: () => void
  ): React.ReactElement => (
    <TouchableWithoutFeedback onPress={onPress}>
      <Ionicons name={secure ? "eye-off-outline" : "eye-outline"} size={20} />
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView behavior={setPlatform} style={styles.container}>
      <Layout level="4">
        <Image
          contentFit="contain"
          style={styles.imageContainer}
          source={loginImage}
        />

        {isFromForget === "false" && (
          <Controller
            control={control}
            name="fullname"
            rules={{ required: "O nome é obrigatória" }}
            render={({ field: { onChange, value } }) => (
              <Input
                style={{ marginTop: 16 }}
                value={value}
                accessoryRight={() => renderPersonIcon()}
                onChangeText={onChange}
                size="large"
                status={errors.fullname ? "danger" : "basic"}
                caption={() => (
                  <CapitionError message={errors.fullname?.message} />
                )}
                placeholder="Nome completo"
              />
            )}
          />
        )}
        <Controller
          control={control}
          name="password"
          rules={{ required: "Senha é obrigatória" }}
          render={({ field: { onChange, value } }) => (
            <Input
              style={{ marginTop: 16 }}
              value={value}
              accessoryRight={() =>
                renderEyeIcon(securePasswordEntry, togglePasswordEntry)
              }
              secureTextEntry={securePasswordEntry}
              onChangeText={onChange}
              size="large"
              status={errors.password ? "danger" : "basic"}
              caption={() => (
                <CapitionError message={errors.password?.message} />
              )}
              placeholder="Senha"
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "A confirmação da senha é obrigatória",
            validate: (value) =>
              value === passwordValue || "As senhas não coincidem",
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              style={{ marginTop: 16 }}
              value={value}
              accessoryRight={() =>
                renderEyeIcon(secureConfirmEntry, toggleConfirmEntry)
              }
              secureTextEntry={secureConfirmEntry}
              onChangeText={onChange}
              size="large"
              status={errors.confirmPassword ? "danger" : "basic"}
              caption={() => (
                <CapitionError message={errors.confirmPassword?.message} />
              )}
              placeholder="Confirmar senha"
            />
          )}
        />
      </Layout>
      <Layout level="4" style={styles.buttonContainer}>
        <Button
          accessoryRight={isLoading ? () => <LoadingIndicator /> : undefined}
          status="info"
          style={{ marginBottom: 16 }}
          onPress={handleSubmit(handlerSetPassword)}
        >
          {isFromForget === "true"
            ? "Atualizar minha senha"
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

export default SetPassword;
