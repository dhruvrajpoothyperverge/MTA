import { useNavigate } from "react-router-dom";
import {
  Button,
  LeftArrow,
  StickyBottomContainer,
  UserProfile,
} from "mta-components";
import { useAppContext } from "../context/AppContext";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAppContext();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen">
      <div className="px-6 py-8">
        <button
          onClick={handleBackClick}
          className="rounded-lg bg-white text-primary p-2.5 mb-6"
        >
          <LeftArrow />
        </button>

        {user && <UserProfile userDetails={user} />}
      </div>

      <StickyBottomContainer>
        <Button text="Logout" variant="outline" onClick={logout} />
      </StickyBottomContainer>
    </div>
  );
};

export default ProfilePage;
