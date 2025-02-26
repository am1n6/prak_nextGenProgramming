import axios, { AxiosResponse } from "axios";

// Base URL for the REST API that interacts with Ollama.
const REST_API_BASE_URL_Ollama = "http://localhost:8080/api/chat";

/**
 * Sends a GET request to the Ollama API to instruct and interact with it.
 * 
 * @param {number} convId - The ID of the conversation to interact with.
 * @param {string} msg - The user's message to send to the Ollama API. 
 * @returns {Promise<AxiosResponse<any>>} - A Promise that resolves with the API's response or rejects if an error occurs.
 */
export const chatWithOllama = (convId: number, msg: string): Promise<AxiosResponse<any>> => 
   axios.get(`${REST_API_BASE_URL_Ollama}/${convId}/instruct`, {
        params: { userPrompt: encodeURIComponent(msg) },
    });