import { createContext, useContext, useState, ReactNode } from "react";

interface BuffetItem {
  image: string;
  label: string;
  items: string[];
  price: number;
}

interface SelectedFoodItem {
  label: string;
  quantity: number;
}

interface FoodContextType {
  foodItems: BuffetItem[];
  selectedFoodItems: SelectedFoodItem[];
  updateQuantity: (label: string, quantity: number) => void;
  getTotalAmount: () => number;
  resetFoodBooking: () => void;
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
      label: "Pasta",
      items: ["Pepperoni", "Margherita"],
      price: 10,
    },
    {
      image: "/assets/fooditem.png",
      label: "Salad",
      items: ["Pepperoni", "Margherita"],
      price: 15,
    },
  ];

  const [selectedFoodItems, setSelectedFoodItems] = useState<SelectedFoodItem[]>([]);

  const updateQuantity = (label: string, quantity: number) => {
    setSelectedFoodItems((prevSelected) => {
      const itemIndex = prevSelected.findIndex((item) => item.label === label);
      if (itemIndex === -1) {
        return [...prevSelected, { label, quantity }];
      } else {
        const updatedItems = [...prevSelected];
        updatedItems[itemIndex] = { label, quantity };
        return updatedItems;
      }
    });
  };

  const getTotalAmount = () => {
    return selectedFoodItems.reduce((total, selectedItem) => {
      const food = foodItems.find((item) => item.label === selectedItem.label);
      return total + (food?.price ?? 0) * selectedItem.quantity;
    }, 0);
  };

  const resetFoodBooking = () => {
    setSelectedFoodItems([]);
  };

  return (
    <FoodContext.Provider
      value={{
        foodItems,
        selectedFoodItems,
        updateQuantity,
        getTotalAmount,
        resetFoodBooking,
      }}
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
