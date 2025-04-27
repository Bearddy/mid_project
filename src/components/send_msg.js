import '../App.css';
import { useState, useRef } from 'react';

import firebase from '../config';


function Send_message(props){
    const { userData, showChannelContent, isSignIn, create_custom_alert } = props;

    const fileInputRef = useRef(null);
    const [message, setMessage] = useState('');

    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState("");

    const storage = firebase.storage();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        console.log(file);
        const ext = file.name.split('.').pop().toLowerCase();
        const picture_ext = ['jpg', 'jpeg', 'png', 'gif'];
        const video_ext = ['mp4', 'avi', 'mov', 'wmv'];
        if (picture_ext.indexOf(ext) === -1 && video_ext.indexOf(ext) === -1) {
            create_custom_alert("error", 0, "File type not supported", "Please upload a picture or video file", null);
            return;
        }
    
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
                if(picture_ext.includes(ext)){
                    send_picture(url);
                }
                else if(video_ext.includes(ext)){
                    send_video(url);
                }
            });

          }
        );
      };
    

    return(
        showChannelContent ? 
        <div className="send-messages">
            <button
                type="button"
                className="send-pic-btn btn-text"
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
            <button onClick={ send_message } className="send-btn btn-icon">
                <img src={require('../images/send.png')} alt="send" className="send-icon" />
            </button>


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
        let message_data = {};
        message_data = {
            username: userData.name,
            sender: userData.uid,
            content: "picture",
            message: url,
            time: new Date().toString(),
        }

        const messageRef = firebase.database().ref('messages/' + channelId); //get data of database
        const messageId = messageRef.push().key; //get message id
        const messageRefId = firebase.database().ref('messages/' + channelId + '/' + messageId); //get data of database
        message_data.messageId = messageId; //add message id to message data
        messageRefId.set(message_data)
        .then(() => {
            console.log("Message sent successfully.");
        })
        .catch((error) => {
            console.error("Error sending message: ", error);
        });

        setDownloadURL(''); //clear input field
    }

    function send_video(url){
        if(url == ""){
            return;
        }

        const channelId = userData.current_channel.split(':')[0]; //get current channel id
        let message_data = {};
        message_data = {
            username: userData.name,
            sender: userData.uid,
            content: "video",
            message: url,
            time: new Date().toString(),
        }

        const messageRef = firebase.database().ref('messages/' + channelId); //get data of database
        const messageId = messageRef.push().key; //get message id
        const messageRefId = firebase.database().ref('messages/' + channelId + '/' + messageId); //get data of database
        message_data.messageId = messageId; //add message id to message data
        messageRefId.set(message_data)
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
        let message_data = {};

        if(message[0] == "h" && message[1] == "t" && message[2] == "t" && message[3] == "p" && message[4] == "s" && message[5] == ":" && message[6] == "/" && message[7] == "/"){
            message_data = {
                username: userData.name,
                sender: userData.uid,
                content: "link",
                message: message,
                time: new Date().toString(),
            }
        }
        else{
            message_data = {
                username: userData.name,
                sender: userData.uid,
                content: "message",
                message: message,
                time: new Date().toString(),
            }
        }



        const messageRef = firebase.database().ref('messages/' + channelId); //get data of database
        const messageId = messageRef.push().key; //get message id
        const messageRefId = firebase.database().ref('messages/' + channelId + '/' + messageId); //get data of database
        message_data.messageId = messageId; //add message id to message data
        messageRefId.set(message_data)
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