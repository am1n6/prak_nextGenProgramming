import axios, { AxiosResponse } from "axios";

// Base URL for chat-related API operations.
const REST_API_BASE_URL_CHAT = "http://localhost:8080/api/chat";

// Define TypeScript interfaces for the expected data structures.
interface Conversation {
  title: string;
  messages: any[];
}

interface UpdateConversation {
  title: string;
}

/**
 * Fetches a list of all conversations.
 * 
 * @returns {Promise<AxiosResponse<any>>} - A Promise resolving with the API response containing the list of conversations.
 */
export const listConversations = (): Promise<AxiosResponse<any>> => 
  axios.get(REST_API_BASE_URL_CHAT);

/**
 * Creates a new conversation.
 * 
 * @param {Conversation} conv - An object representing the new conversation.
 * @returns {Promise<AxiosResponse<any>>} - A Promise resolving with the API response or rejecting on failure.
 */
export const createNewConversationB = (conv: Conversation): Promise<AxiosResponse<any>> => 
  axios.post(REST_API_BASE_URL_CHAT, conv);

/**
 * Fetches the details of a specific conversation.
 * 
 * @param {number} convId - The ID of the conversation to retrieve.
 * @returns {Promise<AxiosResponse<any>>} - A Promise resolving with the API response containing the conversation details.
 */
export const getConversation = (convId: number): Promise<AxiosResponse<any>> => 
  axios.get(`${REST_API_BASE_URL_CHAT}/${convId}`);

/**
 * Updates the title of an existing conversation.
 * 
 * @param {number} id - The ID of the conversation to update.
 * @param {UpdateConversation} conv - An object containing the new title of the conversation.
 * @returns {Promise<AxiosResponse<any>>} - A Promise resolving with the API response or rejecting on failure.
 */
export const updateConversationTitle = (id: number, conv: UpdateConversation): Promise<AxiosResponse<any>> => 
  axios.put(`${REST_API_BASE_URL_CHAT}/${id}`, conv);

/**
 * Deletes a specific conversation.
 * 
 * @param {number} convId - The ID of the conversation to delete.
 * @returns {Promise<AxiosResponse<any>>} - A Promise resolving with the API response or rejecting on failure.
 */
export const deleteConversationB = (convId: number): Promise<AxiosResponse<any>> => 
  axios.delete(`${REST_API_BASE_URL_CHAT}/${convId}`);
