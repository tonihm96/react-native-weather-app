import { DEFAULT_NAMESPACE, TranslationResources } from "@/i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    // resources: TranslationResources;
    defaultNS: typeof DEFAULT_NAMESPACE;
  }
}
