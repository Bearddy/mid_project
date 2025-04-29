import '../App.css';
import { useEffect, useRef, useState } from 'react';

import firebase from '../config';

function Channel_utils(props) {
    const { isSignIn, setShowJoinChannelInput, setShowChannelNameInput, messages, setFoundMessages, foundIndex, setFoundIndex, foundMessages, setHighlightGreen, showChannelMenu, setShowChannelMenu, isMobile } = props;
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searching, setSearching] = useState(false);
    const inputRef = useRef(null);

    


    function input_channel_id(){
        setShowJoinChannelInput(true);
    }

    function channel_name_desicion(){
        setShowChannelNameInput(true);
    }

    function open_channel_menu(){
        setShowChannelMenu(!showChannelMenu);
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

    useEffect(() => {
        if(!isSignIn) setSearching(false);

    }, [isSignIn]);

    return (
    isSignIn ?
    <div className="channel-utils">
        {isMobile ? <button className="show_channel_btn" onClick={ open_channel_menu }>
            <img src={require('../images/menu.png')} alt="menu" className="show_channel_icon" />
        </button> : <></>}
        <button onClick={ channel_name_desicion } className="create_channel_btn btn-icon">
            <img src={require('../images/create_channel.png')} alt="create_channel" className="create_channel_icon" />
        </button>
        <button onClick={ input_channel_id } className="join_channel_btn btn-icon">
            <img src={require('../images/join_channel.png')} alt="join_channel" className="join_channel_icon" />
        </button>
        <input type="text" class="search_messages" ref={inputRef} value={searchKeyword} onChange={(e) => {
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
        <button onClick={search_message} className="search_message_btn btn-icon">
            <img src={require('../images/search.png')} alt="search" className="search_icon" />
        </button>
        <button onClick={() => {
            setFoundMessages([]);
            setFoundIndex(0);
            setHighlightGreen({});
            setSearching(false); 
            
        }} className="cancel_search_btn btn-icon">
            <img src={require('../images/cancel.png')} alt="cancel" className="cancel_icon" />
        </button>
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