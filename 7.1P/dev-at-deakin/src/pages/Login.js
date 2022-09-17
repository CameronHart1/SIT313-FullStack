import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CSS/p_login.css";
import { Link,useNavigate } from "react-router-dom";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  createAuthUserWithEmailAndPassword,
  signIn
} from "../utils/firebase";

// const for email,
// Check validity boxes for passowrd /
// optional name box

const LoginPage = () => {
  const { SignType } = useParams();
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { firstName, lastName,email, password, confirmPassword } = contact;
// updating these vals
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  // logging in with google
  const logGoogleUser = async (e) => {
    // otherwise buton reloads pagee
    e.preventDefault();
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
  };
// ligining in with email
  const handleSignIn = async(e) => {
    e.preventDefault();
    const { user } = await signIn(email,password);
    const userDocRef = await createUserDocFromAuth(user);
    console.log(user);
  };

  // creating a new user via email
  const handleSignUp = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password mismatch");
      return;
    }
    try {
      const {user} = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocFromAuth(user,{displayName:`${firstName},${lastName}`})
      navigate("/login/sign-in");
    } catch (error) {
      console.log("error creating user" + error.message);
    }
  };


  // Rendering
  return (
    <div className="LoginContainer">
      {/* logic for choosing which page to show*/}
      {SignType == "sign-in" ? (
        <SignIn
          InEmail={email}
          emailHandler={handleChange}
          logGoogleUser={logGoogleUser}
          handleLogin={handleSignIn}
        />
      ) : SignType == "sign-up" ? (
        <SignUp InEmail={email} handleChange={handleChange} handleSubmit={handleSignUp}/>
      ) : null}
    </div>
  );
};
// -----------------------------------------------------------------------
const SignIn = (props) => {
  return (
    <div>
      <Link id="LoginButton" to="/login/sign-up">
        <button className="InvertButton RightButton">Sign Up</button>
      </Link>
      <form className="ColumnStretch">
        <label>Your email</label>
        <TextBar
          name="email"
          placeholder="example@email.com"
          default={props.InEmail}
          autoC="username"
          type="email"
          Handler={props.emailHandler}
        />
        <label>Your password</label>
        <TextBar
          placeholder="Password"
          type="password"
          autoC="current-password"
        />
        <button className="HollowButton LoginButtonPadding" onClick={props.handleLogin}> Login </button>
        <button
          className="HollowButton LoginButtonPadding"
          onClick={props.logGoogleUser}
        >
          Login with Google
        </button>
      </form>
    </div>
  );
};
// -----------------------------------------------------------------------
const SignUp = (props) => {
  return (
    <div>
      <h1>Create a DEV@DEAKIN Account</h1>
      <form className="LargerSignUp">
        <div className="SignUpField">
          <label>First Name:</label>
          <TextBar
            name="firstName"
            type="textBox"
            Handler={props.handleChange}
          />
        </div>
        <div className="SignUpField">
          <label>Last Name:</label>
          <TextBar
            name="lastName"
            type="textBox"
            Handler={props.handleChange}
          />
        </div>
        <div className="SignUpField">
          <label>Email:</label>
          <TextBar
            placeholder="example@email.com"
            name="email"
            default={props.InEmail}
            type="email"
            Handler={props.handleChange}
          />
        </div>
        <div className="SignUpField">
          <label>Password:</label>
          <TextBar
            name="password"
            placeholder="Password"
            type="password"
            Handler={props.handleChange}
          />
        </div>
        <div className="SignUpField">
          <label>Confirm Password:</label>
          <TextBar
            name="confirmPassword"
            placeholder="Password"
            type="password"
            Handler={props.handleChange}
          />
        </div>
        <button className="HollowButton LoginButtonPadding" onClick={props.handleSubmit}> Login </button>
      </form>
    </div>
  );
};
// -----------------------------------------------------------------------
// to stop bloat
const TextBar = (props) => {
  return (
    <input
      className="StretchText"
      name={props.name}
      placeholder={props.placeholder ? props.placeholder : null}
      defaultValue={props.default ? props.default : null}
      type={props.type ? props.type : "textbox"}
      autoComplete={props.autoC}
      onInput={props.Handler ? props.Handler : null}
    ></input>
  );
};

export default LoginPage;
