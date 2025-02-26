package tum.sydney.unitum_backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tum.sydney.unitum_backend.dto.ChatDto;
import tum.sydney.unitum_backend.service.ChatService;

import java.util.List;

/**
 * REST Controller for handling Chat-related requests.
 * Provides endpoints for creating, retrieving, updating, and deleting chats.
 */
@CrossOrigin("http://localhost:5000")
@AllArgsConstructor
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    /**
     * Endpoint to create a new chat.
     *
     * @param chatDto The chat details to be created.
     * @return The created ChatDto with HTTP status 201 (Created).
     */
    @PostMapping
    public ResponseEntity<ChatDto> addChat(@RequestBody ChatDto chatDto) {
        ChatDto savedChat = chatService.createChat(chatDto);
        return new ResponseEntity<>(savedChat, HttpStatus.CREATED);
    }

    /**
     * Endpoint to retrieve a chat by its ID.
     *
     * @param chatId The ID of the chat to retrieve.
     * @return The ChatDto for the requested chat.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ChatDto> getChatById(@PathVariable("id") Long chatId) {
        ChatDto chatDto = chatService.getChatById(chatId);
        return ResponseEntity.ok(chatDto);
    }

    /**
     * Endpoint to retrieve all chats.
     *
     * @return A list of all ChatDto objects.
     */
    @GetMapping
    public ResponseEntity<List<ChatDto>> getAllChats() {
        List<ChatDto> chats = chatService.getAllChats();
        return ResponseEntity.ok(chats);
    }

    /**
     * Endpoint to update the title of an existing chat.
     *
     * @param chatId The ID of the chat to update.
     * @param updatedChat The updated chat details (title).
     * @return The updated ChatDto.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ChatDto> updateChatTitle(@PathVariable("id") Long chatId,
                                                   @RequestBody ChatDto updatedChat) {
        ChatDto chatDto = chatService.updateChatTitle(chatId, updatedChat);
        return ResponseEntity.ok(chatDto);
    }

    /**
     * Endpoint to delete a chat by its ID.
     *
     * @param chatId The ID of the chat to delete.
     * @return A success message indicating the chat has been deleted.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteChat(@PathVariable("id") Long chatId) {
        chatService.deleteChat(chatId);
        return ResponseEntity.ok("Chat with id " + chatId + " deleted successfully.");
    }
}
