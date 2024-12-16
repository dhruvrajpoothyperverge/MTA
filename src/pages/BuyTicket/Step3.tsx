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
      image:
        "https://res.cloudinary.com/dqofbcsua/image/upload/v1734418164/applepay_jmclce.webp",
    },
    {
      title: "Master Card",
      image:
        "https://res.cloudinary.com/dqofbcsua/image/upload/v1734418165/mastercard_rs8s4i.webp",
    },
    {
      title: "PayPal",
      image:
        "https://res.cloudinary.com/dqofbcsua/image/upload/v1734418165/paypal_vtsvsl.webp",
    },
    {
      title: "Google Pay",
      image:
        "https://res.cloudinary.com/dqofbcsua/image/upload/v1734418165/googlepay_aaibaa.webp",
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
