import { PaymentStatus } from "mta-components";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
import { useFoodContext } from "../../context/FoodContext";
import { useEffect } from "react";
import { useTicketContext } from "../../context/TicketContext";

const Step4 = () => {
  const navigate = useNavigate();
  const { resetBooking } = useBookingContext();
  const { resetFoodBooking } = useFoodContext();
  const { bookedTickets } = useTicketContext();

  const onGoHome = () => {
    navigate("/");
  };

  const onTryAgain = () => {
    navigate("/");
  };

  const onViewTicket = () => {
    if (bookedTickets.length > 0)
      navigate(`/bookingdetails/${bookedTickets[0]._id}`);
  };

  useEffect(() => {
    resetBooking();
    resetFoodBooking();
  }, []);

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
