package tum.sydney.unitum_backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tum.sydney.unitum_backend.service.OllamaService;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

/**
 * REST Controller for handling interactions with the Ollama model.
 * Provides an endpoint for sending user prompts to the model and receiving responses.
 */
@CrossOrigin("http://localhost:5000")
@AllArgsConstructor
@RestController
@RequestMapping("/api/chat/{chat_id}")
public class OllamaController {

    private final OllamaService ollamaService;

    /**
     * Endpoint to interact with the Ollama model.
     *
     * @param chatId The ID of the chat for context.
     * @param userPrompt The prompt provided by the user.
     * @return The response from the model.
     */
    @GetMapping(value = "/instruct")
    public ResponseEntity<String> chatWithModel(
            @PathVariable("chat_id") Long chatId,
            @RequestParam String userPrompt) {
        String decodedText = URLDecoder.decode(userPrompt, StandardCharsets.UTF_8);
        // Prompt the model with the user's input and return the response.
        String modelResponse = ollamaService.promptTheModel(chatId, decodedText);
        return ResponseEntity.ok(modelResponse);
    }
}
