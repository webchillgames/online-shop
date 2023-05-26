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
      const previousCart = customStorage.get('user-cart')

      let data: IProduct[] = []

      if (!previousCart) {
        console.log('!pCart')

        item.quantity = 1
        data.push(item)
      } else {
        const inPreviousCart: IProduct[] = previousCart.filter((v: IProduct) => v.id === item.id)

        if (inPreviousCart.length) {
          item.quantity += 1
        }

        data = [...previousCart.filter((v: IProduct) => v.id !== item.id)]
        data.push(item)
      }

      this.items = data
      customStorage.set('user-cart', this.items)
    },
    removeFromCart(id: number) {
      const items = customStorage.get('user-cart')
      const filteredItems = items.filter((v: IProduct) => v.id !== id)
      customStorage.set('user-cart', filteredItems)
      location.reload()
    }
  }
})
