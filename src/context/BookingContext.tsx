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
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingContextProvider({ children }: { children: ReactNode }) {
  const [selectedMovieTheater, setSelectedMovieTheater] = useState<string>("");
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [filledSeats, setFilledSeats] = useState<Seat[]>([]);
  const [adults, setAdults] = useState<number>(0);
  const [childs, setChild] = useState<number>(0);
  const [ticketTotalAmount, setTicketTotal] = useState<number>(0);

  const handleSelectMovieTheater = (theater: string) =>
    setSelectedMovieTheater(theater);
  const handleSelectSession = (session: string) => setSelectedSession(session);

  const addSelectedSeat = (seat: Seat) => {
    setSelectedSeats((prev) => [...prev, seat]);
  };

  const removeSelectedSeat = (seat: Seat) => {
    setSelectedSeats((prev) =>
      prev.filter((s) => s.row !== seat.row || s.col !== seat.col)
    );
  };

  const incrementAdults = () => setAdults((prev) => prev + 1);
  const decrementAdults = () => setAdults((prev) => Math.max(prev - 1, 0));

  const incrementChild = () => setChild((prev) => prev + 1);
  const decrementChild = () => setChild((prev) => Math.max(prev - 1, 0));

  // Simulate fetching filled seats from the backend
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
        adults,
        incrementAdults,
        decrementAdults,
        childs,
        incrementChild,
        decrementChild,
        ticketTotalAmount,
        updateTicketTotalAmount,
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
