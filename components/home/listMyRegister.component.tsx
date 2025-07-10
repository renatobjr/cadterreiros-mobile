// components/home/listMyRegisterItem.component.tsx
import { ECensusStep } from "@/enums/censusStep.enum";
import { ECommunityType } from "@/enums/religiousCommunityType.enum";
import { EReligiousSpaceNation } from "@/enums/religiousSpaceNation.enum";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Button,
  IconElement,
  ListItem,
  Text,
  useTheme
} from "@ui-kitten/components";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import Chip from "../common/chip.component";

type Props = {
  item: {
    id?: string;
    religiousSpaceName: string;
    fullAddress: string;
    censusStep: ECensusStep;
    religiousSpaceNation: EReligiousSpaceNation;
    communityType: ECommunityType;
  };
};

const ListMyRegisterItem = ({ item }: Props) => {
  const theme = useTheme();

  const EyeIcon = (): React.ReactElement<IconElement> => (
    <Ionicons color="#fff" name="eye-outline" size={20} />
  );

  const EditIcon = (): React.ReactElement<IconElement> => (
    <Ionicons color="#fff" name="pencil-outline" size={20} />
  );

  const RenderStatusChips = ({ status }: { status: ECensusStep }) => {
    switch (status) {
      case ECensusStep.PENDING:
        return (
          <Chip
            chipColor={theme["color-warning-100"]}
            fontColor={theme["color-warning-900"]}
            label="Pendente"
          />
        );
      case ECensusStep.REJECTED:
        return (
          <Chip
            chipColor={theme["color-danger-100"]}
            fontColor={theme["color-danger-900"]}
            label="Rejeitado"
          />
        );
      default:
        return (
          <Chip
            chipColor={theme["color-success-100"]}
            fontColor={theme["color-success-900"]}
            label="Aprovado"
          />
        );
    }
  };

  return (
    <ListItem
      title={() => (
        <Text style={style.title}>{item.religiousSpaceName}</Text>
      )}
      description={() => (
        <Text style={style.description}>{item.religiousSpaceNation}</Text>
      )}
      accessoryRight={() => (
        <View style={style.actions}>
          <RenderStatusChips status={item.censusStep} />
          <Button
            appearance="filled"
            size="tiny"
            accessoryRight={EyeIcon}
            onPress={() => router.push(`/community/${item.id}/view`)}
          />
          <Button
            appearance="filled"
            size="tiny"
            accessoryRight={EditIcon}
            onPress={() => router.push(`/community/${item.id}/edit`)}
          />
        </View>
      )}
      style={{ backgroundColor: "#fff", marginTop: 8 }}
    />
  );
};

const style = StyleSheet.create({
  title: {
    fontFamily: "Nunito",
    fontSize: 14,
    fontWeight: "900",
    marginLeft: 8,
    marginRight: 8,
    textTransform: "capitalize",
  },
  description: {
    fontFamily: "Nunito",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 8,
    marginRight: 8,
    textTransform: "capitalize",
  },
  actions: {
    gap: 8,
    flexDirection: "row",
    marginLeft: 10,
  },
});

export default ListMyRegisterItem;
