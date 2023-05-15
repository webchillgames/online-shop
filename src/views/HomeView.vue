<template>
  <div class="home-view">
    <CNavigation />

    <div class="wrapper">
      <section>
        <h2>{{ $t('newArrivals') }}</h2>
        <div class="home-view__products">
          <ProductPreview
            v-for="v in products"
            :key="v.id"
            :product="v"
            @addToCart="addToCart"
          ></ProductPreview>
        </div>
      </section>
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

    async function getNewArrivals() {
      try {
        const r = await customAxios.get('api/newArrivals.json')
        
        return r.data.products
      } catch (e) {
        console.log(e)
      }
    }

    function addToCart(item: ICartItem) {
      add(item)
    }

    onMounted(async () => {
      products.value = await getNewArrivals()
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
    @include productsGrid;
  }

  section {
    text-align: center;

    h2 {
      text-transform: capitalize;
      margin-bottom: 40px 0;
    }
  }
}
</style>
