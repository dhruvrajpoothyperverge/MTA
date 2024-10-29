import { QRcodeContainer, BookingSummary, Button } from "mta-components";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../context/BookingContext";
import { getSeatLabel } from "../utils/utility";
import { useFoodContext } from "../context/FoodContext";
import { useMovieContext } from "../context/MovieContext";

const BookingDetails = () => {
  // current selected movie details instead of ticket booked details

  const { currentMovie } = useMovieContext();
  const { foodTotalAmount, foodItems } = useFoodContext();
  const {
    selectedSeats,
    adults,
    childs,
    ticketTotalAmount,
    selectedMovieTheater,
    selectedSession,
  } = useBookingContext();

  const bookingData = {
    movie: currentMovie?.title || "",
    adult: adults,
    child: childs,
    session: selectedSession,
    seatNumbers: selectedSeats.map((seat) => getSeatLabel(seat.row, seat.col)),
    theater: selectedMovieTheater,
    buffetProducts: foodItems,
    buffetTotal: foodTotalAmount,
    ticketTotal: ticketTotalAmount,
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center min-h-screen gap-10 px-5">
      <QRcodeContainer value="Booked" />
      <BookingSummary data={bookingData} />
      <Button
        text="Go to Home"
        variant="secondary"
        onClick={() => navigate("/home")}
      />
    </div>
  );
};

export default BookingDetails;
