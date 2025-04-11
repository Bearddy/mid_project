

import '../App.css';
import firebase from 'firebase/app';
import 'firebase/auth';





// function googleLogin() {
//     var provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider).then(function(result) {
//         var token = result.credential.accessToken;
//         var user = result.user;
//         alert("success", "Login success! Redirecting to index.html");
//         setTimeout(function() {
//             window.location.href = "index.html";
//         }, 1000); 

//     }).catch(function(error) {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         var email = error.email;
//         var credential = error.credential;
//         alert("error", errorMessage);
//     });
// }

function Sign_in_pop_up(){
    return (
      <div className="sign_in_pop_up">
        <h1>Sign in</h1>
        <input type="text" placeholder="Email"></input>
        <input type="password" placeholder="Password"></input>
        <button className="confirm_signin" onClick={ confirm_signin_btn }>Sign in</button>
        <button className="google_login">Google</button>
      </div>
    );
}

function confirm_signin_btn(){
    const sign_in_pop_up = document.querySelector('.sign_in_pop_up');
    sign_in_pop_up.style.display = 'none';
}

export default Sign_in_pop_up;