<template>
  <div :class="status" class="mini-modal">
    <p>{{ msg }}</p>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useMiniModalsStore } from '@/stores/miniModals';
import { storeToRefs } from 'pinia';

export default defineComponent({
  setup() {
    const miniModalsStore = useMiniModalsStore()
    const {msg, status} = storeToRefs(miniModalsStore)
    
    return {msg, status};
  }
});
</script>

<style lang="scss">
.mini-modal {
    position: fixed;
    top: 10%;
    
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    z-index: 1000;
    background-color: #fff;
    box-shadow: $shadow;
    padding: 20px;
    border-radius: 16px;

    p {
        margin: 0;
    }

    &.success {
        border: 1px solid $primary;
    }
}
</style>