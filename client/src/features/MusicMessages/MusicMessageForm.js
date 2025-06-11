import React, { useState } from 'react';

function MusicMessageForm({ onMessageSent, yourName, herName }) {
  const [messageText, setMessageText] = useState('');
  const [songLink, setSongLink] = useState('');
  const [whyNote, setWhyNote] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!messageText || !songLink) {
      alert('Please enter a message and a song link.');
      return;
    }

    try {
      const newMessage = {
        sender: yourName,
        recipient: herName,
        messageText,
        songLink,
        whyNote
      };

      const response = await fetch('http://localhost:5001/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        const sentMessage = await response.json();
        console.log('Message sent successfully:', sentMessage);
        // Call the prop function to notify the parent that a message was sent
        if (onMessageSent) {
          onMessageSent(sentMessage);
        }
        // Clear form fields
        setMessageText('');
        setSongLink('');
        setWhyNote('');
      } else {
        const errorData = await response.json();
        console.error('Failed to send message:', errorData.message || response.statusText);
        alert(`Failed to send message: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Check console.');
    }
  };

  return (
    <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
      <textarea
        placeholder="Your message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        rows="3"
        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '1em' }}
      ></textarea>
      <input
        type="text"
        placeholder="Song Link (YouTube, Spotify, etc.)"
        value={songLink}
        onChange={(e) => setSongLink(e.target.value)}
        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '1em' }}
      />
      <input
        type="text"
        placeholder="Why this song? (Optional note)"
        value={whyNote}
        onChange={(e) => setWhyNote(e.target.value)}
        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '1em' }}
      />
      <button
        type="submit"
        style={{
          padding: '12px 25px',
          fontSize: '1.1em',
          fontWeight: 'bold',
          backgroundColor: '#4285f4',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#3367d6'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4285f4'}
      >
        Send Music Message
      </button>
    </form>
  );
}

export default MusicMessageForm;