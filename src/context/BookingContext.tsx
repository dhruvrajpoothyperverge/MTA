import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Seat {
  row: number;
  col: number;
}

interface BookingContextType {
  selectedMovieTheater: string;
  selectedSession: string;
  handleSelectMovieTheater: (theater: string) => void;
  handleSelectSession: (session: string) => void;
  selectedSeats: Seat[];
  filledSeats: Seat[];
  addSelectedSeat: (seat: Seat) => void;
  removeSelectedSeat: (seat: Seat) => void;
  totalSeats: number;
  adults: number;
  incrementAdults: () => void;
  decrementAdults: () => void;
  childs: number;
  incrementChild: () => void;
  decrementChild: () => void;
  ticketTotalAmount: number;
  updateTicketTotalAmount: (
    adults: number,
    childs: number,
    adultPrice: number,
    childPrice: number
  ) => void;
  selectedPaymentOption: string | null;
  onPaymentSelection: (paymentOption: string) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingContextProvider({ children }: { children: ReactNode }) {
  const [rowSize, setRowSize] = useState<number>(9);
  const [colSize, setColSize] = useState<number>(12);
  const [invalidRows, setInvalidRows] = useState<number[]>([4]);
  const [invalidCols, setInvalidCols] = useState<number[]>([4]);
  const [totalSeats, setTotalSeats] = useState<number>(0);
  const [selectedMovieTheater, setSelectedMovieTheater] = useState<string>("");
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [filledSeats, setFilledSeats] = useState<Seat[]>([]);
  const [adults, setAdults] = useState<number>(0);
  const [childs, setChilds] = useState<number>(0);
  const [ticketTotalAmount, setTicketTotal] = useState<number>(0);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<
    string | null
  >(null);

  useEffect(() => {
    setRowSize(9);
    setColSize(12);
    setInvalidRows([4]);
    setInvalidCols([4]);
  }, []);

  useEffect(() => {
    const validRows = rowSize - invalidRows.length;
    const validCols = colSize - invalidCols.length;
    setTotalSeats(validRows * validCols);
  }, [rowSize, colSize, invalidRows, invalidCols]);

  const handleSelectMovieTheater = (theater: string) =>
    setSelectedMovieTheater(theater);
  const handleSelectSession = (session: string) => setSelectedSession(session);

  const calculateAvailableSeats = () => {
    const filledCount = filledSeats.length;
    return totalSeats - filledCount;
  };

  const addSelectedSeat = (seat: Seat) => {
    const availableSeats = calculateAvailableSeats();
    if (
      selectedSeats.length < adults + childs &&
      selectedSeats.length < availableSeats
    ) {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  const removeSelectedSeat = (seat: Seat) => {
    setSelectedSeats((prev) =>
      prev.filter((s) => s.row !== seat.row || s.col !== seat.col)
    );
  };

  const incrementAdults = () => {
    const availableSeats = calculateAvailableSeats();
    if (adults + childs < availableSeats) {
      setAdults((prev) => prev + 1);
    }
  };

  const decrementAdults = () => {
    setAdults((prev) => Math.max(prev - 1, 0));
  };

  const incrementChild = () => {
    const availableSeats = calculateAvailableSeats();
    if (adults + childs < availableSeats) {
      setChilds((prev) => prev + 1);
    }
  };

  const decrementChild = () => {
    setChilds((prev) => Math.max(prev - 1, 0));
  };

  const fetchFilledSeats = () => {
    const seatsFromBackend = [
      { row: 1, col: 2 },
      { row: 2, col: 3 },
    ];
    setFilledSeats(seatsFromBackend);
  };

  useEffect(() => {
    fetchFilledSeats();
  }, []);

  const updateTicketTotalAmount = (
    adults: number,
    childs: number,
    adultPrice: number,
    childPrice: number
  ) => {
    setTicketTotal(adults * adultPrice + childs * childPrice);
  };

  const resetBooking = () => {
    setSelectedMovieTheater("");
    setSelectedSession("");
    setSelectedSeats([]);
    setAdults(0);
    setChilds(0);
    setTicketTotal(0);
    setSelectedPaymentOption(null);
  };

  const onPaymentSelection = (paymentOption: string) => {
    setSelectedPaymentOption(paymentOption);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedMovieTheater,
        selectedSession,
        handleSelectMovieTheater,
        handleSelectSession,
        selectedSeats,
        filledSeats,
        addSelectedSeat,
        removeSelectedSeat,
        totalSeats,
        adults,
        incrementAdults,
        decrementAdults,
        childs,
        incrementChild,
        decrementChild,
        ticketTotalAmount,
        updateTicketTotalAmount,
        selectedPaymentOption,
        onPaymentSelection,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingContext() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error(
      "useBookingContext must be used within BookingContextProvider"
    );
  }
  return context;
}
