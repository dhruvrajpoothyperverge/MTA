import {
  MovieInfoContainer,
  StickyBottomContainer,
  Button,
  RightArrow,
} from "mta-components";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import { useEffect } from "react";
import { useFavoriteContext } from "../context/FavoriteContext";
import { useBookingContext } from "../context/BookingContext";
import { useFoodContext } from "../context/FoodContext";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    fetchMovieDetails,
    currentMovie,
    loadingMovieDetails,
    errorMovieDetails,
  } = useMovieContext();
  const { favorites, addFavorite, removeFavorite } = useFavoriteContext();
  const { resetBooking } = useBookingContext();
  const { resetFoodBooking } = useFoodContext();

  useEffect(() => {
    if (id) fetchMovieDetails(id);
  }, [id, fetchMovieDetails]);

  const handleBackClick = () => navigate("/");

  const handleHeartClick = () => {
    if (currentMovie) {
      const isFavorite = favorites.some(
        (movie) => movie._id === currentMovie._id
      );
      if (isFavorite) {
        removeFavorite(currentMovie._id);
      } else {
        addFavorite(currentMovie._id, currentMovie.title, currentMovie.image);
      }
    }
  };

  const handleBuyTicketNow = () => {
    resetBooking();
    resetFoodBooking();
    navigate(`/buyticket/${currentMovie?._id}`);
  };

  const isFavorite = currentMovie
    ? favorites.some((movie) => movie._id === currentMovie._id)
    : false;

  const isReleaseDateInFuture = currentMovie
    ? new Date(currentMovie.releaseDate) > new Date()
    : false;

  if (loadingMovieDetails) {
    return <p>Loading movie details...</p>;
  }

  if (errorMovieDetails) {
    return <p>{`Error: ${errorMovieDetails}`}</p>;
  }

  return (
    <div className="pb-24">
      {currentMovie ? (
        <>
          <MovieInfoContainer
            onBackClick={handleBackClick}
            onHeartClick={handleHeartClick}
            movieInfo={currentMovie}
            isFavorite={isFavorite}
          />

          <StickyBottomContainer>
            {!isReleaseDateInFuture ? (
              <Button
                text="Buy Ticket Now"
                icon={<RightArrow />}
                onClick={handleBuyTicketNow}
              />
            ) : (
              <p className="text-center text-3xl font-bold">Coming Soon</p>
            )}
          </StickyBottomContainer>
        </>
      ) : (
        <div>No movie details found</div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
