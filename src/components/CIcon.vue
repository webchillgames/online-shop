<template>
  <svg class="c-icon" viewBox="0 0 24 24"> 
    <use :xlink:href="`#${icon}`"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    icon: {
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
.c-icon {
    display: block;
    width: 24px;
    height: 24px;
    cursor: pointer;

    stroke: $icons;
}
</style>
