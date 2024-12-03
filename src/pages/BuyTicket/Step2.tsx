import {
  SeatMatrixContainer,
  TicketDetailsContainer,
  BookingSummary,
  StickyBottomContainer,
  Button,
  RightArrow,
} from "mta-components";
import { useBookingContext } from "../../context/BookingContext";
import { formatTime, getSeatLabel } from "../../utils/utility";
import { useFoodContext } from "../../context/FoodContext";
import { useEffect } from "react";
import { useMovieContext } from "../../context/MovieContext";

const Step2 = (props: any) => {
  const { moveToNext } = props;

  const { currentMovie } = useMovieContext();
  const { selectedFoodItems, getTotalAmount } = useFoodContext();

  const {
    selectedMovieTheater,
    selectedSession,
    selectedSeats,
    addSelectedSeat,
    removeSelectedSeat,
    adults,
    incrementAdults,
    decrementAdults,
    childs,
    incrementChild,
    decrementChild,
    filledSeats,
    ticketTotalAmount,
    updateTicketTotalAmount,
    totalSeats,
  } = useBookingContext();

  const handleSeatClick = (
    rowIndex: number,
    seatIndex: number,
    status: "vacant" | "selected" | "filled" | "invalid"
  ) => {
    if (status === "vacant") {
      removeSelectedSeat({ row: rowIndex, col: seatIndex });
    } else if (status === "selected") {
      addSelectedSeat({ row: rowIndex, col: seatIndex });
    }
  };

  const ticketDetails = [
    {
      label: "ADULT",
      quantity: adults,
      maxAllowed: totalSeats - childs,
      onIncrease: () => incrementAdults(),
      onDecrease: () => {
        if (adults > 0) decrementAdults();
      },
    },
    {
      label: "CHILD",
      quantity: childs,
      maxAllowed: totalSeats - adults,
      onIncrease: () => incrementChild(),
      onDecrease: () => {
        if (childs > 0) decrementChild();
      },
    },
  ];

  const summaryData = {
    movie: currentMovie?.title || "",
    adult: adults,
    child: childs,
    session: selectedSession
      ? formatTime(selectedSession?.startTime, selectedSession?.endTime)
      : "",
    seatNumbers: selectedSeats.map((seat) =>
      getSeatLabel(
        seat.row,
        seat.col,
        selectedMovieTheater?.invalidRows,
        selectedMovieTheater?.invalidCols,
        selectedMovieTheater?.seatingLayout.rows,
        selectedMovieTheater?.seatingLayout.cols
      )
    ),
    theater: selectedMovieTheater?.name || "",
    buffetProducts: selectedFoodItems,
    buffetTotal: getTotalAmount(),
    ticketTotal: ticketTotalAmount,
  };

  useEffect(() => {
    updateTicketTotalAmount(adults, childs, 20, 10); // example price
  });
  
  return (
    <div>
      <div className="flex flex-col gap-6 px-5 pb-28">
        <SeatMatrixContainer
          rowSize={selectedMovieTheater?.seatingLayout.rows}
          colSize={selectedMovieTheater?.seatingLayout.cols}
          invalidRow={selectedMovieTheater?.invalidRows}
          invalidCol={selectedMovieTheater?.invalidCols}
          selectedSeats={selectedSeats}
          filledSeats={filledSeats}
          onSeatClick={handleSeatClick}
        />

        <TicketDetailsContainer data={ticketDetails} />

        <BookingSummary data={summaryData} />
      </div>

      <StickyBottomContainer>
        <Button
          variant="primary"
          text="Payment Options"
          icon={<RightArrow />}
          disabled={
            adults + childs === 0 || selectedSeats.length !== adults + childs
          }
          onClick={() => moveToNext(2)}
        />
      </StickyBottomContainer>
    </div>
  );
};

export default Step2;
