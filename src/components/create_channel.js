
import '../App.css';
import { useState } from 'react';

import firebase from '../config';

function Making_channel(props){
    const { userData, setUserData, joinedChannel, setJoinedChannel, showChannelNameInput, setShowChannelNameInput, create_custom_alert } = props;
    const [channelName, setChannelName] = useState('');
    return (
        showChannelNameInput ?
        <div className="create-channel-container" onKeyDown={ e => { 
          if(e.key === "Enter"){
            create_channel();
          }
          else if(e.key === "Escape"){
            cancel_create_channel();
          }
          }}>
          <div className="create-channel">
            <h1 className="create-channel-header">Create Channel</h1>
            <input type="text" placeholder="Channel name" value={ channelName } onChange={ e => setChannelName(e.target.value) }/>
            <div className="create-channel-btns">
              <button onClick={ create_channel } className="btn-text">Create</button>
              <button onClick={ cancel_create_channel } className="btn-text">Cancel</button>
            </div>
          </div>
        </div>
        :
        <></> 
    )


    function create_channel(){
        if(channelName == ""){
          create_custom_alert("error", 0, "Error creating channel", "Please enter a channel name", null);
          return;
        }
        else if(channelName.includes(":") || channelName.includes(",")){
            create_custom_alert("error", 0, "Error Creating Channel", "Don't put \":\" or \",\"", null);
            return;
        }

        //need channel's unqiue key
        const channelId = firebase.database().ref('channels').push().key;
        
        const post_data = { //channel data format
          channel_id: channelId,
          channel_name: channelName,
          created_by: userData.name,
          created_date: new Date().toString(),
          members: userData.uid,
        }


        
        const dbRef = firebase.database().ref('channels/' + channelId); //get data of database
        dbRef.set(post_data)
        .then(() => {
          console.log("Data saved successfully.");
          setJoinedChannel([...joinedChannel, channelId + ":" + channelName]); //I made channel, so I must joined this channel
          setShowChannelNameInput(false);

          // const messages_data = {
          //   sender: "test",
          //   components: "teste",
          //   src: "test",
          //   time: "test",
          // }

          // const messageRef = firebase.database().ref('messages/' + channelId); //get data of database
          // messageRef.once('value').then((snapshot) => {
          //   console.log("messageRef: ", messageRef);
          //   const messageData = snapshot.val();
          //   console.log("messageData: ", messageData);
          //   if(messageData == null){
          //     messageRef.set(messages_data).then(() => {
          //       console.log("Data saved successfully.");
          //     }
          //     ).catch((error) => { 
          //       console.error("Error saving data: ", error);
          //     });
          //   }
          //   else {
          //     messageRef.push(messages_data);
          //   }
          // }).catch((error) => { 
          //   console.error("Error saving data: ", error);
          // });

        })
        .catch((error) => {
          console.error("Error saving data: ", error);
        }); 
    
        const userRef = firebase.database().ref('users/' + userData.uid);
        userRef.once('value').then((snapshot) => {

          const data = snapshot.val();
          if(data != null){
            var channels = data.channels;
            if(channels == ""){ //save new channel in user data
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
                last_login_date: new Date().toString(), //this is useless now
                profile_image: data.profile_image,
                channels: channels,
                current_channel: userData.current_channel,
                showing_email: userData.showing_email,
                phone_number: userData.phone_number,
                address: userData.address,
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
    
        setChannelName('');
      }
    
      
    
      function cancel_create_channel(){
        setShowChannelNameInput(false);
        setChannelName('');
      }
}

export default Making_channel;