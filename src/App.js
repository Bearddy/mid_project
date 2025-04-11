import { set } from 'firebase/database';
import './App.css';




import Sign_in_pop_up from "./components/signin";
import Sign_up_pop_up from './components/signup';
import firebase from './config';

import { useState, useEffect, useReducer } from "react";




function App() {

  const [userEmail, setUserEmail] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [showSignInPopUp, setShowSignInPopUp] = useState(false);
  const [showSignUpPopUp, setShowSignUpPopUp] = useState(false);



  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribeAuth = firebase.auth().onAuthStateChanged((user) => {
      if(user){
        setUserEmail(user.email);
        setIsSignIn(true);
      }
    });

    
    return () => {
      unsubscribeAuth();
    };
  });
  
  return (
    <div>
      <Toolbar/>
      <Sign_in_pop_up showSignInPopUp={showSignInPopUp} setShowSignInPopUp={setShowSignInPopUp} setIsSignIn={setIsSignIn}/>
      <Sign_up_pop_up showSignUpPopUp={showSignUpPopUp} setShowSignUpPopUp={setShowSignUpPopUp}/>
    </div>
  );

  function sign_in_event(){
    setShowSignInPopUp(true);
    setShowSignUpPopUp(false);
  }
  
  function sign_up_event() {
    setShowSignUpPopUp(true);
    setShowSignInPopUp(false);
  }

  function sign_out_event() {
    firebase.auth().signOut().then(() => {
      console.log("User signed out");
      setUserEmail("");
      setIsSignIn(false);
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  }
  
  

    function Toolbar(){
      return (
        isSignIn ? 
        <div className="toolbar">
            <h className="user_email">{userEmail}</h>
            <button className="sign_out_btn" onClick={ sign_out_event }>Sign out</button>
        </div>
        :
        <div className="toolbar">
          <button className="sign_in_btn" onClick={sign_in_event}>Sign in</button>
          <button className="sign_up_btn" onClick={sign_up_event}>Sign up</button>
        </div>
      );
  }

  
}






export default App;
