<template>
  <button type="button" class="c-button">
    <span v-if="title">{{ title }}</span>
    <CIcon v-if="icon" :icon="icon" />
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CIcon from './CIcon.vue'
export default defineComponent({
  components: { CIcon },

  props: {
    title: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.c-button {
  cursor: pointer;
}
</style>
