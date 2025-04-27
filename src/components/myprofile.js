
import '../App.css';
import { useState, useEffect, useRef } from 'react';

import firebase from '../config';

function My_profile(props) {
    const { showMyProfile, setShowMyProfile, userData, setUserData } = props;
    const [ profileData, setProfileData ] = useState({});
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState("");
    const fileInputRef = useRef(null);

    const storage = firebase.storage();
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
              setDownloadURL(url);


                setProfileData(prev => ({
                    ...prev,
                    profile_image: url
                }));
                console.log("downloadURL: ", url);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                // const userRef = firebase.database().ref('users/' + profileData.uid);
                // userRef.update({ profile_image: url })
                // .then(() => {
                //     console.log("Data saved successfully.");
                // })
                // .catch((error) => {
                //     console.error("Error saving data: ", error);
                // });
            });

          }
        );
      };

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
            showing_email: profileData.showing_email,
            phone_number: profileData.phone_number,
            address: profileData.address,
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
                {/* <h2> {profileData.name}</h2> */}
                <h2>My Profile</h2>
                <span>name : </span>
                <input type="text" className='name_data' value={ profileData.name } onChange={(e) => setProfileData(prev => ({
                ...prev,
                name: e.target.value
                }))}/>
                <br></br>
                <span>email : </span>
                <input type="text" className='email_data' value={ profileData.showing_email } onChange={(e) => setProfileData(prev => ({
                ...prev,
                showing_email: e.target.value
                }))}/>
                <br></br>
                <span>phone number : </span>
                <input type="text" className='phone_number_data' value={ profileData.phone_number } onChange={(e) => setProfileData(prev => ({
                ...prev,
                phone_number: e.target.value
                }))}/>
                <br></br>
                <span>address : </span>
                <input type="text" className='address_data' value={ profileData.address } onChange={(e) => setProfileData(prev => ({
                ...prev,
                address: e.target.value
                }))}/>
                <br></br>
                <span>profile image: </span>
                <div className="show-profile-image-container"> 
                <img src={ !profileData.profile_image ? "https://firebasestorage.googleapis.com/v0/b/ss-mid-912fd.firebasestorage.app/o/uploads%2Fquestion-mark-2061539_1280.png?alt=media&token=43836751-1267-4e95-9ca9-d333ca9c20dd" : profileData.profile_image } alt="profile" className="show-profile-image" onClick={() => {
                    if(progress < 100 && progress > 0) {
                        return;
                    }

                    fileInputRef.current?.click()
                    }} />
                </div>
                <p>Created Date : { 
                    `${new Date(profileData.created_date).getFullYear()}/${["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"][new Date(profileData.created_date).getMonth()]}/${new Date(profileData.created_date).getDate()} ${new Date(profileData.created_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                }</p>
                {/* <p>{ userData.profile_image }</p> */}
                <button className="btn-text" onClick={save_data} disabled={progress < 100 && progress > 0}>Save</button>
                <button className="btn-text" onClick={ () => setShowMyProfile(false) } disabled={progress < 100 && progress > 0}>Close</button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </div>
    );

}

export default My_profile;