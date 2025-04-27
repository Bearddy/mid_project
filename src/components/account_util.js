import '../App.css';
import { useState } from 'react';

import firebase from '../config';


  

    

function Account_util(props){
    const { isSignIn, userData, setShowSignInPopUp, setShowSignUpPopUp, showMyProfile, setShowMyProfile, clear_all_state } = props;
    return (
    isSignIn ? 
    <div className="account_util">
        {/* <div className="toolbar-profile-image-container">
            <img src={userData.profile_image} className="toolbar-profile-image" alt="profile" onClick={profile_event}></img>
        </div> */}
        <button className="my_profile_img_btn btn-text" onClick={ profile_event }>
            <img src={require('../images/my_profile.png')} alt="my_profile" className="my_profile_icon" />
        </button>
        <button className="sign_out_btn btn-text" onClick={ sign_out_event }>
            <img src={require('../images/sign_out.png')} alt="sign_out" className="sign_out_icon" />
        </button>
    </div>
    :
    <div className="account_util">
        <button className="sign_in_btn btn-text" onClick={sign_in_event}>
            <img src={require('../images/sign_in.png')} alt="sign_in" className="sign_in_icon" />
        </button>
        <button className="sign_up_btn btn-text" onClick={sign_up_event}>
            <img src={require('../images/sign_up.png')} alt="sign_up" className="sign_up_icon" />
        </button>
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