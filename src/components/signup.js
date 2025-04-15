import firebase from '../config';

import { useState } from 'react';

function Sign_up_pop_up(props){
    const { showSignUpPopUp, setShowSignUpPopUp } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        !showSignUpPopUp ? <div></div> :
        <div className="sign_up_pop_up">
            <h1>Sign up</h1>
            <input type="text" value={ email } onChange={e => setEmail(e.target.value)}></input>
            <input type="password" value={ password } onChange={e => setPassword(e.target.value)}></input>
            <button className="confirm_signup" onClick={confirm_signup}>Comfirm</button>
        </div>
    );

    function confirm_signup(){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            
            alert("success");
            
            setShowSignUpPopUp(false); 
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });  
    }


}


export default Sign_up_pop_up;