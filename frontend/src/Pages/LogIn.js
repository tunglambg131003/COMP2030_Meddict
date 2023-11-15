import Google from "../Assets/google.png";
import Facebook from "../Assets/facebook.png";
import Github from "../Assets/github.png";
import "../Styles/LogIn.css"
import VinUniLogo from "../Assets/favicon.png"

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
  <div className = 'login-section'>
    <div class="main">
    <img src = {VinUniLogo} class = "VinUniLogo"/>
        <form action="">
            <div class="textbox">
                <input type="text" placeholder="UserName" required/>
                <i class='bx bxs-user'></i>
            </div>
            <div class="textbox">
                <input type="password" placeholder="Password" required/>
                <i class='bx bxs-lock-alt'></i>
            </div>

            <button class="button" type="submit"> LOGIN</button>
            
        </form>
        <div class="txt1 text-center p-t-54 p-b-20">
        <span>
         OR  USING
        </span>
        </div>
        <div className="flex-c-m">
          <a  className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
          </a>
          <a className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
          </a>
          <a className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
          </a>
        </div>
    </div>
    </div>
  );
};

export default Login;
