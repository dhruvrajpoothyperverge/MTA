import { QRcodeContainer, BookingSummary, Button } from "mta-components";
import { useNavigate, useParams } from "react-router-dom";
import { useBookingContext } from "../context/BookingContext";
import { useFoodContext } from "../context/FoodContext";
import { useTicketContext } from "../context/TicketContext";
import { useEffect } from "react";

const BookingDetails = () => {
  const { resetBooking } = useBookingContext();
  const { bookedTickets, fetchBookedTickets } = useTicketContext();
  const { resetFoodBooking } = useFoodContext();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (bookedTickets.length === 0) fetchBookedTickets();
  }, []);

  const ticket = bookedTickets.find((ticket) => ticket._id === id);

  const onClick = () => {
    navigate("/");
    resetBooking();
    resetFoodBooking();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-10 px-5 py-10">
      {ticket ? (
        <>
          <div className="w-full max-w-xs">
            <QRcodeContainer value={ticket._id} />
          </div>
          <BookingSummary data={ticket} />
          <Button text="Go to Home" variant="secondary" onClick={onClick} />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 text-center">
          <h2 className="text-xl font-semibold text-red-500">
            No ticket found
          </h2>
          <p className="text-gray-500 mb-4">
            It seems like this booking ID does not exist.
          </p>
          <Button text="Go to Home" variant="secondary" onClick={onClick} />
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
