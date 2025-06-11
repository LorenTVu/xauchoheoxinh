import React, { useState } from 'react';

function PingButton({ yourName, herName }) { // Receive names as props
  const [pingMessage, setPingMessage] = useState('');

  const handlePingClick = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: yourName, recipient: herName }),
      });
      const data = await response.json();
      if (response.ok) {
        setPingMessage(data.message);
        setTimeout(() => setPingMessage(''), 3000);
      } else {
        setPingMessage(`Error: ${data.message || 'Could not send ping'}`);
      }
    } catch (error) {
      console.error('Error sending ping from frontend:', error);
      setPingMessage('Failed to send ping. Check console.');
    }
  };

  return (
    <div style={{ margin: '30px 0', padding: '20px', border: '2px solid #a3e635', borderRadius: '10px', backgroundColor: '#ecfccb', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <button
        onClick={handlePingClick}
        style={{
          padding: '15px 30px',
          fontSize: '1.5em',
          fontWeight: 'bold',
          backgroundColor: '#84cc16',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#65a30d'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#84cc16'}
      >
        ❤️ Thought of You! ❤️
      </button>
      {pingMessage && <p style={{ marginTop: '15px', color: '#369', fontSize: '1.1em' }}>{pingMessage}</p>}
    </div>
  );
}

export default PingButton;