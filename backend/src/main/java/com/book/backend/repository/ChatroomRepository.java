package com.book.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.book.backend.entity.Chatroom;

@Repository
public interface ChatroomRepository extends JpaRepository<Chatroom, Long> {
    Chatroom findByBook_Isbn(String isbn);
}
