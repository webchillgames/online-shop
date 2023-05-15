<template>
  <div class="home-view">
    <CNavigation />

    <div class="wrapper">
      <div class="home-view__products">
        <ProductPreview
          v-for="v in products"
          :key="v.id"
          :product="v"
          @addToCart="addToCart"
        ></ProductPreview>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CNavigation from '@/components/CNavigation.vue'
import { defineComponent, onMounted, ref } from 'vue'

import { useCartStore } from '@/stores/cart'
import type { ICartItem } from '@/interfaces'
import ProductPreview from '@/components/ProductPreview.vue'
import { customAxios } from '@/services/customAxios'
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const products = ref<ICartItem[]>([])
    const cartRouter = useCartStore()
    const { items } = storeToRefs(cartRouter)
    const { add } = cartRouter

    async function getProducts() {
      try {
        const r = await customAxios.get()
        return r.data.products
      } catch (e) {
        console.log(e)
      }
    }

    function addToCart(item: ICartItem) {
      add(item)
    }

    onMounted(async () => {
      products.value = await getProducts()
    })

    return {
      products,
      addToCart,
      items
    }
  },
  components: { CNavigation, ProductPreview }
})
</script>

<style lang="scss">
.home-view {
  display: grid;
  grid-template-rows: 1fr;
  row-gap: 40px;

  &__products {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 30px;
  }
}
</style>
