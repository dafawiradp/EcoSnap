import { en } from './en';
import { id } from './id';
import type { SupportedLocale, TranslationSchema } from './types';

const translations: Record<SupportedLocale, TranslationSchema> = { en, id };

let activeLocale: SupportedLocale = 'en';

export function setLocale(locale: SupportedLocale): void {
  activeLocale = locale;
}

export function getLocale(): SupportedLocale {
  return activeLocale;
}

export function t(schema: TranslationSchema): TranslationSchema {
  return schema;
}

export function useTranslations(): TranslationSchema {
  return translations[activeLocale];
}

export type { SupportedLocale, TranslationSchema };
