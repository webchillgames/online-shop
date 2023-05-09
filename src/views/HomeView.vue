<template>
  <div class="home-view">
    <div class="wrapper">
      <h1>Демо онлайн магазин</h1>
      <ul>
        <li><router-link to="/products">Продукты</router-link></li>
        <!-- <li><router-link to="/ar">AR продукта</router-link></li> -->
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="scss"></style>
