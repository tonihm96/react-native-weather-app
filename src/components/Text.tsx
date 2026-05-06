import {
  type TextProps as PaperTextProps,
  Text as PaperText,
  useTheme,
} from "react-native-paper";

export interface TextProps extends PaperTextProps<unknown> {
  color?: string;
}

const Text = ({ children, style, color, ...props }: TextProps) => {
  const theme = useTheme();

  return (
    <PaperText
      style={[{ color: color ?? theme.colors.onSurface }, style]}
      {...props}
    >
      {children}
    </PaperText>
  );
};

export default Text;
