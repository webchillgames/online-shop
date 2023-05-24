import { defineStore } from 'pinia'
import type { IProduct } from '../interfaces'
import { customStorage } from '@/services/customStorage'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: customStorage.get('user-cart') ? customStorage.get('user-cart') : []
  }),
  getters: {
    summaryPrice: (state) => {
      let result: number = 0

      if (state.items.length) {
        state.items.forEach((v) => {
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
      if (customStorage.get('user-cart')) {
        items = customStorage.get('user-cart')
        items.push(item)
        console.log(111, items)

        customStorage.set('user-cart', items)
      } else {
        items.push(item)
        customStorage.set('user-cart', items)
      }
      location.reload()
    },
    removeFromCart(id: number) {
      const items = customStorage.get('user-cart')
      const filteredItems = items.filter((v: IProduct) => v.id !== id)
      customStorage.set('user-cart', filteredItems)
      location.reload()
    }
  }
})
