import '../App.css';
import { useState, useRef } from 'react';

import firebase from '../config';


function Send_message(props){
    const { userData, showChannelContent, isSignIn } = props;

    const fileInputRef = useRef(null);
    const [message, setMessage] = useState('');

    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState("");

    const storage = firebase.storage();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        // 1) Create a reference to 'uploads/your‑filename'
        const uploadRef = storage.ref(`uploads/${file.name}`);
    
        // 2) Start the upload
        const uploadTask = uploadRef.put(file);
    
        // 3) Listen for state changes, errors, and completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // calculate & show progress
            const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(Math.round(pct));
          },
          (error) => {
            console.error("Upload failed:", error);
          },
          () => {
            // completed successfully → get the download URL
            uploadRef.getDownloadURL().then((url) => {
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                setDownloadURL(url);
                send_picture(url);
            });

          }
        );
      };
    

    return(
        showChannelContent ? 
        <div className="send-messages">
            <button
                type="button"
                className="send-pic-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={progress > 0 && progress < 100}
            >
            +
            </button>
     
            <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    send_message();
                }
            }} />
            <button onClick={ send_message }>Send</button>


            <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </div>
        :
        <></>
    )

    
    function send_picture(url){
        if(url == ""){
            return;
        }

        const channelId = userData.current_channel.split(':')[0]; //get current channel id
        const message_data = {
            username: userData.name,
            sender: userData.uid,
            content: "picture",
            message: url,
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

        setDownloadURL(''); //clear input field
    }

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