import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import { serverurl } from "../config";

interface BuffetItem {
  _id: string;
  image: string;
  label: string;
  items: string[];
  price: number;
}

export interface SelectedFoodItems {
  _id: string;
  label: string;
  quantity: number;
}

interface FoodContextType {
  foodItems: BuffetItem[];
  selectedFoodItems: SelectedFoodItems[];
  updateQuantity: (id: string, quantity: number) => void;
  getTotalAmount: () => number;
  resetFoodBooking: () => void;
  fetchFoodItems: () => Promise<void>;
  fetchSelectedFood: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export function FoodContextProvider({ children }: { children: ReactNode }) {
  const [foodItems, setFoodItems] = useState<BuffetItem[]>([]);
  const [selectedFoodItems, setSelectedFoodItems] = useState<
    SelectedFoodItems[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const axiosInstance = axios.create({
    baseURL: serverurl,
  });

  const fetchFoodItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/food");
      setFoodItems(response.data);
    } catch (error: any) {
      console.error("Error fetching food items:", error);
      setError("Failed to fetch food items");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSelectedFood = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/food/selected");
      setSelectedFoodItems(response.data);
    } catch (error: any) {
      console.error("Error fetching selected food:", error);
      setError("Failed to fetch selected food");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQuantity = (id: string, quantity: number) => {
    setSelectedFoodItems((prevSelected) => {
      const itemIndex = prevSelected.findIndex((item) => item._id === id);

      if (itemIndex === -1) {
        const foodItem = foodItems.find((item) => item._id === id);
        if (foodItem) {
          return [
            ...prevSelected,
            { _id: id, label: foodItem.label, quantity },
          ];
        }
        return prevSelected;
      } else {
        const updatedItems = [...prevSelected];
        updatedItems[itemIndex] = { ...updatedItems[itemIndex], quantity };
        return updatedItems;
      }
    });
  };

  const getTotalAmount = () => {
    return selectedFoodItems.reduce((total, selectedItem) => {
      const food = foodItems.find((item) => item._id === selectedItem._id);
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
        fetchFoodItems,
        fetchSelectedFood,
        loading,
        error,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}

export function useFoodContext() {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFoodContext must be used within FoodContextProvider");
  }
  return context;
}
