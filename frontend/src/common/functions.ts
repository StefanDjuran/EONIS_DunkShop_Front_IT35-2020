import { CartItem, Delivery } from "../models/PaymentModels";
import { SieveModel } from "../models/ProductModels";

export const buildQueryParams = (params: SieveModel): string => {
  const query = new URLSearchParams();

  if (params.filters) {
    query.append('filters', params.filters);
  }
  if (params.sorts) {
    query.append('sorts', params.sorts);
  }
  if (params.page) {
    query.append('page', params.page.toString());
  }
  if (params.pageSize) {
    query.append('pageSize', params.pageSize.toString());
  }

  return query.toString();
};

export const validateDeliveryForm = (delivery: Delivery) => {
  if(!delivery.adresaD.length) {
    return false;
  } else if (!delivery.brojTelefonaD.length) {
    return false;
  } else if (!delivery.drzavaD.length) {
    return false;
  } else if (!delivery.gradD.length) {
    return false;
  } else if (!delivery.postanskiBrojD.length) {
    return false;
  }

  return true;
}

export const calculatePrice = (cart: CartItem[]) => {
  let price = 0;
  cart.map((item) => {
      price += item.amount * item.product.cenaP;
  });

  return price;
};