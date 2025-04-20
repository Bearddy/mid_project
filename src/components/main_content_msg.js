import '../App.css';

function Main_function_messages(props){
    const { isSignIn, joinedChannel } = props;
    
    return (
        isSignIn ? joinedChannel.length > 0 ? <></> : 
        <div className="main_function_messages">
            <h1>Welcome to the chat app!</h1>
            <p>Please join a channel to start chatting.</p>
        </div>
        :
        <div className="main_function_messages">
            <h1>Welcome to the chat app!</h1>
            <p>Please sign in to join a channel and start chatting.</p>
        </div>
    )
}

export default Main_function_messages;