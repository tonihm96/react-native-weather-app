import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface CurrentWeatherCardsContainerProps {
  children: ReactNode;
}

const CurrentWeatherCardsContainer = ({
  children,
}: CurrentWeatherCardsContainerProps) => {
  return <View style={styles.weatherCardsContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  weatherCardsContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

export default CurrentWeatherCardsContainer;
