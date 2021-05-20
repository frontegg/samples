import logo from "./leaf.png";
import loginVisual from "./img.png";
import "./index.css";
import { useSignUpActions } from "@frontegg/react-hooks";
import { useAuth } from "@frontegg/react";
import React, { useState } from "react";

function App() {
  const { user, isAuthenticated } = useAuth();
  const { signUpUser } = useSignUpActions();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  return (
    <>
      {isAuthenticated && (
        <div>
          <img src={user.profilePictureUrl} alt={user.name} />
          <span>{user.name}</span>
        </div>
      )}
      <div className="flex-row">
        <div className="flex-center">
          <img src={logo} alt="logo" className="logo" />
          <h1>WELCOME</h1>
          <input
            placeholder="Name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            placeholder="Email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <button
            className="submit"
            onClick={() =>
              signUpUser({
                name: userName,
                email: userEmail,
                companyName: "cheli-tenant",
              })
            }
          >
            {" "}
            Sign Up
          </button>
          <hr />
          <div className="center">
            <div>
              <button>Google</button>
              <button>Github</button>
            </div>
            <div>
              <button>Facebook</button>
              <button>Microsoft</button>
            </div>
            <hr />
            <div>Already have an Account?</div>
          </div>
        </div>
        <div className="bg">
          <img src={loginVisual} alt="img" className="visual" />
        </div>
      </div>
    </>
  );
}

export default App;
