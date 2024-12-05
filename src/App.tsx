import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router/Router";
import { MovieContextProvider } from "./context/MovieContext";
import { BookingContextProvider } from "./context/BookingContext";
import { FoodContextProvider } from "./context/FoodContext";
import { TicketContextProvider } from "./context/TicketContext";
import { AppContextProvider } from "./context/AppContext";
import { FavoriteContextProvider } from "./context/FavoriteContext";
import { SkeletonTheme } from "mta-components";
import "react-loading-skeleton/dist/skeleton.css";

const App = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <MovieContextProvider>
          <FavoriteContextProvider>
            <BookingContextProvider>
              <FoodContextProvider>
                <TicketContextProvider>
                  <SkeletonTheme baseColor="#3a3a3a" highlightColor="#505050">
                    <div className="bg-gradient-to-b from-[#000000ea] via-[#000000ea] to-[#211741] text-white min-h-screen">
                      <Router />
                    </div>
                  </SkeletonTheme>
                </TicketContextProvider>
              </FoodContextProvider>
            </BookingContextProvider>
          </FavoriteContextProvider>
        </MovieContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
};

export default App;
