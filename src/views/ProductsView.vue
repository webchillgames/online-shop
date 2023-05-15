<template>
  <div class="products-view">
    <div class="wrapper">
      <div class="products-view__filters">
        <!-- <div>
          <p>{{ $t('categories') }}</p>
          <ul v-if="filters && filters.categories">
            <li
              v-for="category in filters.categories"
              :key="category.id"
              class="products-view__checkbox"
            >
              <input type="checkbox" :id="category.value" v-model="" />
              <label :for="category.value">{{ category.title }}</label>
            </li>
          </ul>
        </div> -->

        <!-- <div>
          <p>{{ $t('color') }}</p>
          <ul v-if="filters && filters.colors">
            <li v-for="color in filters.colors" :key="color.id">
              <input type="checkbox" :id="color.value" />
              <label :for="color.value">{{ color.value }}</label>
            </li>
          </ul>
        </div> -->
      </div>
      <div class="products-view__products">
        <ProductPreview
          v-for="v in products"
          :key="v.id"
          :product="v"
          @addToCart="addToCart"
          class="products-view__product"
        ></ProductPreview>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent, onMounted, ref } from 'vue'
import { customAxios } from '@/services/customAxios'

import { useCartStore } from '@/stores/cart'
import type { ICartItem } from '@/interfaces'
import ProductPreview from '@/components/ProductPreview.vue'
import { useLocalizationStore } from '@/stores/localization'
export default defineComponent({
  components: { ProductPreview },
  setup() {
    const products = ref<ICartItem[]>([])
    const cartRouter = useCartStore()
    const { items } = storeToRefs(cartRouter)
    const { add } = cartRouter
    const localizationStore = useLocalizationStore()
    const { language, current } = storeToRefs(localizationStore)
    const filters = ref()
    const priceRange = ref()
    // const currentFilters = ref<string[]>([])

    async function getProducts() {
      try {
        const r = await customAxios.get('/api/products.json')
        return r.data.products
      } catch (e) {
        console.log(e)
      }
    }

    async function getFilters() {
      try {
        const r = await customAxios.get(`/api/filters.json`)
        return r.data.filters[language.value]
      } catch (e) {
        console.log(e)
      }
    }

    async function getPriceRange() {
      try {
        const r = await customAxios.get(`/api/filters.json`)

        return r.data.filters.priceRange[current.value]
      } catch (e) {
        console.log(e)
      }
    }

    function addToCart(item: ICartItem) {
      add(item)
    }

    // function toggleCurrentFilters(e: Event) {
    //   const event = e.target as HTMLElement
    //   const parent = event?.parentElement

    //   if (parent?.nodeName === 'LI') {
    //     const typeOfFilter: string = parent.getAttribute('filterType')
    //     const value: string = parent.getAttribute('filterValue')
    //     console.log(typeOfFilter, value)

    //     // if (typeOfFilter && value) {
    //     if (
    //       currentFilters.value.filter((v) => v === typeOfFilter).length ||
    //       currentFilters.value.filter((v) => v === value).length
    //     ) {
    //       return
    //     }

    //     if (!currentFilters.value.filter((v) => v === typeOfFilter).length) {
    //       currentFilters.value.push(typeOfFilter)
    //     }

    //     if (!currentFilters.value.filter((v) => v === value).length) {
    //       currentFilters.value.push(value)
    //     }

    //     console.log(currentFilters.value)
    //     // }
    //   }
    // }

    onMounted(async () => {
      products.value = await getProducts()
      filters.value = await getFilters()
      priceRange.value = await getPriceRange()
    })

    return {
      products,
      addToCart,
      items,
      filters,
      priceRange,
      // toggleCurrentFilters
    }
  }
})
</script>

<style lang="scss">
.products-view {
  .wrapper {
    display: flex;
  }

  &__products {
    display: flex;
    flex-wrap: wrap;
  }

  &__product {
    margin: 16px;
  }

  &__checkbox {
    display: flex;
  }

  &__filters {
    margin-top: 16px;
    border: 1px solid $border;
    padding: 10px;
    flex-shrink: 0;
    align-self: flex-start;
    min-width: 200px;
    box-sizing: border-box;

    p {
      padding: 10px;
      display: block;
      border-bottom: 1px solid $border;
    }

    li {
      padding: 8px;
    }
  }
}
</style>
