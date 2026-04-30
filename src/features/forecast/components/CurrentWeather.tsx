import { View } from "react-native";
import { Text } from "react-native-paper";

interface CurrentWeatherProps {
  temperature?: number;
  temperatureUnit?: string;
  apparentTemperature?: number;
  apparentTemperatureUnit?: string;
}

const CurrentWeather = ({
  apparentTemperature,
  apparentTemperatureUnit,
  temperature,
  temperatureUnit,
}: CurrentWeatherProps) => {
  return (
    <View>
      <Text variant="displayLarge">
        {temperature ?? 30}
        {temperatureUnit ?? "°C"}
      </Text>
      <Text>
        {apparentTemperature ?? 30}
        {apparentTemperatureUnit ?? "°C"}
      </Text>
    </View>
  );
};

export default CurrentWeather;
