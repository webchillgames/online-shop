import axios from 'axios'
// 'https://api.publicapis.org/entries'
export const customAxios = {
  get() {
    const r = axios.get('/api/products.json')
    return r
  }
}
