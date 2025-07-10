import { Text } from "@ui-kitten/components";

type Props = {
  fontColor?: string;
  chipColor?: string;
  label?: string;
};

const Chip = ({ fontColor = "#fff", chipColor, label }: Props) => { 

  return (
    <Text
      style={{
        marginTop: 5,
        marginBottom: 5,
        fontFamily: "arial",
        fontSize:12,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 3,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        color: fontColor,
        backgroundColor: chipColor,
        textTransform: "capitalize",
      }}
    >
      {label}
    </Text>
  );
};

export default Chip;
