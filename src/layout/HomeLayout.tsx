import { useState } from "react";
import {
  Heart,
  Home,
  Navbar,
  ProfileIcon,
  Logo,
  TicketIcon,
  Notification,
} from "mta-components";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { subscribeToPushNotifications } from "../utils/pushNotification";

const HomeLayout = ({ children }: any) => {
  const navigate = useNavigate();
  const { user } = useAppContext();

  const navItems = [
    { icon: <Heart />, label: "Favorites", url: "/favorites" },
    { icon: <Home />, label: "Home", url: "/" },
    { icon: <TicketIcon />, label: "Ticket", url: "/bookedtickets" },
  ];

  const onProfileClick = () => {
    navigate("/profile");
  };

  const [notifications, setNotifications] = useState([
    { id: "1", message: "Your ticket is ready" },
    { id: "2", message: "Exciting offers for you" },
  ]);

  const clearNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center p-6 sticky top-0 bg-[#141414] z-50">
        <ProfileIcon
          profilePic={
            user
              ? "https://res.cloudinary.com/dqofbcsua/image/upload/v1734418165/kungfupanda_jk4c76.webp"
              : "https://res.cloudinary.com/dqofbcsua/image/upload/v1734418164/profilepic_yivk7z.webp"
          }
          fallback={
            "https://res.cloudinary.com/dqofbcsua/image/upload/v1734418164/profilepic_yivk7z.webp"
          }
          onClick={onProfileClick}
        />

        <Logo />

        <Notification
          notifications={notifications}
          onClear={clearNotification}
          onSubscribe={subscribeToPushNotifications}
        />
      </div>

      {children}

      <Navbar data={navItems} />
    </div>
  );
};

export default HomeLayout;
