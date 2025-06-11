import React, { useState, useEffect } from 'react';
import MusicMessageForm from './MusicMessageForm'; // Import the form component
import MessageList from './MessageList';       // Import the list component

function MusicMessages({ yourName, herName }) { // Receive names as props
  const [messages, setMessages] = useState([]); // State to store fetched messages

  // --- Function to Fetch Messages ---
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data); // Set the fetched messages into state
      } else {
        console.error('Failed to fetch messages:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // --- Handle Message Sent from Form ---
  // This function will be called by MusicMessageForm after a successful send
  const handleNewMessageSent = (newMessage) => {
    // Add the new message to the top of the list without re-fetching all
    setMessages(prevMessages => [newMessage, ...prevMessages]);
  };

  // --- Fetch messages on component mount ---
  useEffect(() => {
    fetchMessages();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div style={{ marginTop: '40px', padding: '25px', border: '1px solid #dcdcdc', borderRadius: '10px', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Harmonize & Send Music Message</h2>
      <MusicMessageForm onMessageSent={handleNewMessageSent} yourName={yourName} herName={herName} />
      <h3 style={{ color: '#555', marginBottom: '15px' }}>Your Message History</h3>
      <MessageList messages={messages} />
    </div>
  );
}

export default MusicMessages;