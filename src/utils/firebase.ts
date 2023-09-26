import { ref, set } from "firebase/database";

import { db } from '../../firebase.config'
import { Product } from "../types/Product";

export function registerUser(
  name: string,
  email: string,
  password: string,
  id: string
) {
  const reference = ref(db, "users/" + id);
  set(reference, {
    name: name,
    email: email,
    password: password,
  })
    .then(() => console.log("user submitted"))
    .catch((error) => console.log("error", error));
}

export function registerPayment(
  status: string,
  items: Product[],
  customerInfo: {
    fullName?: string,
    email?: string,
    document?: string,
  },
  paymentInfo: {
    cardholderName?: string;
    cardNumber?: string;
    expirationDateMonth?: number;
    expirationDateYear?: number;
    cardSecurityCode?: string
  },
  id: string
) {
  const reference = ref(db, "payments/" + id);
  const itemsFormat = items.map(item => {
    return {
      price: {
        product: item.id
      },
      description: item.title
    }
  })
  set(reference, {
    status: status,
    items: itemsFormat,
    paymentInfo: {
      customer: customerInfo,
      payment: paymentInfo
    } 
  })
    .then(() => console.log("payment submitted"))
    .catch((error) => console.log("error", error));
}