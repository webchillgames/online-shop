<template>
  <router-link :to="`${link}`" class="c-link">
    <span v-if="title">{{ title }}</span>
    <CIcon v-if="icon" :icon="icon" />
    <slot></slot>
  </router-link>
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
    },
    link: {
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
.c-link {
  color: $font;
  text-decoration: none;
}
</style>
