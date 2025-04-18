import '../App.css';
import { useState, useEffect, useRef } from 'react';

import firebase from '../config';

function Channel_messages(props){
    const {userData, showChannelContent, isSignIn, messages, setMessages, setShowOtherData, setOtherData, setShowMyProfile} = props;
    const boxRef = useRef(null);
    
    useEffect(() => {

    
        if (isSignIn && showChannelContent) {
        const messageRef = firebase
            .database()
            .ref(`messages/${userData.current_channel.split(':')[0]}`);
    
        setMessages([]);
    
        const onChildAdded = messageRef.on('child_added', snapshot => {
            
            const msg = snapshot.val();

            setMessages(prev => [...prev, {
                name: msg.username,
                sender: msg.sender,
                content: msg.content,
                message: msg.message,
                time: msg.time,
            }]);

            console.log("msg: ", msg);

        });
    
        // cleanup when channel closes or user switches
        return () => {
            messageRef.off('child_added', onChildAdded);
        };
        }
    }, [isSignIn, showChannelContent, userData.current_channel]);
    
    useEffect(() => {
        const box = boxRef.current;
        if (box) {
            box.scrollTop = box.scrollHeight;
        }
    }, [messages]);

    
    function show_other_data(uid){
        setShowOtherData(true);
        const userRef = firebase.database().ref('users/' + uid);
        userRef.once('value').then((snapshot) => {
            const data = snapshot.val();
            if(data != null){
                const post_data = {
                    uid: data.uid,
                    name: data.name,
                    email: data.email,
                    created_date: data.created_date,
                    last_login_date: new Date().toString(),
                    profile_image: data.profile_image,
                    channels: data.channels,
                    current_channel: data.current_channel,
                }
                setOtherData(post_data);

                console.log("other user data: ", post_data);
            }
            else{
                console.log("No data found.");
            }
        });
    }

    return (
        showChannelContent ? 
        <div className="channel-messages" ref={boxRef}>
            {
                messages.map((message, index) => {
                    if(message.sender == userData.uid){
                        return (
                            <div key={index} className="message mine">
                                <div className="message-header">
                                    <span className="message-username" onClick={() => {setShowMyProfile(true)}}>{message.name}</span>
                                    <span> | </span>
                                    <span className="message-timestamp">{message.time}</span>
                                </div>
                                <div className="message-content">{message.message}</div>
                                <br></br>
                            </div>
                        )
                    }
                    else{
                        return (
                            <div key={index} className="message">
                                <div className="message-header">
                                    <span className="message-username" onClick={() => {show_other_data(message.sender)}}>{message.name}</span>
                                    <span> | </span>
                                    <span className="message-timestamp">{message.time}</span>
                                </div>
                                <div className="message-content">{message.message}</div>
                                <br></br>
                            </div>
                        )
                    }
                })
            }

        </div>
        :
        <></>
    )


}

export default Channel_messages;