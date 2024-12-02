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
            user ? "/assets/kungfupanda.png" : "/assets/profilepic.png"
          }
          fallback={"/assets/profilepic.png"}
          onClick={onProfileClick}
        />

        <Logo />

        <Notification
          notifications={notifications}
          onClear={clearNotification}
        />
      </div>

      {children}

      <Navbar data={navItems} />
    </div>
  );
};

export default HomeLayout;
