package tum.sydney.unitum_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Represents a chat entity that stores information about a chat session,
 * including its title, associated messages, and timestamps for creation
 * and updates.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "chats")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for the chat.

    @Column(nullable = false)
    private String title; // Title of the chat, cannot be null.

    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Message> messages; // List of messages associated with this chat.

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt; // Timestamp indicating when the chat was created.

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt; // Timestamp indicating when the chat title was last updated.

}
