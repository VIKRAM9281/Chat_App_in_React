import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

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
      setMessages([...messages, `You: ${currentMessage}`]);
      setCurrentMessage('');
    }
  };

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <div
        style={{
          height: '300px',
          border: '1px solid #ccc',
          padding: '10px',
          overflow: 'auto',
          marginBottom: '10px',
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              backgroundColor: message.startsWith('You') ? '#DCF8C6' : '#ffffff',
              padding: '8px',
              marginBottom: '8px',
              borderRadius: '8px',
              maxWidth: '70%',
              alignSelf: message.startsWith('You') ? 'flex-end' : 'flex-start',
            }}
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
        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
      />
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
      />
      <button
        onClick={handleSendMessage}
        style={{
          backgroundColor: '#25D366',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatApp;
