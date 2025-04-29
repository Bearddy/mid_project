

import '../App.css';
import { useState } from 'react';

import firebase from '../config';




function Sign_in_pop_up(props){
  const { showSignInPopUp, setShowSignInPopUp, setIsSignIn, create_custom_alert } = props;
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  

    return (
      !showSignInPopUp ? <div></div> :
      <div className="sign_in_pop_up-container" onKeyDown={ (e) => { 
        if(e.key === "Enter"){
          emailLogin();
        }
        else if(e.key === "Escape"){
          setShowSignInPopUp(false);
          setEmail("");
          setPassword("");
        }
        }}>
        <div className="sign_in_pop_up">
          <h1 className="sign_in_header">Sign in</h1>
          <input type="text" className="signin_email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required ></input>
          <input type="password" className="signin_password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required ></input>
          <div className="signin_btns">
            <button className="email_login btn-text" onClick={ emailLogin }>Sign in</button>
            {/* <button className="github_login" onClick={ githubLogin }>Github</button> */}
            <button className="cancel_signin btn-text" onClick={ () => {
              setShowSignInPopUp(false)
              setEmail("");
              setPassword("");
            } }>Cancel</button>
          </div>
          <div className="google_login_container">
            <button className="google_login btn-text" onClick={ googleLogin }>Sign in With Google</button>
            </div>  
          </div>
      </div>
    );


    function googleLogin() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;

          create_custom_alert("notice", 2, "Login success!", "closed after 2 seconds", () => {setShowSignInPopUp(false);setIsSignIn(true);});
            
      }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          create_custom_alert("error", 0, "Error signing in", errorMessage, null);
      });

      setEmail("");
      setPassword("");
    }

    // function githubLogin() {
    //   var provider = new firebase.auth.GithubAuthProvider();
    //   firebase.auth().signInWithPopup(provider).then(function(result) {
    //       var token = result.credential.accessToken;
    //       var user = result.user;
    //       alert("success", "Login success! Redirecting to index.html");
    //       setShowSignInPopUp(false);
    //       setIsSignIn(true);  
    //   }).catch(function(error) {
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //       var email = error.email;
    //       var credential = error.credential;
    //       alert("error", errorMessage);
    //   });
    // }
  
  function emailLogin(){ 
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        create_custom_alert("notice", 2, "Login success!", "closed after 2 seconds", () => {
          setIsSignIn(true);
          setShowSignInPopUp(false);
        });        
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        create_custom_alert("error", 0, "Error signing in", errorMessage, null);
    });
    setEmail("");
    setPassword("");
  }
}


export default Sign_in_pop_up;