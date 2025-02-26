package tum.sydney.unitum_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Data Transfer Object (DTO) for the Chat entity.
 * Used to transfer chat data between layers (e.g., from the database to the client).
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatDto {

    private Long id; // Unique identifier for the chat.

    private String title; // Title of the chat.

    private List<MessageDto> messages; // List of messages associated with the chat (represented by MessageDto).

    private LocalDateTime createdAt; // Timestamp indicating when the chat was created.

    private LocalDateTime updatedAt; // Timestamp indicating when the chat title was last updated.

}
