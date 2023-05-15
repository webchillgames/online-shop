<template>
  <div> 
     <ProductPreview v-for="v in products" :key="v.id" :product="v" @addToCart="addToCart"></ProductPreview>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent, onMounted, ref } from 'vue'
import { customAxios } from '@/services/customAxios'

import { useCartStore } from '@/stores/cart'
import type { ICartItem } from '@/interfaces'
import ProductPreview from "@/components/ProductPreview.vue"

export default defineComponent({
  components: {ProductPreview},
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
  }
})
</script>

<style lang="scss">

</style>
