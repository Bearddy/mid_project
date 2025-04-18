import '../App.css';
import { useState } from 'react';

import firebase from '../config';


  

    

function Account_util(props){
    const { isSignIn, userData, setShowSignInPopUp, setShowSignUpPopUp, showMyProfile, setShowMyProfile, clear_all_state } = props;
    return (
    isSignIn ? 
    <div className="account_util">
        <button className="user_name" onClick={ profile_event }>{userData.name}</button>
        <button className="sign_out_btn" onClick={ sign_out_event }>Sign out</button>
    </div>
    :
    <div className="account_util">
        <button className="sign_in_btn" onClick={sign_in_event}>Sign in</button>
        <button className="sign_up_btn" onClick={sign_up_event}>Sign up</button>
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

    function profile_event(){
        // console.log("clicked");
        if(showMyProfile == true){
            setShowMyProfile(false);
        }
        else{
            setShowMyProfile(true);
        }
    }

    function sign_out_event() {
        firebase.auth().signOut().then(() => {
            console.log("User signed out");
            clear_all_state();
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    }
}

export default Account_util;