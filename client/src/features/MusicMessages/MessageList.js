import React from 'react';

function MessageList({ messages }) { // Receives messages as a prop
  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '5px', padding: '10px', backgroundColor: '#fdfdfd' }}>
      {messages.length === 0 ? (
        <p>No messages yet. Send one!</p>
      ) : (
        messages.map((msg) => (
          <div key={msg._id} style={{ borderBottom: '1px dashed #eee', padding: '15px 0', textAlign: 'left' }}>
            <p><strong>From {msg.sender} to {msg.recipient}</strong> <br/>
            <small style={{ color: '#888' }}>{new Date(msg.timestamp).toLocaleString()}</small></p>
            <p style={{ margin: '8px 0', fontSize: '1.05em' }}>"{msg.messageText}"</p>
            <p><a href={msg.songLink} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Listen to the Song!</a></p>
            {msg.whyNote && <p style={{ fontStyle: 'italic', color: '#666' }}>"{msg.whyNote}"</p>}
          </div>
        ))
      )}
    </div>
  );
}

export default MessageList;