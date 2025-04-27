
import '../App.css';
import { useState, useEffect } from 'react';

import firebase from '../config';

function Other_profile(props) {
    const { showOtherData, otherData, setShowOtherData } = props;



    
    

    
    
    return (
        !showOtherData ? <></> :
        <div className="other-profile-container">
            <div className="other-profile">
                <h2> Profile</h2>
                <span>name : {otherData.name}</span>
                <br></br>
                <span> email : {otherData.showing_email}</span>
                <br></br>
                <span> phone number : {otherData.phone_number}</span>
                <br></br>
                <span> address : {otherData.address}</span>
                <br></br>
                <span> profile image: </span>
                <div className="show-profile-image-container"> 
                <img src={ !otherData.profile_image ? "https://firebasestorage.googleapis.com/v0/b/ss-mid-912fd.firebasestorage.app/o/uploads%2Fquestion-mark-2061539_1280.png?alt=media&token=43836751-1267-4e95-9ca9-d333ca9c20dd" : otherData.profile_image} alt="profile" className="show-profile-image" ></img>
                </div>
                <p>Created Date : { 
                `${new Date(otherData.created_date).getFullYear()}/${["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"][new Date(otherData.created_date).getMonth()]}/${new Date(otherData.created_date).getDate()} ${new Date(otherData.created_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                 }</p>
                {/* <p>{ userData.profile_image }</p> */}
                <button className="btn-text" onClick={ () => setShowOtherData(false) }>Close</button>
            </div>
        </div>
    );

}

export default Other_profile;