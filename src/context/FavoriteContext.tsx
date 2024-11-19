import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import toast from "react-hot-toast";
import { serverurl } from "../config";
import { useAppContext } from "./AppContext";
import axiosInstance from "../config/axiosInstance";

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
  const { isAuthenticated } = useAppContext();

  const getFavorites = async () => {
    if (!isAuthenticated) {
      return;
    }
    setFavoriteLoading(true);
    setFavoriteError(null);
    try {
      const response = await axiosInstance.get(`${serverurl}/favorite`);
      setFavorites(response.data.favorite.movies);
      localStorage.setItem(
        "favorites",
        JSON.stringify(response.data.favorite.movies)
      );
    } catch (error: any) {
      setFavoriteError("Error fetching favorites.");
      toast.error(
        error.response?.data?.message || "Failed to fetch favorites."
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  const addFavorite = async (movieId: string, title: string, image: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to manage your favorites");
      return;
    }
    setFavoriteLoading(true);
    setFavoriteError(null);
    try {
      await axiosInstance.post(`${serverurl}/favorite`, { movieId });
      const newFavorite = { _id: movieId, title, image };
      setFavorites((prev) => [...prev, newFavorite]);
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, newFavorite])
      );
      toast.success("Movie added to favorites!");
    } catch (error: any) {
      setFavoriteError("Error adding to favorites.");
      toast.error(
        error.response?.data?.message || "Failed to add to favorites."
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  const removeFavorite = async (movieId: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to manage your favorites");
      return;
    }
    setFavoriteLoading(true);
    setFavoriteError(null);
    try {
      await axiosInstance.delete(`${serverurl}/favorite`, {
        data: { movieId },
      });
      setFavorites((prev) => prev.filter((movie) => movie._id !== movieId));
      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites.filter((movie) => movie._id !== movieId))
      );
      toast.success("Movie removed from favorites.");
    } catch (error: any) {
      setFavoriteError("Error removing from favorites.");
      toast.error(
        error.response?.data?.message || "Failed to remove from favorites."
      );
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
  }, [isAuthenticated]);

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
