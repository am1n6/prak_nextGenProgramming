package tum.sydney.unitum_backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tum.sydney.unitum_backend.entity.Chat;
import tum.sydney.unitum_backend.entity.Message;

import java.time.LocalDateTime;

/**
 * Data Transfer Object (DTO) for the Message entity.
 * Used to transfer message data between layers (e.g., from the database to the client).
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {

    private Long id; // Unique identifier for the message.

    private Message.Sender sender; // The sender of the message (User or AI).

    private String content; // The content of the message.

    @JsonIgnore
    private Chat chat; // The associated chat for the message, ignored in JSON serialization.

    private LocalDateTime postedAt; // Timestamp indicating when the message was posted.

}
