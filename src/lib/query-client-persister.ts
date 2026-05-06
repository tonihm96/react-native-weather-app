import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { DehydrateOptions } from "@tanstack/react-query";

export const QUERY_STORAGE_KEY = "QUERY_STORAGE_KEY" as const;

const queryClientPersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: QUERY_STORAGE_KEY,
});

export const dehydrateOptions: DehydrateOptions = {
  // mantém dados mesmo que query esteja em estado de erro
  shouldDehydrateQuery: (query) => query.state.data !== undefined,
};

export default queryClientPersister;
