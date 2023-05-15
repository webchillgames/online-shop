import { defineStore } from 'pinia'
import type { ICartItem } from '../interfaces'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: <ICartItem[]>[]
  }),
  getters: {
    summaryPrice: (state) => {
      let result: number = 0
      state.items.forEach(v => {
        result += v.price.actual
      })

      return result
    },
    itemsQuantity: (state) => state.items.length
  },
  actions: {
    add(item: any): void {
      if (!this.items.length) {
        this.items.push(item)
      } else if (this.items.length) {
        const isExist = this.items.filter((v) => v.id === item.id).length

        if (isExist) {
          return
        } else {
          this.items.push(item)
        }
      }
    },
    remove(id: number): void {
      const result =this.items.filter(v => v.id !== id)
      this.items = result
    },
  }
})
