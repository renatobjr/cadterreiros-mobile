import { ECommunityType } from "@/enums/religiousCommunityType.enum";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import Chip from "../common/chip.component";

type Props = {
  religiousSpaceName: string | undefined;
  religiousSpaceLeaderName: string | undefined;
  communityType: string | undefined;
  religiousSpaceNation: string | undefined;
};

const HeaderView = ({
  religiousSpaceName,
  religiousSpaceLeaderName,
  communityType,
  religiousSpaceNation,
}: Props) => {
  const theme = useTheme();

  return (
    <Layout level="4" style={styles.header}>
      <Text category="h4" style={{ textTransform: "capitalize" }}>
        {religiousSpaceName}
      </Text>
      <Text
        category="h6"
        style={{ textTransform: "capitalize", fontWeight: "normal" }}
      >
        {religiousSpaceLeaderName}
      </Text>
      <View style={{ flexDirection: "row", marginTop: 8, gap: 8 }}>
        <Chip
          label={communityType}
          chipColor={
            communityType === ECommunityType.MATRIZ_AFRICANA
              ? theme["color-primary-900"]
              : theme["color-danger-900"]
          }
          fontColor={
            communityType === ECommunityType.MATRIZ_AFRICANA
              ? theme["color-primary-100"]
              : theme["color-danger-100"]
          }
        />
        <Chip
          label={religiousSpaceNation}
          chipColor={theme["color-success-900"]}
          fontColor={theme["color-success-100"]}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    flexDirection: "column",
  },
});

export default HeaderView;
