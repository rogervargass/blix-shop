import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "../../types/Product";

type BasketContextType = {
  basket: Product[],
  setBasket: React.Dispatch<React.SetStateAction<Product[]>>,
  qtdItems: number,
  setQtdItems: React.Dispatch<React.SetStateAction<number>>,
  totalAmount: number,
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>,
}

const BasketContext = createContext<BasketContextType>({
  basket: [],
  setBasket: () => [],
  qtdItems: 0,
  setQtdItems: () => 0,
  totalAmount: 0,
  setTotalAmount: () => 0,
});
BasketContext.displayName = "Basket";

interface Props {
  children?: ReactNode;
}

export default function BasketProvider({ children }: Props) {
  const [basket, setBasket] = useState<Product[]>([]);
  const [qtdItems, setQtdItems] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  return (
    <BasketContext.Provider
      value={{
        basket,
        setBasket,
        qtdItems,
        setQtdItems,
        totalAmount,
        setTotalAmount,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasketContext() {
  const { 
    basket,
    setBasket,
    qtdItems,
    setQtdItems,
    totalAmount,
    setTotalAmount
   } = useContext(BasketContext);

  function addProduct(newProduct: Product) {
    setBasket([...basket, newProduct]);
  }

  function removeProduct(id: string) {
    const newBasket = basket.filter((item) => item.id !== id);
    setBasket(newBasket);
  }

  function checkout() {
    setBasket([]);
  }

  useEffect(() => {
    let { newQuantity, newTotal } = basket.reduce(
      (count, newItem) => ({
        newQuantity: count.newQuantity + 1,
        newTotal: count.newTotal + newItem.price,
      }),
      { newQuantity: 0, newTotal: 0 }
    );
    setQtdItems(newQuantity);
    setTotalAmount(newTotal)
  }, [basket, setQtdItems, setTotalAmount]);

  return {
    basket,
    addProduct,
    removeProduct,
    qtdItems,
    totalAmount,
    checkout,
  };
}
