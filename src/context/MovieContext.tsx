import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import { serverurl } from "../config";

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
  releaseDate: string;
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

interface ComingSoonMovie {
  image: string;
  link: string;
  releaseDate: string;
}

interface MostLikedMovie {
  image: string;
  link: string;
}

interface MovieContextType {
  currentMovie: Movie | null;
  setCurrentMovie: (movie: Movie | null) => void;
  fetchMovieDetails: (movieId: string) => Promise<void>;
  highlights: Highlight[];
  newMovies: NewMovie[];
  comingSoon: ComingSoonMovie[];
  mostLiked: MostLikedMovie[];
  fetchHighlights: () => Promise<void>;
  fetchNewMovies: () => Promise<void>;
  fetchComingSoon: () => Promise<void>;
  fetchMostLiked: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieContextProvider({ children }: { children: ReactNode }) {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [newMovies, setNewMovies] = useState<NewMovie[]>([]);
  const [comingSoon, setComingSoon] = useState<ComingSoonMovie[]>([]);
  const [mostLiked, setMostLiked] = useState<MostLikedMovie[]>([]);
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

  const fetchComingSoon = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${serverurl}/movies/comingsoon`);
      const formattedComingSoon = response.data.data.map((movie: any) => ({
        image: movie.image,
        link: `/moviedetails/${movie._id}`,
        releaseDate: movie.releaseDate,
      }));
      setComingSoon(formattedComingSoon);
    } catch (error: any) {
      console.error("Error fetching coming soon movies:", error);
      setError("Failed to fetch coming soon movies");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMostLiked = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${serverurl}/movies/mostliked`);
      const formattedMostLiked = response.data.data.map((movie: any) => ({
        image: movie.image,
        link: `/moviedetails/${movie._id}`,
      }));
      setMostLiked(formattedMostLiked);
    } catch (error: any) {
      console.error("Error fetching most liked movies:", error);
      setError("Failed to fetch most liked movies");
    } finally {
      setLoading(false);
    }
  }, []);

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
        fetchMovieDetails,
        highlights,
        newMovies,
        comingSoon,
        mostLiked,
        fetchHighlights,
        fetchNewMovies,
        fetchComingSoon,
        fetchMostLiked,
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
