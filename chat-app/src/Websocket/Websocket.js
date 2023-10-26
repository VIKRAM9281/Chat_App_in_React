import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import "../App.css"
const socket = io('http://localhost:7397');

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  useEffect(() => {
    socket.on('message', ({ sender, message }) => {
      setMessages([...messages, `${sender}: ${message}`]);
    });
  }, [messages]);

  const handleSendMessage = () => {
    if (recipient && currentMessage) {
      socket.emit('message', { sender: 'You', recipient, message: currentMessage });
      setMessages([...messages, `${recipient}: ${currentMessage}`]);
      setCurrentMessage('');
    }
  };
  

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  return (
    <div className="container">
    <div className="messageContainer">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.startsWith('You') ? 'sent' : 'received'}`}
        >
          {message}
        </div>
      ))}
    </div>
    <input
      type="text"
      placeholder="Recipient"
      value={recipient}
      onChange={handleRecipientChange}
      className="input"
    />
    <input
      type="text"
      value={currentMessage}
      onChange={(e) => setCurrentMessage(e.target.value)}
      className="input"
    />
    <button onClick={handleSendMessage} className="button">
      Send
    </button>
  </div>
  
  
  );
};

export default ChatApp;
