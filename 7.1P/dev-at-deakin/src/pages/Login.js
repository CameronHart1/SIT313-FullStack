import { useState } from "react";
import { useParams } from "react-router-dom";

const LoginPage = () => {
  const { SignType } = useParams();

  return (
    <div>
      {/* logic for choosing which page to show*/}
      {SignType == "sign-in" ? (
        <SignIn />
      ) : SignType == "sign-up" ? (
        <SignUp />
      ) : null}
    </div>
  );
};

const SignIn = () => {
  return (
    <div>
      <h1>Sign In</h1>
    </div>
  );
};

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>
    </div>
  );
};

export default LoginPage;
