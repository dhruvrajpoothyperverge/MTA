import { HeadingContainer } from "mta-components";
import HomeLayout from "../layout/HomeLayout";

const BookedTickets = () => {
  return (
    <HomeLayout>
      <div className="flex flex-col gap-4 px-5 pb-24">
        <HeadingContainer label="Booked Ticket"></HeadingContainer>
      </div>
    </HomeLayout>
  );
};

export default BookedTickets;
