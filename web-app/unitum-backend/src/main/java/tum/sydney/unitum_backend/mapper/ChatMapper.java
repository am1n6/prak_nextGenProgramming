package tum.sydney.unitum_backend.mapper;

import tum.sydney.unitum_backend.dto.ChatDto;
import tum.sydney.unitum_backend.entity.Chat;

import java.util.stream.Collectors;

/**
 * Mapper class for converting between Chat entity and ChatDto.
 * Used to transform data between the entity and DTO layers.
 */
public class ChatMapper {

    /**
     * Converts a Chat entity to a ChatDto.
     *
     * @param chat The Chat entity to be converted.
     * @return A ChatDto containing the data from the Chat entity.
     */
    public static ChatDto mapToChatDto(Chat chat) {
        return new ChatDto(
                chat.getId(), // Map the chat ID
                chat.getTitle(), // Map the chat title
                chat.getMessages().stream() // Map each message to a MessageDto
                        .map(MessageMapper::mapToMessageDto)
                        .collect(Collectors.toList()),
                chat.getCreatedAt(), // Map the created timestamp
                chat.getUpdatedAt() // Map the updated timestamp
        );
    }

    /**
     * Converts a ChatDto to a Chat entity.
     *
     * @param chatDto The ChatDto to be converted.
     * @return A Chat entity containing the data from the ChatDto.
     */
    public static Chat mapToChat(ChatDto chatDto) {
        return new Chat(
                chatDto.getId(), // Map the chat ID
                chatDto.getTitle(), // Map the chat title
                chatDto.getMessages().stream() // Map each MessageDto to a Message entity
                        .map(MessageMapper::mapToMessage)
                        .collect(Collectors.toList()),
                chatDto.getCreatedAt(), // Map the created timestamp
                chatDto.getUpdatedAt() // Map the updated timestamp
        );
    }

}
