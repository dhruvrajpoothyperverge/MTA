import { useNavigate, useParams } from "react-router-dom";
import { useFoodContext } from "../context/FoodContext";
import { useMovieContext } from "../context/MovieContext";
import {
  FoodItemContainer,
  AmountAndCartContainer,
  LeftArrow,
} from "mta-components";
import { useEffect } from "react";

const BuyFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { foodItems, selectedFoodItems, updateQuantity, getTotalAmount } =
    useFoodContext();
  const { fetchMovieDetails, currentMovie } = useMovieContext();

  useEffect(() => {
    if (id && !currentMovie) {
      fetchMovieDetails(id);
    }
  }, [id, currentMovie, fetchMovieDetails]);

  const handleAddToCart = () => {
    if (currentMovie) {
      navigate(`/buyticket/${currentMovie._id}`);
    }
  };

  const onBackClick = () => {
    if (currentMovie) {
      navigate(`/buyticket/${currentMovie._id}`);
    }
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
          data={foodItems.map((item) => ({
            ...item,
            quantity:
              selectedFoodItems.find((selected) => selected.label === item.label)
                ?.quantity ?? 0,
            onIncrease: () =>
              updateQuantity(
                item.label,
                (selectedFoodItems.find((selected) => selected.label === item.label)
                  ?.quantity ?? 0) + 1
              ),
            onDecrease: () =>
              updateQuantity(
                item.label,
                (selectedFoodItems.find((selected) => selected.label === item.label)
                  ?.quantity ?? 0) - 1
              ),
          }))}
        />
      </div>

      <AmountAndCartContainer
        totalAmount={getTotalAmount()}
        addToCart={handleAddToCart}
      />
    </div>
  );
};

export default BuyFood;
