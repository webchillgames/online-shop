<template>
  <div class="products-view">
    <div class="wrapper">
      <div class="products-view__filters">
        <CFilters
          v-if="currentSubcategories && currentCategory"
          :subcategories="!$route.params.subcategory ? currentSubcategories : []"
          :category="currentCategory"
        />
      </div>

      <div class="products-view__products" v-if="products.length">
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
import type { IProduct, ICategory, ILink } from '@/interfaces'

import ProductPreview from '@/components/ProductPreview.vue'
import CFilters from '@/components/CFilters.vue'

export default defineComponent({
  components: { ProductPreview, CFilters },
  setup() {
    const route = useRoute()
    const products = ref<IProduct[]>([])

    const cartStore = useCartStore()
    const { addToCart } = cartStore

    const currentCategory = ref<ICategory>()

    const currentSubcategories = computed(() => {
      return currentCategory.value?.subcategories
    })

    function setCurrentCategory(categories: ICategory[]): ICategory {
      return categories.filter((v) => route.params.name === v.category.to)[0]
    }

    async function getProducts(currentSubcategories: ILink[]) {
      let result: IProduct[] = []
      try {
        if (!route.params.subcategory) {
          
          for (let item of currentSubcategories) {
            const r = await customAxios.get(`/api/${item.to}.json`)
            result = [...result, ...r.data.products]          
          }
        } else {
          console.log(route.params.subcategory);
          
          const r = await customAxios.get(`/api/${route.params.subcategory}.json`)
          result = [...result, ...r.data.products]
        }

        return result
      } catch (e) {
        console.log(e)
        return []
      }
    }

    watch(
      () => route.params,
      async () => {
        currentCategory.value = setCurrentCategory(categories)

        if (currentSubcategories.value) {
          products.value = await getProducts(currentSubcategories.value)
        }
      }
    )

    onMounted(async() => {
      currentCategory.value = setCurrentCategory(categories)

      if (currentSubcategories.value) {
        products.value = await getProducts(currentSubcategories.value)
      }
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

  @media (max-width: 786px) {
    .wrapper {
      grid-template-columns: 1fr;
    }
  }
}
</style>
