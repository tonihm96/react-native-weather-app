import * as Font from "expo-font";
import { useState } from "react";

const init = async () => {
  await Font.loadAsync({
    DMSans: require("../../assets/fonts/DMSans-Regular.ttf"),
  } satisfies Record<FontFamily, number>);
};

const useInit = () => {
  const [initPromise] = useState(() => init());

  return initPromise;
};

export default useInit;
