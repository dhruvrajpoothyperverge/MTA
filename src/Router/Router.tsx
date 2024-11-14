import { Route, Routes } from "react-router-dom";
import SignInSignUpPage from "../pages/SignInSignUpPage";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import BookingDetails from "../pages/BookingDetails";
import BuyTicket from "../pages/BuyTicket/BuyTicket";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import SignInPage from "../pages/SignInPage";
import BuyFood from "../pages/BuyFood";
import BookedTickets from "../pages/BookedTickets";
import Favorites from "../pages/Favorites";
import ProfilePage from "../pages/ProfilePage";
import PrivateRoute from "./PrivateRoutes";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInSignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/moviedetails/:id" element={<MovieDetailsPage />} />
      <Route
        path="/bookingdetails/:id"
        element={<PrivateRoute element={<BookingDetails />} />}
      />
      <Route
        path="/buyticket/:id"
        element={<PrivateRoute element={<BuyTicket />} />}
      />
      <Route
        path="/buyfood/:id"
        element={<PrivateRoute element={<BuyFood />} />}
      />
      <Route
        path="/bookedtickets"
        element={<PrivateRoute element={<BookedTickets />} />}
      />
      <Route
        path="/favorites"
        element={<PrivateRoute element={<Favorites />} />}
      />
      <Route
        path="/profile"
        element={<PrivateRoute element={<ProfilePage />} />}
      />
    </Routes>
  );
};

export default Router;
