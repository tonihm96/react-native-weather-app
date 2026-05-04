import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

export const QUERY_STORAGE_KEY = "QUERY_STORAGE_KEY" as const;

const queryClientPersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: QUERY_STORAGE_KEY,
});

export default queryClientPersister;
