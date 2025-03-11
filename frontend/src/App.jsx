import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { nanoid } from 'nanoid'
import './App.css'

const socket = io('http://localhost:8000')

function App() {

  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  const sendChat = (e) => {
    e.preventDefault()
    const id = nanoid()
    socket.emit('chat', { id, message })
    setMessage('')
  }

  useEffect(() => {
    socket.on('chat', (payload) => {
      setChat([...chat, payload])
    })

    return () => {
      socket.off('chat')
    }

  }, [chat])

  return (
    <div>
      <h1>Chat App</h1>
      {chat.map((payload, idx) => {
        return (
          <p key={idx}>{payload.message}</p>
        )
      })}
      <form onSubmit={sendChat}>
        <input type="text" name='chat' value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default App
