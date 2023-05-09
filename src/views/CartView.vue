<template>
  <div class="cart-view">
    <div v-if="items.length">
      <div class="cart-view__table">
        <div v-for="v in items" :key="v.id" class="cart-view__item">
          <div class="cart-view__cell">
            <p>{{ v.title }}</p>
          </div>
          <div class="cart-view__cell">
            <div class="cart-view__quantity">
              <CButton title="+"></CButton>
              <p>1</p>
              <CButton title="-"></CButton>
            </div>
          </div>

          <div class="cart-view__cell">
            <p>{{ v.price }}</p>
          </div>
          <div class="cart-view__cell">
            <CButton class="cart-view__remove" icon="trash" @click="removeItem(v.id)"></CButton>
          </div>
        </div>
      </div>

      <div class="cart-view__summary">
        <p>{{ summaryPrice }}</p>
        <button>Оплатить</button>
      </div>
    </div>

    <div v-else>
      <p>Корзина пуста</p>
      <CLink link="/products" title="К покупкам" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useCartStore } from '../stores/cart'
import CButton from '@/components/CButton.vue'
import CLink from '@/components/CLink.vue'
import { storeToRefs } from 'pinia'

export default defineComponent({
  components: { CButton, CLink },
  setup() {
    const cartStore = useCartStore()
    const { items } = storeToRefs(cartStore) 
    const { remove } = cartStore
    const summaryPrice = ref(0)

    function setSummaryPrice(): number {
      let result: number = 0

      items.value.forEach((v) => {
        result += v.price
      })

      return result
    }

    function removeItem(id: number) {
      remove(id)

      //можно показать что то
    }

    onMounted(() => {
      summaryPrice.value = setSummaryPrice()
    })

    return {
      items,
      summaryPrice,
      removeItem
    }
  }
})
</script>

<style lang="scss">
.cart-view {
  &__cell {
    display: flex;
    justify-content: center;
  }

  &__item {
    display: flex;
    border: 1px solid $border;
    padding: 30px;
    display: grid;
    grid-template-columns: 50% 1fr 1fr 1fr;
    align-items: center;
  }

  &__quantity {
    display: grid;
    grid-template-columns: 30px 30px 30px;
    grid-template-rows: 30px;
    align-items: center;
    border: 1px solid $border;

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

  &__table {
    margin-bottom: 50px;
  }

  &__summary {
    padding: 20px;
    width: 300px;
    margin-left: auto;
    border: 1px solid $border;
  }
}
</style>
