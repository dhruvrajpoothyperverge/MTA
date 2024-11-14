import { HeadingContainer, Thumbnail } from "mta-components";
import HomeLayout from "../layout/HomeLayout";
import { useFavoriteContext } from "../context/FavoriteContext";
import Loading from "./Loading";

const Favorites = () => {
  const { favorites, favoriteLoading, favoriteError } = useFavoriteContext();

  return (
    <HomeLayout>
      <div className="px-5 pb-24">
        <HeadingContainer label="Favorites">
          {favoriteLoading ? (
            <Loading />
          ) : favoriteError ? (
            <p className="text-red-500">{favoriteError}</p>
          ) : favorites.length === 0 ? (
            <p>No favorite movies added yet.</p>
          ) : (
            <div className="flex gap-4 flex-wrap">
              {favorites.map((favorite, index) => (
                <Thumbnail
                  image={favorite.image}
                  link={`/moviedetails/${favorite._id}`}
                  key={index}
                />
              ))}
            </div>
          )}
        </HeadingContainer>
      </div>
    </HomeLayout>
  );
};

export default Favorites;
