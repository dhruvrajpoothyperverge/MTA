import { FavoritesContainer, Heading } from "mta-components";
import HomeLayout from "../layout/HomeLayout";
import { useFavoriteContext } from "../context/FavoriteContext";

const Favorites = () => {
  const { favorites, favoriteLoading, favoriteError } = useFavoriteContext();

  return (
    <HomeLayout>
      <div className="flex flex-col gap-2 px-5 pb-24">
        <Heading label="Favorites" />
        <FavoritesContainer
          favorites={favorites}
          loading={favoriteLoading}
          error={favoriteError}
        />
      </div>
    </HomeLayout>
  );
};

export default Favorites;
