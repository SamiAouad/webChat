import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";


function Chat({socket, username, room}) {
    const params = useParams();
    const chatRoom = params.room;
    const [currentMessage, setCurrentMessage] = useState("")
    const sendMessage = async () => {
        if (currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData);
        }
    }
    useEffect(() => {
        socket.on("received_message", (data) => {
            console.log(data);
        })
    }, [socket])
    return (
        <div>
            <div className={"chat-header"}><p>Live chat</p></div>
            <div className={"chat-body"}>p</div>
            <div className={"chat-footer"}>
                <input type={"text"} placeholder={"message..."}
                       onChange={(event) =>{setCurrentMessage(event.target.value)}}/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;