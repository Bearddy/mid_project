import { set } from 'firebase/database';
import './App.css';




import Sign_in_pop_up from "./components/signin";
import Sign_up_pop_up from './components/signup';
import My_profile from './components/myprofile';
import Making_channel from './components/create_channel';
import Joining_channel from './components/join_channel';

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
      <Toolbar/>
      <Sign_in_pop_up showSignInPopUp={showSignInPopUp} setShowSignInPopUp={setShowSignInPopUp} setIsSignIn={setIsSignIn}/>
      <Sign_up_pop_up showSignUpPopUp={showSignUpPopUp} setShowSignUpPopUp={setShowSignUpPopUp}/>
      <div className="sidebar">
        <Main_content/>
        <Joined_channels/>
      </div>
      <div className="main_content">
        <My_profile showMyProfile={showMyProfile} setShowMyProfile={setShowMyProfile}/>
        <Making_channel userData={userData} setUserData={setUserData} joinedChannel={joinedChannel} setJoinedChannel={setJoinedChannel} showChannelNameInput={showChannelNameInput} setShowChannelNameInput={setShowChannelNameInput}  />
        <Joining_channel userData={userData} setUserData={setUserData} joinedChannel={joinedChannel} setJoinedChannel={setJoinedChannel} showJoinChannelInput={showJoinChannelInput} setShowJoinChannelInput={setShowJoinChannelInput}/>
      </div>

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
    console.log("clicked");
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
      setUserData({});
      setJoinedChannel([]);
      setShowMyProfile(false);
      setShowChannelNameInput(false);
      setShowJoinChannelInput(false);
      setShowSignInPopUp(false);
      setShowSignUpPopUp(false);
      setShowJoinChannelInput(false);
      setShowChannelNameInput(false);
      setIsSignIn(false);
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  }

  

    function input_channel_id(){
      setShowJoinChannelInput(true);
    }

    function channel_name_desicion(){
      setShowChannelNameInput(true);
    }
 
  function Toolbar(){
    return (
    isSignIn ? 
    <div className="toolbar">
        <button className="user_name" onClick={ profile_event }>{userData.name}</button>
        <button className="sign_out_btn" onClick={ sign_out_event }>Sign out</button>
    </div>
    :
    <div className="toolbar">
        <button className="sign_in_btn" onClick={sign_in_event}>Sign in</button>
        <button className="sign_up_btn" onClick={sign_up_event}>Sign up</button>
    </div>
    );
}

    function Main_content() {
        return (
        isSignIn ?
        <div>
            <button onClick={ channel_name_desicion }>create chat_channel</button>
            <button onClick={ input_channel_id }>join chat_channel</button>
        </div>
        :
        <div>
            <p>PLease Sign in or Sign up</p>
        </div>
        );
    }
  

    function Joined_channels(){
      return(
        isSignIn ? 
        <div>
          {
            joinedChannel.length == 0 ?
            <p>Try to Create Channels!</p>
            :
            joinedChannel.map((channelInfo, index) => (
              <button key={index} onClick={ () => every_channel_event(channelInfo) }>{channelInfo.split(":")[1]}</button>
            ))
          }
        </div>
        :
        <></>
      );

    }

    function every_channel_event(id){
      console.log(id);
      setShowChannelContent(true);
      const userRef = firebase.database().ref('users/' + userData.uid);
      userRef.once('value').then((snapshot) => {
        const data = snapshot.val();
        if(data != null){
 
          const post_data = {
              uid: userData.uid,
              name: userData.name,
              email: userData.email,
              created_date: data.created_date,
              last_login_date: new Date().toString(),
              profile_image: data.profile_image,
              channels: userData.channels,
              current_channel: id,
          };

          setUserData(post_data);
          setUserCurrentChannelId(id);
          
          userRef.set(post_data)
          .then(() => {
            console.log("Data saved successfully.");
            setUserData(post_data);
          })
          .catch((error) => {
            console.error("Error saving data: ", error);
          });
        }
      });

    }


  
}






export default App;
