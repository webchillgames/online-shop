import axios from 'axios'
// 'https://api.publicapis.org/entries'
export const customAxios = {
  get(path: string) {
    const r = axios.get(path)
    return r
  }
}
