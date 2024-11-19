import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Theater, useBookingContext } from "../../context/BookingContext";
import { Button, LeftArrow, TheaterList } from "mta-components";
import { useMovieContext } from "../../context/MovieContext";

const AvailableTheaters = () => {
  const { movieid } = useParams();
  const navigate = useNavigate();
  const { currentMovie, fetchMovieDetails } = useMovieContext();
  const {
    selectedMovieTheater,
    availableTheaters,
    fetchAvailableTheaters,
    handleSelectMovieTheater,
  } = useBookingContext();

  useEffect(() => {
    if (movieid && !currentMovie) {
      fetchMovieDetails(movieid);
    }
  }, [movieid, currentMovie]);

  useEffect(() => {
    if (currentMovie) fetchAvailableTheaters(currentMovie._id);
  }, [currentMovie?._id]);

  const handleTheaterSelect = (theater: Theater) => {
    handleSelectMovieTheater(theater);
    navigate(`/buyticket/${currentMovie?._id}`);
  };

  return (
    <div className="flex flex-col gap-4 p-5">
      <Button
        variant="tertiary"
        icon={<LeftArrow />}
        className="!w-11 !h-11"
        onClick={() => navigate(-1)}
      />

      <h2 className="text-xl font-semibold">Select a Movie Theater</h2>

      <TheaterList
        selectedMovieTheater={selectedMovieTheater}
        availableTheaters={availableTheaters}
        onTheaterSelect={handleTheaterSelect}
      />
    </div>
  );
};

export default AvailableTheaters;
