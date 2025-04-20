import '../App.css';
import { useState, useEffect, useRef } from 'react';

import firebase from '../config';

function Channel_messages(props){
    const {userData, showChannelContent, isSignIn, messages, setMessages, setShowOtherData, setOtherData, setShowMyProfile} = props;
    const boxRef = useRef(null);
    const initialLoadDone = useRef(false);
    const [avatarMap, setAvatarMap] = useState({});
    const [names, setNames] = useState({});

    const DEFAULT_AVATAR = "https://firebasestorage.googleapis.com/v0/b/ss-mid-912fd.firebasestorage.app/o/uploads%2Fquestion-mark-2061539_1280.png?alt=media&token=43836751-1267-4e95-9ca9-d333ca9c20dd";
    
    useEffect(() => {

    
        if (isSignIn && showChannelContent) {
        const messageRef = firebase
            .database()
            .ref(`messages/${userData.current_channel.split(':')[0]}`);
    
        initialLoadDone.current = false;
        setMessages([]);

        messageRef
        .once('value')
        .then(snapshot => {
            const initial = [];
            snapshot.forEach(child => {
                const msg = child.val();
                initial.push({
                    name:    msg.username,
                    sender:  msg.sender,
                    content: msg.content,
                    message: msg.message,
                    time:    msg.time,
                    messageId: child.key,
                });
            });
            setMessages(initial);
            initialLoadDone.current = true;
        });
    
        const onChildAdded = messageRef.on('child_added', snapshot => {
            
            const msg = snapshot.val();

            setMessages(prev => [...prev, {
                name: msg.username,
                sender: msg.sender,
                content: msg.content,
                message: msg.message,
                time: msg.time,
                messageId: snapshot.key,
            }]);
            console.log("snapshot_key: ", snapshot.key);
            const msg_or_pic = msg.content == "picture" ? "picture" : msg.message;
            if(initialLoadDone.current){
                if(msg.sender == userData.uid) return;
                if(Notification.permission !== "granted"){
                    Notification.requestPermission().then((permission) => {
                        if(permission === "granted"){
                            const notification = new Notification(`from ${userData.current_channel.split(":")[1]} : ${names[msg.sender]}`, {
                                body: msg_or_pic,
                                icon: avatarMap[msg.sender] || DEFAULT_AVATAR,
                            });
                        }
                    });
                }
                else {
                    const notification = new Notification(`from ${userData.current_channel.split(":")[1]} : ${names[msg.sender]}`, {
                        body: msg_or_pic,
                        icon: avatarMap[msg.sender] || DEFAULT_AVATAR,
                    });
                }   
            }

            // console.log("msg: ", msg);

        });

        const onChildRemoved = messageRef.on('child_removed', snap => {
            console.log("snap: ", snap.val());  
            const removedId = snap.key;
            // Option A: reload entire list
            // messageRef.once('value').then(snap2 => {
            //   const all = [];
            //   snap2.forEach(c => all.push({ ...c.val(), messageId: c.key }));
            //   setMessages(all);
            // });
        
            // Option B: just prune that one out of state
            setMessages(prev => prev.filter(m => m.messageId !== removedId));
            // note: no notifications here
        });
    
        // cleanup when channel closes or user switches
        return () => {
            messageRef.off('child_added', onChildAdded);
            messageRef.off('child_removed', onChildRemoved);
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

    function unsend_message(messageId){
        const messageRef = firebase.database().ref(`messages/${userData.current_channel.split(':')[0]}/${messageId}`);
        console.log("messageId: ", messageId);
        console.log("id : ", userData.current_channel.split(':')[0]);
        console.log("path : ", `messages/${userData.current_channel.split(':')[0]}/${messageId}`);
        messageRef.remove()
        .then(() => {
            console.log("Message removed successfully.");
        })
        .catch((error) => {
            console.error("Error removing message: ", error);
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
                        <div className="message-content" onContextMenu={(e) => {
                            e.preventDefault();
                            if(isMine){
                                unsend_message(m.messageId);
                            }
                            
                            }}>
                            {
                                m.content == "picture" ?
                                <img src={m.message} alt="image" className="message-image" /> :
                                m.content == "video" ?
                                <video controls className="message-video">
                                    <source src={m.message} type="video/mp4" />
                                </video> :
                                m.content == "link" ?
                                <a href={m.message} target="_blank" rel="noopener noreferrer" className="message-link">
                                    {m.message}
                                </a> :
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