import logo from './logo.svg';
import './App.css';

import Sign_in_pop_up from "./components/signin";
import Sign_up_pop_up from './components/signup';

import { useState } from "react";

function App() {
  return (
    <div>
      <Home/>
      <Sign_in_pop_up/>
      <Sign_up_pop_up/>
    </div>
  );

}

function sign_in_event(){
  // //remove this button
  // const sign_in_btn = document.querySelector('.sign_in_btn');
  // sign_in_btn.remove();
  // //add sign out button
  // const sign_out_btn = document.createElement('button');
  // sign_out_btn.className = 'sign_out_btn';
  // sign_out_btn.innerHTML = 'Sign out';
  // sign_out_btn.addEventListener('click', function() {
  //   //remove sign out button
  //   sign_out_btn.remove();
  //   //add sign in button
  //   const sign_in_btn = document.createElement('button');
  //   sign_in_btn.className = 'sign_in_btn';
  //   sign_in_btn.innerHTML = 'Sign in';
  //   sign_in_btn.addEventListener('click', sign_in_event);
  //   document.querySelector('.toolbar').appendChild(sign_in_btn);
  // });
  // document.querySelector('.toolbar').appendChild(sign_out_btn);

  const sign_in_pop_up = document.querySelector('.sign_in_pop_up');
  sign_in_pop_up.style.display = 'block';
}

function sign_up_event() {
  const sign_up_pop_up = document.querySelector('.sign_up_pop_up');
  sign_up_pop_up.style.display = 'block';
}

function Home(){
  return (
    <div>
      <div className="toolbar">
        {/* <button>Sign up</button>
        <button className="sign_in_btn" onClick={sign_in_event}>Sign in</button> */}
        <button className="sign_in_btn" onClick={sign_in_event}>Sign in</button>
        <button className="sign_up_btn" onClick={sign_up_event}>Sign up</button>
      </div>
      <div>
        <h1>Please Login to use</h1>
      </div>
    </div>
  );
}





export default App;
