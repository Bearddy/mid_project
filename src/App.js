import { set } from 'firebase/database';
import './App.css';




import Sign_in_pop_up from "./components/signin";
import Sign_up_pop_up from './components/signup';
import My_profile from './components/myprofile';
import firebase from './config';

import { useState, useEffect, useReducer } from "react";




function App() {

  const [userEmail, setUserEmail] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [showSignInPopUp, setShowSignInPopUp] = useState(false);
  const [showSignUpPopUp, setShowSignUpPopUp] = useState(false);
  const [showMyProfile, setShowMyProfile] = useState(false);
  const [userData, setUserData] = useState({});

  const [showChannelNameInput, setShowChannelNameInput] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [joinedChannel, setJoinedChannel] = useState([]);



  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribeAuth = firebase.auth().onAuthStateChanged((user) => {
      if(isSignIn == false) return;
      if(user){
        const uid = user.uid;
        const dbRef = firebase.database().ref('users/' + uid);
        dbRef.once('value').then((snapshot) => {
            const data = snapshot.val();
            if(data == null){
              var post_data = {
                uid: uid,
                name: user.email,
                email: user.email,
                created_date: new Date().toString(),
                last_login_date: new Date().toString(),
                profile_image: "",
                channels: ""
              }; 

              dbRef.set(post_data)
              .then(() => {
                console.log("Data saved successfully.");
              })
              .catch((error) => {
                console.error("Error saving data: ", error);
              });
              setUserData(post_data);
            }
            else {
              setUserData(data);
              console.log("ggdfgdfgd");
              console.log(data);
              // console.log("joined_channel" + data.channels.split(","));
              setJoinedChannel(data.channels.split(","));
            }
            // else {
            //   var post_data = {
            //     name: data.name,
            //     email: data.email,
            //     created_date: data.created_date,
            //     last_login_date: new Date().toString(),
            //     profile_image: data.profile_image
            //   };

            //   dbRef.set(post_data)
            //   .then(() => {
            //     console.log("Data saved successfully.");
            //   })
            //   .catch((error) => {
            //     console.error("Error saving data: ", error);
            //   });
            //   setUserData(post_data);
            // }
        });

        setUserEmail(user.email);
        // setIsSignIn(true);
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
        <Making_channel/>
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
      setUserEmail("");
      setIsSignIn(false);
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  }

  function channel_name_desicion(){
    setShowChannelNameInput(true);
  }

  function create_channel(){
    if(channelName == ""){
      alert("Please enter a channel name");
      return;
    }
    //need channel's unqiue key
    const channelId = firebase.database().ref('channels').push().key;
    
    const post_data = {
      channel_id: channelId,
      channel_name: channelName,
      created_by: userData.name,
      created_date: new Date().toString(),
      members: [userData.uid],
    }
    
    const dbRef = firebase.database().ref('channels/' + channelId);
    dbRef.set(post_data)
    .then(() => {
      console.log("Data saved successfully.");
      setJoinedChannel([...joinedChannel, channelId + ":" + channelName]);
      setShowChannelNameInput(false);

    })
    .catch((error) => {
      console.error("Error saving data: ", error);
    }); 

    const userRef = firebase.database().ref('users/' + userData.uid);
    userRef.once('value').then((snapshot) => {
      const data = snapshot.val();
      if(data != null){
        var channels = data.channels;
        if(channels == ""){
          channels = channelId + ":" + channelName;
        }
        else{
          channels += "," + channelId + ":" + channelName;
        }

        const post_data = {
          uid: userData.uid,
          name: userData.name,
          email: userData.email,
          created_date: data.created_date,
          last_login_date: new Date().toString(),
          profile_image: data.profile_image,
          channels: channels
        };
        
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

  function cancel_create_channel(){
    setShowChannelNameInput(false);
  }
  
  function debug_print(str){
    console.log(str);
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
          <button onClick={ channel_name_desicion }>create chat_channeel</button>
        </div>
        :
        <div>
          <p>PLease Sign in or Sign up</p>
        </div>
      );
    }

    function Making_channel(){
      return (
        showChannelNameInput ?
        <div>
          <input type="text" placeholder="Channel name" value={ channelName } onChange={ e => setChannelName(e.target.value) }/>
          <button onClick={ create_channel }>Create</button>
          <button onClick={ cancel_create_channel }>Cancel</button>
        </div>
        :
        <></> 
      )
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
              <button key={index} onClick={ () => debug_print(channelInfo.split(":")[0]) }>{channelInfo.split(":")[1]}</button>
            ))
          }
        </div>
        :
        <></>
      );

    }

  
}






export default App;
