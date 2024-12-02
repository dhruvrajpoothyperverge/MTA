import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";
import { useAppContext } from "./AppContext";
import axiosInstance from "../config/axiosInstance";
import { SelectedFoodItems } from "./FoodContext";

export interface BookingTicket {
  sessionId: string;
  selectedSeats: { row: number; col: number }[];
  adults: number;
  childs: number;
  selectedFoodItems: { _id: string; quantity: number }[];
}

interface BookingSummaryData {
  movie: string;
  adult: number;
  child: number;
  session: string;
  seatNumbers: string[];
  buffetProducts: SelectedFoodItems[];
  buffetTotal: number;
  ticketTotal: number;
  theater: string;
}

interface BookedTicket extends BookingSummaryData {
  _id: string;
  bookingDate: string;
  user: string;
}

interface TicketContextType {
  bookedTickets: BookedTicket[];
  bookTicket: (bookingData: BookingTicket) => void;
  fetchBookedTickets: () => void;
  loading: boolean;
  error: string | null;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketContextProvider({ children }: { children: ReactNode }) {
  const [bookedTickets, setBookedTickets] = useState<BookedTicket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAppContext();

  const fetchBookedTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/booking/booked-tickets`);
      setBookedTickets(response.data);
    } catch (error) {
      console.error("Error fetching booked tickets:", error);
      setError("Failed to load booked tickets");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const bookTicket = async (bookingData: BookingTicket) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/booking", bookingData);
      setBookedTickets((prev) => [response.data, ...prev]);
    } catch (error) {
      console.error("Error booking the ticket:", error);
      setError("Error booking the ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TicketContext.Provider
      value={{
        bookedTickets,
        bookTicket,
        fetchBookedTickets,
        loading,
        error,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTicketContext() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error(
      "useTicketContext must be used within TicketContextProvider"
    );
  }
  return context;
}
