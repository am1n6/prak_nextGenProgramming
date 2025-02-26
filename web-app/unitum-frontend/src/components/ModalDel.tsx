import React, { useState } from "react";
import ReactDOM from "react-dom";

interface ModalDelProps {
  isOpen: boolean; // Whether the modal is open
  onClose: () => void; // Function to close the modal
  onDelete: () => void; // Function to handle deletion
  chatName: string;
  darkMode: boolean;
}

const ModalDel: React.FC<ModalDelProps> = ({ isOpen, onClose, onDelete, chatName, darkMode, }) => {
  if (!isOpen) return null; // Don't render if the modal is closed

  const [isCancelHovered, setCancelHovered] = useState(false);
  const [isDeleteHovered, setDeleteHovered] = useState(false);
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
    color: darkMode ? "#fff" : "#333",
    height: "230px",
    width: "450px",
    padding: "1.5rem",
    borderRadius: "10px",
    zIndex: 1001,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  };

  const headingStyle: React.CSSProperties = {
    marginBottom: "1.5rem",
    fontSize: "1.2rem",
    fontWeight: 540,
    color: darkMode ? "white" : "#333",
    textAlign: "left",
    borderBottom: `3px solid ${darkMode ? "#555" : "#eee"}`,
    paddingBottom: "20px",
  };

  const highlightedTextStyle: React.CSSProperties = {
    fontWeight: "bold",
    color: darkMode ? "#fff" : "#333",
  };

  const bodyTextStyle: React.CSSProperties = {
    fontSize: "0.95rem",
    color: darkMode ? "white" : "#666",
    margin: "16px 0",
    lineHeight: "1.5",
    textAlign: "left",
  };

  const actionsStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "16px",
  };

  const cancelButtonStyle: React.CSSProperties = {
    padding: "8px 16px",
    backgroundColor: isCancelHovered ? (darkMode ? "#555" : "#f5f5f5") : (darkMode ? "#444" : "#fff"),
    border: `1px solid ${darkMode ? (isCancelHovered ? "#888" : "#666") : "#ddd"}`,
    borderRadius: "24px",
    cursor: "pointer",
    color: darkMode ? (isCancelHovered ? "#ddd" : "#fff") : "#333",
    fontSize: "0.9rem",
    fontWeight: 500,
  };

  const deleteButtonStyle: React.CSSProperties = {
    padding: "8px 16px",
    backgroundColor: isDeleteHovered ? "#c9302c" : "#d9534f",
    border: "none",
    borderRadius: "24px",
    cursor: "pointer",
    color: "#fff",
    fontSize: "0.9rem",
    fontWeight: 500,
  };

  return ReactDOM.createPortal(
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <h2 style={headingStyle}>Delete chat?</h2>
        <p style={bodyTextStyle}>
          This will delete <span style={highlightedTextStyle}>{chatName}</span>.
        </p>
        <div style={actionsStyle}>
        <button
            style={cancelButtonStyle}
            onMouseEnter={() => setCancelHovered(true)}
            onMouseLeave={() => setCancelHovered(false)}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            style={deleteButtonStyle}
            onMouseEnter={() => setDeleteHovered(true)}
            onMouseLeave={() => setDeleteHovered(false)}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body 
  );
};

export default ModalDel;