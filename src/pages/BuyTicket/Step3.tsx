import { PaymentOptionContainer, TotalAmount } from "mta-components";
import { useFoodContext } from "../../context/FoodContext";
import { useBookingContext } from "../../context/BookingContext";
import { BookingTicket, useTicketContext } from "../../context/TicketContext";

const Step3 = (props: any) => {
  const { moveToNext } = props;

  const { getTotalAmount, selectedFoodItems } = useFoodContext();
  const {
    selectedSeats,
    adults,
    childs,
    ticketTotalAmount,
    selectedSession,
    selectedPaymentOption,
    onPaymentSelection,
  } = useBookingContext();

  const { bookTicket } = useTicketContext();

  const bookingData: BookingTicket = {
    sessionId: selectedSession?._id || "",
    selectedSeats,
    adults,
    childs,
    selectedFoodItems,
  };

  const paymentOptions = [
    {
      title: "Apple Pay",
      image: "/assets/applepay.png",
    },
    {
      title: "Master Card",
      image: "/assets/mastercard.png",
    },
    {
      title: "PayPal",
      image: "/assets/paypal.png",
    },
    {
      title: "Google Pay",
      image: "/assets/googlepay.png",
    },
  ];

  const handleBookTicket = () => {
    bookTicket(bookingData);
  };

  const handlePayNow = () => {
    handleBookTicket();
    moveToNext(3);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 px-5 pb-64">
        <PaymentOptionContainer
          data={paymentOptions}
          selectedOption={selectedPaymentOption}
          onSelect={onPaymentSelection}
        />
      </div>

      <TotalAmount
        amount={ticketTotalAmount + getTotalAmount()}
        onClick={handlePayNow}
        isDisabled={selectedPaymentOption === null}
      />
    </div>
  );
};

export default Step3;
