import { StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";

interface CurrentWeatherCardProps {
  label: string;
}

const CurrentWeatherCard = ({ label }: CurrentWeatherCardProps) => {
  return (
    <Surface elevation={3} style={styles.container}>
      <Text variant="bodyLarge">{label}</Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
  },
});

export default CurrentWeatherCard;
