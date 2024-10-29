import { createContext, ReactNode, useContext, useState } from "react";

export interface Movie {
  _id: string;
  image: string;
  title: string;
  productionHouse: string;
  rating: number;
  imdb: number;
  description: string;
  imagesInTheMovie: any[];
  videoLink: string;
  videoThumbnail: string;
}

interface MovieContextType {
  currentMovie: Movie | null;
  setCurrentMovie: (movie: Movie | null) => void;
  favorites: string[];
  addFavorite: (movieId: string) => void;
  removeFavorite: (movieId: string) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieContextProvider({ children }: { children: ReactNode }) {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = (movieId: string) => {
    setFavorites((prev) => [...prev, movieId]);
  };

  const removeFavorite = (movieId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== movieId));
  };

  return (
    <MovieContext.Provider
      value={{
        currentMovie,
        setCurrentMovie,
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) throw new Error("useMovieContext must be used within MovieContextProvider");
  return context;
}
