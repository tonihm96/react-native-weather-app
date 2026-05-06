import { type ErrorInfo, type ReactNode, Component } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Componente para capturar erros em componentes filhos.
 *
 * @example
 * // exemplo simples
 * <ErrorBoundary fallback={<Text>Ocorreu um erro.</Text>}>
 *   <MyComponent />
 * </ErrorBoundary>
 *
 * // com ref para resetar o estado de erro
 * const errorBoundaryRef = useRef<SnackbarHandle>(null);
 *
 * <ErrorBoundary ref={errorBoundaryRef} fallback={<Text>Ocorreu um erro.</Text>}>
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  /**
   * Reseta o estado de erro e tenta renderizar os componentes filhos novamente.
   */
  resetError() {
    this.setState({ error: null });
  }

  render() {
    return this.state.error !== null
      ? this.props.fallback
      : this.props.children;
  }
}

export default ErrorBoundary;
