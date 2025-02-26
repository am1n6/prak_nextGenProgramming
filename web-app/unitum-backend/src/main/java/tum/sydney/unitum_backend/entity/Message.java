package tum.sydney.unitum_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * Represents a message entity within a chat, storing information about the
 * sender, content, associated chat, and the timestamp when the message was posted.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for the message.

    @Enumerated(EnumType.STRING)
    private Sender sender; // Indicates the sender of the message (User or AI).

    @Column(columnDefinition = "TEXT")
    private String content; // The content of the message, stored as TEXT to accommodate long messages.

    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat; // The chat to which the message belongs, the foreign key is "chat_id".

    @CreationTimestamp
    @JoinColumn(name = "posted_at")
    private LocalDateTime postedAt; // Timestamp indicating when the message was posted.

    /**
     * Enum to represent the sender of the message.
     */
    public enum Sender {
        User, // Message sent by a user.
        AI    // Message sent by the AI.
    }
}
