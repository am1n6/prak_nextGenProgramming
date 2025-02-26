import React , { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Lottie from "lottie-react";
import animationData from "../assets/ai-robot.json";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus,oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const messageToType = "Select a Project or create a new one";

interface Message {
  sender: "User" | "AI";
  content: string;
}

interface Conversation {
  id: number;
  title: string;
  messages: Message[];
}

interface MainChatProps {
  currentConversation: Conversation | undefined;
  isAIResponding: boolean;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  stopAIResponse: () => void;
  isSidebarHidden: boolean; 
  setIsSidebarHidden: (hidden: boolean) => void;
  darkMode: boolean;
}

const MainChat: React.FC<MainChatProps> = ({
  currentConversation,
  isAIResponding,
  message,
  setMessage,
  handleSendMessage,
  stopAIResponse,
  isSidebarHidden, 
  setIsSidebarHidden,
  darkMode,
}) => {
  const [typedMessage, setTypedMessage] = useState(""); // State for the typing effect

  // Typing effect for the no-conversation message
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= messageToType.length) {
        setTypedMessage(messageToType.slice(0, index));
        index++;
      } else {
        clearInterval(interval); // Stop interval when the message is fully typed
      }
    }, 30); // Typing speed in milliseconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const [isCopied, setIsCopied] = useState(false); // State to track copy status
  // Function to copy code to clipboard
  const copyToClipboard = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setIsCopied(true); // Show "Copied" checkmark
        setTimeout(() => setIsCopied(false), 3000); // Hide after 3 seconds
      })
      .catch(() => {
        console.error("Failed to copy code");
      });
  };

  const renderMessageContent = (msg: Message) => {
    const codeTheme = darkMode ? vscDarkPlus : oneLight;
    if (msg.sender === "AI") {
      return (
        <div className="code-block">
          <SyntaxHighlighter language="java" style={codeTheme}>
            {"\n"+msg.content}
          </SyntaxHighlighter>
          <button
            className="copy-button"
            onClick={() => copyToClipboard(msg.content)}
          >
            {!isCopied && (
            <span className="copy-icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
            <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
          </span>
            )}
          <span className={`text ${isCopied ? "text-copied" : ""}`}>
           {isCopied ? "✔ Copied" : "Copy Code"}
          </span>
          </button>
        </div>
      );
    }
    return <span>{msg.content}</span>;
  };


  return (
    <div className="main-chat">
      {isSidebarHidden && (
        <button
          className="show-sidebar-button"
          onClick={() => setIsSidebarHidden(false)}
        >
          <FontAwesomeIcon icon={faBars} size="sm" />
        </button>
      )}
  
      {/* Conversation Display */}
      <div className="conversation">
        {currentConversation ? (
          // Render messages inside the conv-container
          <div
            className={`conv-container ${
              isSidebarHidden ? "conv-container-sidebar-hidden" : ""
            }`}
          >
            {currentConversation.messages.map((msg, index) => (
              <p
                key={index}
                className={msg.sender === "User" ? "user-message" : "ai-message"}
              >
                {renderMessageContent(msg)}
              </p>
            ))}
          </div>
        ) : (
          // Render no-conversation separately
          <div 
          className={`no-conversation ${
            isSidebarHidden ? "no-conversation-sidebar-hidden" : ""
          }`}
          >
            {/* Animation */}
            <div className="no-conversation-animation">
              <Lottie animationData={animationData} loop={true} />
            </div>
            {/* Title */}
            <h1 className="main-title">UNITum</h1>
            {/* Typing Effect */}
            <p className="typing-text">{typedMessage}</p>
          </div>
        )}
      </div>
  
      {/* Chat Input Bar */}
      {currentConversation && (
        <div
          className={`chat-bar ${
            isSidebarHidden ? "chat-bar-sidebar-hidden" : ""
          }`}
        >
          <textarea
            className="chat-input"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isAIResponding} // Disable input when AI is responding
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent adding a new line on Enter
                handleSendMessage();
              }
            }}
          ></textarea>
  
          {isAIResponding ? (
            <button className="stop-button" onClick={stopAIResponse}>
              {/* Stop icon */}
              <div className="stop-icon"></div>
            </button>
          ) : (
            <button
              className={`send-button ${
                message.trim() ? "active" : "disabled"
              }`}
              onClick={handleSendMessage}
              disabled={!message.trim()} // Disable button when input is empty
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="send-icon"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}  

export default MainChat;