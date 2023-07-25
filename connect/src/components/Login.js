import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
const Login = () => {
  const [dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login_container">
      <div className="login">
        <h1>CONNECT VIA CHAT</h1>
        <button className="signin" type="submit" onClick={signIn}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
export default Login;
