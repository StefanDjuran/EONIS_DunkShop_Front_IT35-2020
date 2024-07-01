export interface Product {
    proizvodID: string;          
    nazivP: string;
    cenaP: number;
    bojaP: string;
    brendP: string;
    kolicinaNaStanju: number;
    dobavljacID: string;         
}

export interface NewProduct {         
    nazivP: string;
    cenaP: number;
    bojaP: string;
    brendP: string;
    kolicinaNaStanju: number;
    dobavljacID: string;         
}

export interface SieveModel {
    filters?: string;
    sorts?: string;
    page?: number;
    pageSize?: number;
  }
  