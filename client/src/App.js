import React from 'react';
import TimeDisplay from './features/TimeDisplay/TimeDisplay'; // Import TimeDisplay
import PingButton from './features/PingButton/PingButton';   // Import PingButton
import MusicMessages from './features/MusicMessages'; // Will import this later

function App() {
  // --- Constants for your names (can be moved to a config later) ---
  const YOUR_NAME = "XauCho"; // Replace with your actual name
  const HER_NAME = "HeoXinh";   // Replace with her actual name

  return (
    <div className="App" style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f0f2f5', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#333', marginBottom: '30px' }}>Our Connection Hub</h1>

      {/* Time Zone Display Component */}
      <TimeDisplay />

      {/* Thought of You Button Component */}
      <PingButton yourName={YOUR_NAME} herName={HER_NAME} />

       {/* Music Message Interface Component */}
       <MusicMessages yourName={YOUR_NAME} herName={HER_NAME} />
      {/* <MusicMessages yourName={YOUR_NAME} herName={HER_NAME} /> */}

      {/* Date Ideas (will go here after that) */}
    </div>
  );
}

export default App;