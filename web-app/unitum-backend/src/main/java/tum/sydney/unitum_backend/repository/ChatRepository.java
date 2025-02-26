package tum.sydney.unitum_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tum.sydney.unitum_backend.entity.Chat;

/**
 * Repository interface for managing Chat entities.
 * Extends JpaRepository to provide CRUD operations for Chat entities.
 */
public interface ChatRepository extends JpaRepository<Chat, Long> {
    // No additional methods are required, as JpaRepository provides basic CRUD functionality
}
