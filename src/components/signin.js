

import '../App.css';
import { useState } from 'react';

import firebase from '../config';




function Sign_in_pop_up(props){
  const { showSignInPopUp, setShowSignInPopUp, setIsSignIn } = props;
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  

    return (
      !showSignInPopUp ? <div></div> :
      <div className="sign_in_pop_up">
        <h1>Sign in</h1>
        <input type="text" className=".signin_email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}></input>
        <input type="password" className=".signin_password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
        <button className="email_login" onClick={ emailLogin }>Sign in</button>
        <button className="google_login" onClick={ googleLogin }>Google</button>
        <button className="github_login" onClick={ githubLogin }>Github</button>
      </div>
    );


    function googleLogin() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          alert("success", "Login success! Redirecting to index.html");
          setShowSignInPopUp(false);
          setIsSignIn(true);  
      }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          alert("error", errorMessage);
      });
    }

    function githubLogin() {
      var provider = new firebase.auth.GithubAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          alert("success", "Login success! Redirecting to index.html");
          setShowSignInPopUp(false);
          setIsSignIn(true);  
      }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          alert("error", errorMessage);
      });
    }
  
  function emailLogin(){ 
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        alert("success", "Login success! Redirecting to index.html");
        setShowSignInPopUp(false);
        setIsSignIn(true);
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("error", errorMessage);
    });
  }
}


export default Sign_in_pop_up;