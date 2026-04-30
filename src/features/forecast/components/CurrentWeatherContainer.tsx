import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface CurrentWeatherContainerProps {
  children: ReactNode;
}

const CurrentWeatherContainer = ({
  children,
}: CurrentWeatherContainerProps) => {
  return <View style={styles.currentWeatherContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  currentWeatherContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
});

export default CurrentWeatherContainer;
