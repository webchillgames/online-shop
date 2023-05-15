export interface ICartItem {
    id: number,
    title: string,
    image: string,
    budge: IBudge,
    colors: string[],
    isAvailable: boolean,
    price: IPrice,
    reviews: number,
    stars: number,
}

export interface IBudge {
    color: string,
    title: string
}

export interface IPrice {
    actual: number,
    old: number | null
}
