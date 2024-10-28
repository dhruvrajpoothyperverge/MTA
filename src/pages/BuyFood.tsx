import { useState } from "react";
import {
  FoodItemContainer,
  AmountAndCartContainer,
  LeftArrow,
} from "mta-components";
import { useNavigate } from "react-router-dom";
const BuyFood = () => {
  const foodItems = [
    {
      image: "/assets/fooditem.png",
      label: "Burger",
      items: ["Beef", "Chicken", "Veggie"],
      price: 5.99,
    },
    {
      image: "/assets/fooditem.png",
      label: "Pizza",
      items: ["Pepperoni", "Margherita"],
      price: 8.99,
    },
    {
      image: "/assets/fooditem.png",
      label: "Pizza",
      items: ["Pepperoni", "Margherita"],
      price: 8.99,
    },
    {
      image: "/assets/fooditem.png",
      label: "Pizza",
      items: ["Pepperoni", "Margherita"],
      price: 8.99,
    },
  ];

  const initialStates: number[] = Array.from(
    { length: foodItems.length },
    (_) => {
      return 0;
    }
  );

  const [quantities, setQuantities] = useState<number[]>(initialStates);

  const updateQuantities = (index: number, change: number) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] += change;
      return newQuantities;
    });
  };

  const navigate = useNavigate();

  const handleAddToCart = () => {
    navigate("/buyticket");
  };

  const onBackClick = () => {
    navigate("/buyticket");
  };

  const totalAmount = quantities.reduce(
    (total, qty, idx) => total + qty * foodItems[idx].price,
    0
  );

  return (
    <div>
      <div className="flex flex-col gap-4 p-5 pb-28">
        <button
          className="rounded-lg bg-white text-primary p-2.5 w-fit"
          onClick={onBackClick}
        >
          <LeftArrow />
        </button>

        <FoodItemContainer
          data={foodItems.map((item, index) => ({
            ...item,
            quantity: quantities[index],
            onIncrease: () => updateQuantities(index, 1),
            onDecrease: () => updateQuantities(index, -1),
          }))}
        />
      </div>

      <AmountAndCartContainer
        totalAmount={totalAmount}
        addToCart={handleAddToCart}
      />
    </div>
  );
};

export default BuyFood;
