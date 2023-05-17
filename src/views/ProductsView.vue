<template>
  <div class="products-view">
    <div class="wrapper">
      <div class="products-view__filters">
        <CFilters v-if="currentSubcategories" :subcategories="currentSubcategories" :category="currentCategory" />
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
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { customAxios } from '@/services/customAxios'
import { categories } from '@/categories'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import type { IProduct, ICategory } from '@/interfaces'

import ProductPreview from '@/components/ProductPreview.vue'
import CFilters from '@/components/CFilters.vue'

export default defineComponent({
  components: { ProductPreview, CFilters },
  setup() {
    const route = useRoute()
    const products = ref<IProduct[]>([])

    const cartStore = useCartStore()
    const { add } = cartStore

    const currentCategory = ref<ICategory>()

    const currentSubcategories = computed(() => {
      return route.params.subcategory ? [] : currentCategory.value?.subcategories 
    })

    function setCurrentCategory(categories: ICategory[]): ICategory {
      return categories.filter((v) => route.params.name === v.category.to)[0]
    }

    function addToCart(product: IProduct) {
      add(product)
    }

    watch(() => route.params, () => {      
      currentCategory.value = setCurrentCategory(categories)
    })

    onMounted(() => {
      currentCategory.value = setCurrentCategory(categories)
    })
    return {
      addToCart,
      products,
      currentSubcategories,
      currentCategory
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
