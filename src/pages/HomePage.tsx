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
  }, [highlights]);

  useEffect(() => {
    if (newMovies.length === 0) fetchNewMovies();
  }, [newMovies]);

  useEffect(() => {
    if (comingSoon.length === 0) fetchComingSoon();
  }, [comingSoon]);

  useEffect(() => {
    if (mostLiked.length === 0) fetchMostLiked();
  }, [mostLiked]);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-4 px-5 pb-24">
        <HeadingContainer label="Highlights">
          {loadingHighlights ? (
            <p>Loading highlights...</p>
          ) : errorHighlights ? (
            <p>{errorHighlights}</p>
          ) : (
            <Carousel data={highlights} />
          )}
        </HeadingContainer>

        <HeadingContainer label="New Movies">
          {loadingNewMovies ? (
            <p>Loading new movies...</p>
          ) : errorNewMovies ? (
            <p>{errorNewMovies}</p>
          ) : (
            <Slider data={newMovies} />
          )}
        </HeadingContainer>

        <HeadingContainer label="Coming Soon">
          {loadingComingSoon ? (
            <p>Loading coming soon movies...</p>
          ) : errorComingSoon ? (
            <p>{errorComingSoon}</p>
          ) : (
            <Slider data={comingSoon} />
          )}
        </HeadingContainer>

        <HeadingContainer label="Most Liked">
          {loadingMostLiked ? (
            <p>Loading most liked movies...</p>
          ) : errorMostLiked ? (
            <p>{errorMostLiked}</p>
          ) : (
            <Slider data={mostLiked} />
          )}
        </HeadingContainer>
      </div>
    </HomeLayout>
  );
};

export default HomePage;
