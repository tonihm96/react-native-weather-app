import {
  type RefreshControlProps as RNRefreshControlProps,
  RefreshControl as RNRefreshControl,
} from "react-native";
import { useTheme } from "react-native-paper";

/**
 * Props do RefreshControl. Aceita todas as props do `RefreshControl` nativo do React Native.
 * As props `colors` e `progressBackgroundColor` são opcionais — quando omitidas,
 * os valores do tema atual (react-native-paper) são aplicados automaticamente.
 */
export interface RefreshControlProps extends RNRefreshControlProps {}

/**
 * Wrapper do `RefreshControl` nativo do React Native com suporte automático ao tema
 * do react-native-paper.
 *
 * - `progressBackgroundColor`: usa `theme.colors.elevation.level3` se não informado.
 * - `colors`: usa `[theme.colors.primary]` se não informado.
 *
 * Qualquer prop explícita sobrescreve o valor padrão do tema.
 *
 * @example
 * // Uso básico — cores do tema aplicadas automaticamente
 * <ScrollView
 *   refreshControl={
 *     <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
 *   }
 * />
 *
 * @example
 * // Sobrescrevendo a cor do indicador
 * <RefreshControl
 *   refreshing={isLoading}
 *   onRefresh={handleRefresh}
 *   colors={["#FF0000"]}
 * />
 */
const RefreshControl = ({
  colors,
  progressBackgroundColor,
  ...props
}: RefreshControlProps) => {
  const theme = useTheme();

  return (
    <RNRefreshControl
      progressBackgroundColor={
        progressBackgroundColor || theme.colors.elevation.level3
      }
      colors={colors || [theme.colors.primary]}
      {...props}
    />
  );
};

export default RefreshControl;
