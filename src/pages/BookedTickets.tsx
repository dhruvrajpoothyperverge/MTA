import { BookingSummary, HeadingContainer } from "mta-components";
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

  return (
    <HomeLayout>
      <div className="flex flex-col gap-4 px-5 pb-24">
        <HeadingContainer label="Booked Tickets" />
        {loading ? (
          <p>Loading booked tickets...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : bookedTickets.length === 0 ? (
          <p>No ticket found.</p>
        ) : (
          <div className="space-y-4">
            {bookedTickets.map((ticket, index) => (
              <BookingSummary
                data={ticket}
                key={index}
                onClick={() => navigate(`/bookingdetails/${ticket._id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default BookedTickets;
