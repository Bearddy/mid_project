
import '../App.css';
import { useState } from 'react';

import firebase from '../config';

function Making_channel(props){
    const { userData, setUserData, joinedChannel, setJoinedChannel, showChannelNameInput, setShowChannelNameInput } = props;
    const [channelName, setChannelName] = useState('');
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


    function create_channel(){
        if(channelName == ""){
          alert("Please enter a channel name");
          return;
        }
        else if(/^[a-zA-Z0-9\s]+$/.test(channelName) == false){
            alert("Please enter a valid channel name");
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
}

export default Making_channel;