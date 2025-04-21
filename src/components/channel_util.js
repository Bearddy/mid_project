import '../App.css';
import { useRef, useState } from 'react';

import firebase from '../config';

function Channel_utils(props) {
    const { isSignIn, setShowJoinChannelInput, setShowChannelNameInput, messages, setFoundMessages, foundIndex, setFoundIndex, foundMessages, setHighlightGreen } = props;
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searching, setSearching] = useState(false);

    const inputRef = useRef(null);

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
            if(msg.content == "message" || msg.content == "link"){
                if(msg.message.toLowerCase().includes(searchKeyword.toLowerCase()) && msg.messageId != undefined){
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
        <input type="text" ref={inputRef} value={searchKeyword} onChange={(e) => {
            setSearchKeyword(e.target.value)
            setFoundIndex(0);
        }
        } placeholder="Search messages" onKeyDown={ 
            (e) => {
                if (e.key === 'Enter') {
                    search_message();
                }
                else if (e.key === 'Escape') {
                    setFoundMessages([]);
                    setFoundIndex(0);
                    setHighlightGreen({});
                    setSearching(false); 
                    inputRef.current.blur();                    
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
            searching ? <span className="searching-message">{ 
                isNaN(((foundIndex-1)%foundMessages.length + foundMessages.length) % foundMessages.length + 1) ? 0 : (((foundIndex-1)%foundMessages.length + foundMessages.length) % foundMessages.length + 1)
            }/{foundMessages.length}</span> : <></>
        }
    </div>
    :
    <></>
    );
}

export default Channel_utils;