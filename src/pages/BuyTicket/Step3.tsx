import { PaymentOptionContainer, TotalAmount } from "mta-components";

const Step3 = (props: any) => {
  const { moveToNext } = props;

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

  return (
    <div>
      <div className="flex flex-col gap-4 px-5 pb-64">
        <PaymentOptionContainer data={paymentOptions} />
      </div>

      <TotalAmount amount={40} onClick={() => moveToNext(3)} />
    </div>
  );
};

export default Step3;
