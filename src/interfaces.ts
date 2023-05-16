export interface ICartItem {
  id: number
  title: string
  image: string
  budge: IBudge
  colors: string[]
  isAvailable: boolean
  price: IPrice
  reviews: number
  stars: number
  type: string
}

export interface IBudge {
  color: string
  title: string
}

export interface IPrice {
  actual: number
  old: number | null
}

export interface IFilterColor {
  id: number
  value: string
}

export interface IFilterCategory {
  id: number
  to: string
  title: string
}

// export interface IPriceRange {
//     min: number
//     max: number
// }
