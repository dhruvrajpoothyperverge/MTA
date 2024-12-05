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
  const {
    foodItems,
    selectedFoodItems,
    updateQuantity,
    getTotalAmount,
    fetchFoodItems,
    foodLoading,
    foodError,
  } = useFoodContext();
  const { fetchMovieDetails, currentMovie, errorMovieDetails } =
    useMovieContext();

  useEffect(() => {
    if (id && !currentMovie) {
      fetchMovieDetails(id);
    }
  }, [id, currentMovie]);

  useEffect(() => {
    if (foodItems.length === 0) fetchFoodItems();
  }, [foodItems, fetchFoodItems]);

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

  if (foodError || errorMovieDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">
          {foodError && "Error loading food items. Please try again."}
          {errorMovieDetails &&
            " Error loading movie details. Please try again."}
        </p>
      </div>
    );
  }

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
              selectedFoodItems.find((selected) => selected._id === item._id)
                ?.quantity ?? 0,
            onIncrease: () => {
              const currentQuantity =
                selectedFoodItems.find((selected) => selected._id === item._id)
                  ?.quantity ?? 0;
              updateQuantity(item._id, currentQuantity + 1);
            },
            onDecrease: () => {
              const currentQuantity =
                selectedFoodItems.find((selected) => selected._id === item._id)
                  ?.quantity ?? 0;
              updateQuantity(item._id, currentQuantity - 1);
            },
          }))}
          loading={foodLoading}
        />
      </div>

      <AmountAndCartContainer
        totalAmount={getTotalAmount()}
        addToCart={handleAddToCart}
        disabled={foodLoading}
      />
    </div>
  );
};

export default BuyFood;
