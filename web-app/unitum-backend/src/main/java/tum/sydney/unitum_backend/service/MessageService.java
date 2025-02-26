package tum.sydney.unitum_backend.service;

import tum.sydney.unitum_backend.dto.MessageDto;

/**
 * Service interface for managing message-related operations.
 * Defines methods for creating and updating messages.
 */
public interface MessageService {

    /**
     * Creates a new message for a specific chat.
     *
     * @param chatId The ID of the chat to associate the new message with.
     * @param messageDto The data transfer object containing the message details.
     * @return The created MessageDto.
     */
    MessageDto createMessage(Long chatId, MessageDto messageDto);

    /**
     * Updates the content of an existing message.
     *
     * @param messageId The ID of the message to update.
     * @param messageDto The MessageDto containing the new message content.
     * @return The updated MessageDto.
     */
    MessageDto updateMessageContent(Long messageId, MessageDto messageDto);

}
