import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import { serverurl } from "../config";

interface FavoriteMovie {
  _id: string;
  title: string;
  image: string;
}

export interface Movie {
  _id: string;
  image: string;
  title: string;
  productionHouse: string;
  rating: number;
  imdb: number;
  description: string;
  imagesInTheMovie: {
    link: string;
    image: string;
  }[];
  videoLink: string;
  videoThumbnail: string;
}

interface Highlight {
  image: string;
  label: string;
  link: string;
}

interface NewMovie {
  image: string;
  link: string;
}

interface MovieContextType {
  currentMovie: Movie | null;
  setCurrentMovie: (movie: Movie | null) => void;
  favorites: FavoriteMovie[];
  addFavorite: (id: string, title: string, image: string) => void;
  removeFavorite: (movieId: string) => void;
  fetchMovieDetails: (movieId: string) => Promise<void>;
  highlights: Highlight[];
  newMovies: NewMovie[];
  fetchHighlights: () => Promise<void>;
  fetchNewMovies: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieContextProvider({ children }: { children: ReactNode }) {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [newMovies, setNewMovies] = useState<NewMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHighlights = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${serverurl}/movies/highlights`);
      const formattedHighlights = response.data.data.map((movie: any) => ({
        image: movie.videoThumbnail,
        label: movie.title,
        link: `/moviedetails/${movie._id}`,
      }));
      setHighlights(formattedHighlights);
    } catch (error: any) {
      console.error("Error fetching highlights:", error);
      setError("Failed to fetch highlights");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNewMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${serverurl}/movies/newmovies`);
      const formattedNewMovies = response.data.data.map((movie: any) => ({
        image: movie.image,
        link: `/moviedetails/${movie._id}`,
      }));
      setNewMovies(formattedNewMovies);
    } catch (error: any) {
      console.error("Error fetching new movies:", error);
      setError("Failed to fetch new movies");
    } finally {
      setLoading(false);
    }
  }, []);

  const addFavorite = (id: string, title: string, image: string) => {
    const favoriteMovie = {
      _id: id,
      title: title,
      image: image,
    };
    setFavorites((prev) => [...prev, favoriteMovie]);
  };

  const removeFavorite = (movieId: string) => {
    setFavorites((prev) => prev.filter((movie) => movie._id !== movieId));
  };

  const fetchMovieDetails = useCallback(async (movieId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios(`${serverurl}/movies/movie/${movieId}`);
      setCurrentMovie(response.data.data);
    } catch (error: any) {
      console.error("Error fetching movie details:", error);
      setError("Failed to fetch movie details");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <MovieContext.Provider
      value={{
        currentMovie,
        setCurrentMovie,
        favorites,
        addFavorite,
        removeFavorite,
        fetchMovieDetails,
        highlights,
        newMovies,
        fetchHighlights,
        fetchNewMovies,
        loading,
        error,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context)
    throw new Error("useMovieContext must be used within MovieContextProvider");
  return context;
}
