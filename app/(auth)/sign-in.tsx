import CapitionError from "@/components/common/capitionError.component";
import { useAuthStore } from "@/store/authStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Button,
  Input,
  Layout,
  Spinner,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Animated,
  ImageProps,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

const Signin = () => {
  const theme = useTheme();

  const login = useAuthStore((state) => state.login);
  const isLoad = useAuthStore((state) => state.isLoading);

  const loginImage = require("@/assets/svg/cad.complete.svg");
  const setPlatform = Platform.OS === "ios" ? "padding" : undefined;

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const handlerLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await login(email, password);

    if (response.status) {
      router.navigate("/(app)/home");
      return;
    }

    setError("root", {
      type: "manual",
      message: "Ops! Email ou senha inválidos.",
    });
  };

  const toogleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderEmailIcon = (): React.ReactElement => (
    <Ionicons name="mail-outline" size={20} />
  );

  const renderEyeIcon = ({ props }: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toogleSecureEntry}>
      <Ionicons
        name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
        size={20}
      />
    </TouchableWithoutFeedback>
  );

  const LoadingIndicator = (props: ImageProps): React.ReactElement => (
    <View style={[props.style, styles.indicator]}>
      <Spinner status="basic" size="small" />
    </View>
  );

  const errorToastAnimated = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (errors.root) {
      Animated.timing(errorToastAnimated, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(errorToastAnimated, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [errors.root, errorToastAnimated]);

  const translateY = errorToastAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });

  const opacity = errorToastAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <KeyboardAvoidingView behavior={setPlatform} style={styles.container}>
      <Layout level="3">
        <Image
          contentFit="contain"
          style={styles.imageContainer}
          source={loginImage}
        />
        {errors.root && (
          <Animated.View
            style={[
              styles.errorToast,
              {
                backgroundColor: theme["color-danger-200"],
                transform: [{ translateY }],
                opacity,
              },
            ]}
          >
            <Text
              style={{
                color: theme["color-danger-900"],
                ...styles.errorToastText,
              }}
            >
              {errors.root.message}
            </Text>
          </Animated.View>
        )}
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
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: "Senha é obrigatório" }}
          render={({ field: { onChange, value } }) => (
            <Input
              style={{ marginTop: 16 }}
              value={value}
              accessoryRight={renderEyeIcon}
              secureTextEntry={secureTextEntry}
              onChangeText={onChange}
              size="large"
              status={errors.password ? "danger" : "basic"}
              caption={() => (
                <CapitionError message={errors.password?.message} />
              )}
              placeholder="Password"
            />
          )}
        />
      </Layout>
      <Layout level="3" style={styles.buttonContainer}>
        <Button
          accessoryRight={isLoad ? () => <LoadingIndicator /> : undefined}
          status="danger"
          style={{ marginBottom: 16 }}
          onPress={handleSubmit(handlerLogin)}
        >
          Login
        </Button>
        <Button
          status="info"
          style={{ marginBottom: 16 }}
          onPress={() => router.navigate("/(auth)/forgot-password")}
        >
          Esqueci minha senha
        </Button>
      </Layout>

      <StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignContent: "center",
    justifyContent: "center",
  },
  errorToast: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 40,
    borderRadius: 8,
  },
  errorToastText: {
    padding: 10,
    alignSelf: "center",
  },
  imageContainer: {
    width: 300,
    height: 200,
    alignSelf: "center",
  },
  buttonContainer: {
    marginTop: 30,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Signin;
