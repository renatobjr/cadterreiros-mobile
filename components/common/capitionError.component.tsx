import { Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";


const CapitionError = ({ message }: { message?: string }) => {
  return <Text style={styles.errorCaption}>{message}</Text>;
};

const styles = StyleSheet.create({
  errorCaption: {
    fontFamily: "Nunito",
    fontSize: 12,
    color: "red",
  },
});

export default CapitionError;