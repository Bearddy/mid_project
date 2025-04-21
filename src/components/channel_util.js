import '../App.css';
import { useState } from 'react';

import firebase from '../config';

function Channel_utils(props) {
    const { isSignIn, setShowJoinChannelInput, setShowChannelNameInput, messages, setFoundMessages, foundIndex, setFoundIndex, foundMessages, setHighlightGreen } = props;
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searching, setSearching] = useState(false);

    function input_channel_id(){
        setShowJoinChannelInput(true);
    }

    function channel_name_desicion(){
        setShowChannelNameInput(true);
    }

    function search_message(){
        let flag = false;
        // console.log("Filtered Messages: ", filteredMessages);
        setFoundMessages([]);
        setHighlightGreen({});
        
        messages.forEach((msg) => {
            // console.log("msg: ", msg);
            if(msg.content == "message"){
                if(msg.message.toLowerCase().includes(searchKeyword.toLowerCase())){
                    setFoundMessages(prev => [...prev, msg]);
                    // flag = true;
                }
            }
        });

        setSearching(true);
        
        // if(flag == false){
        //     setFoundMessages([]);
        //     setFoundIndex(-1);
        // }
        
    }

    return (
    isSignIn ?
    <div className="channel-utils">
        <button onClick={ channel_name_desicion }>create</button>
        <button onClick={ input_channel_id }>join</button>
        <input type="text" value={searchKeyword} onChange={(e) => {
            setSearchKeyword(e.target.value)
            setFoundIndex(0);
        }
        } placeholder="Search messages" onKeyDown={ 
            (e) => {
                if (e.key === 'Enter') {
                    search_message();
                }
            }   
        }/>
        <button onClick={search_message}>search</button>
        <button onClick={() => {
            setFoundMessages([]);
            setFoundIndex(0);
            setHighlightGreen({});
            setSearching(false); 
        }}>cancel</button>
        {
            searching ? <span>{ 
                isNaN(((foundIndex-1)%foundMessages.length + foundMessages.length) % foundMessages.length + 1) ? 0 : (((foundIndex-1)%foundMessages.length + foundMessages.length) % foundMessages.length + 1)
            }/{foundMessages.length}</span> : <></>
        }
    </div>
    :
    <></>
    );
}

export default Channel_utils;