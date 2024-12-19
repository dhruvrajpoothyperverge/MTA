import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { serverurl } from "../config";

interface Seat {
  row: number;
  col: number;
}

export interface Theater {
  _id: string;
  name: string;
  location: string;
  seatingLayout: {
    rows: number;
    cols: number;
  };
  invalidRows: number[];
  invalidCols: number[];
}

export interface Session {
  _id: string;
  movie: string;
  startTime: string;
  endTime: string;
  filledSeats: Seat[];
  lockedSeats: Seat[];
}

interface BookingContextType {
  selectedMovieTheater: Theater | null;
  selectedSession: Session | null;
  handleSelectMovieTheater: (theater: Theater) => void;
  handleSelectSession: (session: Session) => void;
  availableTheaters: Theater[];
  availableSessions: Session[];
  selectedSeats: Seat[];
  filledSeats: Seat[];
  lockedSeats: Seat[];
  updateLockedSeats: (seats: Seat[]) => void;
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
  fetchFilledSeats: () => void;
  fetchAvailableTheaters: (movieId: string) => void;
  fetchAvailableSessions: (
    movieId: string,
    theaterId: string,
    selectedDate: string
  ) => void;
  loading: boolean;
  error: string | null;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingContextProvider({ children }: { children: ReactNode }) {
  const [selectedMovieTheater, setSelectedMovieTheater] =
    useState<Theater | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [filledSeats, setFilledSeats] = useState<Seat[]>([]);
  const [lockedSeats, setLockedSeats] = useState<Seat[]>([]);
  const [totalSeats, setTotalSeats] = useState<number>(0);
  const [adults, setAdults] = useState<number>(0);
  const [childs, setChilds] = useState<number>(0);
  const [ticketTotalAmount, setTicketTotal] = useState<number>(0);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<
    string | null
  >(null);
  const [availableTheaters, setAvailableTheaters] = useState<Theater[]>([]);
  const [availableSessions, setAvailableSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const axiosInstance = axios.create({
    baseURL: serverurl,
  });

  useEffect(() => {
    if (selectedMovieTheater) {
      const calculateTotalSeats = () => {
        const validRows =
          selectedMovieTheater?.seatingLayout?.rows -
          selectedMovieTheater?.invalidRows.length;
        const validCols =
          selectedMovieTheater?.seatingLayout?.cols -
          selectedMovieTheater?.invalidCols.length;
        return validRows * validCols;
      };

      setTotalSeats(calculateTotalSeats());
    }
  }, [selectedMovieTheater]);

  useEffect(() => {
    if (selectedSession) {
      setFilledSeats(selectedSession.filledSeats);
      setLockedSeats(selectedSession.lockedSeats);
    }
  }, [selectedSession]);

  const updateLockedSeats = (seats: Seat[]) => {
    setLockedSeats(seats);
  };

  const fetchAvailableTheaters = useCallback(async (movieId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/theaters/movie/${movieId}`);
      setAvailableTheaters(response.data);
    } catch (error: any) {
      console.error("Error fetching theaters:", error);
      setError("Failed to fetch available theaters");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAvailableSessions = useCallback(
    async (movieId: string, theaterId: string, selectedDate: string) => {
      if (!movieId || !theaterId || !selectedDate) return;
      setLoading(true);
      setError(null);

      try {
        setAvailableSessions([]);

        const response = await axiosInstance.get(
          `/sessions?movieId=${movieId}&theaterId=${theaterId}&selectedDate=${selectedDate}`
        );

        setAvailableSessions(response.data);
      } catch (error: any) {
        console.error("Error fetching sessions:", error);
        setAvailableSessions([]);
        setError("Failed to fetch available sessions");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchFilledSeats = useCallback(async () => {
    if (!selectedSession) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        `/session/${selectedSession._id}/filled-seats`
      );
      setFilledSeats(response.data);
    } catch (error: any) {
      console.error("Error fetching filled seats:", error);
      setError("Failed to fetch filled seats");
    } finally {
      setLoading(false);
    }
  }, [selectedSession]);

  const handleSelectMovieTheater = (theater: Theater) => {
    setSelectedMovieTheater(theater);
    setSelectedSession(null);
  };

  const handleSelectSession = (session: Session) => {
    setSelectedSession(session);
  };

  const calculateAvailableSeats = () =>
    totalSeats - filledSeats.length - lockedSeats.length;

  useEffect(() => {
    calculateAvailableSeats();
  }, [totalSeats, filledSeats, lockedSeats]);

  const addSelectedSeat = (seat: Seat) => {
    if (
      selectedSeats.length < adults + childs &&
      selectedSeats.length < calculateAvailableSeats()
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
    if (adults + childs < calculateAvailableSeats())
      setAdults((prev) => prev + 1);
  };

  const decrementAdults = () => setAdults((prev) => Math.max(prev - 1, 0));

  const incrementChild = () => {
    if (adults + childs < calculateAvailableSeats())
      setChilds((prev) => prev + 1);
  };

  const decrementChild = () => setChilds((prev) => Math.max(prev - 1, 0));

  const updateTicketTotalAmount = (
    adults: number,
    childs: number,
    adultPrice: number,
    childPrice: number
  ) => {
    setTicketTotal(adults * adultPrice + childs * childPrice);
  };

  const resetBooking = () => {
    setSelectedMovieTheater(null);
    setSelectedSession(null);
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
        availableTheaters,
        availableSessions,
        selectedSeats,
        filledSeats,
        lockedSeats,
        updateLockedSeats,
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
        fetchFilledSeats,
        fetchAvailableTheaters,
        fetchAvailableSessions,
        loading,
        error,
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
