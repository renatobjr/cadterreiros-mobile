import { useAuthStore } from "@/store/authStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Input, Layout, Spinner } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ImageProps,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signin = () => {
  const login = useAuthStore((state) => state.login);
  const isLoad = useAuthStore((state) => state.isLoading);

  const loginImage = require("@/assets/svg/cad.complete.svg");
  const setPlatform = Platform.OS === "ios" ? "padding" : "height";

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerLogin = async () => {
    const response = await login(email, password);

    if (response.status) {
      router.navigate("/(app)/home");
      return;
    }

    Alert.alert(
      "Erro de Login",
      "Credenciais inválidas. Por favor, tente novamente."
    );
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

  return (
    <KeyboardAvoidingView style={styles.container} behavior={setPlatform}>
      <SafeAreaView style={styles.container}>
        <Image
          contentFit="contain"
          style={styles.imageContainer}
          source={loginImage}
        />
        <Layout style={styles.inputContainer} level="1">
          <Input
            value={email}
            accessoryRight={renderEmailIcon}
            onChangeText={setEmail}
            size="large"
            placeholder="Email"
          />
          <Input
            value={password}
            accessoryRight={renderEyeIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={setPassword}
            size="large"
            placeholder="Password"
          />
        </Layout>

        <Layout style={styles.buttonContainer}>
          <Button
            accessoryRight={isLoad ? () => <LoadingIndicator /> : undefined}
            disabled={!email || !password}
            status="primary"
            style={{ marginBottom: 16 }}
            onPress={() => handlerLogin()}
          >
            Login
          </Button>
          <Button status="basic" style={{ marginBottom: 16 }}>
            Esqueci minha senha
          </Button>
        </Layout>

        <StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
      </SafeAreaView>
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
  imageContainer: {
    width: 300,
    height: 200,
    alignSelf: "center",
  },
  inputContainer: {
    backgroundColor: "#F5F5F5",
  },
  buttonContainer: {
    backgroundColor: "#F5F5F5",
    marginTop: 30,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Signin;
