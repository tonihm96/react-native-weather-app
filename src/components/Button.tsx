import { StyleSheet } from "react-native";
import {
  type ButtonProps as PaperButtonProps,
  ActivityIndicator,
  Button as PaperButton,
  useTheme,
} from "react-native-paper";

/**
 * Props do Button. Aceita todas as props do `Button` do react-native-paper.
 */
export interface ButtonProps extends PaperButtonProps {}

/**
 * Altura do botão em dp, conforme especificação do Material Design 3.
 *
 * @see https://m3.material.io/components/button/specs#dcbf8c9e-1b0c-4a7c-9a1b-5cbbdbfbbd0e
 */
const HEIGHT = 56;

/**
 * Wrapper do `Button` do react-native-paper com estilo padronizado conforme
 * Material Design 3.
 *
 * Customizações aplicadas automaticamente:
 * - Altura fixa de `56dp` no conteúdo interno.
 * - `borderRadius` proporcional à altura (pill shape).
 * - Fonte `bodyLarge` do tema aplicada ao label.
 * - Quando `loading` é `true`, substitui o `icon` por um `ActivityIndicator` de tamanho 24.
 *
 * @example
 * // Botão padrão
 * <Button mode="contained" onPress={handleSubmit}>
 *   Entrar
 * </Button>
 *
 * @example
 * // Estado de carregamento — ícone substituído por spinner
 * <Button mode="contained" loading={isSubmitting} onPress={handleSubmit}>
 *   Salvando...
 * </Button>
 *
 * @example
 * // Com ícone explícito (substituído pelo spinner quando loading=true)
 * <Button mode="outlined" icon="account-plus" onPress={handleRegister}>
 *   Criar conta
 * </Button>
 */
const Button = ({
  children,
  contentStyle,
  labelStyle,
  style,
  loading,
  icon,
  ...props
}: ButtonProps) => {
  const theme = useTheme();

  return (
    <PaperButton
      contentStyle={[styles.content, contentStyle]}
      labelStyle={[theme.fonts.bodyLarge, labelStyle]}
      style={[styles.container, style]}
      icon={
        loading ? (props) => <ActivityIndicator {...props} size={24} /> : icon
      }
      {...props}
    >
      {children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: HEIGHT / 2,
  },
  content: {
    height: HEIGHT,
  },
});

export default Button;

