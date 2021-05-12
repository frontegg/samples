import logo from "./leaf.png";
import loginVisual from "./img.png";
import "./index.css";


function App() {
  return (
    <>
      <div className="flex-row">
      <div className="flex-center">
          <img src={logo} alt="logo" className="logo" />
          <h1>WELCOME</h1>
          <input placeholder="Username" />
          <input placeholder="Password" />
          <a href='' >Forgot Password?</a>
          <button className="submit">Submit</button>
          <hr/>
          <div className="center">
            <div>
          <button>Google</button>
          <button>Github</button>
            </div>
            <div>
          <button>Facebook</button>
          <button>Microsoft</button>
            </div>
          <hr/>
          <a href='' >Create an Account</a>
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
