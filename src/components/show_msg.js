import '../App.css';
import { useState, useEffect, useRef } from 'react';

import firebase from '../config';

function Channel_messages(props){
    const {userData, showChannelContent, isSignIn, messages, setMessages} = props;
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


    return (
        showChannelContent ? 
        <div className="channel-messages" ref={boxRef}>
            {
                messages.map((message, index) => {
                    return (
                        <div key={index} className="message">
                            <div className="message-header">
                                <span className="message-username">{message.name}</span>
                                <span> | </span>
                                <span className="message-timestamp">{message.time}</span>
                            </div>
                            <div className="message-content">{message.message}</div>
                            <br></br>
                        </div>
                    )
                })
            }

        </div>
        :
        <></>
    )


}

export default Channel_messages;