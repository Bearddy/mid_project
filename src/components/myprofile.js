
import '../App.css';
import { useState, useEffect } from 'react';

import firebase from '../config';

function My_profile(props) {
    const { showMyProfile, setShowMyProfile } = props;
    const [ profileData, setProfileData ] = useState({});

    useEffect(() => {
        // Subscribe to auth state changes
        const getProfile = () => {
            console.log({ showMyProfile });
            if(showMyProfile == true){
                const user = firebase.auth().currentUser;
                if (user) {
                    const uid = user.uid;
                    const dbRef = firebase.database().ref('users/' + uid);
                    dbRef.once('value').then((snapshot) => {
                        const data = snapshot.val();
                        if (data) {
                            setProfileData(data);
                            console.log(data);
                        } else {
                            console.log("No profile data found.");
                        }
                    });
                } else {
                    console.log("No user is signed in.");
                }
            }
        };

        return () => {
            getProfile();
             
        }
    }, [showMyProfile]);

    

    
    
    return (
        showMyProfile ? <div><p>sdbfskdbflsbdfl</p></div> :
        <div>
            <p>{ profileData.name }</p>
            <p>{ profileData.email }</p>
            <p>{ profileData.created_date }</p>
            <p>{ profileData.last_login_date }</p>
            <p>{ profileData.profile_image }</p>
        </div>
    );

}

export default My_profile;