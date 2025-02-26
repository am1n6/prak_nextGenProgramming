import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBars } from "@fortawesome/free-solid-svg-icons";


interface Message {
  sender: "User" | "AI";
  content: string;
}

interface Conversation {
  id: number;
  title: string;
  messages: Message[];
}

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId: number | null;
  createNewConversation: () => void;
  switchConversation: (id: number) => void;
  isSidebarHidden: boolean; 
  setIsSidebarHidden: (hidden: boolean) => void;
  renameConversation: (id: number, newTitle: string) => void;
  deleteConversation: (id: number, title: string) => void;
  openSearchModal: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  currentConversationId,
  createNewConversation,
  switchConversation,
  isSidebarHidden,
  setIsSidebarHidden,
  renameConversation,
  deleteConversation,
  openSearchModal,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleRename = (id: number, currentTitle: string) => {
  setEditingId(id);
  setEditingTitle(currentTitle);
  };

  const filteredConversations = isSearching
    ? conversations.filter((conv) =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  return (
     <div className={`sidebar ${isSidebarHidden ? "hidden" : ""}`}>
      <div className="sidebar-header">
       <button 
         onClick={() => setIsSidebarHidden(true)} 
         className="hide-sidebar-button">
          <FontAwesomeIcon icon={faBars} size="sm" />
       </button>

       <button className="search-button" onClick={openSearchModal}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" />
       </button>

       <button className="new-chat-button" 
       onClick={createNewConversation}>
        <svg xmlns="http://www.w3.org/2000/svg"  
        viewBox="0 0 24 24" 
        stroke-width="1.5" 
        stroke="currentColor"
        className="size-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
       </button>
       
      </div>
      {isSearching && (
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}
      <ul className="conversation-list">
        {filteredConversations.map((conv) => (
          <li
            key={conv.id}
            className={`conversation-item ${
              conv.id === currentConversationId ? "active-conversation" : ""
            }`}
            onClick={() => switchConversation(conv.id)}
            >
            {/* Conditionally render the title or an input */}
            {conv.id === editingId ? (
              // EDITING MODE: the input replaces the entire item
              <input
                className="edit-title-input"
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // Confirm rename
                    renameConversation(conv.id, editingTitle.trim());
                    setEditingId(null);
                    setEditingTitle("");
                    e.stopPropagation();
                  } else if (e.key === "Escape") {
                    // Cancel rename
                    setEditingId(null);
                    setEditingTitle("");
                    e.stopPropagation();
                  }
                }}
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              // NORMAL MODE: conversation title + rename/delete buttons
              <>
                <span className="conversation-title">{conv.title}</span>

                <div className="conversation-actions">
                  <button
                    className="rename-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRename(conv.id, conv.title);
                    }}
                    title="Rename Conversation"
                  >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                 fill="#5f6368">
                <path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z"/>
                </svg>
              </button>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conv.id,conv.title); // Call deleteConversation to trigger modal
                }}
                title="Delete Conversation"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                 fill="#5f6368">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/>
                </svg> 
              </button>
            </div>
            </>
            )}
          </li>
        ))}
      </ul>
      </div>
  );
};

export default Sidebar;
