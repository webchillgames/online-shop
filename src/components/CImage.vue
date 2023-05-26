<template>
  <div class="c-image">
    <img :src="image" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    image: {
      type: String,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.c-image {

  img {
    height: 100%;
    width: 100%;
  }
}
</style>
