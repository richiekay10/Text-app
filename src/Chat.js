// Chat.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Chat.css"; // Import CSS styles

// ... rest of the code remains unchanged

const socket = io("http://localhost:5000"); // Update with your server URL

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    // Listen for incoming messages
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      // Send the message to the server
      socket.emit("message", messageInput);

      // Update local state with the sent message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: messageInput, user: "You" },
      ]);

      // Clear the input field
      setMessageInput("");
    }
  };

  // ... rest of the code

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="message-list">
          {messages.map((message, index) => (
            <li key={index}>
              <strong>{message.user}:</strong> {message.text}
            </li>
          ))}
        </div>
      </div>
      <div className="message-input-container">
        <input
          className="message-input"
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
