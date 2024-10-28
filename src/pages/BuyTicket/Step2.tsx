import {
  SeatMatrixContainer,
  TicketDetailsContainer,
  BookingSummary,
  StickyBottomContainer,
  Button,
  RightArrow,
} from "mta-components";

const Step2 = (props: any) => {
  const { moveToNext } = props;

  const onSeatClick = () => {};

  const ticketDetails = [
    {
      label: "Adult Ticket",
      quantity: 1,
      maxAllowed: 5,
      onIncrease: () => {
        console.log("Increased Adult Ticket quantity");
      },
      onDecrease: () => {
        console.log("Decreased Adult Ticket quantity");
      },
    },
    {
      label: "Child Ticket",
      quantity: 0,
      maxAllowed: 3,
      onIncrease: () => {
        console.log("Increased Child Ticket quantity");
      },
      onDecrease: () => {
        console.log("Decreased Child Ticket quantity");
      },
    },
  ];

  const bookingData = {
    movie: "Kung Fu Panda 4",
    adult: 2,
    child: 0,
    session: "20:30 pm - 22:00 pm",
    seatNumbers: ["C3", "C4"],
    buffetProducts: [],
    buffetTotal: 0,
    theater: "Cinema Village",
    amount: 40,
  };

  return (
    <div>
      <div className="flex flex-col gap-4 px-5 pb-28">
        <SeatMatrixContainer onSeatClick={onSeatClick} />

        <TicketDetailsContainer data={ticketDetails} />

        <BookingSummary data={bookingData} />
      </div>

      <StickyBottomContainer>
        <Button
          text="Payment Options"
          icon={<RightArrow />}
          onClick={() => moveToNext(2)}
        />
      </StickyBottomContainer>
    </div>
  );
};

export default Step2;
