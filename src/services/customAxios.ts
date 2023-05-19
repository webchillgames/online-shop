import axios from 'axios'
// 'https://api.publicapis.org/entries'
const instance = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

export const customAxios = instance