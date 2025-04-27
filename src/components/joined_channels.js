import '../App.css';
import { useState, useEffect, useRef } from 'react';

import firebase from '../config';

function Joined_channels(props){
    const { isSignIn, joinedChannel, userData, setUserData, setUserCurrentChannelId, setShowChannelContent, setMessages, userCurrentChannelId, create_custom_alert } = props;
    const [ channelContent, setChannelContent ] = useState([]);

    // const prevSignInRef = useRef(isSignIn);
    const boxRef = useRef(null);

    // useEffect(() => {
    //   if (!prevSignInRef.current && isSignIn) {
    //     prevSignInRef.current = isSignIn;
    //     return;
    //   }

    //     const box = boxRef.current;
    //     if (box) {
    //         box.scrollTop = box.scrollHeight;
    //     }
        
    //     prevSignInRef.current = isSignIn;
    //   }
    // , [joinedChannel, isSignIn]);

    return(
    isSignIn ? 
    <div className="joined-channels-container" ref={boxRef}>
      <div className="joined-channels">
          {
          joinedChannel.length == 0 ?
          <></>
          :
          joinedChannel.map((channelInfo, index) => (
              <button key={index} onClick={ () => every_channel_event(channelInfo) } onContextMenu={(e) => {
                e.preventDefault(); 
                const channelId = channelInfo.split(":")[0]; 
                console.log("channelId: ", channelId);
                create_custom_alert("confirm", 0, "Channel Id", channelId, null, () => {
                  copy_id(channelId);
                })
              }} >{channelInfo.split(":")[1]}</button>
          ))
          }
      </div>
    </div>
    :
    <></>
    );

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
                showing_email: userData.showing_email,
                phone_number: userData.phone_number,
                address: userData.address,
            };
  
            setUserData(post_data);
            setUserCurrentChannelId(id);
            channel_messages(id);
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

      function channel_messages(id){
        const channelId = id.split(':')[0]; //get current channel id
        const messageRef = firebase.database().ref('messages/' + channelId); //get data of database
        messageRef.once('value').then((snapshot) => {
            const data = snapshot.val();
            if(data != null){
                const messages_data = Object.values(data).map((message) => {
                    return {
                        name: message.username,
                        sender: message.sender,
                        content: message.content,
                        message: message.message,
                        time: message.time,
                        messageId: message.messageId,
                    };
                });
                setMessages(messages_data);
                console.log("messages_data: ", messages_data);
            }
            else{
              setMessages([]);
              console.log("No messages found.");
            }
        });
      }
      
      function copy_id(id){
        navigator.clipboard.writeText(id);
      }
}

export default Joined_channels;