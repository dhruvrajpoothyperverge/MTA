import { useNavigate } from "react-router-dom";
import { useFoodContext } from "../context/FoodContext";
import {
  FoodItemContainer,
  AmountAndCartContainer,
  LeftArrow,
} from "mta-components";

const BuyFood = () => {
  const { foodItems, quantities, updateQuantities, foodTotalAmount } =
    useFoodContext();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    navigate("/buyticket");
  };

  const onBackClick = () => {
    navigate("/buyticket");
  };

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
        totalAmount={foodTotalAmount}
        addToCart={handleAddToCart}
      />
    </div>
  );
};

export default BuyFood;
