<template>
  <header class="s-header">
    <div class="s-header__settings">
      <div class="wrapper">
        <p>Добро пожаловать в наш магазин</p>
        <div>
          <CButton icon="settings" />
        </div>
      </div>
    </div>
    <div class="wrapper s-header__content">
      <CLink link="/">
        <CImage image="shop-logo.png" />
      </CLink>

      <div class="s-header__links">
        <CLink link="bookmark" icon="bookmark"></CLink>
        <div class="s-header__cart">
          <CLink link="cart" icon="bag"></CLink>
          <span v-if="itemsQuantity && itemsQuantity < 90">{{ itemsQuantity }}</span>
          <span v-if="itemsQuantity > 90">90+</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CLink from '@/components/CLink.vue'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import CButton from './CButton.vue'
import CImage from './CImage.vue'

export default defineComponent({
  components: { CLink, CButton, CImage },
  setup() {
    const cartStore = useCartStore()
    const { itemsQuantity } = storeToRefs(cartStore)
    return {
      itemsQuantity
    }
  }
})
</script>

<style lang="scss">
.s-header {
  &__content.wrapper {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .wrapper {
    @include flexCenterSB;
  }

  &__cart {
    display: flex;
    position: relative;
    margin-left: 8px;

    span {
      font-weight: 700;
      position: absolute;
      left: 50%;
      top: 0;
      @include flexCenter;
      padding: 2px;
      min-width: 15px;
      height: 15px;
      flex-shrink: 0;
      font-size: 12px;
      background-color: $primary;
      color: #fff;
      border-radius: 50%;
    }
  }

  &__links {
    display: flex;
    align-items: center;

    svg {
      width: 30px;
      height: 30px;
    }
  }

  &__settings {
    background-color: $primary;
    color: #fff;

    .wrapper {
      @include flexCenterSB;
    }

    button {
      @include transparentButton;

      svg {
        stroke: #fff;
      }
    }
  }
}
</style>
