import { defineStore } from 'pinia'
import type { IProduct } from '../interfaces'
import { customStorage } from '@/services/customStorage'
import { useMiniModalsStore } from './miniModals'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: customStorage.get('user-cart') ? customStorage.get('user-cart') : []
  }),
  getters: {
    summaryPrice: (state) => {
      let result: number = 0

      if (state.items.length) {
        state.items.forEach((v: IProduct) => {
          result += v.price.actual
        })
      }

      return result
    },
    itemsQuantity: (state) => state.items.length
  },
  actions: {
    addToCart(item: IProduct): void {
      let items = []
      const modalStore = useMiniModalsStore()
      const { showMiniModal } = modalStore

      if (customStorage.get('user-cart')) {
        items = customStorage.get('user-cart')
        items.push(item)
        console.log(111, item)

        customStorage.set('user-cart', items)
        showMiniModal(`Added to Cart ${item.title}`, 'success')
      } else {
        items.push(item)
        customStorage.set('user-cart', items)
      }
      // location.reload()
    },
    removeFromCart(id: number) {
      const items = customStorage.get('user-cart')
      const filteredItems = items.filter((v: IProduct) => v.id !== id)
      customStorage.set('user-cart', filteredItems)
      location.reload()
    }
  }
})
