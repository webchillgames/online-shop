<template>
  <div class="products-view">
    <div class="wrapper">
      <div class="products-view__filters">
        <CFilters :categories="currentSubcategories" />
      </div>
      <div class="products-view__content">
        <h2 v-if="$route.params.subcategory">{{ $t(`${$route.params.subcategory}`) }}</h2>
        <h2 v-else>{{ $t(`${$route.params.name}`) }}</h2>
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
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { customAxios } from '@/services/customAxios'

import { useCartStore } from '@/stores/cart'
import type { ICartItem, IFilterCategory } from '@/interfaces'
import ProductPreview from '@/components/ProductPreview.vue'

import CFilters from '@/components/CFilters.vue'
import { categories } from '@/categories'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: { ProductPreview, CFilters },
  setup() {
    const products = ref<ICartItem[]>([])
    const cartRouter = useCartStore()
    const { items } = storeToRefs(cartRouter)
    const { add } = cartRouter
    const route = useRoute()
    const currentSubcategories = ref<IFilterCategory[]>([])

    const category = categories.filter((v) => v.main.to === route.params.name)[0]

    function setSubcategories(): IFilterCategory[] | [] {
      return route.params.subcategory ? [] : category.submenu
    }

    async function getAllProducts() {
      let result: ICartItem[] = []

      if (!route.params.subcategory) {
        for (let item of category.submenu) {
          const r = await getProducts(item.to)
          const products = r?.data.products
          result = [...result, ...products]
        }
      } else {
        const r = await getProducts(`${route.params.subcategory}`)
        const products = r?.data.products
        result = [...result, ...products]
      }

      return result
    }

    async function getProducts(path: string) {
      try {
        const r = await customAxios.get(`/api/${path}.json`)
        return r
      } catch (e) {
        console.log(e)
      }
    }

    function addToCart(item: ICartItem) {
      add(item)
    }

    watch(
      () => route.params,
      async () => {
        currentSubcategories.value = setSubcategories()
        products.value = await getAllProducts()
      }
    )

    onMounted(async () => {
      currentSubcategories.value = setSubcategories()
      products.value = await getAllProducts()
    })

    return {
      products,
      addToCart,
      items,
      currentSubcategories
    }
  }
})
</script>

<style lang="scss">
.products-view {
  h2 {
    text-transform: capitalize;
  }

  .wrapper {
    margin-top: 30px;
    display: grid;
    grid-template-columns: 30% 70%;
    grid-gap: 30px;
  }

  &__content {
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
