<template>
  <div>
    <div v-if="categories && categories.length">
      <p>{{ $t('categories') }}</p>

      <ul>
        <li v-for="c in categories" :key="c.id" class="products-view__checkbox">
          <input type="checkbox" :id="c.to" />
          <label :for="c.to">{{ c.title }}</label>
        </li>
      </ul>
    </div>

    <div>
      <p>{{ $t('color') }}</p>
      <ul>
        <li v-for="color in colors" :key="color.id">
          <input type="checkbox" :id="color.value" />
          <label :for="color.value">{{ color.value }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
// import { useLocalizationStore } from '@/stores/localization'
// import { storeToRefs } from 'pinia'
import type { IFilterColor, IFilterCategory } from '@/interfaces'

export default defineComponent({
  props: {
    categories: {
      type: Array as PropType<IFilterCategory[]>,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    // const localizationStore = useLocalizationStore()
    // const categories: IFilterCategory[] = [
    //   {
    //     id: 1,
    //     title: t('chairs'),
    //     value: t('chairs')
    //   },
    //   {
    //     id: 2,
    //     title: t('lightning'),
    //     value: t('lightning')
    //   },
    //   {
    //     id: 3,
    //     title: t('mirrors'),
    //     value: t('mirrors')
    //   },
    //   {
    //     id: 4,
    //     title: t('tables'),
    //     value: t('tables')
    //   }
    // ]

    const colors: IFilterColor[] = [
      { id: 1, value: 'peru' },
      { id: 2, value: 'darkGrey' },
      { id: 3, value: 'black' },
      { id: 4, value: 'darkSeaGreen' }
    ]

    return {
      colors
    }
  }
})
</script>

<style lang="scss"></style>
