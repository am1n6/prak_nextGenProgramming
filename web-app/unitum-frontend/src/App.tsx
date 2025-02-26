import { useState,useRef,useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header.tsx";
import Sidebar from "./components/Sidebar.tsx";
import MainChat from "./components/Mainchat.tsx";
import Footer from "./components/Footer";
import Modal from "./components/ModalAdd.tsx";
import ModalDel from "./components/ModalDel";
import ModalSrch from "./components/ModalSrch.tsx";
import { createNewConversationB, deleteConversationB, listConversations, updateConversationTitle } from './services/ConversationService';
import { chatWithOllama } from './services/OllamaService.js';

interface Message {
  sender: "User" | "AI";
  content: string;
}

interface Conversation {
  id: number;
  title: string;
  messages: Message[];
}

function App() {
  // State to manage modal visibility
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<number | null>(null);
  const [chatToDelete, setChatToDelete] = useState<string>("");

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // State for the user input
  const [message, setMessage] = useState<string>("");

  // State for all conversations
  const [conversations, setConversations] = useState<Conversation[]>([]);

    // State for the current conversation ID
  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);

  const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);

  // State for dark/light mode
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const [isAIResponding, setIsAIResponding] = useState<boolean>(false);

  const aiResponseTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    listConversations().then((response) => {
      setConversations(response.data);
    }).catch(error => {
      console.error(error);
    })
  }, []);

  const stopAIResponse = () => {
    // Clear all pending timeouts
    aiResponseTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    aiResponseTimeoutsRef.current = [];
    setIsAIResponding(false);
  };

 const handleSendMessage = async () => {
  if (message.trim() !== "" && currentConversationId !== null && !isAIResponding) {
    const userMessage = message;

    // Add user message to the current conversation
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === currentConversationId
          ? {
              ...conv,
              messages: [...conv.messages, { sender: "User", content: userMessage }],
            }
          : conv
      )
    );

    // Clear the input field
    setMessage("");

    try {
      setIsAIResponding(true);

      const response = await chatWithOllama(currentConversationId, message.trim());

      const aiMessage = response.data;

      // Add AI response to the conversation
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === currentConversationId
            ? {
                ...conv,
                messages: [...conv.messages, { sender: "AI", content: aiMessage }],
              }
            : conv
        )
      );

      setIsAIResponding(false);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === currentConversationId
            ? {
                ...conv,
                messages: [...conv.messages, { sender: "AI", content: "Sorry, I couldn't process that." }],
              }
            : conv
        )
      );
      setIsAIResponding(false);
    }
  }
 };

   // Function to create a new conversation
   const createNewConversation = async (title: string) => {
    if (title) {
      const newConversationB = {
        title,
        messages: []
      };
      const resConv = await createNewConversationB(newConversationB);
      const newConversation: Conversation = {
        id: resConv.data.id,
        title,
        messages: [],
      };
      setConversations((prev) => [...prev, newConversation]);
      setCurrentConversationId(newConversation.id);
      setIsAddModalOpen(false); // Close modal after adding
    }
  };

  // Function to switch to a conversation
  const switchConversation = (id: number) => {
    setCurrentConversationId(id);
  };

  const renameConversation = (id: number, newTitle: string) => {
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === id ? { ...conv, title: newTitle } : conv
      )
    );
    const newNamedChat = {
      title: newTitle.trim()
    };
    updateConversationTitle(id, newNamedChat);
  };

  const openDeleteModal = (id: number, title: string) => {
    setConversationToDelete(id); 
    setChatToDelete(title);
    setIsDeleteModalOpen(true); 
  };
  
  const handleDeleteConversation = () => {
    if (conversationToDelete !== null) {
      setConversations((prev) => prev.filter((conv) => conv.id !== conversationToDelete));
      if (currentConversationId === conversationToDelete) {
        setCurrentConversationId(null);
      }

      deleteConversationB(conversationToDelete);
  
      setConversationToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };
  
  // Get the current conversation
  const currentConversation = conversations.find(
    (conv) => conv.id === currentConversationId
  );

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };
  const handleSelectConversation = (id: number) => {
    setCurrentConversationId(id);
    setIsSearchModalOpen(false); // Close the modal
  };

  // Toggle mode between dark and light
  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"

    } ${isSidebarHidden ? "sidebar-collapsed" : ""}`}>

      {/* Header */}
      <Header darkMode={darkMode} 
      toggleMode={toggleMode} 
      showTitle={!!currentConversation}
      isSidebarHidden={isSidebarHidden}
       />
  
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        createNewConversation={() => setIsAddModalOpen(true)} // Open modal when add button is clicked
        switchConversation={switchConversation}
        isSidebarHidden={isSidebarHidden}
        setIsSidebarHidden={setIsSidebarHidden}
        renameConversation={renameConversation}
        deleteConversation={openDeleteModal}
        openSearchModal={openSearchModal}
      />
  
      {/* Main Chat Area */}
      <MainChat
        currentConversation={currentConversation}
        isAIResponding={isAIResponding}
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        stopAIResponse={stopAIResponse}
        isSidebarHidden={isSidebarHidden} 
        setIsSidebarHidden={setIsSidebarHidden}
        darkMode={darkMode}
      />
  
      {/* Footer */}
      <Footer 
      isSidebarHidden={isSidebarHidden}
      />

      {/* Modal */}
      <Modal
        title="New Chat"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)} // Close modal
        onSubmit={createNewConversation} 
        placeholder="Enter chat name"
        darkMode={darkMode}
      />

       <ModalDel
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)} 
        onDelete={handleDeleteConversation} 
        chatName={chatToDelete}
        darkMode={darkMode}
       />

       <ModalSrch
         isOpen={isSearchModalOpen}
         onClose={() => setIsSearchModalOpen(false)}
         conversations={conversations}
         onSelectConversation={handleSelectConversation}
        darkMode={darkMode}
       />
    </div>
  );
 };

export default App;
