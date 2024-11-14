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
    loading,
    error,
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
        {loading ? (
          <p>loading</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <HeadingContainer label="Highlights">
              <Carousel data={highlights} />
            </HeadingContainer>

            <HeadingContainer label="New Movies">
              <Slider data={newMovies} />
            </HeadingContainer>

            <HeadingContainer label="Coming Soon">
              <Slider data={comingSoon} />
            </HeadingContainer>

            <HeadingContainer label="Most Liked">
              <Slider data={mostLiked} />
            </HeadingContainer>
          </>
        )}
      </div>
    </HomeLayout>
  );
};

export default HomePage;
