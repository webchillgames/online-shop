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
      if (state.items) {
        const result = state.items.reduce((acc: IProduct, next: IProduct) => {
          const {price, quantity} = next
          const n: number = price.actual * quantity
          
          return acc + n
        }, 0)

        return result
      }
    },
    itemsQuantity: (state) => state.items.length
  },
  actions: {
    addToCart(item: IProduct): void {
      const previousCart = customStorage.get('user-cart')
      const modalStore = useMiniModalsStore()
      const { showMiniModal } = modalStore

      let data: IProduct[] = []

      if (!previousCart) {
        console.log('!pCart')

        item.quantity = 1
        data.push(item)
      } else {
        const inPreviousCart: IProduct[] = previousCart.filter((v: IProduct) => v.id === item.id)

        if (inPreviousCart.length) {
          item.quantity += 1
        } else {
          item.quantity = 1
        }

        data = [...previousCart.filter((v: IProduct) => v.id !== item.id)]
        data.push(item)
      }

      this.items = data
      customStorage.set('user-cart', this.items)

      showMiniModal(`Product added to Cart ${item.title}`, 'success')
    },
    removeFromCart(id: number) {
      const previousCart = customStorage.get('user-cart')
      const filteredItems = previousCart.filter((v: IProduct) => v.id !== id)
      this.items = filteredItems
      customStorage.set('user-cart', this.items)
    },
    editItemQuantity(id: number, quantity: number) {
      const previousCart = customStorage.get('user-cart')

      const edited = previousCart.map((v: IProduct) => {
        if (v.id === id) {
          v.quantity = quantity
        }

        return v
      })

      this.items = edited
      customStorage.set('user-cart', this.items)
    }
  }
})
