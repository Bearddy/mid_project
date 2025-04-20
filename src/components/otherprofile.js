
import '../App.css';
import { useState, useEffect } from 'react';

import firebase from '../config';

function Other_profile(props) {
    const { showOtherData, otherData, setShowOtherData } = props;
    const [ profileData, setProfileData ] = useState({});


    
    

    
    
    return (
        !showOtherData ? <></> :
        <div className="other-profile-container">
            <div className="other-profile">
                <h2> {otherData.name}</h2>
                <span>name : {otherData.name}</span>
                <p>{ otherData.email }</p>
                <span> profile image: </span>
                <div className="show-profile-image-container"> 
                <img src={ !otherData.profile_image ? "https://firebasestorage.googleapis.com/v0/b/ss-mid-912fd.firebasestorage.app/o/uploads%2Fquestion-mark-2061539_1280.png?alt=media&token=43836751-1267-4e95-9ca9-d333ca9c20dd" : otherData.profile_image} alt="profile" className="show-profile-image" ></img>
                </div>
                <p>Created Date : { otherData.created_date }</p>
                {/* <p>{ userData.profile_image }</p> */}
                <button onClick={ () => setShowOtherData(false) }>Close</button>
            </div>
        </div>
    );

}

export default Other_profile;