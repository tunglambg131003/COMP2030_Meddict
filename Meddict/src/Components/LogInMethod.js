// CustomGoogleSignInButton.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import Google from "../Assets/google.png";
import Facebook from "../Assets/facebook.png"
import "../Styles/LogIn.css"
import Github from "../Assets/github.png";

export const GoogleSignInButton = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  const renderCustomButton = ({ onClick }) => (
    <div className="loginButton google" onClick={onClick} role="button" tabIndex="0">
    <img src={Google} alt="Google" className="icon" />
  </div>
  );

  return (
    <div>
      <GoogleLogin
        clientId="112849667324-ioj14f279ovfr3p0uc5fbk7lenrkklu6.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        render={renderCustomButton}
      />
    </div>
  );
};

export const FacebookLoginBtn = () => {
    const responseFacebook = (response) => {
      console.log(response);
      // Handle the response from Facebook Sign-In
    };
  
    const handleClick = () => {
      // Trigger the Facebook login process
      window.FB.login(responseFacebook, { scope: 'public_profile,email', auth_type: 'rerequest' });
    };
  
    return (
      <div className="loginButton facebook" onClick={handleClick} role="button" tabIndex="0">
        <img src={Facebook} alt="Facebook" className="icon" />
      </div>
    );
  };

  
export const GitHubLoginButton = () => {
    const handleLogin = () => {
      // Replace with your GitHub App Client ID and Authorization Callback URL
      const clientId = 'YOUR_GITHUB_CLIENT_ID';
      const redirectUri = 'YOUR_AUTHORIZATION_CALLBACK_URL';
  
      // GitHub OAuth Authorization URL
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
  
      // Redirect the user to the GitHub OAuth Authorization URL
      window.open.href = authUrl;
    };
  
    return (
      <div>
        < div className="loginButton github" onClick={handleLogin} role="button" tabIndex="0">
            <img src={Github} alt="" className="icon" />
          </div >
      </div>
    );
    }



