import { Text } from "@react-navigation/elements";
import { Layout, useTheme } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

type Props = {
  data?: {
    approved: number;
    pending: number;
    rejected: number;
  };
};

const CardHome = ({ data }: Props) => {
  const theme = useTheme();
  const renderedCards = [
    {
      colors: {
        header: theme["color-danger-200"],
        font: theme["color-danger-900"],
      },
      title: "Rejeitados",
      value: data?.rejected || "0",
    },
    {
      colors: {
        header: theme["color-warning-200"],
        font: theme["color-warning-900"],
      },
      title: "Pendentes",
      value: data?.pending?.toString() || "0",
    },
    {
      colors: {
        header: theme["color-success-200"],
        font: theme["color-success-900"],
      },
      title: "Aprovados",
      value: data?.approved?.toString() || "0",
    },
  ];

  return (
    <Layout level="4" style={styles.cardContainer}>
      {renderedCards.map((item, index) => (
        <View style={styles.card} key={index}>
          <View style={{ backgroundColor: item.colors.header, ...styles.cardHeader }}>
            <Text style={{ color: item.colors.font, ...styles.cardHeaderTitle}}>{item.title}</Text>
          </View>
          <Text
            style={styles.cardBody}
          >
            {item.value}
          </Text>
        </View>
      ))}
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 100,
    height: 100,
  },
  cardHeader: {
    padding: 5,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  cardHeaderTitle: {
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
  cardBody: {
    fontWeight: "bold",
    fontSize: 36,
    alignSelf: "center",
    marginTop: 12,
  },
  cardContainer: {
    flex: 1,
    marginTop: 30,
    gap: 16,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default CardHome;
