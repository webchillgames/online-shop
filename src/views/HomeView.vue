<template>
  <div class="home-view">
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
import { defineComponent, onMounted, ref } from 'vue'

import { useCartStore } from '@/stores/cart'
import type { IProduct } from '@/interfaces'
import ProductPreview from '@/components/ProductPreview.vue'
import { customAxios } from '@/services/customAxios'
import { storeToRefs } from 'pinia'


export default defineComponent({
  setup() {
    const products = ref<IProduct[]>([])
    const cartStore = useCartStore()
    const { items } = storeToRefs(cartStore)
    const { addToCart } = cartStore
 
    async function getNewArrivals() {
      try {
        const r = await customAxios.get('/api/newArrivals.json')

        return r.data.products
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(async () => {
      products.value = await getNewArrivals()
    })

    return {
      products,
      addToCart,
      items,
    }
  },
  components: { ProductPreview }
})
</script>

<style lang="scss">
.home-view {
  @include page;

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
