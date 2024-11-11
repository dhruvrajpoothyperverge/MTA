import { BookingSummary, HeadingContainer } from "mta-components";
import HomeLayout from "../layout/HomeLayout";
import { useTicketContext } from "../context/TicketContext";

const BookedTickets = () => {
  const { bookedTickets, loading, error } = useTicketContext();

  return (
    <HomeLayout>
      <div className="flex flex-col gap-4 px-5 pb-24">
        <HeadingContainer label="Booked Tickets" />
        {loading && <p>Loading booked tickets...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {bookedTickets.length === 0 ? (
          <p>No booked tickets found.</p>
        ) : (
          <div className="space-y-4">
            {bookedTickets.map((ticket, index) => (
              <BookingSummary data={ticket} key={index} />
            ))}
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default BookedTickets;
