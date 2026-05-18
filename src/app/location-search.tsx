import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Appbar, List, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  GeocodingResult,
  locationQueries,
} from "@/features/locations/queries";
import {
  Location,
  setSavedLocations,
  setSelectedLocationId,
  useSettingsStore,
} from "@/stores/settings";
import { sizes } from "@/styles/sizes";

const LocationSearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const savedLocations = useSettingsStore((s) => s.savedLocations);

  const { data: results = [] } = useQuery(
    locationQueries.search(searchText),
  );

  const addLocation = (result: GeocodingResult) => {
    const newLocation: Location = {
      id: String(result.id),
      name: result.name,
      originalName: result.name,
      lat: result.latitude,
      lng: result.longitude,
      timezone: result.timezone,
      country: result.country,
      admin1: result.admin1,
      admin2: result.admin2,
      createdAt: Date.now(),
    };

    const alreadySaved = savedLocations.some((l) => l.id === newLocation.id);
    if (!alreadySaved) {
      setSavedLocations([...savedLocations, newLocation]);
    }
    setSelectedLocationId(newLocation.id);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Adicionar localização" />
      </Appbar.Header>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Buscar cidade..."
          value={searchText}
          onChangeText={setSearchText}
          autoFocus
        />
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={[item.admin1, item.country]
              .filter(Boolean)
              .join(", ")}
            left={(props) => <List.Icon {...props} icon="map-marker" />}
            onPress={() => addLocation(item)}
          />
        )}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { padding: sizes.md },
});

export default LocationSearchScreen;
