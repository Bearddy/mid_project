import '../App.css';
import { useState } from 'react';

import firebase from '../config';

function Custom_alert(props) {
    const {showAlert, setShowAlert, alertDetail, setAlertDetail, confirmFunction} = props;

    function close_alert() {
        setShowAlert(false);
        setAlertDetail({});
    }

    return (
        showAlert ?
        <div className="custom-alert-container">
            <div className="custom-alert">
                <h2>{alertDetail.title}</h2>
                <p>{alertDetail.description}</p>
                {
                    alertDetail.type == "error" ? 
                        <button className="custom-alert-btn btn-text btn-text" onClick={close_alert}>Close</button>
                    :
                    alertDetail.type == "confirm" ?
                        (<>
                            <button className="custom-alert-btn btn-text" onClick={() => {
                                confirmFunction();
                                close_alert();
                            }}>Ok</button>
                            <button className="custom-alert-btn btn-text" onClick={close_alert}>Close</button>
                        </>)
                    :
                    <></>
                    
                }
            </div>
        </div>
        :
        <></>
    )
}

export default Custom_alert;