import { set } from 'firebase/database';
import './App.css';




import Sign_in_pop_up from "./components/signin";
import Sign_up_pop_up from './components/signup';
import My_profile from './components/myprofile';
import Making_channel from './components/create_channel';
import Joining_channel from './components/join_channel';
import Channel_utils from './components/channel_util';
import Joined_channels from './components/joined_channels';
import Account_util from './components/account_util';
import Send_message from './components/send_msg';
import Channel_messages from './components/show_msg';

import firebase from './config';

import { useState, useEffect } from "react";





function App() {

  const [isSignIn, setIsSignIn] = useState(false);
  const [showSignInPopUp, setShowSignInPopUp] = useState(false);
  const [showSignUpPopUp, setShowSignUpPopUp] = useState(false);
  const [showMyProfile, setShowMyProfile] = useState(false);
  const [userData, setUserData] = useState({});

  const [showChannelNameInput, setShowChannelNameInput] = useState(false);
  const [joinedChannel, setJoinedChannel] = useState([]);
  const [showJoinChannelInput , setShowJoinChannelInput] = useState(false);
  const [userCurrentChannelId, setUserCurrentChannelId] = useState("");
  const [showChannelContent, setShowChannelContent] = useState(false);
  const [ messages, setMessages ] = useState([]);


  useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged((user) => {
      if(isSignIn == false) return;
      if(user){
        const uid = user.uid; //get firebase user uid
        const dbRef = firebase.database().ref('users/' + uid);
        dbRef.once('value').then((snapshot) => {
            const data = snapshot.val();
            if(data == null){
              
              var post_data = {   //register new user
                uid: uid,
                name: user.email,
                email: user.email,
                created_date: new Date().toString(),
                last_login_date: new Date().toString(),
                profile_image: "",
                channels: "",
                current_channel: "",
              }; 
              
              setUserData(post_data); //saves in state to use

              dbRef.set(post_data)
              .then(() => {
                console.log("Data saved successfully.");
              })
              .catch((error) => {
                console.error("Error saving data: ", error);
              });
            }
            else {
              setUserData(data); //saves in state to use 

              if(data.channels == null || data.channels == ""){ //get joined channels
                setJoinedChannel([]);
              }
              else{
                setJoinedChannel(data.channels.split(","));
              }
            }
        });
        
      }
    });

    
    return () => {
      unsubscribeAuth();
    };
  }, [isSignIn]);
  
  return (
    <div>
      <Sign_in_pop_up showSignInPopUp={showSignInPopUp} setShowSignInPopUp={setShowSignInPopUp} setIsSignIn={setIsSignIn}/>
      <Sign_up_pop_up showSignUpPopUp={showSignUpPopUp} setShowSignUpPopUp={setShowSignUpPopUp}/>
      <My_profile showMyProfile={showMyProfile} setShowMyProfile={setShowMyProfile} userData={userData} setUserData={setUserData}/>
      <Making_channel userData={userData} setUserData={setUserData} joinedChannel={joinedChannel} setJoinedChannel={setJoinedChannel} showChannelNameInput={showChannelNameInput} setShowChannelNameInput={setShowChannelNameInput}  />
      <Joining_channel userData={userData} setUserData={setUserData} joinedChannel={joinedChannel} setJoinedChannel={setJoinedChannel} showJoinChannelInput={showJoinChannelInput} setShowJoinChannelInput={setShowJoinChannelInput}/>
      <div className="toolbar">
        <Account_util isSignIn={isSignIn} userData={userData} setShowSignInPopUp={setShowSignInPopUp} setShowSignUpPopUp={setShowSignUpPopUp} showMyProfile={showMyProfile} setShowMyProfile={setShowMyProfile} clear_all_state={clear_all_state} />
        <Channel_utils isSignIn={isSignIn} setShowJoinChannelInput={setShowJoinChannelInput} setShowChannelNameInput={setShowChannelNameInput}/>
      </div>
      <div className="sidebar">
        <Joined_channels isSignIn={isSignIn} joinedChannel={joinedChannel} userData={userData} setUserData={setUserData} setUserCurrentChannelId={setUserCurrentChannelId} setShowChannelContent={setShowChannelContent} setMessages={setMessages} userCurrentChannelId={userCurrentChannelId}/>
      </div>
      <div className="main_content">
        <Channel_messages userData={userData} showChannelContent={showChannelContent} isSignIn={isSignIn} messages={messages} setMessages={setMessages} />
        <Send_message userData={userData} showChannelContent={showChannelContent} isSignIn={isSignIn} />
      </div>

    </div>
  );


  function clear_all_state(){
    setUserData({});
    setJoinedChannel([]);
    setShowMyProfile(false);
    setShowChannelNameInput(false);
    setShowJoinChannelInput(false);
    setShowSignInPopUp(false);
    setShowSignUpPopUp(false);
    setShowJoinChannelInput(false);
    setShowChannelNameInput(false);
    setUserCurrentChannelId("");
    setIsSignIn(false);
    setShowChannelContent(false);
    setMessages([]);
  }
  
}






export default App;
