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
  loadingHighlights: boolean;
  loadingNewMovies: boolean;
  loadingComingSoon: boolean;
  loadingMostLiked: boolean;
  loadingMovieDetails: boolean;
  errorHighlights: string | null;
  errorNewMovies: string | null;
  errorComingSoon: string | null;
  errorMostLiked: string | null;
  errorMovieDetails: string | null;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieContextProvider({ children }: { children: ReactNode }) {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [newMovies, setNewMovies] = useState<NewMovie[]>([]);
  const [comingSoon, setComingSoon] = useState<ComingSoonMovie[]>([]);
  const [mostLiked, setMostLiked] = useState<MostLikedMovie[]>([]);

  const [loadingHighlights, setLoadingHighlights] = useState<boolean>(false);
  const [loadingNewMovies, setLoadingNewMovies] = useState<boolean>(false);
  const [loadingComingSoon, setLoadingComingSoon] = useState<boolean>(false);
  const [loadingMostLiked, setLoadingMostLiked] = useState<boolean>(false);
  const [loadingMovieDetails, setLoadingMovieDetails] = useState<boolean>(false);

  const [errorHighlights, setErrorHighlights] = useState<string | null>(null);
  const [errorNewMovies, setErrorNewMovies] = useState<string | null>(null);
  const [errorComingSoon, setErrorComingSoon] = useState<string | null>(null);
  const [errorMostLiked, setErrorMostLiked] = useState<string | null>(null);
  const [errorMovieDetails, setErrorMovieDetails] = useState<string | null>(null);

  const fetchHighlights = useCallback(async () => {
    setLoadingHighlights(true);
    setErrorHighlights(null);
    try {
      const response = await axios.get(`${serverurl}/movies/highlights`);
      const formattedHighlights = response.data.data.map((movie: any) => ({
        image: movie.videoThumbnail,
        label: movie.title,
        link: `/moviedetails/${movie._id}`,
      }));
      setHighlights(formattedHighlights);
    } catch (error: any) {
      setErrorHighlights("Failed to fetch highlights");
    } finally {
      setLoadingHighlights(false);
    }
  }, []);

  const fetchNewMovies = useCallback(async () => {
    setLoadingNewMovies(true);
    setErrorNewMovies(null);
    try {
      const response = await axios.get(`${serverurl}/movies/newmovies`);
      const formattedNewMovies = response.data.data.map((movie: any) => ({
        image: movie.image,
        link: `/moviedetails/${movie._id}`,
      }));
      setNewMovies(formattedNewMovies);
    } catch (error: any) {
      setErrorNewMovies("Failed to fetch new movies");
    } finally {
      setLoadingNewMovies(false);
    }
  }, []);

  const fetchComingSoon = useCallback(async () => {
    setLoadingComingSoon(true);
    setErrorComingSoon(null);
    try {
      const response = await axios.get(`${serverurl}/movies/comingsoon`);
      const formattedComingSoon = response.data.data.map((movie: any) => ({
        image: movie.image,
        link: `/moviedetails/${movie._id}`,
        releaseDate: movie.releaseDate,
      }));
      setComingSoon(formattedComingSoon);
    } catch (error: any) {
      setErrorComingSoon("Failed to fetch coming soon movies");
    } finally {
      setLoadingComingSoon(false);
    }
  }, []);

  const fetchMostLiked = useCallback(async () => {
    setLoadingMostLiked(true);
    setErrorMostLiked(null);
    try {
      const response = await axios.get(`${serverurl}/movies/mostliked`);
      const formattedMostLiked = response.data.data.map((movie: any) => ({
        image: movie.image,
        link: `/moviedetails/${movie._id}`,
      }));
      setMostLiked(formattedMostLiked);
    } catch (error: any) {
      setErrorMostLiked("Failed to fetch most liked movies");
    } finally {
      setLoadingMostLiked(false);
    }
  }, []);

  const fetchMovieDetails = useCallback(async (movieId: string) => {
    setCurrentMovie(null);
    setLoadingMovieDetails(true);
    setErrorMovieDetails(null);
    try {
      const response = await axios(`${serverurl}/movies/movie/${movieId}`);
      setCurrentMovie(response.data.data);
    } catch (error: any) {
      setErrorMovieDetails("Failed to fetch movie details");
    } finally {
      setLoadingMovieDetails(false);
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
        loadingHighlights,
        loadingNewMovies,
        loadingComingSoon,
        loadingMostLiked,
        loadingMovieDetails,
        errorHighlights,
        errorNewMovies,
        errorComingSoon,
        errorMostLiked,
        errorMovieDetails,
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
