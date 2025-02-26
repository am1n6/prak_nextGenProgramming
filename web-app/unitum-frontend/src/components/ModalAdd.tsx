import React, { useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inputValue: string) => void;
  placeholder?: string;
  darkMode: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  placeholder,
  darkMode,
}) => {
  const [inputValue, setInputValue] = React.useState("");

  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [isCreateHovered, setIsCreateHovered] = useState(false);

  const [isInputFocused, setIsInputFocused] = useState(false);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue("");
      onClose();
    }
  };

  // Inline style objects for each part of the modal
  const backdropStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000, // Behind the modal
  };

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: darkMode ? "#333" : "#fff",
    color: darkMode ? "#fff" : "#000",
    width: "500px",
    height:"300px",
    padding: "1rem",
    borderRadius: "10px",
    zIndex: 1001, // Above the backdrop
    boxShadow: darkMode
      ? "0 4px 12px rgba(255, 255, 255, 0.1)"
      : "0 2px 8px rgba(0, 0, 0, 0.2)",
  };

  const headingStyle: React.CSSProperties = {
    margin: 0,
    fontSize: "1.2rem",
    color: darkMode ? "#ddd" : "#000",
    fontWeight: 400,
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.5rem",
    marginTop: "2rem",
    borderRadius: "10px",
    border: `1px solid ${
        isInputFocused
          ? (darkMode ? "#fff" : "#000") 
          : (darkMode ? "#555" : "#ccc") 
      }`,
    backgroundColor: darkMode ? "#444" : "#fff",
    color: darkMode ? "#fff" : "#000",
    outline: "none",
  };

  const actionsStyle: React.CSSProperties = {
    marginTop: "4rem",
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
  };

  const cancelButtonStyle: React.CSSProperties = {
    padding: "0.5rem 1rem",
    cursor: "pointer",
    backgroundColor: isCancelHovered ? (darkMode ? "#555" : "#f5f5f5") : (darkMode ? "#444" : "#fff"),
    border: `1px solid ${darkMode ? (isCancelHovered ? "#888" : "#666") : "#ddd"}`,
    color: darkMode ? (isCancelHovered ? "#ddd" : "#fff") : "#333",
    borderRadius: "24px",
    fontSize: "0.9rem",
  };

  const submitButtonStyle: React.CSSProperties = {
    padding: "0.5rem 1rem",
    cursor: "pointer",
    backgroundColor: darkMode ? (isCreateHovered ? "#e6e6e6" : "#fff") : (isCreateHovered ? "#555" : "grey"), 
    color: darkMode ? "#000" : "#fff", // Black text for white background in dark mode
    border: darkMode ? "1px solid #ccc" : "none", // Border for dark mode
    borderRadius: "30px",
    fontSize: "0.9rem",
  };

  return ReactDOM.createPortal(
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <h2 style={headingStyle}>{title}</h2>
        <form onSubmit={handleFormSubmit} noValidate style={formStyle}>
          <input
            type="text"
            placeholder={placeholder || "Enter a value..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsInputFocused(true)} 
            onBlur={() => setIsInputFocused(false)}
            style={inputStyle}
          />
          <div style={actionsStyle}>
            <button
              type="button"
              onClick={onClose}
              style={cancelButtonStyle}
              onMouseEnter={() => setIsCancelHovered(true)}
              onMouseLeave={() => setIsCancelHovered(false)}
            >
              Cancel
            </button>
            <button type="submit" style={submitButtonStyle}
            onMouseEnter={() => setIsCreateHovered(true)}
            onMouseLeave={() => setIsCreateHovered(false)}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
