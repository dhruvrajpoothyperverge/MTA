import { HeadingContainer, Thumbnail } from "mta-components";
import HomeLayout from "../layout/HomeLayout";
import { useMovieContext } from "../context/MovieContext";

const Favorites = () => {
  const { favorites } = useMovieContext();

  return (
    <HomeLayout>
      <div className="px-5 pb-24">
        <HeadingContainer label="Favorites">
          {favorites.length === 0 ? (
            <p>No favorite movies added yet.</p>
          ) : (
            <div className="flex gap-4 flex-wrap">
              {favorites.map((favorite, index) => {
                return (
                  <Thumbnail
                    image={favorite.image}
                    link={`/moviedetails/${favorite._id}`}
                    key={index}
                  />
                );
              })}
            </div>
          )}
        </HeadingContainer>
      </div>
    </HomeLayout>
  );
};

export default Favorites;
