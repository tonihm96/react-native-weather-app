import enUS from "./resources/en-US.json";
import esES from "./resources/es-ES.json";
import ptBR from "./resources/pt-BR.json";

export type TranslationResourcesLanguage = keyof typeof translationResources;

export type TranslationResources = typeof ptBR;

export const DEFAULT_NAMESPACE =
  "globais" as const satisfies keyof TranslationResources;

export const FALLBACK_LANGUAGE =
  "pt-BR" as const satisfies TranslationResourcesLanguage;

export const translationResources = {
  "pt-BR": ptBR,
  "en-US": enUS,
  "es-ES": esES,
} as const;
