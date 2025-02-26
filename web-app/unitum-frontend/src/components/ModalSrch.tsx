import React, { useState } from "react";
import ReactDOM from "react-dom";

interface Conversation {
  id: number;
  title: string;
}

interface ModalSrchProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  onSelectConversation: (id: number) => void;
  darkMode: boolean;
}

const ModalSrch: React.FC<ModalSrchProps> = ({
  isOpen,
  onClose,
  conversations,
  onSelectConversation,
  darkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [isCloseHovered, setIsCloseHovered] = React.useState(false);

  if (!isOpen) return null;

  // Filter conversations based on the search query
  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Styles
  const backdropStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  };

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: darkMode ? "#333" : "#fff",
    color: darkMode ? "#fff" : "#000",
    width: "500px",
    maxHeight: "70%",
    padding: "1rem",
    borderRadius: "10px",
    zIndex: 1001,
    boxShadow: darkMode
      ? "0 4px 12px rgba(255, 255, 255, 0.1)"
      : "0 2px 8px rgba(0, 0, 0, 0.2)",
    overflowY: "auto", // Allow scrolling if the list is too long
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    border: "none",
    borderBottom: darkMode ? "1px solid #444" : "1px solid #ddd",
    backgroundColor: darkMode ? "inherit" : "#fff",
    color: darkMode ? "#fff" : "#000",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  const closeButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "10px",
    right: "17px",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: isCloseHovered
      ? darkMode
        ? "white !important" // Hover color for dark mode
        : "black" // Hover color for light mode
      : darkMode
      ? "inherit !important"
      : "grey",
  };

  const listStyle: React.CSSProperties = {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  };

  const listItemStyle: React.CSSProperties = {
    padding: "0.5rem 1rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const listItemHoverStyle: React.CSSProperties = darkMode
    ? { backgroundColor: "#555" }
    : { backgroundColor: "#f0f0f0" };

  return ReactDOM.createPortal(
    <div style={backdropStyle} onClick={onClose}>
      <div
        style={modalStyle}
        
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
       <button
          style={closeButtonStyle}
          onClick={onClose}
          onMouseEnter={() => setIsCloseHovered(true)} 
          onMouseLeave={() => setIsCloseHovered(false)} 
        >
          ×
        </button>
        <input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={inputStyle}
        />
        <ul style={listStyle}>
          {filteredConversations.map((conv) => (
            <li
              key={conv.id}
              style={listItemStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor!)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              onClick={() => {
                onSelectConversation(conv.id);
                onClose();
              }}
            >
              {conv.title}
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
};

export default ModalSrch;
