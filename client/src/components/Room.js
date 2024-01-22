import React from 'react'
import { useEffect,useState } from 'react'
import { io } from 'socket.io-client';
import "../App.css"


const socket = io.connect('http://localhost:8000');

const Room = ({room,username}) => {

    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      socket.emit('createMessage', { room:room, text: messageInput, name: username, createdAt:new Date().toISOString()});
      setMessageInput('');
    };
    
  
    useEffect(() => {
      socket.on('connection', (data) => {
        console.log(data.id);
        console.log('connected');
      });
  
      socket.on('message', (data) => {
        console.log('message received',data);
        console.log(data);
        if(data.room==room){
        setMessages((prevMessages) => [...prevMessages,data]);}
      });
      socket.emit('findAllMessages',{room}, (data) => {
        console.log("data", data)
        setMessages((prevMessages) => [...prevMessages, ...data]);
        //setMessages([data.map((element) => element.text)])
      });
      socket.emit("newJoin",{msg:`New ${username} has joined`,room:room})
      return () => {
        socket.off('connection');
        socket.off('message');
      };
    }, []);
  
   
    return (
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => {
            setMessageInput(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>Send Message</button>
        <div>
          {messages.map((message,index) => (
            <div className="message-container" key={index}>
              <p>{message.name}</p> 
             <p> {message.text}</p>
               <p>{message.createdAt}</p>
              </div>
            
          ))}
        </div>
      </div>
    );
  
}

export default Room
