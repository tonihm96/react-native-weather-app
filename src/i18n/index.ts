import enUS from "./resources/en-US.json";
import esES from "./resources/es-ES.json";
import ptBR from "./resources/pt-BR.json";

const resources = {
  "pt-BR": ptBR,
  "en-US": enUS,
  "es-ES": esES,
} as const;

export type TranslationResources = typeof resources;

export type TranslationResource = typeof ptBR;

export type TranslationLanguage = keyof TranslationResources;

export const DEFAULT_NAMESPACE =
  "globais" as const satisfies keyof TranslationResource;

export default resources;
