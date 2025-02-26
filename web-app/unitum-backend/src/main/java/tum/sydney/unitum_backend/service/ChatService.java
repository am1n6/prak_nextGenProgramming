package tum.sydney.unitum_backend.service;

import tum.sydney.unitum_backend.dto.ChatDto;

import java.util.List;

/**
 * Service interface for managing chat-related operations.
 * Defines methods for creating, retrieving, updating, and deleting chats.
 */
public interface ChatService {

    /**
     * Creates a new chat based on the provided ChatDto.
     *
     * @param chatDto The data transfer object containing chat details.
     * @return The created ChatDto.
     */
    ChatDto createChat(ChatDto chatDto);

    /**
     * Retrieves a chat by its ID.
     *
     * @param chatId The ID of the chat to retrieve.
     * @return The ChatDto corresponding to the given ID.
     */
    ChatDto getChatById(Long chatId);

    /**
     * Retrieves a list of all chats.
     *
     * @return A list of ChatDto objects representing all chats.
     */
    List<ChatDto> getAllChats();

    /**
     * Updates the title of an existing chat.
     *
     * @param chatId The ID of the chat to update.
     * @param updatedChat The ChatDto containing the updated title.
     * @return The updated ChatDto.
     */
    ChatDto updateChatTitle(Long chatId, ChatDto updatedChat);

    /**
     * Deletes a chat by its ID.
     *
     * @param chatId The ID of the chat to delete.
     */
    void deleteChat(Long chatId);

}
