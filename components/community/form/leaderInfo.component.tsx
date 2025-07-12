import CapitionError from "@/components/common/capitionError.component";
import { ELeaderEducationalLevel } from "@/enums/leaderEducationalLevel.enum";
import { ELeaderEthnicity } from "@/enums/leaderEthnicity.enum";
import { ELeaderSocialProgram } from "@/enums/leaderSocialProgram.enum";
import StringUtils from "@/utils/string.utils";
import {
  CheckBox,
  IndexPath,
  Input,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, View } from "react-native";

type Props = {
  isEditing?: boolean;
};

const LeaderInfo = ({ isEditing = false }: Props) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const [selectLeaderEthnicity, setLeaderEthnicity] = React.useState<IndexPath>(
    new IndexPath(0)
  );
  const [selectLeaderGender, setLeaderGender] = React.useState<IndexPath>(
    new IndexPath(0)
  );
  const [selectLeaderEducationalLevel, setLeaderEducationalLevel] =
    React.useState<IndexPath>(new IndexPath(0));
  const [selectLeaderSocialProgram, setLeaderSocialProgram] = React.useState<
    IndexPath[]
  >([]);

  const leaderEthnicity = watch("leaderEthnicity");
  const leaderGender = watch("leaderGender");
  const leaderEducationalLevel = watch("leaderEducationalLevel");

  const enumLeaderEthnicity = [
    StringUtils.capitalize(ELeaderEthnicity.BRANCA),
    StringUtils.capitalize(ELeaderEthnicity.PRETA),
    StringUtils.capitalize(ELeaderEthnicity.PARDA),
    StringUtils.capitalize(ELeaderEthnicity.AMARELA),
    StringUtils.capitalize(ELeaderEthnicity.INDIGENA),
    StringUtils.capitalize(ELeaderEthnicity.OUTRO),
  ];

  const enumLeaderGender = ["Masculino", "Feminino", "Outro"];

  const enumLeaderEducationalLevel = [
    ELeaderEducationalLevel.SEM_ESCOLARIDADE,
    ELeaderEducationalLevel.FUNDAMENTAL_INCOMPLETO,
    ELeaderEducationalLevel.FUNDAMENTAL_COMPLETO,
    ELeaderEducationalLevel.SEGUNDO_GRAU_INCOMPLETO,
    ELeaderEducationalLevel.SEGUNDO_GRAU_COMPLETO,
    ELeaderEducationalLevel.SUPERIOR_INCOMPLETO,
    ELeaderEducationalLevel.SUPERIOR_COMPLETO,
    ELeaderEducationalLevel.POS_GRADUADO,
  ];

  const enumLeaderSocialProgram = [
    ELeaderSocialProgram.AUXILIO_GAS,
    ELeaderSocialProgram.BOLSA_FAMILIA,
    ELeaderSocialProgram.BPC,
    ELeaderSocialProgram.BRASIL_SORRIDENTE,
    ELeaderSocialProgram.FARMACIA_POPULAR,
    ELeaderSocialProgram.MINHA_CASA_MINHA_VIDA,
    ELeaderSocialProgram.PAA,
    ELeaderSocialProgram.PRONATEC,
    ELeaderSocialProgram.TARIFA_SOCIAL_ENERGIA,
  ];

  const getSelectedSocialProgramsText = () => {
    if (selectLeaderSocialProgram.length === 0) {
      return "Selecione os programas";
    }

    const selectedPrograms = selectLeaderSocialProgram.map((indexPath) =>
      StringUtils.capitalize(enumLeaderSocialProgram[indexPath.row])
    );

    return selectedPrograms.join(", ");
  };

  return (
    <View style={styles.section} id="leaderInfo">
      <Text category="h6" style={styles.formTitle}>
        Parte III: Informações Sócias da Liderança
      </Text>

      <Text style={{ marginTop: 8 }} category="p1">
        O(A) Senhor(a) autoriza a inclusão de Email e Telefone para contato?
      </Text>

      <Controller
        control={control}
        name="leaderContacts.phone"
        render={({ field: { onChange, value } }) => (
          <View>
            <Input
              size="large"
              placeholder="Telefone principal"
              value={value}
              onChangeText={onChange}
              keyboardType="phone-pad"
            />
          </View>
        )}
      />

      <Controller
        control={control}
        name="leaderContacts.mobile"
        render={({ field: { onChange, value } }) => (
          <View>
            <Input
              size="large"
              placeholder="Celular"
              value={value}
              onChangeText={onChange}
              keyboardType="phone-pad"
            />
          </View>
        )}
      />

      <Controller
        control={control}
        name="leaderContacts.email"
        render={({ field: { onChange, value } }) => (
          <View>
            <Input
              size="large"
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
            />
          </View>
        )}
      />

      <Text style={{ marginTop: 8 }} category="p1">
        Como o(a) Senhor(a) se declara em termos de cor ou raça?
      </Text>
      <Controller
        control={control}
        name="leaderEthnicity"
        rules={{
          required: "Por favor, selecione uma opção de cor/raça",
        }}
        render={({ field: { onChange, value } }) => (
          <View>
            <Select
              size="large"
              placeholder="Raça"
              selectedIndex={
                leaderEthnicity
                  ? new IndexPath(enumLeaderEthnicity.indexOf(leaderEthnicity))
                  : undefined
              }
              value={
                leaderEthnicity
                  ? StringUtils.capitalize(
                      enumLeaderEthnicity[selectLeaderEthnicity.row]
                    )
                  : undefined
              }
              onSelect={(index) => {
                setLeaderEthnicity(index as IndexPath);
                const selected = enumLeaderEthnicity[(index as IndexPath).row];
                onChange(selected);
              }}
              status={errors.leaderEthnicity ? "danger" : "basic"}
              caption={() =>
                (errors.leaderEthnicity as any)?.message ? (
                  <CapitionError
                    message={(errors.leaderEthnicity as any)?.message}
                  />
                ) : (
                  <></>
                )
              }
            >
              {enumLeaderEthnicity.map((type, index) => (
                <SelectItem key={index} title={type} />
              ))}
            </Select>
          </View>
        )}
      />

      <Text style={{ marginTop: 8 }} category="p1">
        O(A) Senhor(a) pode informar seu sexo?
      </Text>
      <Controller
        control={control}
        name="leaderGender"
        rules={{
          required: "Por favor, selecione uma opção de sexo",
        }}
        render={({ field: { onChange, value } }) => (
          <View>
            <Select
              size="large"
              placeholder="Sexo"
              selectedIndex={
                leaderGender
                  ? new IndexPath(enumLeaderGender.indexOf(leaderGender))
                  : undefined
              }
              value={
                leaderGender
                  ? StringUtils.capitalize(
                      enumLeaderGender[selectLeaderGender.row]
                    )
                  : undefined
              }
              onSelect={(index) => {
                setLeaderGender(index as IndexPath);
                const selected = enumLeaderGender[(index as IndexPath).row];
                onChange(selected);
              }}
              status={errors.leaderGender ? "danger" : "basic"}
              caption={() =>
                (errors.leaderGender as any)?.message ? (
                  <CapitionError
                    message={(errors.leaderGender as any)?.message}
                  />
                ) : (
                  <></>
                )
              }
            >
              {enumLeaderGender.map((type, index) => (
                <SelectItem key={index} title={type} />
              ))}
            </Select>
          </View>
        )}
      />

      <Text style={{ marginTop: 8 }} category="p1">
        O(A) Senhor(a) pode informar o seu Grau de Escolaridade?
      </Text>
      <Controller
        control={control}
        name="leaderEducationalLevel"
        rules={{
          required: "Por favor, selecione o grau de escolaridade",
        }}
        render={({ field: { onChange, value } }) => (
          <View>
            <Select
              size="large"
              placeholder="Grau de escolaridade"
              selectedIndex={
                leaderEducationalLevel
                  ? new IndexPath(
                      enumLeaderEducationalLevel.indexOf(leaderEducationalLevel)
                    )
                  : undefined
              }
              value={
                leaderEducationalLevel
                  ? StringUtils.capitalize(
                      enumLeaderEducationalLevel[
                        selectLeaderEducationalLevel.row
                      ]
                    )
                  : undefined
              }
              onSelect={(index) => {
                setLeaderEducationalLevel(index as IndexPath);
                const selected =
                  enumLeaderEducationalLevel[(index as IndexPath).row];
                onChange(selected);
              }}
              status={errors.leaderEducationalLevel ? "danger" : "basic"}
              caption={() =>
                (errors.leaderEducationalLevel as any)?.message ? (
                  <CapitionError
                    message={(errors.leaderEducationalLevel as any)?.message}
                  />
                ) : (
                  <></>
                )
              }
            >
              {enumLeaderEducationalLevel.map((type, index) => (
                <SelectItem key={index} title={type} />
              ))}
            </Select>
          </View>
        )}
      />

      <Text style={{ marginTop: 8 }} category="p1">
        O(A) Senhor(a) participa ou é beneficiário de algum Programa Social?
      </Text>
      <Controller
        control={control}
        name="leaderSocialProgram"
        render={({ field: { onChange, value } }) => (
          <View>
            <Select
              size="large"
              multiSelect={true}
              selectedIndex={selectLeaderSocialProgram}
              value={getSelectedSocialProgramsText()}
              onSelect={(index) => {
                const selectedIndexes = index as IndexPath[];
                setLeaderSocialProgram(selectedIndexes);

                const selectedPrograms = selectedIndexes.map(
                  (indexPath) => enumLeaderSocialProgram[indexPath.row]
                );
                onChange(selectedPrograms);
              }}
            >
              {enumLeaderSocialProgram.map((type, index) => (
                <SelectItem key={index} title={StringUtils.capitalize(type)} />
              ))}
            </Select>
          </View>
        )}
      />
      <Controller
        control={control}
        name="leaderSufferedRacism"
        render={({ field: { onChange, value } }) => (
          <CheckBox
            style={{ marginTop: 16 }}
            checked={value}
            onChange={onChange}
          >
            O(A) Senhor(a) já sofreu algum tipo de racismo?
          </CheckBox>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 8,
  },
  formTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    color: "#FF3D71",
    marginTop: 4,
    marginLeft: 4,
    fontSize: 12,
  },
  requiredFieldsNote: {
    marginTop: 16,
    fontStyle: "italic",
    color: "#8F9BB3",
    textAlign: "center",
  },
});

export default LeaderInfo;
