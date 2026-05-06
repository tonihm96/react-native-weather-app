import {
  type Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import {
  type SnackbarProps as PaperSnackbarProps,
  Badge,
  Snackbar as PaperSnackbar,
  useTheme,
} from "react-native-paper";

import Text from "./Text";

type IconProp = PaperSnackbarProps["icon"];

/** Dados de uma mensagem a ser exibida na fila do Snackbar. */
export interface SnackbarMessage {
  /** Texto da mensagem a exibir. */
  message: string;
  /** Duração em ms. Padrão: `Snackbar.DURATION_SHORT`. */
  duration?: number;
  /** Ícone exibido à direita da mensagem. */
  icon?: IconProp;
  /** Callback ao pressionar o ícone. Padrão: fecha o snackbar. */
  onIconPress?: () => void;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
}

/**
 * Handle imperativo exposto via `ref` para controlar o Snackbar externamente.
 *
 * @example
 * const snackbarRef = useRef<SnackbarHandle>(null);
 *
 * snackbarRef.current?.enqueue("Mensagem de exemplo");
 * snackbarRef.current?.clearQueue();
 */
export interface SnackbarHandle {
  /**
   * Adiciona uma mensagem à fila. Se a fila estiver vazia, exibe imediatamente.
   * Aceita uma string simples ou um objeto `SnackbarMessage` com opções adicionais.
   */
  enqueue: (message: string | SnackbarMessage) => void;
  /** Remove todas as mensagens da fila e fecha o snackbar imediatamente. */
  clearQueue: () => void;
}

/** Props do Snackbar. Requer uma `ref` para acesso ao handle imperativo. */
export interface SnackbarProps {
  ref: Ref<SnackbarHandle>;
}

/** Altura do snackbar em dp, usada para posicionamento do badge de contagem. */
const SNACKBAR_HEIGHT = 48;
/** Tamanho do botão de ícone em dp, usado para posicionamento do badge de contagem. */
const SNACKBAR_ICON_BUTTON_SIZE = 48;
/** Duração da animação de saída em ms, aguardada antes de avançar a fila. */
const SNACKBAR_FADE_OUT_DURATION_IN_MS = 200;

/**
 * Snackbar com fila de mensagens controlado por `ref` imperativa.
 *
 * Gerencia uma fila interna de mensagens: ao dispensar o snackbar atual,
 * aguarda a animação de saída (`200ms`) e então exibe a próxima mensagem da fila.
 * Quando há mais de uma mensagem na fila, exibe um badge com a contagem.
 *
 * Expõe constantes de duração compatíveis com o Paper:
 * - `Snackbar.DURATION_SHORT`
 * - `Snackbar.DURATION_MEDIUM`
 * - `Snackbar.DURATION_LONG`
 *
 * @example
 * // Declaração
 * const snackbarRef = useRef<SnackbarHandle>(null);
 *
 * // Renderização (normalmente no layout raiz da tela)
 * <Snackbar ref={snackbarRef} />
 *
 * // Uso em qualquer ponto da árvore
 * snackbarRef.current?.enqueue("Salvo com sucesso!");
 *
 * // Mensagem com opções avançadas
 * snackbarRef.current?.enqueue({
 *   message: "Erro ao sincronizar",
 *   duration: Snackbar.DURATION_LONG,
 *   icon: "alert-circle",
 *   onIconPress: () => openErrorDetails(),
 * });
 */
const Snackbar = ({ ref }: SnackbarProps) => {
  const theme = useTheme();

  const [queue, setQueue] = useState<SnackbarMessage[]>([]);
  const [visible, setVisible] = useState(false);

  const fadeOutTimeout = useRef<number | null>(null);

  const current = queue[0];

  const onDismiss = () => {
    setVisible(false);
    // aguarda a animação de saída antes de remover da fila
    fadeOutTimeout.current = setTimeout(() => {
      setQueue((prev) => {
        const next = prev.slice(1);
        if (next.length > 0) setVisible(true);
        return next;
      });
    }, SNACKBAR_FADE_OUT_DURATION_IN_MS);
  };

  useImperativeHandle(
    ref,
    () => ({
      enqueue: (message) => {
        const item: SnackbarMessage =
          typeof message === "string" ? { message } : message;
        setQueue((prev) => {
          // se a fila estava vazia, mostra imediatamente
          if (prev.length === 0) setVisible(true);
          return [...prev, item];
        });
      },
      clearQueue: () => {
        if (fadeOutTimeout.current !== null) {
          clearTimeout(fadeOutTimeout.current);
        }
        setQueue([]);
        setVisible(false);
      },
    }),
    [],
  );

  useEffect(() => {
    return () => {
      if (fadeOutTimeout.current !== null) {
        clearTimeout(fadeOutTimeout.current);
      }
    };
  }, []);

  if (!current) return null;

  return (
    <PaperSnackbar
      visible={visible}
      onDismiss={onDismiss}
      icon={current.icon}
      onIconPress={current.onIconPress ?? onDismiss}
      duration={current.duration ?? PaperSnackbar.DURATION_SHORT}
      style={{
        marginBottom: current.marginBottom,
        marginLeft: current.marginLeft,
        marginRight: current.marginRight,
        marginHorizontal: current.marginHorizontal,
      }}
    >
      {queue.length > 1 ? (
        <>
          <Text variant="bodyMedium" color={theme.colors.inverseOnSurface}>
            {current.message}
          </Text>
          <Badge style={styles.badge}>{queue.length}</Badge>
        </>
      ) : (
        current.message
      )}
    </PaperSnackbar>
  );
};

Snackbar.DURATION_SHORT = PaperSnackbar.DURATION_SHORT;
Snackbar.DURATION_MEDIUM = PaperSnackbar.DURATION_MEDIUM;
Snackbar.DURATION_LONG = PaperSnackbar.DURATION_LONG;

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -SNACKBAR_HEIGHT / 2,
    right: -SNACKBAR_ICON_BUTTON_SIZE,
  },
});

export default Snackbar;
