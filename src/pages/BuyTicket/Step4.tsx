import { PaymentStatus } from "mta-components";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
import { useFoodContext } from "../../context/FoodContext";

const Step4 = () => {
  const navigate = useNavigate();
  const { resetBooking } = useBookingContext();
  const { resetFoodBooking } = useFoodContext();

  const onGoHome = () => {
    navigate("/");
    resetBooking();
    resetFoodBooking();
  };

  const onTryAgain = () => {
    navigate("/");
    resetBooking();
    resetFoodBooking();
  };

  const onViewTicket = () => {
    navigate("/bookingdetails/1");
  };

  return (
    <PaymentStatus
      status="success"
      onGoHome={onGoHome}
      onTryAgain={onTryAgain}
      onViewTicket={onViewTicket}
    />
  );
};

export default Step4;
