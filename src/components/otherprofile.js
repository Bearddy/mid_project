
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
                <p>Created Date : { otherData.created_date }</p>
                {/* <p>{ userData.profile_image }</p> */}
                <button onClick={ () => setShowOtherData(false) }>Close</button>
            </div>
        </div>
    );

}

export default Other_profile;