import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { Divider, IconButton, List, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import Text from "@/components/Text";
import {
  useCurrentCoordinates,
} from "@/features/location/useCurrentCoordinates";
import { locationQueries } from "@/features/locations/queries";
import {
  Location,
  setSavedLocations,
  setSelectedLocationId,
  useSettingsStore,
} from "@/stores/settings";
import { sizes } from "@/styles/sizes";

interface CurrentLocationItemProps {
  isSelected: boolean;
  onPress: () => void;
}

const CurrentLocationItem = ({ isSelected, onPress }: CurrentLocationItemProps) => {
  const { data: coords } = useCurrentCoordinates(true);
  const { data: weather } = useQuery({
    ...locationQueries.currentWeather(coords ?? { latitude: 0, longitude: 0 }),
    enabled: !!coords,
  });

  return (
    <List.Item
      title="Localização atual"
      left={(props) => <List.Icon {...props} icon="crosshairs-gps" />}
      right={() =>
        weather ? (
          <View style={styles.itemRight}>
            <Text variant="bodyLarge">
              {Math.round(weather.current.temperature_2m)}
              {weather.current_units.temperature_2m}
            </Text>
          </View>
        ) : null
      }
      style={isSelected ? styles.selectedItem : undefined}
      onPress={onPress}
    />
  );
};

interface LocationItemProps {
  location: Location;
  isSelected: boolean;
  canDelete: boolean;
  onPress: () => void;
  onDelete: () => void;
}

const LocationItem = ({
  location,
  isSelected,
  canDelete,
  onPress,
  onDelete,
}: LocationItemProps) => {
  const { data: weather } = useQuery(
    locationQueries.currentWeather({
      latitude: location.lat,
      longitude: location.lng,
    }),
  );

  return (
    <List.Item
      title={location.name}
      description={[location.admin1, location.country].filter(Boolean).join(", ")}
      left={(props) => (
        <List.Icon
          {...props}
          icon={isSelected ? "map-marker" : "map-marker-outline"}
        />
      )}
      right={() => (
        <View style={styles.itemRight}>
          {weather && (
            <Text variant="bodyLarge">
              {Math.round(weather.current.temperature_2m)}
              {weather.current_units.temperature_2m}
            </Text>
          )}
          {canDelete && (
            <IconButton icon="close" size={18} onPress={onDelete} />
          )}
        </View>
      )}
      style={isSelected ? styles.selectedItem : undefined}
      onPress={onPress}
    />
  );
};

interface DrawerContentProps {
  onClose: () => void;
}

const DrawerContent = ({ onClose }: DrawerContentProps) => {
  const theme = useTheme();
  const savedLocations = useSettingsStore((s) => s.savedLocations);
  const selectedLocationId = useSettingsStore((s) => s.selectedLocationId);
  const useCurrentLocation = useSettingsStore((s) => s.useCurrentLocation);

  const selectLocation = (id: string) => {
    setSelectedLocationId(id);
    onClose();
  };

  const deleteLocation = (location: Location) => {
    const updated = savedLocations.filter((l) => l.id !== location.id);
    setSavedLocations(updated);
    if (selectedLocationId === location.id) {
      setSelectedLocationId(updated[0]?.id ?? null);
    }
  };

  const canDelete = savedLocations.length > 1 || useCurrentLocation;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
    >
      <View style={styles.header}>
        <Text variant="titleLarge">Localizações</Text>
        <IconButton
          icon="plus"
          onPress={() => {
            onClose();
            router.push("/location-search");
          }}
        />
      </View>

      {useCurrentLocation && (
        <>
          <CurrentLocationItem
            isSelected={selectedLocationId === null}
            onPress={() => {
              setSelectedLocationId(null);
              onClose();
            }}
          />
          {savedLocations.length > 0 && <Divider />}
        </>
      )}

      <FlatList
        data={savedLocations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LocationItem
            location={item}
            isSelected={selectedLocationId === item.id}
            canDelete={canDelete}
            onPress={() => selectLocation(item.id)}
            onDelete={() => deleteLocation(item)}
          />
        )}
      />

      <Divider />
      <List.Item
        title="Configurações"
        left={(props) => <List.Icon {...props} icon="cog" />}
        onPress={() => {
          onClose();
          router.push("/settings");
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: sizes.md,
    paddingTop: sizes.xs,
  },
  selectedItem: {
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.xs,
  },
});

export default DrawerContent;
