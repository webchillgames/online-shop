export interface IProduct {
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

export interface ILink {
  id: number
  title: string
  to: string
}

export interface ICategory {
  category: ILink
  subcategories: ILink[]
}

// export interface IPriceRange {
//     min: number
//     max: number
// }
export interface IPointWorkinHours {
  day: string
  from: string
  to: string
}

export interface IPointInfo {
  street: string
  title: string
  workingHours: IPointWorkinHours[]
}

export interface IPoint {
  coords: number[]
  id: number
  info: IPointInfo
}
