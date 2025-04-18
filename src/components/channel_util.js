import '../App.css';
import { useState } from 'react';

import firebase from '../config';

function Channel_utils(props) {
    const { isSignIn, setShowJoinChannelInput, setShowChannelNameInput } = props;

    function input_channel_id(){
        setShowJoinChannelInput(true);
    }

    function channel_name_desicion(){
        setShowChannelNameInput(true);
    }


    return (
    isSignIn ?
    <div className="channel-utils">
        <button onClick={ channel_name_desicion }>create chat_channel</button>
        <button onClick={ input_channel_id }>join chat_channel</button>
    </div>
    :
    <></>
    );
}

export default Channel_utils;