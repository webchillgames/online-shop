<template>
  <div class="cart-view">
    <div class="wrapper">
      <div v-if="items.length">
        <div class="cart-view__table">
          <div v-for="v in items" :key="v.id" class="cart-view__item">
            <div class="cart-view__cell">
              <CImage :image="v.image" />
            </div>

            <div class="cart-view__cell">
              <p>{{ v.title }}</p>
            </div>

            <div class="cart-view__cell">
              <div class="cart-view__quantity" @click="(e) => editQuantity(e, v.id)">
                <CButton title="+" value="+"></CButton>
                <p class="js-item-quantity" :value="v.quantity">{{ v.quantity }}</p>
                <CButton title="-" value="-"></CButton>
              </div>
            </div>

            <div class="cart-view__cell">
              <p>{{ v.price.actual }}</p>
            </div>
            <div class="cart-view__cell">
              <CButton
                class="cart-view__remove"
                icon="trash"
                @click="removeFromCart(v.id)"
              ></CButton>
            </div>
          </div>
          <div class="cart-view__summary">
            <div class="cart-view__cell">
              <label to="coupon"> {{ $t('couponCode') }}: </label>
              <div class="cart-view__coupon">
                <input id="coupon" type="text" :placeholder="$t('promotionCodeHere')" />
                <CButton><CIcon icon="arrow" /></CButton>
              </div>
            </div>
            <div class="cart-view__cell">
              <p>{{ $t('totalPrice') }}:</p>
              <p>{{ summaryPrice }}</p>
            </div>
          </div>
          <CLink link="/" class="cart-view__link">{{ $t('continueShopping') }}</CLink>
          <CLink link="/" class="cart-view__link">{{ $t('checkOut') }}</CLink>
        </div>
      </div>

      <div v-else class="cart-view__empty">
        <p>Корзина пуста</p>
        <CLink link="/" :title="$t('continueShopping')" class="cart-view__link" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCartStore } from '../stores/cart'
import CButton from '@/components/CButton.vue'
import CLink from '@/components/CLink.vue'
import { storeToRefs } from 'pinia'
import CImage from '@/components/CImage.vue'
import CIcon from '@/components/CIcon.vue'

export default defineComponent({
  components: { CButton, CLink, CImage, CIcon },
  setup() {
    const cartStore = useCartStore()
    const { items, summaryPrice } = storeToRefs(cartStore)
    const { removeFromCart, editItemQuantity } = cartStore

    function editQuantity(event: Event, id: number) {
      const target = event.target as HTMLElement
      const button = target.closest('button')
      const sign = button?.getAttribute('value')
      const parentWrapper = event.currentTarget as HTMLElement
      const previousQuantity = parentWrapper
        .querySelector('.js-item-quantity')
        ?.getAttribute('value')

      if (sign === '+') {
        const v = Number(previousQuantity) + 1
        editItemQuantity(id, v)
      } else if (sign === '-' && Number(previousQuantity) >= 2) {
        editItemQuantity(id, Number(previousQuantity) - 1)
      } else if (sign === '-' && Number(previousQuantity) === 1) {
        return
      }
    }


    return {
      items,
      summaryPrice,
      removeFromCart,
      editQuantity
    }
  }
})
</script>

<style lang="scss">
.cart-view {
  @include page;

  &__cell {
    display: flex;
    justify-content: center;
    max-height: 150px;
  }

  .c-image {
    height: 100px;
    aspect-ratio: 1 / 1;
  }

  &__item {
    display: flex;
    border: 1px solid $light-border;
    padding: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    border-top: none;

    &:first-child {
      border-top: 1px solid $light-border;
    }
  }

  &__quantity {
    display: grid;
    grid-template-columns: 30px 30px 30px;
    grid-template-rows: 30px;
    align-items: center;
    border: 1px solid $light-border;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      aspect-ratio: 1 / 1;
      flex-shrink: 0;
    }

    p {
      text-align: center;
    }
  }

  &__quantity button,
  &__remove {
    background-color: transparent;
    border: none;
  }

  &__coupon {
    position: relative;
    height: 30px;
    width: 250px;
    border: 1px solid $light-border;
    border-radius: 16px;
    overflow: hidden;

    input {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 16px;
      padding: 4px 8px;
      box-sizing: border-box;

      &::placeholder {
        font-size: 12px;
        line-height: 20px;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      font-size: 14px;
      width: 30px;
      height: 30px;
      position: absolute;
      right: 0;
      top: 0;
      border: none;
      background-color: transparent;
      @include flexCenter;
      transition: all 0.2s;

      svg {
        stroke: $font;
      }

      &:hover svg {
        stroke: rgba($primary, 1);
        stroke-width: 5px;
      }
    }

    &:hover {
      border: 1px solid rgba($primary, 0.7);

      svg {
        stroke: rgba($primary, 0.7);
      }
    }
  }

  &__summary {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin-left: auto;
    border: 1px solid $border;
    border-top: none;
    margin-bottom: 30px;

    .cart-view__cell {
      display: grid;
      grid-template-columns: max-content max-content;
      grid-gap: 8px;
      align-items: center;
    }
  }

  &__link {
    @include baseButton;

    & + .cart-view__link {
      margin-left: 16px;
    }
  }

  &__empty {
    text-align: center;
  }
}
</style>
