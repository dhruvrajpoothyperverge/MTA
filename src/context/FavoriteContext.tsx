import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { serverurl } from "../config";

interface FavoriteMovie {
  _id: string;
  title: string;
  image: string;
}

interface FavoriteContextType {
  favorites: FavoriteMovie[];
  addFavorite: (movieId: string, title: string, image: string) => void;
  removeFavorite: (movieId: string) => void;
  getFavorites: () => void;
  favoriteLoading: boolean;
  favoriteError: string | null;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export function FavoriteContextProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [favoriteLoading, setFavoriteLoading] = useState<boolean>(false);
  const [favoriteError, setFavoriteError] = useState<string | null>(null);

  const getFavorites = async () => {
    setFavoriteLoading(true);
    setFavoriteError(null);
    try {
      const response = await axios.get(`${serverurl}/favorite`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setFavorites(response.data.favorite.movies);
      localStorage.setItem(
        "favorites",
        JSON.stringify(response.data.favorite.movies)
      );
    } catch (error: any) {
      setFavoriteError("Error fetching favorites.");
      toast.error("Failed to fetch favorites.");
    } finally {
      setFavoriteLoading(false);
    }
  };

  const addFavorite = async (movieId: string, title: string, image: string) => {
    setFavoriteLoading(true);
    setFavoriteError(null);
    try {
      await axios.post(
        `${serverurl}/favorite`,
        { movieId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const newFavorite = { _id: movieId, title, image };
      setFavorites((prev) => [...prev, newFavorite]);
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, newFavorite])
      );
      toast.success("Movie added to favorites!");
    } catch (error: any) {
      setFavoriteError("Error adding to favorites.");
      toast.error("Failed to add to favorites.");
    } finally {
      setFavoriteLoading(false);
    }
  };

  const removeFavorite = async (movieId: string) => {
    setFavoriteLoading(true);
    setFavoriteError(null);
    try {
      await axios.delete(`${serverurl}/favorite`, {
        data: { movieId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setFavorites((prev) => prev.filter((movie) => movie._id !== movieId));
      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites.filter((movie) => movie._id !== movieId))
      );
      toast.success("Movie removed from favorites.");
    } catch (error: any) {
      setFavoriteError("Error removing from favorites.");
      toast.error("Failed to remove from favorites.");
    } finally {
      setFavoriteLoading(false);
    }
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    } else {
      getFavorites();
    }
  }, []);

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        getFavorites,
        favoriteLoading,
        favoriteError,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavoriteContext() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error(
      "useFavoriteContext must be used within FavoriteContextProvider"
    );
  }
  return context;
}
