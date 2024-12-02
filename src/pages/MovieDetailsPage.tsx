import {
  MovieInfoContainer,
  Description,
  HeadingContainer,
  Slider,
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
    <div>
      {currentMovie ? (
        <MovieInfoContainer
          onBackClick={handleBackClick}
          onHeartClick={handleHeartClick}
          videoLink={currentMovie.videoLink}
          videoThumbnail={currentMovie.videoThumbnail}
          movieInfo={currentMovie}
          isFavorite={isFavorite}
        />
      ) : (
        <div>Movie details not found.</div>
      )}

      <div className="flex flex-col gap-4 px-5 pb-28">
        <Description
          data={currentMovie?.description || "No description available."}
        />
        <HeadingContainer label="Images in the movie">
          {currentMovie?.imagesInTheMovie &&
          currentMovie?.imagesInTheMovie.length > 0 ? (
            <Slider data={currentMovie?.imagesInTheMovie || []} />
          ) : (
            <div>No images available for this movie.</div>
          )}
        </HeadingContainer>
      </div>

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
    </div>
  );
};

export default MovieDetailsPage;
