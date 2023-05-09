<template>
  <div class="product-preview">
    <CButton icon="heart"></CButton>
    <p>{{ product.title }}</p>
    <p>{{ product.price }} р</p>
    <CButton icon="cart" @click="$emit('addToCart', product)"></CButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CButton from '@/components/CButton.vue'

export default defineComponent({
  components: { CButton },
  emits: ['addToCart'],
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.product-preview {
  background-color: $bg;
  border: 1px solid $border;
  max-width: 272px;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
