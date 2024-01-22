
import React, {useState } from 'react';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';



const Form = ({onSubmit}) => {
  const [username,setUsername]=useState("")
  const [room,selectedRoom]=useState("")
  const navigate=useNavigate()

const handleSubmit=(e)=>{
  e.preventDefault()
  if (!room || !username) {
    return;
  }
  onSubmit(room,username)
  navigate(`/username=${username}`)
  
}
 
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username: </label>
        <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
      </div>

      <div>
        <label>Join a room</label>
        <select name='room' value={room} onChange={(e)=>selectedRoom(e.target.value)}>
        <option value="" disabled>Select a room</option>
          <option value="python">Python</option>
          <option value="Javascript">Javascript</option>
        </select>
      </div>

      <div>
        <button type='submit'>Submit</button>
      </div>

    </form>
    </div>
  )
}

export default Form;