import React, { useState } from "react";
import { BackgroundContainer, SignInContainer } from "mta-components";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

  const navigate = useNavigate();
  const onSubmit = () => {
    // sign in form submit logic
    navigate('/home')
  };

  return (
    <BackgroundContainer bgurl="/assets/bg.png">
      <SignInContainer
        inputArray={inputArray}
        onSubmit={onSubmit}
        footerlink="/signup"
      />
    </BackgroundContainer>
  );
};

export default SignInPage;
