package tum.sydney.unitum_backend.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tum.sydney.unitum_backend.dto.ChatDto;
import tum.sydney.unitum_backend.entity.Chat;
import tum.sydney.unitum_backend.exception.ResourceNotFoundException;
import tum.sydney.unitum_backend.mapper.ChatMapper;
import tum.sydney.unitum_backend.repository.ChatRepository;
import tum.sydney.unitum_backend.service.ChatService;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of the ChatService interface.
 * Provides the business logic for creating, retrieving, updating, and deleting chats.
 */
@AllArgsConstructor
@Service
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository; // Injected repository for database operations

    /**
     * Creates a new chat.
     *
     * @param chatDto The data transfer object containing the chat details.
     * @return The created ChatDto.
     */
    @Override
    public ChatDto createChat(ChatDto chatDto) {
        // Map ChatDto to Chat entity and save it to the repository
        Chat savedChat = chatRepository.save(ChatMapper.mapToChat(chatDto));
        // Return the saved chat as a ChatDto
        return ChatMapper.mapToChatDto(savedChat);
    }

    /**
     * Retrieves a chat by its ID.
     *
     * @param chatId The ID of the chat to retrieve.
     * @return The ChatDto corresponding to the given ID.
     * @throws ResourceNotFoundException If the chat with the given ID does not exist.
     */
    @Override
    public ChatDto getChatById(Long chatId) {
        // Fetch chat from the repository; throw exception if not found
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new ResourceNotFoundException("Chat with Id: " + chatId + " does not exist."));
        // Return the chat as a ChatDto
        return ChatMapper.mapToChatDto(chat);
    }

    /**
     * Retrieves a list of all chats.
     *
     * @return A list of ChatDto objects representing all chats.
     */
    @Override
    public List<ChatDto> getAllChats() {
        // Fetch all chats and map each to a ChatDto
        List<Chat> chats = chatRepository.findAll();
        return chats.stream().map(ChatMapper::mapToChatDto)
                .collect(Collectors.toList());
    }

    /**
     * Updates the title of an existing chat.
     *
     * @param chatId The ID of the chat to update.
     * @param updatedChat The ChatDto containing the updated title.
     * @return The updated ChatDto.
     * @throws ResourceNotFoundException If the chat with the given ID does not exist.
     */
    @Override
    public ChatDto updateChatTitle(Long chatId, ChatDto updatedChat) {
        // Fetch chat from the repository; throw exception if not found
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new ResourceNotFoundException("Chat with Id: " + chatId + " does not exist."));
        // Update the chat title
        chat.setTitle(updatedChat.getTitle());
        // Save the updated chat
        Chat savedChat = chatRepository.save(chat);
        // Return the updated chat as a ChatDto
        return ChatMapper.mapToChatDto(savedChat);
    }

    /**
     * Deletes a chat by its ID.
     *
     * @param chatId The ID of the chat to delete.
     * @throws ResourceNotFoundException If the chat with the given ID does not exist.
     */
    @Override
    public void deleteChat(Long chatId) {
        // Fetch chat from the repository; throw exception if not found
        chatRepository.findById(chatId)
                .orElseThrow(() -> new ResourceNotFoundException("Chat with Id: " + chatId + " does not exist and can't be deleted."));
        // Delete the chat
        chatRepository.deleteById(chatId);
    }
}
