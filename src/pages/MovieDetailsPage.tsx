import {
  MovieInfoContainer,
  Description,
  HeadingContainer,
  Slider,
  StickyBottomContainer,
  Button,
  RightArrow,
} from "mta-components";
import { useNavigate } from "react-router-dom";

const MovieDetailsPage = () => {
  const movieDetails = {
    image: "/src/assets/kungfupanda.png",
    title: "Kung Fu Panda 4",
    productionHouse: "Dreamworks Animation",
    rating: 8.5,
    imdb: 7.9,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ipsa distinctio veritatis suscipit laborum iste aut facilis culpa similique. Quas corporis impedit at neque nesciunt eligendi sint eius natus iusto. Odio pariatur dicta culpa voluptas neque similique est molestiae inventore hic libero tempore deserunt sed aspernatur praesentium sunt, aut ex corporis consequuntur. Voluptatum aut amet doloribus pariatur, assumenda possimus esse tempora adipisci atque laudantium odit inventore soluta voluptate in. Corporis quidem necessitatibus sequi voluptatum iste odit numquam voluptatibus, nesciunt quaerat voluptas tenetur dignissimos neque ipsum facere facilis fuga placeat aut illum, porro expedita sed ea incidunt. Veritatis labore assumenda facere!",
  };

  const navigate = useNavigate();

  const handleBackClick = () => {
    // Handle back navigation
    navigate("/home");
  };

  const handleHeartClick = () => {
    // Handle adding to favorites
  };

  const imagesInTheMovie = [
    {
      image: "/src/assets/spiderman.png",
      link: "/moviedetails/1",
    },
    {
      image: "/src/assets/spiderman.png",
      link: "/moviedetails/1",
    },
    {
      image: "/src/assets/spiderman.png",
      link: "/moviedetails/1",
    },
  ];

  return (
    <div>
      <MovieInfoContainer
        onBackClick={handleBackClick}
        onHeartClick={handleHeartClick}
        videoLink="https://example.com/movie-video.mp4"
        videoThumbnail="/src/assets/spiderman.png"
        movieInfo={movieDetails}
      />

      <div className="flex flex-col gap-4 px-5 pb-28">
        <Description data={movieDetails.description} />

        <HeadingContainer label="Images in the movie">
          <Slider data={imagesInTheMovie} />
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
