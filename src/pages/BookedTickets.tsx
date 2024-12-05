import { BookedTicketContainer, HeadingContainer } from "mta-components";
import HomeLayout from "../layout/HomeLayout";
import { useTicketContext } from "../context/TicketContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookedTickets = () => {
  const navigate = useNavigate();
  const { bookedTickets, loading, error, fetchBookedTickets } =
    useTicketContext();

  useEffect(() => {
    fetchBookedTickets();
  }, []);

  const handleTicketClick = (ticketId: string) => {
    navigate(`/bookingdetails/${ticketId}`);
  };

  return (
    <HomeLayout>
      <div className="flex flex-col gap-4 px-5 pb-24">
        <HeadingContainer label="Booked Tickets">
          <BookedTicketContainer
            loading={loading}
            error={error}
            bookedTickets={bookedTickets}
            onTicketClick={handleTicketClick}
          />
        </HeadingContainer>
      </div>
    </HomeLayout>
  );
};

export default BookedTickets;
