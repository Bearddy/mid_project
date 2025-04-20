import '../App.css';
import { useState, useEffect, useRef } from 'react';

import firebase from '../config';

function Channel_messages(props){
    const {userData, showChannelContent, isSignIn, messages, setMessages, setShowOtherData, setOtherData, setShowMyProfile} = props;
    const boxRef = useRef(null);
    const [avatarMap, setAvatarMap] = useState({});
    const [names, setNames] = useState({});

    const DEFAULT_AVATAR = "https://firebasestorage.googleapis.com/v0/b/ss-mid-912fd.firebasestorage.app/o/uploads%2Fquestion-mark-2061539_1280.png?alt=media&token=43836751-1267-4e95-9ca9-d333ca9c20dd";
    
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

            // console.log("msg: ", msg);

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
        

        // find the unique set of UIDs in the current messages
        const uids = Array.from(new Set(messages.map(m => m.sender)));

        // we'll collect cleanup functions here
        const offFns = [];

        uids.forEach(uid => {
            const ref = firebase.database().ref(`users/${uid}`);
            // callback runs immediately with current data, AND whenever it changes:
            const cb = snap => {
            const data = snap.val() || {};
            setAvatarMap(m => ({
                ...m,
                [uid]: data.profile_image || DEFAULT_AVATAR
            }));
            setNames(m => ({
                ...m,
                [uid]: data.name || m[uid] || "Unknown"
            }));
            };

            // attach the real-time listener
            ref.on("value", cb);
            // schedule its removal
            offFns.push(() => ref.off("value", cb));
        });

        // cleanup whenever `messages` changes (or component unmounts)
        return () => offFns.forEach(fn => fn());
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


                messages.map((m, i) => {
                    const isMine = m.sender === userData.uid;
                    const avatarUrl = avatarMap[m.sender] || DEFAULT_AVATAR;
                    const name = names[m.sender] || m.name || "Unknown User";
                  
                    return (
                      <div key={i} className={isMine ? "message mine" : "message"}>
                        <div className="message-header">
                            <div className="message-profile-image-container">
                                <img
                                    src={avatarUrl}
                                    className="message-profile-image"
                                    onClick={() => isMine ? setShowMyProfile(true) : show_other_data(m.sender)}
                                />
                            </div>
                            <span className="message-username" onClick={() => isMine ? setShowMyProfile(true) : show_other_data(m.sender)}>
                                {name}
                            </span>
                            <span className="message-timestamp">{m.time}</span>
                        </div>
                        <div className="message-content">
                            {
                                m.content == "picture" ?
                                <img src={m.message} alt="image" className="message-image" />:
                                <span>{m.message}</span>
                            }
                        </div>
                        <br></br>
                      </div>
                    );
                  })
                  
            }

        </div>
        :
        <></>
    )


}

export default Channel_messages;