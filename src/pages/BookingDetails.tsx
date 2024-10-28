import { QRcodeContainer, BookingSummary, Button } from "mta-components";
import { useNavigate } from "react-router-dom";

const BookingDetails = () => {
  const bookingData = {
    movie: "Kung Fu Panda 4",
    adult: 2,
    child: 0,
    session: "20:30 pm - 22:00 pm",
    seatNumbers: ["C3", "C4"],
    buffetProducts: [],
    buffetTotal: 0,
    theater: "Cinaema Village",
    amount: 40,
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center min-h-screen gap-10 px-5">
      <QRcodeContainer value="https://localhost:5173/" />
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
