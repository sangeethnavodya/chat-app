// pages/chat.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Replace with your server URL

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      // Handle incoming messages
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
     console.log(message)
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <div className="chat-header">
        <h1>Chat App</h1>
      </div>
      <div className="chat-messages">
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
