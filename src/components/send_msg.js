import '../App.css';
import { useState } from 'react';

import firebase from '../config';

function Send_message(props){
    const { userData, showChannelContent, isSignIn } = props;
    const [message, setMessage] = useState('');

    return(
        showChannelContent ? 
        <div className="send-messages">
            <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={ send_message }>Send</button>
        </div>
        :
        <></>
    )

    function send_message(){    
        if(message == ""){
            return;
        }

        const channelId = userData.current_channel.split(':')[0]; //get current channel id
        const message_data = {
            username: userData.name,
            sender: userData.uid,
            content: "message",
            message: message,
            time: new Date().toString(),
        }

        const messageRef = firebase.database().ref('messages/' + channelId); //get data of database
        messageRef.push(message_data)
        .then(() => {
            console.log("Message sent successfully.");
        })
        .catch((error) => {
            console.error("Error sending message: ", error);
        });

        setMessage(''); //clear input field

    }
}

export default Send_message;