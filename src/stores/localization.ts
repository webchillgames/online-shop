import { defineStore } from "pinia";

export const useLocalizationStore = defineStore('localization', {
    state: () => ({
        language: 'ru',
        current: 'rub'
    })
})