import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from './components/Form.js';
import Room from './components/Room.js';

const socket = io.connect('http://localhost:8000');

const App = () => {
  // Lift state up to the App component
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');

  const handleFormSubmit = (enteredRoom, enteredUsername) => {
    // Set the state when the form is submitted
    setRoom(enteredRoom);
    setUsername(enteredUsername);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Form onSubmit={handleFormSubmit} />} // Pass onSubmit callback
        />
        <Route
          path={`/username=${username}`}
          element={<Room room={room} username={username} />} // Pass room and username as props
        />
      </Routes>
    </div>
  );
};

export default App;
