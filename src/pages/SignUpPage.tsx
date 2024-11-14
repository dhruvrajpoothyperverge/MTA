import React, { useEffect, useState } from "react";
import { BackgroundContainer, AuthForm } from "mta-components";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { serverurl } from "../config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<number | null>(null);
  const { verifyEmail, isAuthenticated } = useAppContext();

  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

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
      type: "number",
      placeholder: "Verification code",
      value: verificationCode ?? "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setVerificationCode(value ? parseInt(value) : null);
      },
    },
  ];

  const onSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`${serverurl}/auth/signup`, {
        email,
        password,
      });

      toast.success(
        "Verification OTP sent successfully. Please check your email."
      );

      setStep(1);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error signing up");
    } finally {
      setLoading(false);
    }
  };

  const onVerify = () => {
    setLoading(true);
    if (verificationCode) verifyEmail(email, verificationCode);
    setLoading(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, []);

  return (
    <BackgroundContainer>
      <div>
        {step === 0 && (
          <AuthForm
            step="signup"
            inputArray={inputArray}
            onSubmit={onSubmit}
            footerlink="/signin"
            isDisabled={loading || email === "" || password === ""}
          />
        )}

        {step === 1 && (
          <AuthForm
            step="signup"
            description="We have sent a verification code to the e-mail address you entered. By entering the code, you can create your account."
            inputArray={verificationArray}
            onSubmit={onVerify}
            footerlink="/signin"
            isDisabled={loading || verificationCode === null}
          />
        )}
      </div>
    </BackgroundContainer>
  );
};

export default SignUpPage;
