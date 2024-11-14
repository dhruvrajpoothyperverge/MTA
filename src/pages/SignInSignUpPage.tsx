import { BackgroundContainer, SignInSignUp } from "mta-components";
import { useNavigate } from "react-router-dom";

const SignInSignUpPage = () => {
  const navigate = useNavigate();
  const onSignIn = () => {
    navigate("/signin");
  };

  const onSignUp = () => {
    navigate("/signup");
  };

  return (
    <BackgroundContainer>
      <div className="mb-6">
        <SignInSignUp onSignIn={onSignIn} onSignUp={onSignUp} />
      </div>
    </BackgroundContainer>
  );
};

export default SignInSignUpPage;
