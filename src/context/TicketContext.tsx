import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface SelectedFoodItem {
  label: string;
  quantity: number;
}

interface BookingSummaryData {
  movie: string;
  adult: number;
  child: number;
  session: string;
  seatNumbers: string[];
  buffetProducts: SelectedFoodItem[];
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
  bookTicket: (bookingData: BookingSummaryData) => void;
  fetchBookedTickets: () => void;
  loading: boolean;
  error: string | null;
  user: string;
  setUser: (user: string) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketContextProvider({ children }: { children: ReactNode }) {
  const [bookedTickets, setBookedTickets] = useState<BookedTicket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<string>("user1");

  const fetchBookedTickets = useCallback(() => {
    try {
      const storedTickets = localStorage.getItem(`bookedTickets-${user}`);
      if (storedTickets) {
        setBookedTickets(JSON.parse(storedTickets));
      }
    } catch (error) {
      setError("Failed to load booked tickets");
    }
  }, [user]);

  useEffect(() => {
    fetchBookedTickets();
  }, [fetchBookedTickets]);

  const bookTicket = (bookingData: BookingSummaryData) => {
    setLoading(true);
    setError(null);

    const newBookedTicket: BookedTicket = {
      ...bookingData,
      _id: `${new Date().getTime()}`,
      bookingDate: new Date().toISOString(),
      user: user,
    };

    try {
      const updatedBookedTickets = [...bookedTickets, newBookedTicket];
      localStorage.setItem(
        `bookedTickets-${user}`,
        JSON.stringify(updatedBookedTickets)
      );
      setBookedTickets(updatedBookedTickets);
    } catch (error) {
      setError("Failed to book ticket");
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
        user,
        setUser,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTicketContext() {
  const context = useContext(TicketContext);
  if (!context)
    throw new Error(
      "useTicketContext must be used within TicketContextProvider"
    );
  return context;
}
