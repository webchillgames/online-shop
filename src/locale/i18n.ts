import { createI18n } from 'vue-i18n'
import { useLocalizationStore } from '@/stores/localization'
import { storeToRefs } from 'pinia'
import { en } from '@/locale/en_dictionary'
import { ru } from '@/locale/ru_dictionary'

export function i18n() {
  const localeStore = useLocalizationStore()
  const { language } = storeToRefs(localeStore)

  const i18n = createI18n({
    locale: language.value,
    fallbackLocale: 'en',
    messages: {
      en: en,
      ru: ru
    },
    legacy: false
  })

  return i18n
}
