import { Product } from "./ProductModels"

export interface PaymentData {
    delivery: Delivery,
    orders: Order[],
    productOrders: ProductOrder[]
}

export interface Delivery {
    adresaD: string,
    datumD: Date,
    gradD: string,
    drzavaD: string,
    postanskiBrojD: string,
    brojTelefonaD: string
}

export interface Order {
    ukupnaCena: number,
    korisnikID: string,
    dostavaID: string,
    porudzbinaID?: string
}

export interface ProductOrder {
    porudzbinaID: string,
    proizvodID: string,
    kolicina: number
}

export interface CartItem {
    product: Product,
    amount: number
}
