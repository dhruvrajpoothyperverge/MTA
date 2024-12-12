import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../pages/Loading";

const SignInSignUpPage = lazy(() => import("../pages/SignInSignUpPage"));
const SignUpPage = lazy(() => import("../pages/SignUpPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const BookingDetails = lazy(() => import("../pages/BookingDetails"));
const BuyTicket = lazy(() => import("../pages/BuyTicket/BuyTicket"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage"));
const SignInPage = lazy(() => import("../pages/SignInPage"));
const BuyFood = lazy(() => import("../pages/BuyFood"));
const BookedTickets = lazy(() => import("../pages/BookedTickets"));
const Favorites = lazy(() => import("../pages/Favorites"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const AvailableTheaters = lazy(
  () => import("../pages/BuyTicket/AvailableTheaters")
);
const AvailableSessions = lazy(
  () => import("../pages/BuyTicket/AvailableSessions")
);
const PrivateRoute = lazy(() => import("./PrivateRoutes"));

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signinsignup" element={<SignInSignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
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
        <Route
          path="/available-theaters/:movieid"
          element={<PrivateRoute element={<AvailableTheaters />} />}
        />
        <Route
          path="/available-sessions/:movieid/:id"
          element={<PrivateRoute element={<AvailableSessions />} />}
        />
      </Routes>
    </Suspense>
  );
};

export default Router;
