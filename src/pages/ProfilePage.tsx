import { useNavigate } from "react-router-dom";
import { Button, LeftArrow } from "mta-components";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 px-6 py-8 bg-transparent shadow-none rounded-lg">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackClick}
            className="rounded-lg bg-white text-primary p-2.5"
          >
            <LeftArrow />
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <img
            src="/assets/kungfupanda.png"
            alt="Profile Picture"
            className="rounded-full w-32 h-32 object-cover border-4 border-white"
          />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-white">Po Kungfu Panda</h1>
          <p className="text-lg text-gray-400">Master of Kung Fu</p>
        </div>

        <div className="space-y-4 text-white">
          <div className="flex justify-between">
            <span className="font-medium">Email</span>
            <span className="text-gray-400">po@kungfu.com</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone</span>
            <span className="text-gray-400">+123-456-7890</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Location</span>
            <span className="text-gray-400">Jade Palace, China</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Birthday</span>
            <span className="text-gray-400">June 15, 2000</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button text="Edit Profile" disabled />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
