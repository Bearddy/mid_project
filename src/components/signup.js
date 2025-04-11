

function Sign_up_pop_up(){
    return (
        <div className="sign_up_pop_up">
            <h1>Sign up</h1>
            <input type="text"></input>
            <input type="password"></input>
            <button className="confirm_signup" onClick={confirm_signup}>Comfirm</button>
        </div>
    );
}

function confirm_signup(){
    const sign_up_pop_up = document.querySelector('.sign_up_pop_up');
    sign_up_pop_up.style.display = 'none';
}

export default Sign_up_pop_up;