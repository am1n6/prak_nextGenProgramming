package tum.sydney.unitum_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tum.sydney.unitum_backend.entity.Message;

/**
 * Repository interface for managing Message entities.
 * Extends JpaRepository to provide CRUD operations for Message entities.
 */
public interface MessageRepository extends JpaRepository<Message, Long> {
    // JpaRepository provides basic CRUD functionality for Message entities, so no additional methods are needed.
}
