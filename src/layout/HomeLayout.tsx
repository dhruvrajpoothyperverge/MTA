import {
  Heart,
  Home,
  Ticket,
  Navbar,
  ProfileIcon,
  Logo,
  NotificationIcon,
} from "mta-components";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const HomeLayout = ({ children }: any) => {
  const navItems = [
    { icon: <Heart />, label: "Favorites", url: "/favorites" },
    { icon: <Home />, label: "Home", url: "/" },
    { icon: <Ticket />, label: "Ticket", url: "/bookedtickets" },
  ];

  const navigate = useNavigate();
  const onProfileClick = () => {
    navigate("/profile");
  };
  const { user } = useAppContext();

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <ProfileIcon
          profilePic={
            user ? "/assets/kungfupanda.png" : "/assets/profilepic.png"
          }
          fallback={"/assets/profilepic.png"}
          onClick={onProfileClick}
        />
        <Logo />
        <NotificationIcon showBadge={false} />
      </div>

      {children}

      <Navbar data={navItems} />
    </div>
  );
};

export default HomeLayout;
