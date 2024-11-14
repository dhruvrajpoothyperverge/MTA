import React, { useEffect, useState } from "react";
import { AuthForm, BackgroundContainer } from "mta-components";
import { useAppContext } from "../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, isAuthenticated } = useAppContext();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/home";

  const inputArray = [
    {
      type: "email",
      placeholder: "Email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
    },
    {
      type: "password",
      placeholder: "Password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
    },
  ];

  const onSubmit = () => {
    login(email, password, redirectTo);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, []);

  return (
    <BackgroundContainer>
      <AuthForm
        step="signin"
        inputArray={inputArray}
        onSubmit={onSubmit}
        footerlink="/signup"
        isDisabled={email === "" || password === ""}
      />
    </BackgroundContainer>
  );
};

export default SignInPage;
