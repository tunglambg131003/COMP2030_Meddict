
import "../Styles/LogIn.css"
import VinUniLogo from "../Assets/favicon.png"
import {GoogleSignInButton, FacebookLoginBtn, GitHubLoginButton} from "../Components/LogInMethod";

const Login = () => {
  return (
  <div className = 'login-section'>
    <div class="main">
    <img src = {VinUniLogo} alt = "VinUniLogo" class = "VinUniLogo"/>
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
          <GoogleSignInButton/>
          <FacebookLoginBtn/>
          <GitHubLoginButton/>
        </div>
    </div>
    </div>
  );
};

export default Login;