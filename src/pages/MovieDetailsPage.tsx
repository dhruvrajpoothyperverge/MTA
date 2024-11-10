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

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    addFavorite,
    removeFavorite,
    favorites,
    fetchMovieDetails,
    currentMovie,
  } = useMovieContext();

  useEffect(() => {
    if (id) fetchMovieDetails(id);
  }, [id, fetchMovieDetails]);

  const handleBackClick = () => navigate('/home');

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

  const isFavorite = currentMovie
    ? favorites.some((movie) => movie._id === currentMovie._id)
    : false;

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
        <Button
          text="Buy Ticket Now"
          icon={<RightArrow />}
          onClick={() => navigate(`/buyticket/${currentMovie?._id}`)}
        />
      </StickyBottomContainer>
    </div>
  );
};

export default MovieDetailsPage;
