import { PaymentOptionContainer, TotalAmount } from "mta-components";
import { useFoodContext } from "../../context/FoodContext";
import { useBookingContext } from "../../context/BookingContext";

const Step3 = (props: any) => {
  const { moveToNext } = props;

  const { getTotalAmount } = useFoodContext();
  const { ticketTotalAmount, selectedPaymentOption, onPaymentSelection } =
    useBookingContext();

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

  const handlePayNow = () => {
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
      />
    </div>
  );
};

export default Step3;
