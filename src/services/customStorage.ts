export const customStorage = {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key: string) {
    const data = localStorage.getItem(key)

    if (data) {
      const result = JSON.parse(data)
      return result
    }
  }
}
