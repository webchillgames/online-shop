<template>
  <div class="product-preview">
    <div class="product-preview__top">
      <div v-if="product.budge" class="product-preview__budge">
        <span> {{ product.budge }}</span>
      </div>

      <CButton icon="heart" class="product-preview__heart"></CButton>
    </div>

    <div class="product-preview__content">
      <div>
        <CImage :image="product.image" />
      </div>
      <div>
        <h4>{{ product.title }}</h4>

        <div class="product-preview__stars">
          <CIcon
            v-for="i in 5"
            :key="i"
            icon="filled-star"
            fill="#fff"
            :style="{
              fill: i < product.stars ? '#ffb933' : '#fff'
            }"
          />
          <span>({{ product.reviews }})</span>
        </div>

        <div class="product-preview__price">
          <p v-if="product.price.old" class="product-preview__old-price">{{ product.price.old }}</p>
          <p>{{ product.price.actual }}</p>
        </div>

        <CButton
          title="Add to cart"
          @click="$emit('addToCart', product)"
          class="product-preview__add-to-cart"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { useLocalizationStore } from '@/stores/localization'
import { storeToRefs } from 'pinia'
import type { IProduct } from '@/interfaces'

import CButton from '@/components/CButton.vue'
import CImage from './CImage.vue'
import CIcon from './CIcon.vue'

export default defineComponent({
  components: { CButton, CImage, CIcon },
  emits: ['addToCart'],
  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: true
    }
  },
  setup() {
    const localizationStore = useLocalizationStore()
    const { current } = storeToRefs(localizationStore)

    return {
      current
    }
  }
})
</script>

<style lang="scss">
.product-preview {
  background-color: $bg;
  border: 1px solid $border;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  padding-top: 16px;

  h4 {
    text-align: center;
    margin-top: 16px;
    margin-bottom: 8px;
    font-size: 16px;
  }

  img {
    width: 100%;
    object-fit: contain;
  }

  &__heart {
    @include transparentButton;
    margin-left: auto;

    svg {
      fill: transparent;
      transition: all 0.2s;
    }

    &:hover svg {
      fill: $primary;
      stroke: $primary;
    }
  }

  &__top {
    display: flex;
    justify-content: space-between;
  }

  &__budge {
    color: #fff;
    padding: 4px 8px;
    border-radius: 8px;
  }

  &__stars {
    font-size: 12px;

    @include flexCenter;

    span {
      color: $icons;
      margin-left: 4px;
    }

    svg {
      width: 15px;
      height: 15px;
    }
  }

  &__price {
    @include flexCenter;
    margin-top: 4px;
    margin-bottom: 16px;

    p {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &__old-price {
    margin-right: 8px;
    font-size: 14px;
    color: $icons;
    text-decoration: line-through;
  }

  &__add-to-cart {
    border-radius: 30px;
    border: 1px solid $primary;
    background-color: #fff;
    line-height: 38px;
    padding: 0 19px;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 auto;
    @include flexCenter;
    transition: all 0.2s;

    &:hover {
      background-color: $primary;
      color: #fff;
    }
  }

  @media (max-width: 768px) {
    &__content {
      display: flex;
      align-items: center;
    }
  }
}
</style>
