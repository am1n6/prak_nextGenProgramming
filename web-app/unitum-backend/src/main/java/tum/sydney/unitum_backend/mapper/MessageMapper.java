package tum.sydney.unitum_backend.mapper;

import lombok.AllArgsConstructor;
import tum.sydney.unitum_backend.dto.MessageDto;
import tum.sydney.unitum_backend.entity.Message;

@AllArgsConstructor
public class MessageMapper {

    /**
     * Converts a Message entity to a MessageDto.
     *
     * @param message The Message entity to be converted.
     * @return A MessageDto containing the data from the Message entity.
     */
    public static MessageDto mapToMessageDto(Message message) {
        return new MessageDto(
                message.getId(), // Map the message ID
                message.getSender(), // Map the sender (User or AI)
                message.getContent(), // Map the content of the message
                message.getChat(), // Map the associated chat entity
                message.getPostedAt() // Map the timestamp when the message was posted
        );
    }

    /**
     * Converts a MessageDto to a Message entity.
     *
     * @param messageDto The MessageDto to be converted.
     * @return A Message entity containing the data from the MessageDto.
     */
    public static Message mapToMessage(MessageDto messageDto) {
        return new Message(
                messageDto.getId(), // Map the message ID
                messageDto.getSender(), // Map the sender (User or AI)
                messageDto.getContent(), // Map the content of the message
                messageDto.getChat(), // Map the associated chat entity
                messageDto.getPostedAt() // Map the timestamp when the message was posted
        );
    }

}
