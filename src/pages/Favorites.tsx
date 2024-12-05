import { FavoritesContainer, HeadingContainer } from "mta-components";
import HomeLayout from "../layout/HomeLayout";
import { useFavoriteContext } from "../context/FavoriteContext";

const Favorites = () => {
  const { favorites, favoriteLoading, favoriteError } = useFavoriteContext();

  return (
    <HomeLayout>
      <div className="px-5 pb-24">
        <HeadingContainer label="Favorites">
          <FavoritesContainer
            favorites={favorites}
            loading={favoriteLoading}
            error={favoriteError}
          />
        </HeadingContainer>
      </div>
    </HomeLayout>
  );
};

export default Favorites;
