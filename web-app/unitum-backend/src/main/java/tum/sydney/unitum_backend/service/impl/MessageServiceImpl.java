package tum.sydney.unitum_backend.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tum.sydney.unitum_backend.dto.MessageDto;
import tum.sydney.unitum_backend.entity.Chat;
import tum.sydney.unitum_backend.entity.Message;
import tum.sydney.unitum_backend.exception.ResourceNotFoundException;
import tum.sydney.unitum_backend.mapper.MessageMapper;
import tum.sydney.unitum_backend.repository.ChatRepository;
import tum.sydney.unitum_backend.repository.MessageRepository;
import tum.sydney.unitum_backend.service.MessageService;

/**
 * Implementation of the MessageService interface.
 * This service handles business logic related to creating, updating, and retrieving messages in the system.
 * It interacts with the repositories to persist and retrieve data related to messages and chats.
 * Key responsibilities:
 * - Creating new messages and associating them with a specific chat.
 * - Updating the content of existing messages.
 */
@AllArgsConstructor
@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;  // Repository for managing Message entities
    private final ChatRepository chatRepository;  // Repository for managing Chat entities

    /**
     * Creates a new message and associates it with an existing chat.
     *
     * @param chatId The ID of the chat to associate with the message.
     * @param messageDto The data transfer object containing the message details.
     * @return The created MessageDto.
     * @throws ResourceNotFoundException If the chat with the specified ID does not exist.
     */
    @Override
    public MessageDto createMessage(Long chatId, MessageDto messageDto) {
        // Convert the MessageDto to a Message entity
        Message message = MessageMapper.mapToMessage(messageDto);

        // Retrieve the chat by its ID; throw exception if not found
        Chat parentChat = chatRepository.findById(chatId)
                .orElseThrow(() -> new ResourceNotFoundException("Parent Chat with id " + chatId + " not found"));

        // Associate the message with the retrieved chat
        message.setChat(parentChat);

        // Save the new message to the repository and return it as a MessageDto
        Message savedMessage = messageRepository.save(message);
        return MessageMapper.mapToMessageDto(savedMessage);
    }

    /**
     * Updates the content of an existing message.
     *
     * @param messageId The ID of the message to update.
     * @param updatedMessage The MessageDto containing the updated content.
     * @return The updated MessageDto.
     * @throws ResourceNotFoundException If the message with the specified ID does not exist.
     */
    @Override
    public MessageDto updateMessageContent(Long messageId, MessageDto updatedMessage) {
        // Fetch the message by its ID; throw exception if not found
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new ResourceNotFoundException("Message with Id: " + messageId + " does not exist"));

        // Update the content of the message
        message.setContent(updatedMessage.getContent());

        // Save the updated message to the repository and return it as a MessageDto
        Message savedMessage = messageRepository.save(message);
        return MessageMapper.mapToMessageDto(savedMessage);
    }
}
