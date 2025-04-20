
import '../App.css';
import { useState } from 'react';

import firebase from '../config';
import { reauthenticateWithCredential } from 'firebase/auth';

    

function Joining_channel(props){
    const { userData, setUserData, joinedChannel, setJoinedChannel, showJoinChannelInput, setShowJoinChannelInput, create_custom_alert } = props;
    const [inputChannelId, setInputChannelId] = useState('');
    return(
    showJoinChannelInput ?
    <div className="join-channel-container">
      <div className="join-channel">
        <input type="text" placeholder="Channel id" value={ inputChannelId } onChange={ e => setInputChannelId(e.target.value) } onKeyDown={
          (e) => { 
            if(e.key === "Enter"){
              join_channel();
            }
            else if(e.key === "Escape"){
              cancel_join_channel();
            }
        }}/>
        <button onClick={ join_channel }>Join</button>
        <button onClick={ cancel_join_channel }>Cancel</button>
      </div>
    </div>
    :
    <></>
    )

    function join_channel(){
        if(inputChannelId == ""){
          console.log("joined channel id: ", joinedChannel); 
          create_custom_alert("error", 0, "Please enter a channel id", "Error joining channel", null);
          return;
        }

        //already joined this channel

        for(let channels of joinedChannel){
          if(channels.split(":")[0] == inputChannelId){
            create_custom_alert("error", 0, "You already joined this channel", "Error joining channel", null);
            return;
          }
        }

        

        const dbRef = firebase.database().ref('channels/' + inputChannelId); //get data
        dbRef.once('value').then((snapshot) => {
          const data = snapshot.val();
          if(data != null){
            var members = data.members; //save new user to members data
            if(members == ""){ 
              members = userData.uid;
            }
            else{
              members += "," + userData.uid;
            }
    
    
            const channel_data = {
              channel_id: data.channel_id,
              channel_name: data.channel_name,
              created_by: data.created_by,
              created_date: data.created_date,
              members: members,
            }
    
            const channelId = data.channel_id;
            const channelDbRef = firebase.database().ref('channels/' + channelId);
    
            channelDbRef.set(channel_data)
            .then(() => {
              console.log("Data saved successfully.");
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });



            var channels = userData.channels; //update user joined channel data
            if(channels == ""){
              channels = inputChannelId + ":" + data.channel_name;
            }
            else{
              channels += "," + inputChannelId + ":" + data.channel_name;
            }
    
    
            const post_data = {
                uid: userData.uid,
                name: userData.name,
                email: userData.email,
                created_date: userData.created_date,
                last_login_date: new Date().toString(),
                profile_image: userData.profile_image,
                channels: channels,
                current_channel: userData.current_channel,
            };
    
            const userRef = firebase.database().ref('users/' + userData.uid);
            userRef.set(post_data)
            .then(() => {
              console.log("Data saved successfully.");
              setUserData(post_data);
              setJoinedChannel([...joinedChannel, inputChannelId + ":" + data.channel_name]);
              setShowJoinChannelInput(false);
            })
            .catch((error) => {
              console.error("Error saving data: ", error);
            });
          }
          else{
            create_custom_alert("error", 0, "Channel not found", "Error joining channel", null);
          }
        })
        .catch((error) => {
          console.error("Error getting data: ", error);
        });
        
      }
    
      
    
      function cancel_join_channel(){
        setShowJoinChannelInput(false);
      }

      
      
     
     
    
      
      
      
    
    
}

export default Joining_channel;