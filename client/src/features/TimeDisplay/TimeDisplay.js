import React, { useState, useEffect } from "react";

function TimeDisplay() {
  const [yourTime, setYourTime] = useState("");
  const [herTime, setHerTime] = useState("");

  useEffect(() => {
    const updateTimes = () => {
      // Your Time (EST - America/New_York)
      const estOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "America/New_York",
        hour12: true,
      };
      setYourTime(new Date().toLocaleString("en-US", estOptions));

      // Her Time (Bologna, Italy - Europe/Rome)
      const bolognaOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "Europe/Rome",
        hour12: true,
      };
      setHerTime(new Date().toLocaleString("en-US", bolognaOptions));
    };

    updateTimes();
    const intervalId = setInterval(updateTimes, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "15px",
          border: "1px solid #cceeff",
          borderRadius: "8px",
          backgroundColor: "#e6f7ff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ color: "#007bff", fontSize: "1.2em" }}>Your Time: EST</h2>
        <p style={{ fontSize: "1.1em", fontWeight: "bold", color: "#555" }}>
          {yourTime}
        </p>
      </div>
      <div
        style={{
          flex: 1,
          padding: "15px",
          border: "1px solid #ffccdd",
          borderRadius: "8px",
          backgroundColor: "#ffe6f0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ color: "#e91e63", fontSize: "1.2em" }}>
          Her Time: Bologna, Italy
        </h2>
        <p style={{ fontSize: "1.1em", fontWeight: "bold", color: "#555" }}>
          {herTime}
        </p>
      </div>
    </div>
  );
}

export default TimeDisplay;
