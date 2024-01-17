
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

const App = () => {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('createMessage', { text: messageInput, name: 'Anabia' });
    setMessageInput('');
  };

  useEffect(() => {
    socket.on('connection', (data) => {
      console.log(data.id);
      console.log('connected');
    });

    socket.on('message', (data) => {
      console.log('message received');
      console.log(data.text);
      setMessages((prevMessages) => [...prevMessages, data.text]);
    });
    socket.emit('findAllMessages', (data) => {
      setMessages((prevMessages) => [...prevMessages, ...data.map((element) => element.text)]);
      //setMessages([data.map((element) => element.text)])
    });

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
      <button onClick={handleSubmit}>Submit</button>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
};

export default App;

