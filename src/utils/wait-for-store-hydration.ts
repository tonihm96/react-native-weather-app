import { Mutate, StoreApi } from "zustand";

export const waitForStoreHydration = async <T>(
  store: Mutate<StoreApi<T>, [["zustand/persist", unknown]]>,
) => {
  return new Promise<T>((resolve) => {
    if (store.persist.hasHydrated()) {
      return resolve(store.getState());
    }

    const unsubscribe = store.persist.onFinishHydration((state) => {
      unsubscribe();
      resolve(state);
    });
  });
};
