<template>
  <div class="app">
    <SHeader />

    <router-view />

    <Transition name="fadeVertical">
      <MiniModal v-if="isShow" />
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MiniModal from '@/components/MiniModal.vue'
import { useMiniModalsStore } from '@/stores/miniModals'
import SHeader from './components/SHeader.vue'
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const modalStore = useMiniModalsStore()
    const { isShow } = storeToRefs(modalStore)

    return { isShow }
  },
  components: { SHeader, MiniModal }
})
</script>

<style lang="scss">
@import url('@/styles/base.scss');
.app {
  height: 100%;
}
</style>
