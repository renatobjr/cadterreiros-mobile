import { Text } from "@react-navigation/elements";
import { CheckBox } from "@ui-kitten/components";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, View } from "react-native";

type Props = {
  isEditing?: boolean;
};
const Authorization = ({ isEditing = false }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <View id="authorization">
      <Text style={styles.formTitle}>Autorização de Cadastramento</Text>
      <Controller
        control={control}
        name="authorization"
        rules={{ required: "Autorização é obrigatória" }}
        render={({ field: { onChange, value } }) => (
          <CheckBox
            status={errors.authorization ? "danger" : "basic"}
            checked={value}
            onChange={onChange}
          >
            O(A) Senhor(a) autoriza a inclusão da sua casa no Cadastramento?
          </CheckBox>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
});

export default Authorization;
