import { createContext, useContext, useState, ReactNode } from "react";

interface BuffetItem {
  image: string;
  label: string;
  items: string[];
  price: number;
}

interface FoodContextType {
  foodItems: BuffetItem[];
  quantities: number[];
  updateQuantities: (index: number, change: number) => void;
  foodTotalAmount: number;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodContextProvider = ({ children }: { children: ReactNode }) => {
  const foodItems: BuffetItem[] = [
    {
      image: "/assets/fooditem.png",
      label: "Burger",
      items: ["Beef", "Chicken", "Veggie"],
      price: 5,
    },
    {
      image: "/assets/fooditem.png",
      label: "Pizza",
      items: ["Pepperoni", "Margherita"],
      price: 8,
    },
    {
      image: "/assets/fooditem.png",
      label: "Pizza",
      items: ["Pepperoni", "Margherita"],
      price: 10,
    },
    {
      image: "/assets/fooditem.png",
      label: "Pizza",
      items: ["Pepperoni", "Margherita"],
      price: 15,
    },
  ];

  const initialStates = Array.from({ length: foodItems.length }, () => 0);
  const [quantities, setQuantities] = useState<number[]>(initialStates);

  const updateQuantities = (index: number, change: number) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      const newQuantity = newQuantities[index] + change;
      if (newQuantity < 0) return newQuantities;
      newQuantities[index] = newQuantity;
      return newQuantities;
    });
  };

  const foodTotalAmount = quantities.reduce(
    (total, qty, idx) => total + qty * foodItems[idx].price,
    0
  );

  return (
    <FoodContext.Provider
      value={{ foodItems, quantities, updateQuantities, foodTotalAmount }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFoodContext = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFoodContext must be used within FoodContextProvider");
  }
  return context;
};
