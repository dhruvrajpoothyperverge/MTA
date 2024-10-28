import React, { useState } from "react";
import { SignUpContainer, BackgroundContainer } from "mta-components";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");

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

  const verificationArray = [
    {
      type: "text",
      placeholder: "Verification code",
      value: verificationCode,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setVerificationCode(e.target.value),
    },
  ];

  const navigate = useNavigate();

  const onSubmit = () => {
  };

  const onVerify = () => {
    navigate("/home");
  };

  return (
    <BackgroundContainer bgurl="/src/assets/bg.png">
      <SignUpContainer
        inputArray={inputArray}
        verficationArray={verificationArray}
        onSubmit={onSubmit}
        onVerify={onVerify}
        footerlink="/signin"
      />
    </BackgroundContainer>
  );
};

export default SignUpPage;
