import firebase from '../config';

import { useState } from 'react';

function Sign_up_pop_up(props){
    const { showSignUpPopUp, setShowSignUpPopUp, create_custom_alert } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        !showSignUpPopUp ? <div></div> :
        <div className="sign_up_pop_up-container" onKeyDown={ (e) => { 
            if(e.key === "Enter"){
              confirm_signup();
            }
            else if(e.key === "Escape"){
                setShowSignUpPopUp(false);
            }
            }}>
            <div className="sign_up_pop_up">
            <h1>Sign up</h1>
            <input type="text" value={ email } onChange={e => setEmail(e.target.value)} className='signup_email'></input>
            <input type="password" value={ password } onChange={e => setPassword(e.target.value)} className='signup_password'></input>
            <button className="confirm_signup btn-text" onClick={confirm_signup}>Comfirm</button>
            <button className="cancel_signup btn-text" onClick={ () => setShowSignUpPopUp(false) }>Cancel</button>
            </div>
        </div>
    );

    function confirm_signup(){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            
            create_custom_alert("notice", 2, "Sign up success!", "closed after 2 seconds", () => {setShowSignUpPopUp(false);});
            
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            create_custom_alert("error", 0, "Error signing up", errorMessage, null);
        });  
    }


}


export default Sign_up_pop_up;