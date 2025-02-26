package tum.sydney.unitum_backend.service;

/**
 * Interface that defines the contract for interacting with the Ollama model.
 * The service is responsible for sending user prompts to the Ollama model and
 * receiving the model's response.
 * Key responsibilities:
 * - Sending a user prompt to the model using a specific chat ID.
 * - Retrieving the model's response to the prompt as a string.
 */
public interface OllamaService {

    /**
     * Sends a user prompt to the Ollama model and retrieves the response.
     *
     * @param chatId The ID of the chat to associate with the user prompt.
     * @param userPrompt The prompt or query to be sent to the Ollama model.
     * @return The response from the model, typically a generated string based on the prompt.
     */
    String promptTheModel(Long chatId, String userPrompt);
}
