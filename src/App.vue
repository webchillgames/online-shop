<template>
  <div class="app">
    <SHeader />

    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SHeader from './components/SHeader.vue'

export default defineComponent({
  setup() {
    return {}
  },
  components: { SHeader }
})
</script>

<style lang="scss">
  @import url('@/styles/base.scss');
  .app {
    height: 100%;
  }
</style>
