import { useEffect } from "react";
import { Carousel, HeadingContainer, Slider } from "mta-components";
import HomeLayout from "../layout/HomeLayout";
import { useMovieContext } from "../context/MovieContext";

const HomePage = () => {
  const {
    highlights,
    newMovies,
    comingSoon,
    mostLiked,
    fetchNewMovies,
    fetchHighlights,
    fetchComingSoon,
    fetchMostLiked,
    loadingHighlights,
    loadingNewMovies,
    loadingComingSoon,
    loadingMostLiked,
    errorHighlights,
    errorNewMovies,
    errorComingSoon,
    errorMostLiked,
  } = useMovieContext();

  useEffect(() => {
    if (highlights.length === 0) fetchHighlights();
  }, []);

  useEffect(() => {
    if (newMovies.length === 0) fetchNewMovies();
  }, []);

  useEffect(() => {
    if (comingSoon.length === 0) fetchComingSoon();
  }, []);

  useEffect(() => {
    if (mostLiked.length === 0) fetchMostLiked();
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-4 px-5 pb-24">
        <HeadingContainer label="Highlights">
          <Carousel
            data={highlights}
            isLoading={loadingHighlights}
            error={errorHighlights}
          />
        </HeadingContainer>

        <HeadingContainer label="New Movies">
          <Slider
            data={newMovies}
            isLoading={loadingNewMovies}
            error={errorNewMovies}
          />
        </HeadingContainer>

        <HeadingContainer label="Coming Soon">
          <Slider
            data={comingSoon}
            isLoading={loadingComingSoon}
            error={errorComingSoon}
          />
        </HeadingContainer>

        <HeadingContainer label="Most Liked">
          <Slider
            data={mostLiked}
            isLoading={loadingMostLiked}
            error={errorMostLiked}
          />
        </HeadingContainer>
      </div>
    </HomeLayout>
  );
};

export default HomePage;
