import Google from "../Assets/google.png";
import Facebook from "../Assets/facebook.png";
import Github from "../Assets/github.png";
import "../Styles/LogIn.css"

const Login = () => {
  const google = () => {
    window.open("http://localhost:3000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:3000/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:3000/auth/facebook", "_self");
  };

  return (
    <div className = "Layout">
    <div className="login">
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input type="text" placeholder="Username" required/>
          <input type="password" placeholder="Password" required/>
          <button className="submit" type = "submit" onclick = "">Login</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;