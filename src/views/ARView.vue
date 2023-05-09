<template>
  <div>
    <div v-html="template"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
const modelsFolder = '../src/assets/models'

export default defineComponent({
  setup() {
    const template = `
          <a-scene>
            <a-sky color="#ECECEC"></a-sky>
            <a-camera position="0 1 4"></a-camera>
            <a-entity gltf-model="${modelsFolder}/wooden_table/scene.gltf"></a-entity>
          </a-scene>
    `
    return { template }
  }
})
</script>

<style lang="scss"></style>
