import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router/Router";
import { MovieContextProvider } from "./context/MovieContext";
import { BookingContextProvider } from "./context/BookingContext";
import { FoodContextProvider } from "./context/FoodContext";
import { TicketContextProvider } from "./context/TicketContext";

const App = () => {
  return (
    <BrowserRouter>
      <MovieContextProvider>
        <BookingContextProvider>
          <FoodContextProvider>
            <TicketContextProvider>
              <div className="bg-gradient-to-b from-[#000000ea] via-[#000000ea] to-[#211741] text-white min-h-screen">
                <Router />
              </div>
            </TicketContextProvider>
          </FoodContextProvider>
        </BookingContextProvider>
      </MovieContextProvider>
    </BrowserRouter>
  );
};

export default App;
