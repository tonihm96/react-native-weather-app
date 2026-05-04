import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface WeatherIconProps {
  size: number;
  code: number;
}

const WeatherIcon = ({ code, size }: WeatherIconProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        { height: size, width: size, borderColor: theme.colors.outline },
        styles.container,
      ]}
    >
      <Text style={{ color: theme.colors.outline, fontSize: size / 2 }}>
        {code}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dotted",
    borderRadius: 12,
    borderWidth: 1,
  },
});

export default WeatherIcon;
