

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
        }
        }}>
        <div className="sign_in_pop_up">
        <h1>Sign in</h1>
        <input type="text" className="signin_email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} ></input>
        <input type="password" className="signin_password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
        <button className="email_login btn-text" onClick={ emailLogin }>Sign in</button>
        <button className="google_login btn-text" onClick={ googleLogin }>Google</button>
        {/* <button className="github_login" onClick={ githubLogin }>Github</button> */}
        <button className="cancel_signin btn-text" onClick={ () => setShowSignInPopUp(false) }>Cancel</button>
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
  }
}


export default Sign_in_pop_up;