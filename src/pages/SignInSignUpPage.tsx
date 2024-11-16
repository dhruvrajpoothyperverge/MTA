import { BackgroundContainer, SignInSignUp } from "mta-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const SignInSignUpPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppContext();

  const onSignIn = () => {
    navigate("/signin");
  };

  const onSignUp = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, []);

  return (
    <BackgroundContainer>
      <div className="mb-6">
        <SignInSignUp onSignIn={onSignIn} onSignUp={onSignUp} />
      </div>
    </BackgroundContainer>
  );
};

export default SignInSignUpPage;
