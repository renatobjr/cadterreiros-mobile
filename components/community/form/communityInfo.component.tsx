import CapitionError from "@/components/common/capitionError.component";
import { ECommunityType } from "@/enums/religiousCommunityType.enum";
import { EReligiousSpaceNation } from "@/enums/religiousSpaceNation.enum";
import { EReligiousSpacePostionName } from "@/enums/religiousSpacePostionName.enum";
import { EReligiousSpacePraticalLanguages } from "@/enums/religiousSpacePraticalLanguages.enum";
import StringUtils from "@/utils/string.utils";
import {
  Datepicker,
  IndexPath,
  Input,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import { MomentDateService } from "@ui-kitten/moment";
import moment from "moment";
import "moment/locale/pt-br";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, View } from "react-native";

type Props = {
  isEditing?: boolean;
};

moment.locale("pt-br");
const dateService = new MomentDateService("DD/MM/YYYY");

const CommunityInfo = ({ isEditing = false }: Props) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const religiousPositionName = watch("religiousSpacePositionName");
  const communityType = watch("communityType");
  const religiousSpaceNation = watch("religiousSpaceNation");
  const religiousPraticalLanguage = watch("religiousSpacePraticalLanguages");
  const religiousSpaceStartedByDate = watch("religiousSpaceNameDateStartedBy");

  const enumReligiousPosiontionName = [
    EReligiousSpacePostionName.YALORIXA,
    EReligiousSpacePostionName.BABALORIXA,
    EReligiousSpacePostionName.TATA,
    EReligiousSpacePostionName.OUTRO,
  ];

  const enumCommunityTypes = [
    ECommunityType.MATRIZ_AFRICANA,
    ECommunityType.COMUNIDADE_TERREIRO,
  ];

  const enumReligiousSpaceNations = [
    EReligiousSpaceNation.ANGOLA,
    EReligiousSpaceNation.EKITI_EFONO,
    EReligiousSpaceNation.JEJE,
    EReligiousSpaceNation.KETU,
    EReligiousSpaceNation.NAGO,
    EReligiousSpaceNation.QUIMBANDA,
    EReligiousSpaceNation.TAMBOR_DE_MINA,
    EReligiousSpaceNation.UMBANDA,
    EReligiousSpaceNation.OUTROS,
  ];

  const enumReligiousPraticalLanguages = [
    EReligiousSpacePraticalLanguages.YORUBA,
    EReligiousSpacePraticalLanguages.QUICONGO,
    EReligiousSpacePraticalLanguages.UMBUNDO,
    EReligiousSpacePraticalLanguages.EWE_FONO,
    EReligiousSpacePraticalLanguages.OUTROS,
  ];

  return (
    <View style={styles.section} id="communityInfo">
      <Text category="h6" style={styles.formTitle}>
        Parte II: Informações sobre a Casa Tradicional
      </Text>

      <Text style={{ marginTop: 8 }} category="p1">
        Qual o nome da Casa/Ilê
      </Text>
      <Controller
        control={control}
        name="religiousSpaceName"
        rules={{
          required: "O nome da Casa/Ilê é obrigatório",
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            size="large"
            placeholder="Nome da Casa/Ilê"
            value={value}
            onChangeText={onChange}
            status={errors.religiousSpaceName ? "danger" : "basic"}
            caption={() =>
              (errors.religiousSpaceName as any)?.message ? (
                <CapitionError
                  message={(errors.religiousSpaceName as any)?.message}
                />
              ) : (
                <></>
              )
            }
          />
        )}
      />

      <Text style={{ marginTop: 8 }} category="p1">
        Por qual nome o(a) Sr.(a) é mais conhecido?
      </Text>
      <Controller
        control={control}
        name="religiousSpaceLeaderName"
        rules={{
          required: "O nome da liderança é obrigatório",
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            size="large"
            placeholder="Nome da Liderança"
            value={value}
            onChangeText={onChange}
            status={errors.religiousSpaceLeaderName ? "danger" : "basic"}
            caption={() =>
              (errors.religiousSpaceLeaderName as any)?.message ? (
                <CapitionError
                  message={(errors.religiousSpaceLeaderName as any)?.message}
                />
              ) : (
                <></>
              )
            }
          />
        )}
      />

      <Text category="p1">Qual o cargo que o(a) Sr.(a) ocupa?</Text>
      <Controller
        control={control}
        name="religiousSpacePositionName"
        rules={{ required: "O cargo da liderança é obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <View>
            <Select
              size="large"
              placeholder="Cargo da liderança"
              selectedIndex={
                enumReligiousPosiontionName.indexOf(religiousPositionName) >= 0
                  ? new IndexPath(
                      enumReligiousPosiontionName.indexOf(
                        religiousPositionName
                      ),
                      0
                    )
                  : undefined
              }
              value={
                religiousPositionName
                  ? StringUtils.capitalize(religiousPositionName)
                  : undefined
              }
              onSelect={(index) => {
                const selected =
                  enumReligiousPosiontionName[(index as IndexPath).row];
                onChange(selected);
              }}
              status={errors.religiousSpacePositionName ? "danger" : "basic"}
              caption={() =>
                (errors.religiousSpacePositionName as any)?.message ? (
                  <CapitionError
                    message={
                      (errors.religiousSpacePositionName as any)?.message
                    }
                  />
                ) : (
                  <></>
                )
              }
            >
              {enumReligiousPosiontionName.map((type, index) => (
                <SelectItem key={index} title={type} />
              ))}
            </Select>
          </View>
        )}
      />

      <Text category="p1">
        A sua casa se identifica como Tradicional de Matriz Africana ou
        Comunidade de Terreiro:
      </Text>
      <Controller
        control={control}
        name="communityType"
        rules={{ required: "O tipo de comunidade é obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <Select
            size="large"
            placeholder="Tipo de comunidade"
            selectedIndex={
              enumCommunityTypes.indexOf(communityType) >= 0
                ? new IndexPath(enumCommunityTypes.indexOf(communityType), 0)
                : undefined
            }
            value={
              communityType ? StringUtils.capitalize(communityType) : undefined
            }
            onSelect={(index) => {
              const selected = enumCommunityTypes[(index as IndexPath).row];
              onChange(selected);
            }}
            status={errors.communityType ? "danger" : "basic"}
            caption={() =>
              (errors.communityType as any)?.message ? (
                <CapitionError
                  message={(errors.communityType as any)?.message}
                />
              ) : (
                <></>
              )
            }
          >
            {enumCommunityTypes.map((type, index) => (
              <SelectItem key={index} title={StringUtils.capitalize(type)} />
            ))}
          </Select>
        )}
      />

      <Text style={{ marginTop: 8 }} category="p1">
        Qual a nação/linhas ou tradições da comunidade?
      </Text>
      <Controller
        control={control}
        name="religiousSpaceNation"
        rules={{ required: "A nação/linhas é obrigatório" }}
        render={({ field: { onChange, value } }) => (
          <Select
            size="large"
            placeholder="Nação"
            selectedIndex={
              enumReligiousSpaceNations.indexOf(religiousSpaceNation) >= 0
                ? new IndexPath(
                    enumReligiousSpaceNations.indexOf(religiousSpaceNation),
                    0
                  )
                : undefined
            }
            value={
              religiousSpaceNation
                ? StringUtils.capitalize(religiousSpaceNation)
                : undefined
            }
            onSelect={(index) => {
              const selected =
                enumReligiousSpaceNations[(index as IndexPath).row];
              onChange(selected);
            }}
            status={errors.religiousSpaceNation ? "danger" : "basic"}
            caption={() =>
              (errors.religiousSpaceNation as any)?.message ? (
                <CapitionError
                  message={(errors.religiousSpaceNation as any)?.message}
                />
              ) : (
                <></>
              )
            }
          >
            {enumReligiousSpaceNations.map((type, index) => (
              <SelectItem key={index} title={StringUtils.capitalize(type)} />
            ))}
          </Select>
        )}
      />

      <Text style={{ marginTop: 8 }} category="p1">
        Além da língua portuguesa, outra língua é utilizada nas práticas e no
        dia a dia desta casa?
      </Text>
      <Controller
        control={control}
        name="religiousSpacePraticalLanguages"
        rules={{ required: "A escolha da lingua é obrigatória" }}
        render={({ field: { onChange, value } }) => (
          <Select
            size="large"
            placeholder="Língua"
            selectedIndex={
              enumReligiousPraticalLanguages.indexOf(
                religiousPraticalLanguage
              ) >= 0
                ? new IndexPath(
                    enumReligiousPraticalLanguages.indexOf(
                      religiousPraticalLanguage
                    ),
                    0
                  )
                : undefined
            }
            value={
              religiousPraticalLanguage
                ? StringUtils.capitalize(religiousPraticalLanguage)
                : undefined
            }
            onSelect={(index) => {
              const selected =
                enumReligiousPraticalLanguages[(index as IndexPath).row];
              onChange(selected);
            }}
            status={errors.religiousSpacePraticalLanguages ? "danger" : "basic"}
            caption={() =>
              (errors.religiousSpacePraticalLanguages as any)?.message ? (
                <CapitionError
                  message={
                    (errors.religiousSpacePraticalLanguages as any)?.message
                  }
                />
              ) : (
                <></>
              )
            }
          >
            {enumReligiousPraticalLanguages.map((type, index) => (
              <SelectItem key={index} title={StringUtils.capitalize(type)} />
            ))}
          </Select>
        )}
      />

      <Text style={{ marginTop: 8 }} category="p1">
        Qual o ano de fundação da sua Casa/Ilê
      </Text>
      <Controller
        control={control}
        name="religiousSpaceYearFoundation"
        rules={{
          required: "O ano de fundação é obrigatório",
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            size="large"
            placeholder="Ano de fundação"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            status={errors.religiousSpaceYearFoundation ? "danger" : "basic"}
            caption={() =>
              (errors.religiousSpaceYearFoundation as any)?.message ? (
                <CapitionError
                  message={
                    (errors.religiousSpaceYearFoundation as any)?.message
                  }
                />
              ) : (
                <></>
              )
            }
          />
        )}
      />

      <Text style={{ marginTop: 8 }} category="p1">
        Por quem foi fundada a sua Casa/Ilê
      </Text>
      <Controller
        control={control}
        name="religiousSpaceLeaderFoundation"
        rules={{
          required: "O nomde do fundador é obrigatório",
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            size="large"
            placeholder="Nome do fundador"
            value={value}
            onChangeText={onChange}
            status={errors.religiousSpaceLeaderFoundation ? "danger" : "basic"}
            caption={() =>
              (errors.religiousSpaceLeaderFoundation as any)?.message ? (
                <CapitionError
                  message={
                    (errors.religiousSpaceLeaderFoundation as any)?.message
                  }
                />
              ) : (
                <></>
              )
            }
          />
        )}
      />

      <Text style={{ marginTop: 8 }} category="p1">
        O(A) Sr.(A) foi iniciado por quem? E Em que data?
      </Text>
      <Controller
        control={control}
        name="religiousSpaceStartedBy"
        rules={{
          required: "Nome de quem iniciou a liderança é obrigatório",
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            size="large"
            placeholder="Nome de quem iniciou a liderança"
            value={value}
            onChangeText={onChange}
            status={errors.religiousSpaceStartedBy ? "danger" : "basic"}
            caption={() =>
              (errors.religiousSpaceStartedBy as any)?.message ? (
                <CapitionError
                  message={
                    (errors.religiousSpaceStartedBy as any)?.message
                  }
                />
              ) : (
                <></>
              )
            }
          />
        )}
      />
      <Controller
        control={control}
        name="religiousSpaceNameDateStartedBy"
        rules={{
          required: "A Data de iniciação da liderança é obrigatório",
        }}
        render={({ field: { onChange, value } }) => (
          <Datepicker
            date={
              religiousSpaceStartedByDate
                ? moment(religiousSpaceStartedByDate)
                : undefined
            }
            dateService={dateService}
            onSelect={(nextDate) => {
              onChange(nextDate);
            }}
            placeholder="Data de iniciação da liderança"
            size="large"
            min={moment("1900-01-01")}
            max={moment()}
            status={errors.religiousSpaceNameDateStartedBy ? "danger" : "basic"}
            caption={() =>
              (errors.religiousSpaceNameDateStartedBy as any)?.message ? (
                <CapitionError
                  message={
                    (errors.religiousSpaceNameDateStartedBy as any)?.message
                  }
                />
              ) : (
                <></>
              )
            }
          />
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
});

export default CommunityInfo;
