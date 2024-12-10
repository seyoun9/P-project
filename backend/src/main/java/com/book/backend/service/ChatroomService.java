package com.book.backend.service;

import org.springframework.stereotype.Service;

import com.book.backend.dto.ChatroomDto;
import com.book.backend.entity.Book;
import com.book.backend.entity.Chatroom;
import com.book.backend.repository.BookRepository;
import com.book.backend.repository.ChatroomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatroomService {
    
    private final ChatroomRepository chatroomRepository;
    private final BookRepository bookRepository;

    // 채팅방 생성
    public ChatroomDto createChatroom(String isbn, ChatroomDto chatroomDto) {
        Book book = bookRepository.findByIsbn(isbn);
        if (book == null) throw new IllegalArgumentException("Book not found");

        Chatroom chatroom = new Chatroom(null, book, chatroomDto.getTitle());
        Chatroom savedChatroom = chatroomRepository.save(chatroom);
        return new ChatroomDto(savedChatroom.getId(), savedChatroom.getBook().getId(), savedChatroom.getTitle());
    }

    // 채팅방 조회
    public ChatroomDto getChatroomByIsbn(String isbn) {
        Chatroom chatroom = chatroomRepository.findByBook_Isbn(isbn);
        if (chatroom == null) throw new IllegalArgumentException("Chatroom not found");
        return new ChatroomDto(chatroom.getId(), chatroom.getBook().getId(), chatroom.getTitle());
    }
}
