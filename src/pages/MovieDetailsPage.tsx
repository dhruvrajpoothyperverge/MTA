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
  const { currentMovie, setCurrentMovie, addFavorite, favorites } =
    useMovieContext();

  const fetchMovieDetails = async (movieId: string) => {
    setCurrentMovie({
      _id: movieId,
      image: "/assets/kungfupanda.png",
      title: "Kung Fu Panda 4",
      productionHouse: "Dreamworks Animation",
      rating: 4.5,
      imdb: 7.9,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ipsa distinctio veritatis suscipit laborum iste aut facilis culpa similique. Quas corporis impedit at neque nesciunt eligendi sint eius natus iusto. Odio pariatur dicta culpa voluptas neque similique est molestiae inventore hic libero tempore deserunt sed aspernatur praesentium sunt, aut ex corporis consequuntur. Voluptatum aut amet doloribus pariatur, assumenda possimus esse tempora adipisci atque laudantium odit inventore soluta voluptate in. Corporis quidem necessitatibus sequi voluptatum iste odit numquam voluptatibus, nesciunt quaerat voluptas tenetur dignissimos neque ipsum facere facilis fuga placeat aut illum, porro expedita sed ea incidunt. Veritatis labore assumenda facere!",
      videoLink: "",
      videoThumbnail: "/assets/kungfupanda.png",
      imagesInTheMovie: [
        "/assets/spiderman.png",
        "/assets/spiderman.png",
        "/assets/spiderman.png",
      ],
    });
  };

  useEffect(() => {
    if (id) fetchMovieDetails(id);
  }, [id]);

  const handleBackClick = () => {
    navigate("/home");
  };

  const handleHeartClick = () => {
    if (currentMovie) {
      const isFavorite = favorites.includes(currentMovie._id);
      if (!isFavorite) {
        addFavorite(currentMovie._id);
      }
    }
  };

  const imagesInTheMovie =
    currentMovie?.imagesInTheMovie?.map((image) => ({
      image,
      link: `/moviedetails/${currentMovie._id}`,
    })) || [];

  return (
    <div>
      {currentMovie ? (
        <MovieInfoContainer
          onBackClick={handleBackClick}
          onHeartClick={handleHeartClick}
          videoLink={currentMovie.videoLink}
          videoThumbnail={currentMovie.videoThumbnail}
          movieInfo={currentMovie}
        />
      ) : (
        <div>Movie details not found.</div>
      )}

      <div className="flex flex-col gap-4 px-5 pb-28">
        <Description
          data={currentMovie?.description || "No description available."}
        />

        <HeadingContainer label="Images in the movie">
          {imagesInTheMovie.length > 0 ? (
            <Slider data={imagesInTheMovie} />
          ) : (
            <div>No images available for this movie.</div>
          )}
        </HeadingContainer>
      </div>

      <StickyBottomContainer>
        <Button
          text="Buy Ticket Now"
          icon={<RightArrow />}
          onClick={() => navigate("/buyticket")}
        />
      </StickyBottomContainer>
    </div>
  );
};

export default MovieDetailsPage;
