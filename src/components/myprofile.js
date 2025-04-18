
import '../App.css';
import { useState, useEffect } from 'react';

import firebase from '../config';

function My_profile(props) {
    const { showMyProfile, setShowMyProfile, userData, setUserData } = props;
    const [ profileData, setProfileData ] = useState({});

    // useEffect(() => {
        
    //     const getProfile = () => {
            
    //         if(showMyProfile == true){
    //             console.log("showMyProfile is true");
    //             const user = firebase.auth().currentUser;
    //             if (user) {
    //                 const uid = user.uid;
    //                 const dbRef = firebase.database().ref('users/' + uid);
    //                 dbRef.once('value').then((snapshot) => {
    //                     const data = snapshot.val();
    //                     if (data) {
    //                         setProfileData(data);
    //                         console.log(data);
    //                     } else {
    //                         console.log("No profile data found.");
    //                     }
    //                 });
    //             } else {
    //                 console.log("No user is signed in.");
    //             }
    //         }
    //     };

    //     return () => {
    //         getProfile();
             
    //     }
    // }, [showMyProfile]);

    useEffect(() => {
        if (showMyProfile) {
            setProfileData(userData);
        }
    }, [showMyProfile, userData]);
    

    function save_data(){
        const data = {
            uid: profileData.uid,
            name: profileData.name,
            email: profileData.email,
            created_date: profileData.created_date,
            last_login_date: new Date().toString(), //this is useless now
            profile_image: profileData.profile_image,
            channels: profileData.channels,
            current_channel: profileData.current_channel,
        }
        console.log("data: ", data);
        const userRef = firebase.database().ref('users/' + profileData.uid);
        userRef.set(data)
        .then(() => {
            console.log("Data saved successfully.");
            setUserData(data);
        })
        .catch((error) => {
            console.error("Error saving data: ", error);
        });

        setShowMyProfile(false);

    }
    
    return (
        !showMyProfile ? <></> :
        <div className="my-profile-container">
            <div className="my-profile">
                <h2> {profileData.name}</h2>
                <span>name : </span>
                <input type="text" value={ profileData.name } onChange={(e) => setProfileData(prev => ({
                ...prev,
                name: e.target.value
                }))}/>
                <p>{ profileData.email }</p>
                <p>Created Date : { profileData.created_date }</p>
                {/* <p>{ userData.profile_image }</p> */}
                <button onClick={save_data}>Save</button>
                <button onClick={ () => setShowMyProfile(false) }>Close</button>
            </div>
        </div>
    );

}

export default My_profile;