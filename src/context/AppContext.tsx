import { createContext, ReactNode, useContext, useState } from "react";

interface AppContextType {}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
    const [newMovies, setNewMovies] = useState([]);
    const [highlights, setHighlights] = useState([]);
    const [selectedMovieTheater, setSelectedMovieTheater] = useState<string>("");
    const [selectedSession, setSession] = useState<string>("");
    const [buffetItems, setBuffetItems] = useState([]);
    const [selectedBuffetItems, setSelectedBuffetItems]= useState([]);

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
}
